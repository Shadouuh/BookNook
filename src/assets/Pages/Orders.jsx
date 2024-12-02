import "./Styles/Dash.css";
import dashIcon from "../Images/Svg/dash.svg";
import salesIcon from "../Images/Svg/sales.svg";
import employIcon from "../Images/Svg/employ.svg";
import orderIcon from "../Images/Svg/order.svg";
import { Link } from "react-router-dom";
import StatCard from "../Components/StatCard";
const Orders = () => {
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
          <div className="stats-container">
            <StatCard atributo={"Pendientes"} valor={"31"} />
            <StatCard atributo={"Realizados del Mes"} valor={"124"} />
            <StatCard atributo={"Mayor N° Pedidos"} valor={"Thiago Gonzalez"} />
          </div>
          <div className="table-container">
            <h1>Orders</h1>

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Purchase Date</th>
                    <th>Estimated Delivery Date</th>
                    <th>Shipping Cost</th>
                    <th>Shipping Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Harry Potter Book</td>
                    <td>2024-11-25</td>
                    <td>2024-12-05</td>
                    <td>$10.00</td>
                    <td>123 Magic St., Wizard City</td>
                    <td>In Transit</td>
                  </tr>
                  <tr>
                    <td>Bubble Tea Mug</td>
                    <td>2024-11-22</td>
                    <td>2024-11-29</td>
                    <td>$5.00</td>
                    <td>456 Tea Rd., Tea Town</td>
                    <td>Pending</td>
                  </tr>
                  <tr>
                    <td>Fantasy Map Poster</td>
                    <td>2024-11-20</td>
                    <td>2024-11-27</td>
                    <td>$7.00</td>
                    <td>789 Fantasy Ln., Dreamland</td>
                    <td>Delivered</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
