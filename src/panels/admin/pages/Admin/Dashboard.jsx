import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, Users, BookOpen, GraduationCap, UserCircle, LogOut, User } from 'lucide-react';
import Chatbot from '../../components/Chatbot/Chatbot';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get authentication token
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Handle token-related errors
  const handleTokenError = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      // Remove token from local storage
      localStorage.removeItem('token');
      
      // Optional: Call backend logout endpoint if needed
      const token = getToken();
      await axios.post('http://localhost:5002/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, still redirect to login
      navigate('/login');
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      const response = await axios.get('http://localhost:5002/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setUsers(response.data.users);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');
      setLoading(false);
      
      if (err.response?.status === 401) {
        handleTokenError();
      }
    }
  };

  // Fetch Courses
  const fetchCourses = async () => {
    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      const response = await axios.get('http://localhost:5002/api/courses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      setCourses(response.data.courses);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.response?.data?.message || 'Failed to load courses');
      setLoading(false);
      
      if (err.response?.status === 401) {
        handleTokenError();
      }
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>LMS Admin</h1>
        </div>
        <nav>
          <ul className="menu">
            {[
              { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Admin Dashboard' },
              { to: '/admin/manageusers', icon: Users, label: 'Manage Users' },
              { to: '/admin/courses', icon: BookOpen, label: 'Courses Management' },
              { to: '/admin/enrolled', icon: GraduationCap, label: 'Enrolled Students' },
              { to: '/admin/manageinstructors', icon: User, label: 'Manage Instructors' },
            ].map(({ to, icon: Icon, label }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`menu-item ${location.pathname === to ? 'active' : ''}`}
                >
                  <Icon className="menu-icon" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-content">
            <Link to="/admin/dashboard" className="navbar-brand">LMS</Link>
            <div className="navbar-links">
              {[
                { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
                { to: '/profile', icon: UserCircle, label: 'Profile' },
                { 
                  to: '/logout', 
                  icon: LogOut, 
                  label: 'Logout', 
                  onClick: handleLogout 
                },
              ].map(({ to, icon: Icon, label, onClick }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={onClick}
                  className={`navbar-link ${location.pathname === to ? 'active' : ''}`}
                >
                  <Icon className="navbar-icon" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="content-wrapper">
          {location.pathname === '/admin/dashboard' ? (
            <>
              <h1 className="content-title">Admin Dashboard</h1>
              <div className="summary-cards">
                {[
                  { 
                    label: 'Total Users', 
                    value: loading ? 'Loading...' : users.length.toLocaleString(), 
                    color: 'blue' 
                  },
                  { 
                    label: 'Total Courses', 
                    value: loading ? 'Loading...' : courses.length.toLocaleString(), 
                    color: 'blue' 
                  },
                  { 
                    label: 'Total Revenue', 
                    value: '$25,000', 
                    color: 'green' 
                  },
                ].map(({ label, value, color }) => (
                  <div key={label} className="card">
                    <h2 className="card-title">{label}</h2>
                    <p className={`card-value ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <Outlet />
          )}
        </div>

        {/* Error Handling */}
        {error && (
          <div className="error-banner">
            <p>{error}</p>
          </div>
        )}

        {/* Chatbot */}
        <Chatbot />
      </main>
    </div>
  );
};

export default Dashboard;