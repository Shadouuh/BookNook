import { useState, useEffect } from "react";
import "./Styles/Home.css";
import landing from "../Images/Svg/landing.svg";
import landingBook from "../Images/Common/book.jpg";
import I2 from "../Images/Svg/icon2.svg";
const allGenres = [
  "Ficción",
  "Drama",
  "Aventura",
  "Ciencia ficción",
  "Fantasía",
  "Romántico",
  "Terror",
  "Misterio",
  "Historia",
  "Biografía",
];

const Home = () => {
  const [books, setBooks] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selecciona aleatoriamente 3 géneros de la lista
  const getRandomGenres = () => {
    const shuffled = [...allGenres].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const fetchBooksByGenre = async (genre) => {
    try {
      let booksFetched = [];
      let attempts = 0;

      while (booksFetched.length < 10 && attempts < 5) {
        const startIndex = Math.floor(Math.random() * 40); // Aleatorizar el índice inicial
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=${startIndex}&maxResults=10`
        );
        const data = await response.json();

        // Agregar libros al array (sin filtrar aún)
        if (data.items) {
          booksFetched = [...booksFetched, ...data.items];
        }

        attempts++;
      }

      // Filtrar libros únicos con precios disponibles (y agregar fallback si no hay precios)
      const uniqueBooks = booksFetched.filter(
        (book, index, self) => index === self.findIndex((b) => b.id === book.id) // Remover duplicados
      );
      return uniqueBooks.slice(0, 10); // Devolver solo los primeros 10 libros
    } catch (error) {
      console.error(`Error al obtener libros del género ${genre}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Mostrar indicador de carga
      const genres = getRandomGenres();
      setSelectedGenres(genres);

      const fetchedBooks = {};
      for (let genre of genres) {
        fetchedBooks[genre] = await fetchBooksByGenre(genre);
      }
      setBooks(fetchedBooks);
      setLoading(false); // Ocultar indicador de carga
    };

    fetchBooks();
  }, []);

  return (
    <>
      <div className="start">
        <div className="left-text">
          <h1>¡Hola, <span id="violet">Amante de la Lectura!</span></h1>
          <h2>
            Imagina caminar por pasillos llenos de historias por descubrir. Cada
            libro es un portal a un mundo nuevo, un refugio donde los sueños
            cobran vida. Book Nook transforma tu espacio en un rincón lleno de
            magia, donde las páginas susurran secretos que solo tú puedes
            conocer. ¿Estás listo para encontrar el libro que cambiará tu vida?
          </h2>
          <button>
            <span>Inicia tu Aventura!</span>
          </button>
        </div>
        <img src={landing} alt="Landing" />
      </div>
      <div className="start" id="reverse">
        <div className="left-text">
          <h1>¡Leer es <span id="violet">Magico!</span></h1>
          <h2>
            Leer es un viaje único hacia mundos desconocidos, personajes
            inolvidables y emociones profundas. Cada página es una aventura y
            una oportunidad para soñar y aprender. Inicia sesión ahora y accede
            a un universo de libros esperando cambiar tu vida. 🌟 ¡Empieza tu
            aventura literaria hoy!
          </h2>
          <button>
            <span>Inicia tu Aventura!</span>
          </button>
        </div>
        <img src={landingBook} alt="Landing" />
      </div>

      {loading ? (
        <p className="loading">Cargando libros...</p>
      ) : (
        <div className="genre-sections">
          {selectedGenres.map((genre) => (
            <div key={genre} className="genre-section">
              <h2><span id="violet">{genre}</span></h2>
              <div className="books-container">
                {books[genre]?.length > 0 ? (
                  books[genre].map((book, index) => (
                    <div key={index} className="product-card">
                      {/* Imagen del libro */}
                      <img
                        src={
                          book.volumeInfo.imageLinks?.thumbnail ||
                          "default_image_url.jpg"
                        }
                        alt={book.volumeInfo.title}
                      />
                      {/* Información del libro */}
                      <div className="product-card-info">
                        <h4>{book.volumeInfo.title}</h4>
                        <p>
                          {book.volumeInfo.authors
                            ? book.volumeInfo.authors.join(", ")
                            : "Autor desconocido"}
                        </p>
                        <p className="price">
                          {book.saleInfo?.listPrice
                            ? `$${book.saleInfo.listPrice.amount} USD`
                            : "Precio no disponible"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                    <p>Parece haber baja señal, Los libros se estan escondiendo :c.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="start">
        <div className="left-text">
          <h1>¡Prueba nuestro cafe 5 Estrellas!</h1>
          <h2>
            Conoce a <span id="violetSmall">Teresita {"<3"},</span> quien está disfrutando nuestro nuevo Bubble Tea
            en la acogedora atmósfera de nuestra cafetería en Banfield. ¡Únete a
            ella y vive la experiencia! Aprovecha un 5% de descuento con
            nuestro cupón especial. Haz clic en el botón y visítanos hoy mismo.
          </h2>
          <button>
            <span>Obtener Cupon!</span>
          </button>
        </div>
        <img src={I2} alt="Landing" />
      </div>
    </>
  );
};

export default Home;
