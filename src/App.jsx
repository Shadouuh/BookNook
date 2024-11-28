import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Pages/Home";
import About from "./assets/Pages/About";
import ErrorPage from "./assets/Pages/ErrorPage";
import "./index.css";
import Nav from "./assets/Components/Nav";
import Products from "./assets/Pages/Products";
import Footer from "./assets/Components/Footer";
import Cart from "./assets/Pages/Cart";
import Login from "./assets/Pages/Login";
import Dashboard from "./assets/Pages/Dashboard";
import Sales from "./assets/Pages/Sales";
const App = () => {
  return (
    <Router>
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
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Admin/Dashboard" element={<Dashboard />} />
          <Route path="/Admin/Sales" element={<Sales />} />
          
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </Router>
  );
};
export default App;
