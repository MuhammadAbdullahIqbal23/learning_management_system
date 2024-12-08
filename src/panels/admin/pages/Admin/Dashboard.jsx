import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, Users, BookOpen, GraduationCap, UserCircle, LogOut, User, X, MessageCircle } from 'lucide-react';
import ChatbotToggle from '../../components/Chatbot/ChatbotToggle';
import './Dashboard.css';
import { Menu } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Authentication and token management
  const getToken = () => localStorage.getItem('token');

  const handleTokenError = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      const token = getToken();
      await axios.post('http://localhost:5002/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  // Data fetching functions
  const fetchUsers = async () => {
    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      const response = await axios.get('http://localhost:5002/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
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

  const fetchCourses = async () => {
    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      const response = await axios.get('http://localhost:5002/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Sidebar Menu Items
  const sidebarMenuItems = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { to: '/admin/manageusers', icon: Users, label: 'Manage Users' },
    { to: '/admin/courses', icon: BookOpen, label: 'Courses Management' },
    { to: '/admin/enrolled', icon: GraduationCap, label: 'Enrolled Students' },
    { to: '/admin/manageinstructors', icon: User, label: 'Manage Instructors' },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <h1>LMS Admin</h1>
          <div 
            className="mobile-close-menu" 
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </div>
        </div>
        <nav>
          <ul className="menu">
            {sidebarMenuItems.map(({ to, icon: Icon, label }) => (
              <li key={label}>
                <Link
                  to={to}
                  className={`menu-item ${location.pathname === to ? 'active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="menu-icon" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
            {/* Mobile-specific Logout */}
            <li>
              <div 
                className="menu-item logout-mobile"
                onClick={handleLogout}
              >
                <LogOut className="menu-icon" />
                <span>Logout</span>
              </div>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="main-content">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-content">
            <div 
              className="mobile-menu-toggle" 
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </div>
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

        {/* Chatbot Toggle */}
        <ChatbotToggle />
      </main>
    </div>
  );
};

export default Dashboard;