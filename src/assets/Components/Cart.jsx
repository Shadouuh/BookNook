import "./Styles/Cart.css";
import BookIcon from "../Images/Svg/logo.svg";
import { useState, useEffect } from "react";

const Cart = () => {

  //Aca iria el id del usuario logeado
  const id_usuario = 1;

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
          booksReady.push(await bookResponse.json());
          console.log("cada item: ", bookResponse);
        }
        setBooks(booksReady);
        console.log(books);
      } else {
        console.error('Error al buscar en el carrito', response.status);
      }
    } catch (error) {
      console.error('Hubo un problema al obtener el carrito:', error);
    }
  };

  const addToCart = async (id) => {
    const response = await fetch('http://localhost:3000/carrito/insertar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      const result = await response.json();
      console.log('Libro agregado al carrito:', result);
    } else {
      console.error('Error al agregar el libro al carrito:', response.status);
    }
  }

  let mounted = true;
  useEffect(() => {
    if (mounted) fetchCart();
    mounted = false;
  }, []);

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Tu Carrito</h2>
        <div className="cart-item">
          <img src={BookIcon} alt="Libro 1" />
          <div className="item-details">
            <h3>Nombre del Libro</h3>
            <p className="item-price">$15.00</p>
            <div className="quantity">
              <button className="quantity-btn">-</button>
              <span>1</span>
              <button className="quantity-btn">+</button>
            </div>
          </div>
          <button className="remove-btn">Eliminar</button>
        </div>

        <div className="cart-item">
          <img src={BookIcon} alt="Libro 2" />
          <div className="item-details">
            <h3>Otro Libro</h3>
            <p className="item-price">$20.00</p>
            <div className="quantity">
              <button className="quantity-btn">-</button>
              <span>2</span>
              <button className="quantity-btn">+</button>
            </div>
          </div>
          <button className="remove-btn">Eliminar</button>
        </div>
      </div>

      <div className="cart-summary">
        <h2>Resumen</h2>
        <p>Total de la compra:</p>
        <p className="total-price">$55.00</p>
        <button className="checkout-btn">Finalizar Compra</button>
      </div>
    </div>
  );
};
export default Cart;
