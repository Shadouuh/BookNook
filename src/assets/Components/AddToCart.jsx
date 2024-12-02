const AddToCart = (props) => {

  const userConfig = localStorage.getItem("userConfig");
  const userParse = JSON.parse(userConfig);
  const id_usuario = userParse?.data?.user[0]?.id_usuario;

  const add = async () => {
    try {
      const response = await fetch('http://localhost:3000/carrito/insertar', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: {
            id_libro: props.id_libro,
            id_usuario: id_usuario,
            cantidad: 1
          }
        }),
      });

      if (response.ok) {
        console.log('Se agrego al carrito');
      }
    } catch (error) {
      console.error('Al intentar agregar al carrito', error);
    }
  }

  return (
    <button className="cart-button" onClick={add}>Agregar al Carrito</button>
  );

};

export default AddToCart;