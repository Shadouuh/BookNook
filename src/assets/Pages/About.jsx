import "./Styles/About.css";
const About = () => {
  return (
    <>
      <div className="margin"></div>
      <div className="about-us">
        <div className="about-container">
          <h1>Que Somos?</h1>
          <p>
            Bienvenido a <strong>Book Nook</strong>, una plataforma creada por
            entusiastas de los libros, para entusiastas de los libros. Nuestra
            misión es acercar a los lectores y las historias, fomentando una
            comunidad donde la imaginación florezca. Creado con pasión y
            colaboración, Book Nook simplifica la forma en que las personas
            descubren, comparten y se enamoran de los libros.
          </p>
        </div>
        <div className="team">
          <h2>¡Conoce a nuestros desarrolladores!</h2>
          <div className="team-cards">
            <div className="card">
              <h3>Santino</h3>
              <p>
                <strong>Rol:</strong> Desarrollador Front-End React
              </p>
              <p>
                Especializado en crear interfaces de usuario intuitivas e
                interactivas, Santino asegura la mejor experiencia para nuestros
                usuarios.
              </p>
            </div>
            <div className="card">
              <h3>Eze</h3>
              <p>
                <strong>Rol:</strong> Diseñador
              </p>
              <p>
                Con un gran ojo para los detalles y la creatividad, Eze es el
                genio detrás del diseño moderno y elegante de Book Nook.
              </p>
            </div>
            <div className="card">
              <h3>Juan</h3>
              <p>
                <strong>Rol:</strong> Desarrollador Back-End
              </p>
              <p>
                Juan gestiona la lógica del lado del servidor, garantizando que
                Book Nook sea rápido, seguro y confiable.
              </p>
            </div>
            <div className="card">
              <h3>Mateo</h3>
              <p>
                <strong>Rol:</strong> Responsable de Documentación
              </p>
              <p>
                Mateo se asegura de que todos los procesos e ideas estén bien
                documentados, manteniendo al equipo alineado y eficiente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
