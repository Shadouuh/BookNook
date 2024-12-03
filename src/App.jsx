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
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>

      {/*
________00000000000___________000000000000_________
______00000000_____00000___000000_____00000000_____
____0000000_____________000______________000000____
___0000000_______________0_________________000000__
__000000____________________________________00000__
__00000_____________________________________00000__
_00000________________<center>______________00000__
_00000________________</center>____________000000__
__000000_________________________________000000____
___0000000______________________________0000000____
_____000000____________________________000000______
_______000000________________________000000________
__________00000_____________________0000___________
_____________0000_________________0000_____________
_______________0000_____________000________________
_________________000_________000___________________
_________________ __000_____00_____________________
______________________00__00_______________________
________________________00_________________________

*/}

      <div className="noti">
        <Toaster />
      </div>
      <Router>
        <ScrollToTop />
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
    </>
  );
};
export default App;
