import { Link, NavLink, useNavigate } from "react-router-dom";
import { getSession, logout } from "../../services/authService";
import "./AppNavbar.css";

function AppNavbar() {
  const navigate = useNavigate();
  const user = getSession()?.user;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="app-navbar">

      <Link to="/dashboard" className="app-logo">
        OwnBit
      </Link>

      <div className="app-nav-links">

        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/marketplace">Marketplace</NavLink>
        <NavLink to="/portfolio">Portfolio</NavLink>
        <NavLink to="/wallet">Wallet</NavLink>
        <NavLink to="/transactions">Transactions</NavLink>
        <NavLink to="/certificates">Certificates</NavLink>

      </div>

      <div className="app-user-menu">
        <NavLink to="/profile" className="app-user-name">{user?.full_name || "Profile"}</NavLink>
        <button type="button" className="login-btn" onClick={handleLogout}>Logout</button>
      </div>

    </nav>
  );
}

export default AppNavbar;
