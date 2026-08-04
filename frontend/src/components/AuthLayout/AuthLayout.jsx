import "./AuthLayout.css";
import authBg from "../../assets/images/auth-bg.jpg"; 

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-container">
      <div
        className="auth-left"
        style={{ backgroundImage: `url(${authBg})` }}
      >
        <div className="overlay">
          <h1>OwnBit</h1>
          <p>Invest in Real Estate, One Token at a Time.</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>{title}</h2>
          <p>{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;