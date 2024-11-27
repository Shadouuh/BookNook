import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./assets/Pages/Home";
import About from "./assets/Pages/About";
import ErrorPage from "./assets/Pages/ErrorPage";
import './index.css';
import Nav from "./assets/Components/Nav";
import Products from "./assets/Pages/Products";
import Footer from "./assets/Components/Footer";
import Test from "./assets/Components/Test";
import Cart from "./assets/Pages/Cart";
import LoginUser from "./assets/Pages/loginUser";

const App = () => {
  return (
    <Router>
      <header>
      <Nav/>
      </header>
      <main>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<ErrorPage/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Catalog" element={<Products/>}/>
        <Route path="Cart" element={<Cart/>}/>
        <Route path="Test" element={<Test/>}/>
        <Route path="/LoginUser" element={<LoginUser/>}/>
        </Routes>
      </main>
      <footer>
    <Footer/>
      </footer>
    </Router>
  );
};
export default App;