import "./Styles/About.css";
import santinoIcon from '../Images/Svg/Santi.svg'; 
import juanIcon from '../Images/Svg/Juan.svg'; 
import palaIcon from '../Images/Svg/pala.svg'; 
import ezeIcon from '../Images/Svg/eze.svg'; 
import { useTranslation } from "react-i18next";
const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="margin"></div>
      <div className="about-us">
        <div className="about-container">
          <h1>
            ¿Qué <span id="violetMedium">somos?</span>
          </h1>
          <p>
            Bienvenido a <strong id="violetSmall">Book Nook</strong>, una
            plataforma diseñada por apasionados de la literatura para fomentar
            una conexión más profunda entre los lectores y las historias. Nuestra misión es construir una comunidad
            vibrante en la que la creatividad y la imaginación encuentren su lugar.
            Creado con dedicación y espíritu colaborativo, Book Nook simplifica la manera en la que las personas
            descubren, comparten y se inspiran en los libros.
          </p>
        </div>
        <div className="team">
          <h2>¡Conoce a nuestros desarrolladores!</h2>
          <div className="team-cards">
            <div className="card">
              <img src={santinoIcon} alt="" />
              <h3>Santino</h3>
              <p>
                <strong>Rol:</strong> Desarrollador Front-End
              </p>
              <p>
                Especializado en React, Santino lidera la implementación de las
                interfaces de usuario, asegurando una experiencia intuitiva y
                fluida. Además, integra servicios clave como la API de Google
                Books y Mercado Pago, optimizando la funcionalidad de la
                aplicación y abordando gran parte de su lógica general.
              </p>
            </div>
            <div className="card">
            <img src={ezeIcon} alt="" />
              <h3>Eze</h3>
              <p>
                <strong>Rol:</strong> Diseñador UX/UI
              </p>
              <p>
                Eze convierte conceptos en realidades visuales. Trabaja en la
                estructuración y diseño de la página utilizando HTML y CSS,
                generando prototipos prácticos que luego se implementan en
                nuestro framework principal.
              </p>
            </div>
            <div className="card">
            <img src={juanIcon} alt="" />
              <h3>Juan</h3>
              <p>
                <strong>Rol:</strong> Desarrollador Back-End
              </p>
              <p>
                Especialista en bases de datos con MySQL y Node.js, Juan diseñó
                e implementó la API que sustenta el funcionamiento del back-end
                de Book Nook. Su trabajo garantiza un rendimiento sólido,
                seguro y escalable.
              </p>
            </div>
            <div className="card">
            <img src={palaIcon} alt="" />
              <h3>Mateo</h3>
              <p>
                <strong>Rol:</strong> Responsable de Documentación
              </p>
              <p>
                Mateo organiza y documenta cada etapa del desarrollo, desde
                diagramas conceptuales hasta especificaciones funcionales.
                Gracias a su meticuloso trabajo, el equipo mantiene claridad en
                los objetivos y fluidez en la ejecución del proyecto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
