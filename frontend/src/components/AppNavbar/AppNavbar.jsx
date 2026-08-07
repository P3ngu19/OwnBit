import { Link } from "react-router-dom";
import "./AppNavbar.css";

function AppNavbar() {
  return (
    <nav className="app-navbar">

      <Link to="/" className="app-logo">
        OwnBit
      </Link>

      <div className="app-nav-links">

        <Link to="/marketplace">Marketplace</Link>

        <Link to="/portfolio">Portfolio</Link>

        <Link to="/transactions">Transactions</Link>

        <Link to="/certificates">Certificates</Link>

      </div>

      <button className="login-btn">
        Login
      </button>

    </nav>
  );
}

export default AppNavbar;