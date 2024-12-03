import { useState, useEffect } from "react";
import searchIcon from "../Images/Svg/search.svg";
import "./Styles/Catalog.css";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"; // SDK de Mercado Pago

import AddToCart from "./addToCart";

const Catalog = () => {
  // # -----> Mercado Pago Checkout <----- # //
  const createCheckout = async (title, price, imageUrl) => {
    const accessToken =
      "APP_USR-3491276126078984-120209-86c0f97353033dd82faa0835a94d5e66-2115182646"; // Reemplaza con tu Access Token

    const validPrice = Number(price) || 0; // Asegúrate de que sea un número válido
    const validImageUrl = imageUrl || "default_image_url.jpg"; // Si no hay imagen, usa la predeterminada

    const body = {
      items: [
        {
          title: title,
          quantity: 1,
          currency_id: "ARS",
          unit_price: validPrice,
          picture_url: validImageUrl,
        },
      ],
      back_urls: {
        success: "https://www.tusitio.com/success",
        failure: "https://www.tusitio.com/failure",
        pending: "https://www.tusitio.com/pending",
      },
      auto_return: "approved",
    };

    try {
      const response = await fetch(
        "https://api.mercadopago.com/checkout/preferences",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (data.init_point) {
        // Redirige al link de pago
        window.open(data.init_point, "_blank");
      } else {
        console.error("Error al generar el link de pago:", data);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  // # -----> Mercado Pago Cart Checkout <----- # //

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Dross Rotzank");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [preferenceId, setPreferenceId] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const genres = [
    "fiction",
    "drama",
    "adventure",
    "science fiction",
    "fantasy",
    "romance",
    "horror",
    "mystery",
    "history",
    "biography",
  ];

  const fetchBooks = async (append = false) => {
    try {
      setIsLoading(true);
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

        const bookPriceInArs = Math.ceil(bookPriceInUsd * 1000);
        return (
          (minPrice ? bookPriceInArs >= minPrice : true) &&
          (maxPrice ? bookPriceInArs <= maxPrice : true)
        );
      });

      if (append) {
        setBooks((prevBooks) => [...prevBooks, ...(booksWithPrice || [])]);
      } else {
        setBooks(booksWithPrice || []);
      }

      setHasMore(data.items?.length === 10);
      setIsLoading(false);
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

  const shortenTitle = (title) =>
    title.length > 30 ? title.slice(0, 30) + "..." : title;

  const convertToPesos = (usdPrice) => Math.ceil(usdPrice * 1000);

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const loadMoreBooks = () => {
    setStartIndex(startIndex + 10);
    fetchBooks(true);
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
                  src={
                    book.volumeInfo.imageLinks?.thumbnail ||
                    "default_image_url.jpg"
                  }
                  alt={book.volumeInfo.title}
                />
                <div className="product-card-info">
                  <h4>{shortenTitle(book.volumeInfo.title)}</h4>
                  <p>
                    {book.volumeInfo.authors
                      ? book.volumeInfo.authors.join(", ")
                      : "Autor desconocido"}
                  </p>
                  <p className="price">
                    $
                    {book.saleInfo?.listPrice
                      ? `${convertToPesos(book.saleInfo.listPrice.amount)} ARS`
                      : "Precio no disponible"}
                  </p>

                  <div className="actions">
                    {/* <button className="buy-button" onClick={createPreference}>Comprar</button> */}
                    {book.saleInfo?.listPrice && (<AddToCart id_libro={book.id} />)}
                    {/* <button className="cart-button" onClick={(e) => }>Agregar al Carrito</button> */}
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
