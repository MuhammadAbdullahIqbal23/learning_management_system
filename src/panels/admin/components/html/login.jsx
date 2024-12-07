import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './../css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role for registration
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and registration
  const navigate = useNavigate();

  // Helper function to handle API requests
  const apiRequest = async (url, method, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error.message);
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiRequest('http://localhost:5001/api/login', 'POST', { username, password });
      alert('Login successful!');
      navigate('/admin'); // Redirect to admin panel
    } catch (error) {
      alert(error.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await apiRequest('http://localhost:5001/api/register', 'POST', { username, password, role });
      alert('Registration successful!');
      setIsRegistering(false); // Switch back to login mode
    } catch (error) {
      alert(error.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="banner-container">
      <div className="banner-title">Welcome to the Learning Management System</div>
      <div className="banner-subtitle">Your portal for online education, courses, and more</div>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">{isRegistering ? 'Register' : 'Welcome Back!'}</h2>
          <p className="login-subtitle">
            {isRegistering
              ? 'Create an account to get started'
              : 'Log in to access the admin panel'}
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
                  ? 'Registering...'
                  : 'Logging in...'
                : isRegistering
                ? 'Register'
                : 'Login'}
            </button>
          </form>
          <p className="login-footer">
            {isRegistering ? (
              <>
                Already have an account?{' '}
                <a href="#" onClick={() => setIsRegistering(false)}>
                  Login here
                </a>
              </>
            ) : (
              <>
                Don't have an account?{' '}
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
