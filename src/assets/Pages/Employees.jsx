import "./Styles/Dash.css";
import icon from "../Images/Svg/cart.svg";
import { Link } from "react-router-dom";
import StatCard from "../Components/StatCard";
const Employees = () => {
  return (
    <>
      <div className="margin-p"></div>
      <div className="dash-container">
        <div className="sidebar">
          <Link to="/Admin/Dashboard">
            <section>
              <div className="min-sex">
                <img src={icon} alt="" />
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
                <img src={icon} alt="" />
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
                <img src={icon} alt="" />
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
                <img src={icon} alt="" />
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
                    <th>Tipo de Empleado</th>
                    <th>Nombre</th>
                    <th>Ventas Realizadas</th>
                    <th>Ganancias Totales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Vendedor</td>
                    <td>Juan Pérez</td>
                    <td>15</td>
                    <td>$750.00</td>
                  </tr>
                  <tr>
                    <td>Supervisor</td>
                    <td>María López</td>
                    <td>20</td>
                    <td>$1,200.00</td>
                  </tr>
                  <tr>
                    <td>Asistente</td>
                    <td>Carlos García</td>
                    <td>10</td>
                    <td>$500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="stats-container">
            <StatCard atributo={"Empleados:"} valor={"12"} />
            <StatCard atributo={"Empleado del Mes:"} valor={"Antelo Santino"} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Employees;
