import "./Styles/Dash.css";
import icon from "../Images/Svg/cart.svg";
import StatCard from "../Components/StatCard";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <>
      <div className="margin"></div>
      <div className="dash-container">
        <div className="sidebar">
        <Link to="/Admin/Dashboard">
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
          
        </div>
        <div className="dash-main">
          <h1>Dashboard</h1>
          <div className="stats-container">
            <StatCard atributo={"Compras del Mes"} valor={"169"} />
            <StatCard atributo={"Compras del Mes"} valor={"169"} />
            <StatCard atributo={"Compras del Mes"} valor={"169"} />
            <StatCard atributo={"Compras del Mes"} valor={"169"} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
