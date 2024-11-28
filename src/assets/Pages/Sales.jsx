import "./Styles/Dash.css";
import icon from "../Images/Svg/cart.svg";
import { Link } from "react-router-dom";
const Sales = () => {
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
          <h1>Sales</h1>
        </div>
      </div>
    </>
  );
};
export default Sales;
