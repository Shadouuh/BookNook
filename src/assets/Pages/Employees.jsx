import React, { useState, useEffect } from "react";
import "./Styles/Dash.css";
import dashIcon from "../Images/Svg/dash.svg";
import salesIcon from "../Images/Svg/sales.svg";
import employIcon from "../Images/Svg/employ.svg";
import orderIcon from "../Images/Svg/order.svg";
import { Link } from "react-router-dom";

const Employees = () => {
  const [editBtn, setEditBtn] = useState(false);
  const [id, setId] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [showInsertForm, setShowInsertForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/empleados");
      const employeesData = await response.json();

      if (response.ok) {
        setEmployees(employeesData.resultados);
      }
    } catch (error) {
      console.log("Error al buscar los empleados", error);
    }
  };

  const insertEmployees = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dates: formData }),
      });

      if (response.ok) {
        console.log("Empleado insertado");
        fetchEmployees(); // Refrescar lista
      }

      setFormData({
        dni: "",
        nombre: "",
        apellido: "",
        area: "",
        id_sede: "",
      });
    } catch (error) {
      console.log("Error al insertar el empleado", error);
    }
  };

  const EmployessToForm = async (employee) => {
    try {
      setEditBtn(true); // Activa el modo edición
      setId(employee.id_empleado); // Guarda el ID del empleado seleccionado
      setFormData({
        dni: employee.dni,
        nombre: employee.nombre,
        apellido: employee.apellido,
        area: employee.area,
        id_sede: employee.id_sede,
      }); // Llena el formulario con los datos del empleado
      setShowInsertForm(true); // Muestra el formulario de edición
    } catch (error) {
      console.log("Error al cargar el empleado para editar", error);
    }
  };
  

  const editEmployees = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/empleados/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dates: formData }),
        }
      );

      if (response.ok) {
        console.log("Empleado actualizado");
        fetchEmployees(); // Refrescar lista
      }

      setFormData({
        dni: "",
        nombre: "",
        apellido: "",
        area: "",
        id_sede: "",
      });
      setShowEditForm(false);
    } catch (error) {
      console.log("Error al actualizar el empleado", error);
    }
  };

  const deleteEmployees = async (id_empleado) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/empleados/${id_empleado}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log(`Empleado con ID ${id_empleado} eliminado`);
        fetchEmployees(); // Refrescar lista
      }
    } catch (error) {
      console.log("Error al borrar el empleado", error);
    }
  };

  const cancel = () => {
    setEditBtn(false);
    setFormData({
      dni: "",
      nombre: "",
      apellido: "",
      area: "",
      id_sede: "",
    });
    setShowEditForm(false);
    setShowInsertForm(false);
  };

  const [formData, setFormData] = useState({
    dni: "",
    nombre: "",
    apellido: "",
    area: "",
    id_sede: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <div className="margin-p"></div>
      <div className="dash-container">
        <div className="sidebar">
          <Link to="/Admin/Dashboard">
            <section>
              <div className="min-sex">
                <img src={dashIcon} alt="" className="svg-color" />
                <hr />
              </div>
              <div className="center">
                <h4>Dashboard</h4>
              </div>
            </section>
          </Link>
          <Link to="/Admin/Sales">
            <section>
              <div className="min-sex">
                <img src={salesIcon} alt="" className="svg-color" />
                <hr />
              </div>
              <div className="center">
                <h4>Ventas</h4>
              </div>
            </section>
          </Link>
          <Link to="/Admin/Employees">
            <section>
              <div className="min-sex">
                <img src={employIcon} alt="" className="svg-color" />
                <hr />
              </div>
              <div className="center">
                <h4>Empleados</h4>
              </div>
            </section>
          </Link>
          <Link to="/Admin/Orders">
            <section>
              <div className="min-sex">
                <img src={orderIcon} alt="" className="svg-color" />
                <hr />
              </div>
              <div className="center">
                <h4>Orders</h4>
              </div>
            </section>
          </Link>
        </div>
        <div className="dash-main">
          <div className="table-container">
            <h1>Employees</h1>
            
            <div className="table">
            <button onClick={() => setShowInsertForm(!showInsertForm)} className="addBTN">
              <img src={employIcon} alt="" />
            </button>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Área</th>
                    <th>ID Sede</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee) => (
                    <tr key={employee.id_empleado}>
                      <td>{employee.id_empleado}</td>
                      <td>{employee.dni}</td>
                      <td>{employee.nombre}</td>
                      <td>{employee.apellido}</td>
                      <td>{employee.area}</td>
                      <td>{employee.id_sede}</td>
                      <td>
                        <button className="buy-button" id="mp" onClick={() => EmployessToForm(employee)}>
                          Editar
                        </button>
                      </td>
                      <td>
                        <button className="buy-button" id="mp2"
                          onClick={() => deleteEmployees(employee.id_empleado)}
                        >
                          Borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
            
            {showInsertForm && (
              <div className="loginForm" id="employ">
              <h2>Agregar Empleado</h2>
              <form>
                <label>
                  DNI:
                  <br />
                  <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Nombre:
                  <br />
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Apellido:
                  <br />
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Área:
                  <br />
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                  />
                </label>
                <br />
                <label>
                  ID Sede:
                  <br />
                  <input
                    type="number"
                    name="id_sede"
                    value={formData.id_sede}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </label>
                <br />
                {editBtn ? (
                  <div>
                    <button type="submit" onClick={(e) => editEmployees()}>
                      Editar
                    </button>
                    <button
                      type="submit"
                      onClick={(e) => {
                        cancel(e);
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <button type="submit" onClick={(e) => insertEmployees(e)}>
                    Agregar
                  </button>
                )}
              </form>
            </div>
            )}
          </div>
            </div>
            
          </div>
         
          
        </div>
      </div>
    </>
  );
};

export default Employees;


   ''