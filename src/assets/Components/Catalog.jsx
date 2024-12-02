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
  const [preferenceId, setPreferenceId] = useState(null); // Estado para almacenar el ID de la preferencia
  const [startIndex, setStartIndex] = useState(0); // Estado para el índice de los libros
  const [isLoading, setIsLoading] = useState(false); // Estado para el cargando
  const [hasMore, setHasMore] = useState(true); // Estado para saber si hay más libros para cargar

  // Géneros en inglés para usar con la API de Google Books
  const genres = [
    "fiction", "drama", "adventure", "science fiction", "fantasy",
    "romance", "horror", "mystery", "history", "biography"
  ];

  // Función para hacer la búsqueda y obtener los libros
  const fetchBooks = async (append = false) => {
    try {
      setIsLoading(true); // Empieza a cargar
      let query = searchTerm;
      if (selectedGenres.length > 0) {
        query += `+subject:${selectedGenres.join("+subject:")}`;
      }

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=10`
      );
      const data = await response.json();

      const booksWithPrice = data.items?.filter((book) => {
        const bookPriceInUsd = book.saleInfo?.listPrice?.amount;
        if (!bookPriceInUsd) return false;

        // Convertir el precio de USD a ARS (multiplicando por 1000)
        const bookPriceInArs = Math.ceil(bookPriceInUsd * 1000);
        return (minPrice ? bookPriceInArs >= minPrice : true) &&
               (maxPrice ? bookPriceInArs <= maxPrice : true);
      });

      if (append) {
        setBooks((prevBooks) => [...prevBooks, ...(booksWithPrice || [])]);
      } else {
        setBooks(booksWithPrice || []);
      }

      setHasMore(data.items?.length === 10); // Si cargamos 10 libros, hay más
      setIsLoading(false); // Finaliza la carga
    } catch (error) {
      console.error("Error al obtener los libros:", error);
      setIsLoading(false); // Finaliza la carga en caso de error
    }
  };

  // Crear preferencia de pago en el backend
  const createPreference = async () => {
    try {
      const items = books.map((book) => ({
        title: book.volumeInfo.title,
        quantity: 1,
        unit_price: book.saleInfo?.listPrice?.amount * 1000, // Multiplicamos por 1000 para mostrar en ARS
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
    // Lógica para agregar al carrito (si es necesario)
  };

  // Inicializar Mercado Pago con la public key
  useEffect(() => {
    initMercadoPago("APP_USR-1040ad6c-f057-4855-be2d-0bc8e9dd1687", { locale: "es-AR" });
  }, []);

  // Efecto para cargar los libros
  useEffect(() => {
    if (searchTerm) {
      fetchBooks();
    }
  }, [searchTerm, selectedGenres, minPrice, maxPrice, startIndex]);

  const shortenTitle = (title) => title.length > 30 ? title.slice(0, 30) + "..." : title;

  const convertToPesos = (usdPrice) => Math.ceil(usdPrice * 1000); // Convertimos a ARS

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const loadMoreBooks = () => {
    setStartIndex(startIndex + 10); // Aumenta el índice en 10
    fetchBooks(true); // Carga más libros sin reemplazar los existentes
  };

  return (
    <div className="catalog">
      <div className="left-filters">
        <h2>Géneros</h2>
        {genres.map((genre, index) => (
          <div key={index} className="filter">
            <input
              type="checkbox"
              id={genre}
              onChange={() => handleGenreChange(genre)}
              checked={selectedGenres.includes(genre)}
            />
            <h4>{genre.charAt(0).toUpperCase() + genre.slice(1)}</h4>
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
                      ? `${convertToPesos(book.saleInfo.listPrice.amount)} ARS`
                      : "Precio no disponible"}
                  </p>
                  <div className="actions">
                    <button className="buy-button" onClick={createPreference}>Comprar</button>
                    <button className="cart-button" onClick={addToCart}>Agregar al Carrito</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron libros con precio disponible.</p>
          )}
        </div>

        {hasMore && !isLoading && (
          <button className="buy-button" onClick={loadMoreBooks}>
            Ver más
          </button>
        )}

        {isLoading && <p>Cargando...</p>}
      </div>
    </div>
  );
};

export default Catalog;
