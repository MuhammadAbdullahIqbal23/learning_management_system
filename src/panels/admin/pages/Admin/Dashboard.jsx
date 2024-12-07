import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, GraduationCap, BarChart, UserCircle, LogOut } from 'lucide-react';
import '../Admin/Dashboard.css';

const Dashboard = () => {
  const location = useLocation();

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
              { to: '/student/enrolled', icon: GraduationCap, label: 'Enrolled Students' },
              { to: '/reports', icon: BarChart, label: 'Reports' },
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
                { to: '/logout', icon: LogOut, label: 'Logout' },
              ].map(({ to, icon: Icon, label }) => (
                <Link 
                  key={label} 
                  to={to} 
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
                  { label: 'Total Users', value: '1,200', color: 'blue' },
                  { label: 'Total Courses', value: '50', color: 'blue' },
                  { label: 'Total Revenue', value: '$25,000', color: 'green' },
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
      </main>
    </div>
  );
};

export default Dashboard;