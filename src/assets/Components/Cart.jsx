import "./Styles/Cart.css";
import BookIcon from "../Images/Svg/logo.svg";
const Cart = () => {
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
