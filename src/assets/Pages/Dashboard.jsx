import "./Styles/Dash.css";
import icon from "../Images/Svg/cart.svg";
import StatCard from "../Components/StatCard";
import { Link } from "react-router-dom";
import Graph from "../Components/Graph";
const Dashboard = () => {
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
          <h1>Dashboard</h1>
          <div className="stats-container">
            <StatCard atributo={"Ganancias Totales:"} valor={"$169.902.134 ARS"} />
            <StatCard atributo={"Productos en Stock"} valor={"16.921"} />
            <StatCard atributo={"Empleados:"} valor={"32"} />
            <StatCard atributo={"Ranking Empresa"} valor={"#1567"} />
          </div>
          <div style={{ padding: '20px', width: '90%', margin: '0 auto' }}>
      <h2>Ventas Anuales</h2>
      <Graph/>
    </div>
          
        </div>
      </div>
    </>
  );
};
export default Dashboard;
