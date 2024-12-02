import { useState, useEffect } from "react";

const FormBuy = () => {

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
          let bookData = await bookResponse.json();

          console.log("cada item: ", bookData);

          booksReady.push(bookData);
        }
        setBooks(booksReady);
      } else console.error('Error al buscar en el carrito', response.status);
    } catch (error) {
      console.error('Hubo un problema al obtener el carrito:', error);
    }
  };

  const [formData, setFormData] = useState({
    metodo_pago: "tarjeta_credito",
    num_tarjeta: "",
    total: books
      .reduce((total, book) => {
        return (
          total +
          (book.saleInfo?.listPrice?.amount || 0)
        );
      }, 0)
      .toFixed(2),
    fecha_estimada: "2022-12-8",
    id_usuario: id_usuario
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const buyCart = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/carrito/pedir", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order: formData })
      })
      if (response.ok) {
        console.log("se logro", response.message);
      }
    } catch (error) {
      console.log('Hubo un error al pedir el carrito');
    }
  }

  let mounted = true;
  useEffect(() => {
    if (mounted) fetchCart();
    mounted = false;
  }, []);

  return (
    <div>
      <br /><br />

      <h1>Registrar Transacción</h1>
      <form onSubmit={buyCart}>

        <br /><br />

        <label>
          Método de Pago:
          <br />
          <select
            name="metodo_pago"
            value={formData.metodo_pago}
            onChange={handleChange}
            required
          >
            <option value="tarjeta_credito">Tarjeta de Crédito</option>
            <option value="tarjeta_debito">Tarjeta de Débito</option>
            <option value="transaccion">Mercado Pago</option>
          </select>
        </label>
        <br /><br />

        <label>
          Número de Tarjeta:
          <br />
          <input
            type="text"
            name="num_tarjeta"
            value={formData.num_tarjeta}
            onChange={handleChange}
            maxLength="16"
            required
          />
        </label>
        <br /><br />
        <br /><br />

        <button type="submit">Registrar Transacción</button>
      </form>
    </div>
  );
}

export default FormBuy;
