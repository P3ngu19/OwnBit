import { Link } from "react-router-dom";
import { getSession } from "../../services/authService";
import "./Navbar.css";

function Navbar() {
  const isLoggedIn = !!getSession()?.token;

  return (
    <nav className="floating-nav">
      <Link to="/">Home</Link>

      <Link to="/explore">Explore</Link>

      <Link to="/marketplace">Marketplace</Link>

      <Link to="/about">About</Link>

      {!isLoggedIn && (
        <Link to="/login">Login / Sign Up</Link>
      )}
    </nav>
  );
}

export default Navbar;