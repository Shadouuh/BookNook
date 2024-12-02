// Requerimentos
import { useState } from "react";
// Styles
import "./Styles/Login.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import loginS from '../Images/Svg/loginImage.svg'; 
const notifyError = (message) => {
  toast.error(message);
  console.log("Error" + message );
}
  const notifySuccess = (message) => {
  toast.success(message);
  console.log("Todp boem" + message );
}
const LoginForm = () => {
  // Form Config
  const [formType, setForm] = useState(false);
  const toggle = () => {
    setForm(!formType);
  };

  // Object User

  const [user, setUser] = useState({
    clave: "",
    nombre: "",
    apellido: "",
    direccion: "",
    fecha_nacimiento: "",
    alias: "",
    email: "",
    telefono: "",
    contraClave: "",
  });
  const [login, setLogin] = useState({
    email: "",
    clave: "",
  });

  const setInputToUser = (input) => {
    const { name, value } = input.target;
    setUser({ ...user, [name]: value });
    console.log(input.target.value);
  };
  const setInputToLogin = (input) => {
    const { name, value } = input.target;
    setLogin({ ...login, [name]: value });
    console.log(input.target.value);
  };
const goTo = useNavigate();
  const register = (e) => {
    e.preventDefault();
    if (user.clave === user.contraClave) {
      // Estructura del objeto según lo que espera la API
      const userData = {
        user: {
          email: user.email,
          telefono: user.telefono,
          clave: user.clave,
          nombre: user.nombre,
          apellido: user.apellido,
          direccion: user.direccion,
          fecha_nacimiento: user.fecha_nacimiento,
          alias: user.alias,
        },
      };

      axios
        .post("http://localhost:3000/usuario/register", userData)
        .then((response) => {
          notifySuccess("Usuario Registrado: " + response.data.resultado);
        })
        .catch((handleError) => {
          console.log(handleError);
          notifyError("Error: " + handleError.response.data.message);
        });
    } else {
      alert("Las claves deben ser idénticas");
    }
  };
  const logSub = (e) => {
    e.preventDefault();
    const loginDataReq = {
      user: {
        key: login.email,
        clave: login.clave,
      },
    };

    //console.log("Login Data:", loginDataReq);
    axios
      .post("http://localhost:3000/usuario/login", loginDataReq)
      .then((response) => {
        localStorage.setItem("userConfig", JSON.stringify(response));
        console.log(response.data.user[0]);

        notifySuccess(
          "Se logeo completamente como: " + response.data.user[0].alias
        );
        goTo("/");
      })
      .catch((handleError) => {
        console.log(handleError);
        notifyError("Error: " + handleError.response.data.message);
      });
  };

  return (
    <>
    
      <div>
        {!formType ? (
          <div className="form">

            <div className="changeForm">
              <img src={loginS} alt="" />
              <h2>Bienvenido a Book Nook</h2>
              <h3>¿Aún no tienes una cuenta?</h3>
              <h4>Estás a punto de descubrir un mundo de fantasía.</h4>
              <button onClick={toggle}>Crea una cuenta</button>
            </div>
            <form className="loginForm" onSubmit={logSub}>
              <h1>Login</h1>
              <hr />
              <input
                type="text"
                placeholder="Ingrese su Nombre de Usuario, Email u Telefono"
                name="email"
                required
                onChange={setInputToLogin}
                value={login.email}
              />
              <input
                type="password"
                placeholder="Ingrese su Contraseña"
                name="clave"
                required
                onChange={setInputToLogin}
                value={login.clave}
              />
              <input type="submit" className="button" value="Iniciar Sesion!" id="rounded" />

              <a href="">Olvido su Contraseña?</a>
            </form>
          </div>
        ) : (
          <div className="form">
            <div className="changeForm">
            <img src={loginS} alt="" />
              <h2>¡Bienvenido de nuevo a Book Nook!</h2>
              <h3>¿Ya tienes una cuenta?</h3>
              <h4>
                Inicia sesión y continúa tu aventura en el mundo de los libros.
              </h4>
              <button onClick={toggle}>Inicia sesión</button>

            </div>
            <form className="loginForm" onSubmit={register}>
              <h1>Registro</h1>
              <hr />
              <h4>Datos Personales</h4>
              <div className="rows">
                <input
                  type="text"
                  placeholder="Ingrese su Nombre"
                  name="nombre"
                  required
                  onChange={setInputToUser}
                  value={user.nombre}
                />
                <input
                  type="text"
                  placeholder="Ingrese su Apellido"
                  name="apellido"
                  required
                  onChange={setInputToUser}
                  value={user.apellido}
                />
              </div>
              <input
                type="text"
                placeholder="Ingrese su Dirección"
                name="direccion"
                required
                onChange={setInputToUser}
                value={user.direccion}
              />
              <input
                type="date"
                placeholder="Ingrese su fecha de Nacimiento"
                name="fecha_nacimiento"
                required
                onChange={setInputToUser}
                value={user.fecha_nacimiento}
              />
              <hr />
              <h4>Información de Sesión</h4>
              <input
                type="text"
                placeholder="Ingrese su Nombre de Usuario"
                name="alias"
                required
                onChange={setInputToUser}
                value={user.alias}
              />
              <div className="rows">
                <input
                  type="password"
                  placeholder="Ingrese su Contraseña"
                  name="clave"
                  required
                  onChange={setInputToUser}
                  value={user.clave}
                />
                <input
                  type="password"
                  placeholder="Confirme su Contraseña"
                  name="contraClave"
                  required
                  onChange={setInputToUser}
                  value={user.contraClave}
                />
              </div>
              <div className="rows">
                <input
                  type="email"
                  placeholder="Ingrese su Email"
                  name="email"
                  required
                  onChange={setInputToUser}
                  value={user.email}
                />
                <input
                  type="text"
                  placeholder="Ingrese su Teléfono"
                  name="telefono"
                  required
                  onChange={setInputToUser}
                  value={user.telefono}
                />
              </div>
              <input type="submit" className="button" value="Cree su Cuenta!" id="rounded"/>
            </form>
          </div>
        )}
      </div>
    </>
  );
};
export default LoginForm;
