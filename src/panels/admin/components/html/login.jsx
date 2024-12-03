import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./../css/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while loading
    if (loading) return;

    setLoading(true); // Set loading to true
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Ensure response is valid
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        alert("Login failed. Please check your credentials and try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        alert("Login Successful!");
        navigate("/admin"); // Redirect to the Admin Home Page
      } else {
        alert(data.message || "Login Failed!"); // Use server-provided message if available
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while connecting to the server. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="banner-container">
      <div className="banner-title">Welcome to the Learning Management System</div>
      <div className="banner-subtitle">
        Your portal for online education, courses, and more
      </div>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Log in to access the admin panel</p>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="login-footer">
            Need help? <a href="/support">Contact Support</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
