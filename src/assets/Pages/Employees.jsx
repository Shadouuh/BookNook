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

  const [employees, setEmployees] = useState([
    {
      id_empleado: "",
      dni: "",
      nombre: "",
      apellido: "",
      area: "",
      id_sede: "",
    },
  ]);

  const fetchEmployees = async () => {
    let employeesReady = [];

    try {
      const response = await fetch("http://localhost:3000/api/empleados");
      let employeesData = await response.json();

      if (response.ok) {
        employeesReady = employeesData.resultados;
        setEmployees(employeesReady);
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
        console.log("Se inserto el empleado");
      }

      setFormData({
        dni: "",
        nombre: "",
        apellido: "",
        area: "",
        id_sede: "",
      });
    } catch (error) {
      console.log("Error al inserar el empleado", error);
    }
  };

  const EmployessToForm = async (employee) => {
    try {
      setEditBtn(true);

      setId(employee.id_empleado);

      console.log("El empleado: ", employee);
      setFormData({
        dni: employee.dni,
        nombre: employee.nombre,
        apellido: employee.apellido,
        area: employee.area,
        id_sede: employee.id_sede,
      });
    } catch (error) {
      console.log("Error al actualizar el empleado", error);
    }
  };

  const editEmployees = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/empleados/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dates: formData }),
        }
      );

      if (response.ok) {
        console.log("Se actualizo el empleado");
      }

      setFormData({
        dni: "",
        nombre: "",
        apellido: "",
        area: "",
        id_sede: "",
      });
    } catch (error) {
      console.log("Error al actualizar el empleado", error);
    }
  };

  const deleteEmployees = async (id_empleado) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/empleados/" + id_empleado,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log(`Empleado con ID ${id_empleado} eliminado`);
      }
    } catch (error) {
      console.log("Error al borrar el empleado", error);
    }
  };

  const cancel = (e) => {
    e.preventDefault();
    setEditBtn(false);
    setFormData({
      dni: "",
      nombre: "",
      apellido: "",
      area: "",
      id_sede: "",
    });
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
  }, [formData, deleteEmployees]);

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
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Área</th>
                    <th>ID Sede</th>
                    <th>Acciones</th>
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
                        <button
                          type="submit"
                          onClick={(e) => EmployessToForm(employee)}
                        >
                          Editar
                        </button>
                      </td>
                      <td>
                        <button
                          type="submit"
                          onClick={(e) => deleteEmployees(employee.id_empleado)}
                        >
                          borrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-container">
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
        </div>
      </div>
    </>
  );
};

export default Employees;
