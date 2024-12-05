import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); 
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        alert("Login failed. Please check your credentials.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        alert("Login Successful!");
        navigate("/admin"); 
      } else {
        alert(data.message || "Login Failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (!response.ok) {
        alert("Registration failed. Please try again.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      if (data.success) {
        alert("Registration Successful!");
        setIsRegistering(false); 
      } else {
        alert(data.message || "Registration Failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while connecting to the server.");
    } finally {
      setLoading(false);
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
          <h2 className="login-title">
            {isRegistering ? "Register" : "Welcome Back!"}
          </h2>
          <p className="login-subtitle">
            {isRegistering
              ? "Create an account to get started"
              : "Log in to access the admin panel"}
          </p>
          <form
            className="login-form"
            onSubmit={isRegistering ? handleRegister : handleLogin}
          >
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
            {isRegistering && (
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="Student">Student</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            )}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? isRegistering
                  ? "Registering..."
                  : "Logging in..."
                : isRegistering
                ? "Register"
                : "Login"}
            </button>
          </form>
          <p className="login-footer">
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <a href="#" onClick={() => setIsRegistering(false)}>
                  Login here
                </a>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <a href="#" onClick={() => setIsRegistering(true)}>
                  Register here
                </a>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
