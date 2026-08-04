import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import { loginUser } from "../../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      alert(response.data.message);

      // Save JWT
      localStorage.setItem("token", response.data.token);

      // Save user info (optional but useful)
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Redirect (we'll create this page next)
      navigate("/");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your OwnBit account."
    >
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>

          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button className="btn btn-success w-100" type="submit">
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>

      </form>
    </AuthLayout>
  );
}

export default Login;