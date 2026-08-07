import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
  return (
    <nav className="floating-nav">
      <Link to="/">Home</Link>
      
      <Link to="/marketplace">Marketplace</Link>

      <a href="#explore">Explore</a>

      <a href="#portfolio">Portfolio</a>

      <Link to="/about">About</Link>
    </nav>
  );
}

export default Navbar;