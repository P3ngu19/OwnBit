import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { registerUser } from "../../services/authService";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUser({
        full_name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert(response.data.message);
      console.log(response.data);

      // Clear the form after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed.");
    }
  };
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your account and begin your real estate investment journey."
    >
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="auth-input"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="auth-input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="auth-input"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="auth-input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
          />
        </div>

          <button className="auth-btn" type="submit">
            Create Account →
          </button>
        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">
            Sign In
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}

export default Register;
