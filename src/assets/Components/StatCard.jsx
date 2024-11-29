/* eslint-disable react/prop-types */
import './Styles/Stats.css';
import icon from '../Images/Svg/cart.svg';
const StatCard = ( { atributo, valor } ) => {
    return (
        <div className="stat-card">
            <div className="left">
            <h5>{atributo}</h5>
            <h2>{valor}</h2>
            </div>
            <img src={icon} alt="" />
        </div>
    );
}
export default StatCard;