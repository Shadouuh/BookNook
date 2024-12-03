import "./Styles/Cart.css";
import BookIcon from "../Images/Svg/logo.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import coffeeIcon from "../Images/Common/cofi.png";
const Cart = () => {
  const total = 0;
  {
    /*
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠛⠛⠛⢻⡻⠿⣿⣿⣿⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣟⣫⡾⠛⠛⠛⠛⠛⠛⠿⣾⣽⡻⣿⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⡟⣼⠏⠄⠄⠄⠄⠄⠄⣀⣀⡀⣙⣿⣎⢿⣿⣿⣿
  ⣿⣿⣿⣿⣿⢹⡟⠄⠄⠄⣰⡾⠟⠛⠛⠛⠛⠛⠛⠿⣮⡻⣿⣿
  ⣿⡿⢟⣻⣟⣽⠇⠄⠄⠄⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⢿⡹⣿
  ⡟⣼⡟⠉⠉⣿⠄⠄⠄⠄⢿⡄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣼⢟⣿
  ⣇⣿⠁⠄⠄⣿⠄⠄⠄⠄⠘⢿⣦⣄⣀⣀⣀⣀⣤⡴⣾⣏⣾⣿
  ⡇⣿⠄⠄⠄⣿⠄⠄⠄⠄⠄⠄⠈⠉⠛⠋⠉⠉⠄⠄⢻⣿⣿⣿
  ⢃⣿⠄⠄⠄⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⣧⣿⣿
  ⡻⣿⠄⠄⠄⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣸⣧⣿⣿
  ⡇⣿⠄⠄⠄⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣿⢹⣿⣿
  ⣿⡸⢷⣤⣤⣿⡀⠄⠄⠄⠄⢠⣤⣄⣀⣀⣀⠄⠄⢠⣿⣿⣿⣿
  ⣿⣿⣷⣿⣷⣿⡇⠄⠄⠄⠄⢸⡏⡍⣿⡏⠄⠄⠄⢸⡏⣿⣿⣿
  ⣿⣿⣿⣿⣿⢼⡇⠄⠄⠄⠄⣸⡇⣷⣻⣆⣀⣀⣀⣼⣻⣿⣿⣿
  ⣿⣿⣿⣿⣿⣜⠿⢦⣤⣤⡾⢟⣰⣿⣷⣭⣯⣭⣯⣥⣿⣿⣿⣿
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿  
  */
  }
  const convertToPesos = (usdPrice) => Math.ceil(usdPrice * 1000);
  /* # -----> Cart Checkout <----- # */
  const createCheckout = async (title, price) => {
    const accessToken =
      "APP_USR-3491276126078984-120209-86c0f97353033dd82faa0835a94d5e66-2115182646"; 

    const validPrice = Number(price) || 0; 
    const body = {
      items: [
        {
          title: title,
          quantity: 1,
          currency_id: "ARS",
          unit_price: validPrice,
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
  
  
  
  const userConfig = localStorage.getItem("userConfig");

  const userParse = JSON.parse(userConfig);
  const id_usuario = userParse?.data?.user[0]?.id_usuario;

  const isLogged = !!userConfig;
  const [books, setBooks] = useState([]);

  const fetchCart = async () => {
    try {
      let booksReady = [];
      const response = await fetch(
        "http://localhost:3000/carrito/items/ver/" + id_usuario
      );

      if (response.ok) {
        const results = await response.json();

        for (const item of results.resultItems) {
          const bookResponse = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${item.id_libro}`
          );
          if (bookResponse.ok) {
            let bookData = await bookResponse.json();

            booksReady.push({
              ...bookData,
              quantity: item.cantidad,
            });
          } else {
            console.error(
              "Error al obtener los datos del libro",
              bookResponse.status
            );
          }
        }
        setBooks(booksReady);
        console.log("Libros cargados con cantidades:", booksReady);
      } else {
        console.error("Error al buscar en el carrito", response.status);
      }
    } catch (error) {
      console.error("Hubo un problema al obtener el carrito:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/carrito/borrar/${id}/${id_usuario}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Se elimino");
        window.location.reload();
      }
    } catch (error) {
      console.error("Hubo un problema al intentar eliminar el item:", error);
    }
  };

  const updateQuantity = async (bookId, increment) => {
    const bookToUpdate = books.find((book) => book.id === bookId);
    if (!bookToUpdate) {
      console.error("Libro no encontrado en el carrito.");
      return;
    }

    const newQuantity = Math.max(1, bookToUpdate.quantity + increment);

    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, quantity: newQuantity } : book
      )
    );

    try {
      const response = await fetch(`http://localhost:3000/carrito/actualizar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_libro: bookId,
          id_usuario: id_usuario,
          cantidad: newQuantity,
        }),
      });

      if (response.ok) {
        console.log("La cantidad fue actualizada en la base de datos.");
      } else {
        console.error("Error al actualizar la base de datos:", response.status);
      }
    } catch (error) {
      console.error(
        "Hubo un problema al intentar actualizar la base de datos:",
        error
      );
    }
  };

  useEffect(() => {
    if (isLogged) fetchCart();
  }, [isLogged]);

  if (!isLogged) {
    return (
      <div className="error">
        <h1>Inicia sesión para guardar tus compras</h1>
        <img src={coffeeIcon} alt="" className="last" />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Tu Carrito</h2>
        {books.map((book) => (
          <div className="cart-item" key={book.id}>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || BookIcon}
              alt={book.volumeInfo?.title || "Sin título"}
            />
            <div className="item-details">
              <h3>{book.volumeInfo.title || "Título no disponible"}</h3>
              <p className="item-price">
                {book.saleInfo?.listPrice?.amount
                  ? `$${(book.saleInfo.listPrice.amount * 1000).toFixed(2)}`
                  : "Precio no disponible"}
              </p>

              <div className="quantity">
                <button
                  onClick={() => updateQuantity(book.id, -1)}
                  className="quantity-btn"
                >
                  -
                </button>
                <span>{book.quantity}</span>
                <button
                  onClick={() => updateQuantity(book.id, 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="remove-btn"
              onClick={(e) => {
                deleteItem(book.id);
              }}
            >
              Eliminar
            </button>
          </div>
        ))}
        {books.length === 0 && <p>No tienes libros en el carrito.</p>}
      </div>

      <div className="cart-summary">
        <h2>Resumen</h2>
        <p>Total de la compra:</p>
        <p className="total-price">
          <span>$</span>
          {books.reduce((total, book) => {
            return total + (book.saleInfo?.listPrice?.amount) || 0;
          }, 0) * (1000).toFixed(2)}
        </p>
        <button
    className="buy-button"
    id="mp"
    onClick={() => {
      const totalPrice = books.reduce((total, book) => total + (book.saleInfo?.listPrice?.amount || 0), 0)* (1000).toFixed(2);
      createCheckout("Carrito de Libros", totalPrice);
    }}
  >
    Comprar
  </button>
          
      
      </div>
    </div>
  );
};

export default Cart;
