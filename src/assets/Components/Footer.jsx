import logoIcon from "../Images/Svg/logo.svg";
import "./Styles/Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <img src={logoIcon} alt="" />
        <div className="footer-about">
          <h2>Book Nook</h2>
          <p>Tu rincón acogedor para aventuras literarias.</p>{" "}
          <p>Descubre historias que inspiran, entretienen y enriquecen.</p>
        </div>

        <div className="footer-links">
          <h3>Atajos</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#catalog">Catalogo</a>
            </li>
            <li>
              <a href="#cart">Carrito</a>
            </li>
            <li>
              <a href="#profile">Mi Perfil</a>
            </li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h3>Contactanos</h3>
          <h5>Tienes una consulta que hacernos?. Hazla ahora mismo!</h5>
          <form className="newsletter-form">
            <input
              type="text"
              placeholder="Quiero trabajar con ustedes o Tengo una queja"
              aria-label="text"
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
        <hr />

        <div className="footer-bottom">
          <p>© 2024 Book Nook. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
