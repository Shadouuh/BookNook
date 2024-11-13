import { useState, useEffect } from "react";
import searchIcon from "../Images/Svg/search.svg";
import "./Styles/Catalog.css";

const Catalog = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("El Rubius"); // Para almacenar la búsqueda del usuario
  const [minPrice, setMinPrice] = useState(""); // Precio mínimo
  const [maxPrice, setMaxPrice] = useState(""); // Precio máximo
  const [selectedGenres, setSelectedGenres] = useState([]); // Géneros seleccionados
  const [exchangeRate, setExchangeRate] = useState(1); // Tasa de cambio de USD a ARS

  // Géneros disponibles
  const genres = [
    "Ficción",
    "Drama",
    "Aventura",
    "Ciencia ficción",
    "Fantasía",
    "Romántico",
    "Terror",
    "Misterio",
    "Historia",
    "Biografía",
  ];

  // Función para obtener la tasa de cambio de USD a ARS
  const fetchExchangeRate = async () => {
    try {
      const response = await fetch('https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD');
      const data = await response.json();
      setExchangeRate(data.conversion_rates.ARS); // Establecer la tasa de cambio
    } catch (error) {
      console.error("Error al obtener la tasa de cambio:", error);
    }
  };

  // Función para hacer la búsqueda y obtener los libros
  const fetchBooks = async () => {
    try {
      let query = searchTerm;

      // Agregar los géneros seleccionados a la consulta
      if (selectedGenres.length > 0) {
        query += `+subject:${selectedGenres.join("+subject:")}`;
      }

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
      );
      const data = await response.json();

      // Filtrar los libros que tienen precio disponible y que estén dentro del rango de precios
      const booksWithPrice = data.items?.filter((book) => {
        const bookPriceInUsd = book.saleInfo?.listPrice?.amount; // Precio en USD
        if (!bookPriceInUsd) return false; // Si no tiene precio, lo descartamos

        // Convertir el precio a ARS usando la tasa de cambio
        const bookPriceInArs = bookPriceInUsd * exchangeRate;

        // Filtrar por rango de precio (si se ha definido) en ARS
        const priceIsValid =
          (minPrice ? bookPriceInArs >= minPrice : true) &&
          (maxPrice ? bookPriceInArs <= maxPrice : true);

        return priceIsValid; // Retornar true si cumple con el rango de precio
      });

      setBooks(booksWithPrice || []);
    } catch (error) {
      console.error("Error al obtener los libros:", error);
    }
  };

  useEffect(() => {
    fetchExchangeRate(); // Llamar a la función para obtener la tasa de cambio
    if (searchTerm) {
      fetchBooks(); // Llamamos a la API cada vez que el término de búsqueda cambie
    }
  }, [searchTerm, selectedGenres, minPrice, maxPrice, exchangeRate]);

  // Función para acortar el título si es muy largo
  const shortenTitle = (title) => {
    return title.length > 30 ? title.slice(0, 30) + "..." : title;
  };

  // Función para convertir el precio de USD a ARS
  const convertToPesos = (usdPrice) => {
    return (usdPrice * 998).toFixed(2); // Convertir USD a ARS y redondear a dos decimales
  };

  // Manejo de los géneros seleccionados
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
            onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el estado con el término de búsqueda
          />
        </div>
        <div className="products-container">
          {books.length > 0 ? (
            books.map((book, index) => (
              <div key={index} className="product-card">
                {/* Imagen del libro */}
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "default_image_url.jpg"}
                  alt={book.volumeInfo.title}
                />
                {/* Información del libro */}
                <div className="product-card-info">
                  <h4>{shortenTitle(book.volumeInfo.title)}</h4>
                  <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Autor desconocido"}</p>
                  <p className="price">
                    {book.saleInfo?.listPrice
                      ? `$${convertToPesos(book.saleInfo.listPrice.amount)} ARS`
                      : "Precio no disponible"}
                  </p>
                  <div className="actions">
                    <button className="buy-button">Comprar</button>
                    <button className="cart-button">Agregar al Carrito</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No se encontraron libros con precio disponible.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
