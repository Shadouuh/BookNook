import { useState, useEffect } from "react";
import searchIcon from "../Images/Svg/search.svg";
import "./Styles/Catalog.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"; // SDK de Mercado Pago

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("El Rubius");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [preferenceId, setPreferenceId] = useState(null); // Estado para almacenar el ID de la preferencia

  const genres = [
    "Ficción", "Drama", "Aventura", "Ciencia ficción", "Fantasía", 
    "Romántico", "Terror", "Misterio", "Historia", "Biografía"
  ];

  // Función para obtener la tasa de cambio de USD a ARS
  const fetchExchangeRate = async () => {
    try {
      const response = await fetch("https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD");
      const data = await response.json();
      setExchangeRate(data.conversion_rates.ARS);
    } catch (error) {
      console.error("Error al obtener la tasa de cambio:", error);
    }
  };

  // Función para hacer la búsqueda y obtener los libros
  const fetchBooks = async () => {
    try {
      let query = searchTerm;
      if (selectedGenres.length > 0) {
        query += `+subject:${selectedGenres.join("+subject:")}`;
      }

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
      );
      const data = await response.json();

      const booksWithPrice = data.items?.filter((book) => {
        const bookPriceInUsd = book.saleInfo?.listPrice?.amount;
        if (!bookPriceInUsd) return false;

        const bookPriceInArs = bookPriceInUsd * exchangeRate;
        return (minPrice ? bookPriceInArs >= minPrice : true) &&
               (maxPrice ? bookPriceInArs <= maxPrice : true);
      });

      setBooks(booksWithPrice || []);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  // Crear preferencia de pago en el backend
  const createPreference = async () => {
    try {
      const items = books.map((book) => ({
        title: book.volumeInfo.title,
        quantity: 1,
        unit_price: book.saleInfo?.listPrice?.amount * exchangeRate,
      }));

      const response = await fetch("http://localhost:8080/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();
      setPreferenceId(data.id); // Guardamos el ID de la preferencia
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
    }
  };

  const addToCart = async () => {
    
  } 

  // Inicializar Mercado Pago con la public key
  useEffect(() => {
    initMercadoPago("APP_USR-1040ad6c-f057-4855-be2d-0bc8e9dd1687", { locale: "es-AR" });
  }, []);

  // Efecto para cargar la tasa de cambio y los libros
  useEffect(() => {
    fetchExchangeRate();
    if (searchTerm) {
      fetchBooks();
    }
  }, [searchTerm, selectedGenres, minPrice, maxPrice, exchangeRate]);

  const shortenTitle = (title) => title.length > 30 ? title.slice(0, 30) + "..." : title;

  const convertToPesos = (usdPrice) => (usdPrice * 998).toFixed(2);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  return (
    <div className="catalog">
      <div className="left-filters">
        <h2>Generos</h2>
        {genres.map((genre, index) => (
          <div key={index} className="filter">
            <input
              type="checkbox"
              id={genre}
              onChange={() => handleGenreChange(genre)}
              checked={selectedGenres.includes(genre)}
            />
            <h4>{genre}</h4>
          </div>
        ))}

        <h2>Rango de Precio</h2>
        <div className="filter-price">
          <h4>Precio Mínimo</h4>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </div>
        <div className="filter-price">
          <h4>Precio Máximo</h4>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="right-products">
        <div className="search-container">
          <button onClick={fetchBooks}>
            <img src={searchIcon} alt="search" />
          </button>
          <hr />
          <input
            type="text"
            name="searchBar"
            placeholder="Buscar..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="products-container">
          {books.length > 0 ? (
            books.map((book, index) => (
              <div key={index} className="product-card">
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "default_image_url.jpg"}
                  alt={book.volumeInfo.title}
                />
                <div className="product-card-info">
                  <h4>{shortenTitle(book.volumeInfo.title)}</h4>
                  <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido"}</p>
                  <p className="price">
                    {book.saleInfo?.listPrice
                      ? `$${convertToPesos(book.saleInfo.listPrice.amount)} ARS`
                      : "Precio no disponible"}
                  </p>
                  <div className="actions">
                    <button className="buy-button" onClick={createPreference}>Comprar</button>
                    <button className="cart-button" onClick={addToCart} >Agregar al Carrito</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron libros con precio disponible.</p>
          )}
        </div>
      </div>

      {/* Mostrar el Checkout Pro con el ID de preferencia */}
      {preferenceId && (
        <div className="checkout-container">
          <Wallet initialization={{ preferenceId }} />
        </div>
      )}
    </div>
  );
};

export default Catalog;
