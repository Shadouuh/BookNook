import "./Styles/Cart.css";
import BookIcon from "../Images/Svg/logo.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import coffeeIcon from "../Images/Common/cofi.png";
const Cart = () => {

  const userConfig = localStorage.getItem("userConfig");

  const userParse = JSON.parse(userConfig);
  const id_usuario = userParse?.data?.user[0]?.id_usuario;

  const isLogged = !!userConfig;
  const [books, setBooks] = useState([]);

  const fetchCart = async () => {
    try {
      let booksReady = [];
      const response = await fetch('http://localhost:3000/carrito/items/ver/' + id_usuario);

      if (response.ok) {
        const results = await response.json();

        for (const item of results.resultItems) {
          const bookResponse = await fetch(`https://www.googleapis.com/books/v1/volumes/${item.id_libro}`);
          if (bookResponse.ok) {
            let bookData = await bookResponse.json();

            booksReady.push({
              ...bookData,
              quantity: item.cantidad
            });
          } else {
            console.error('Error al obtener los datos del libro', bookResponse.status);
          }
        }
        setBooks(booksReady);
        console.log('Libros cargados con cantidades:', booksReady);
      } else {
        console.error('Error al buscar en el carrito', response.status);
      }
    } catch (error) {
      console.error('Hubo un problema al obtener el carrito:', error);
    }
  };


  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/carrito/borrar/${id}/${id_usuario}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log('Se elimino')
      }
    } catch (error) {
      console.error('Hubo un problema al intentar eliminar el item:', error);
    }
  }

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
        method: 'PUT',
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
        console.log('La cantidad fue actualizada en la base de datos.');
      } else {
        console.error('Error al actualizar la base de datos:', response.status);
      }
    } catch (error) {
      console.error('Hubo un problema al intentar actualizar la base de datos:', error);
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
                  ? `$${book.saleInfo.listPrice.amount}`
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
            <button className="remove-btn" onClick={(e) => { deleteItem(book.id) }}>Eliminar</button>
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
