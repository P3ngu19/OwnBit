import "./AuthLayout.css";
import authBg from "../../assets/images/auth-bg.jpg";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="auth-layout">

      <div
        className="auth-left"
        style={{ backgroundImage: `url(${authBg})` }}
      >
        <div className="auth-overlay">

          <p className="auth-brand">
            OWNBIT
          </p>

          <h1>
            Invest in Premium
            <br />
            Real Estate.
          </h1>

          <p className="auth-tagline">
            Secure. Transparent. Fractional ownership powered by blockchain.
          </p>

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