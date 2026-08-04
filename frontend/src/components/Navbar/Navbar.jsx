import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">

        <Link className="navbar-brand fw-bold fs-1" to="/">
          OwnBit
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/marketplace">
                Marketplace
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Portfolio</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Transactions</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Certificates</a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">Admin</a>
            </li>

          </ul>

            <div className="ms-3 d-flex gap-2">

              <Link className="btn btn-outline-light" to="/login">
                Sign In
              </Link>

              <button className="btn btn-success">
                Connect Wallet
              </button>

            </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
