import "./Styles/Cart.css";
import BookIcon from "../Images/Svg/logo.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import coffeeIcon from "../Images/Common/cofi.png";
const Cart = () => {

  // Aca iria el id del usuario logeado
  const id_usuario = 1;
  const userConfig = localStorage.getItem("userConfig");
  const isLogged = !!userConfig;
  const [books, setBooks] = useState([]);

  const fetchCart = async () => {
    try {
      let booksReady = [];
      const response = await fetch(`http://localhost:3000/carrito/items/ver/${id_usuario}`);

      if (response.ok) {
        const results = await response.json();
        console.log('Los items', results.resultItems);

        for (const item of results.resultItems) {
          const bookResponse = await fetch(`https://www.googleapis.com/books/v1/volumes/${item.id_libro}`);
          let bookData = await bookResponse.json();

          console.log("cada item: ", bookData);

          booksReady.push(bookData);
        }
        setBooks(booksReady);
      } else {
        console.error('Error al buscar en el carrito', response.status);
      }
    } catch (error) {
      console.error('Hubo un problema al obtener el carrito:', error);
    }
  };

  useEffect(() => {
    console.log('Libros en el estado actualizado:', books);
  }, [books]);

  let mounted = true;
  useEffect(() => {
    if (mounted && isLogged) fetchCart();
    mounted = false;
  }, [isLogged]);

  if (!isLogged) {
    return (
      <div className="error">
        <h1>Inicia sesión para guardar tus compras</h1>
        <img src={coffeeIcon} alt="" className="last"/>
    
        
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
                  ? `$${book.saleInfo.listPrice.amount}`
                  : "Precio no disponible"}
              </p>
              <div className="quantity">
                <button className="quantity-btn">-</button>
                <span>1</span>
                <button className="quantity-btn">+</button>
              </div>
            </div>
            <button className="remove-btn">Eliminar</button>
          </div>
        ))}
        {books.length === 0 && <p>No tienes libros en el carrito.</p>}
      </div>

      <div className="cart-summary">
        <h2>Resumen</h2>
        <p>Total de la compra:</p>
        <p className="total-price">
          {books
            .reduce((total, book) => {
              return total + (book.saleInfo?.listPrice?.amount || 0);
            }, 0)
            .toFixed(2)}
        </p>
        <Link to="/FormBuy" className="checkout-btn"> Comprar </Link>
      </div>
    </div>
  );
}

export default Cart;
