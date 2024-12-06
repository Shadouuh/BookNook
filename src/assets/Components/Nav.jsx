import { Link } from "react-router-dom";
import "./Styles/Nav.css";
import searchIcon from "../Images/Svg/search.svg";
import cartIcon from "../Images/Svg/cart.svg";
import userIcon from "../Images/Svg/user.svg";
import logoIcon from "../Images/Svg/logo.svg";
import { useEffect, useState } from "react";
import exitIcon from "../Images/Svg/Exit.svg";
import transIcon from "../Images/Svg/Translate.svg";
import adminIcon from "../Images/Svg/admin.svg";
import logTwIcon from "../Images/Svg/loginTwo.svg";
import { useTranslation } from "react-i18next";
const Nav = () => {
  const [menu, toggleMenu] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLogged, setIsLogged] = useState(false);
  const [userConfig, setUserConfig] = useState(null);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = i18n.language === "en" ? "es" : "en";
    i18n.changeLanguage(newLanguage);
  };
  useEffect(() => {
    const storedUserConfig = localStorage.getItem("userConfig");
    // console.log("UserConfig desde localStorage:", storedUserConfig); // Verificar qué se guarda en localStorage

    if (storedUserConfig) {
      const parsedUserConfig = JSON.parse(storedUserConfig);
      console.log("UserConfig parseado:", parsedUserConfig); // Verificar si el JSON se parsea correctamente
      setUserConfig(parsedUserConfig); // Almacenar en el estado
      setIsLogged(true);
    } else {
      setIsLogged(false);
      setUserConfig(null);
    }

    // Monitorear cambios en localStorage
    const handleStorageChange = () => {
      const updatedUserConfig = localStorage.getItem("userConfig");
      if (updatedUserConfig) {
        const parsedUserConfig = JSON.parse(updatedUserConfig);
        setUserConfig(parsedUserConfig);
        setIsLogged(true);
      } else {
        setIsLogged(false);
        setUserConfig(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem("userConfig");
    setIsLogged(false);
    setUserConfig(null);
  };

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
          <Link to="/">Inicio</Link>
          <Link to="/Catalog">Catalogo</Link>
          <Link to="/About">Nosotros</Link>
        </ul>
        <div className="nav-right">
          <div className="search-container">
            <Link to="/Catalog">
              <button>
                <img src={searchIcon} alt="" />
              </button>
            </Link>

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
              <button>
                <img src={cartIcon} alt="" />
              </button>
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
          <img
            src={exitIcon}
            alt="Cerrar"
            className="exit-icon"
            onClick={() => toggleMenu(!menu)}
          />
        </div>
        <div className="options">
          {isLogged ? (
            <>
              <h4>{userConfig?.data?.user[0]?.alias}</h4>
              <section onClick={handleLogout}>
                <div className="min-sex">
                  <img src={exitIcon} alt="" className="svg-color" />
                  <hr />
                </div>
                <div className="center">
                  <h4>Cerrar Sesion</h4>
                </div>
              </section>
            </>
          ) : (
            <Link to="/Login">
              <section>
                <div className="min-sex">
                  <img src={logTwIcon} alt="" className="svg-color" />
                  <hr />
                </div>
                <div className="center">
                  <h4>Iniciar Sesion</h4>
                </div>
              </section>
            </Link>
          )}

          {isLogged && (
            <Link to="/Admin/Dashboard">
              <section>
                <div className="min-sex">
                  <img src={adminIcon} alt="" className="svg-color" />
                  <hr />
                </div>
                <div className="center">
                  <h4>Administración</h4>
                </div>
              </section>
            </Link>
          )}

          <h4>Cambiar Idioma</h4>
          <section>
            <div className="min-sex">
              <img
                src={transIcon}
                alt=""
                className="svg-color"
                onClick={() => toggleLanguage()}
              />
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
