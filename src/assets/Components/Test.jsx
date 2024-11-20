import { useState, useEffect } from "react";

const Test = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/libros');
            if (!response.ok) throw new Error("Error en la respuesta del servidor");
            const books = await response.json();
            console.log(books);
            setData(books.resultados);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Cargando libros...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : data.length > 0 ? (
                data.map(book => (
                    <div key={book.id_libro}>
                        <h2>{book.titulo}</h2>
                        <p>{book.descripcion}</p>
                        <p>Precio: ${book.precio}</p>
                        <p>Stock: {book.stock}</p>
                    </div>
                ))
            ) : (
                <p>No hay libros disponibles.</p>
            )}
        </div>
    );
};

export default Test;
