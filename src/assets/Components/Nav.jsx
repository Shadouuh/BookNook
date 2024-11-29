/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import "./Styles/Nav.css";
import searchIcon from "../Images/Svg/search.svg";
import cartIcon from "../Images/Svg/cart.svg";
import userIcon from "../Images/Svg/user.svg";
import logoIcon from "../Images/Svg/logo.svg";
import { useEffect, useState } from "react";
import exitIcon from "../Images/Svg/Exit.svg";
const Nav = () => {
  const [menu, toggleMenu] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <>
      <nav className={showNav ? "nav-visible" : "nav-hidden"}>
        <div className="nav-left">
          <img src={logoIcon} alt="" />
          <h1>
            Book <span id="violetSmall">Nook</span>
          </h1>
        </div>

        <ul>
          <Link to="/">Home</Link>
          <Link to="/Catalog">Catalogo</Link>
          <Link to="/About">About Us</Link>
        </ul>
        <div className="nav-right">
          <div className="search-container">
            <button>
              <img src={searchIcon} alt="" />
            </button>
            <hr />
            <input
              type="text"
              name="searchBar"
              placeholder="Buscar..."
              className="search-bar"
            />
          </div>
          <div className="menu">
            <Link to="Cart">
              <img src={cartIcon} alt="" />
            </Link>
            <button onClick={() => toggleMenu(!menu)}>
              <img src={userIcon} alt="" />
            </button>
          </div>
        </div>
      </nav>
      <div
        className={menu ? "back" : "back-disable"}
        onClick={() => toggleMenu(!menu)}
      ></div>
        <div className={menu ? "side-menu" : "side-menu-disable"}>
          <div className="close">
          <img src={exitIcon} alt="Cerrar" className="exit-icon" onClick={() => toggleMenu(!menu)}/>
          </div>
          <div className="options">
            <Link to="/Login">
            <section>
              <div className="min-sex">
                <img src={exitIcon} alt="" />
                <hr />
              </div>
              <div className="center">
                <h4>Inicia sesion!</h4>
              </div>
            </section>
            </Link>
          <Link to="/Admin/Dashboard">
            <section>
              <div className="min-sex">
                <img src={exitIcon} alt="" />
                <hr />
              </div>
              <div className="center">
                <h4>Administracion
                </h4>
              </div>
            </section>
            </Link>
            <h4>Cambiar Idioma</h4>
            <section>
              <div className="min-sex">
                <img src={exitIcon} alt="" />
                <hr />
              </div>
              <div className="center">
                <h4>Español</h4>
              </div>
            </section>
          </div>
        </div>
      
    </>
  );
};
export default Nav;
