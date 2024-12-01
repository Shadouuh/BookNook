import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Pages/Home";
import About from "./assets/Pages/About";
import ErrorPage from "./assets/Pages/ErrorPage";
import "./index.css";
import Nav from "./assets/Components/Nav";
import Products from "./assets/Pages/Products";
import Footer from "./assets/Components/Footer";
import Login from "./assets/Pages/Login";
import Dashboard from "./assets/Pages/Dashboard";
import Sales from "./assets/Pages/Sales";
import Coupon from "./assets/Components/Discount";
import Employees from "./assets/Pages/Employees";
import ScrollToTop from "./assets/Components/ScrollToTop";
import CartPage from "./assets/Pages/CartPage";
import Orders from "./assets/Pages/Orders";
import FormBuy from "./assets/Pages/FormBuy";

const App = () => {
  return (
    <Router>
      <ScrollToTop/>
      <header>
        <Nav />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/Catalog" element={<Products />} />
          <Route path="/Discount/Coupon" element={<Coupon />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/FormBuy" element={<FormBuy />} />
          <Route path="/Admin/Dashboard" element={<Dashboard />} />
          <Route path="/Admin/Sales" element={<Sales />} />
          <Route path="/Admin/Employees" element={<Employees />} />
          <Route path="/Admin/Orders" element={<Orders />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
};
export default App;
