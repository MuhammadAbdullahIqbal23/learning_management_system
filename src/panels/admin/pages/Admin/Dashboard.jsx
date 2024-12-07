import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const containerStyles = {
    display: 'flex',
    minHeight: '100vh', // Full viewport height
  };

  const sidebarStyles = {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '20px',
    position: 'fixed', // Fixed sidebar
    height: '100%',
  };

  const sidebarLinkStyles = {
    color: '#ecf0f1',
    textDecoration: 'none',
    display: 'block',
    margin: '10px 0',
  };

  const mainContentStyles = {
    marginLeft: '250px', // Adjust margin to account for sidebar width
    width: 'calc(100% - 250px)',
    padding: '20px',
  };

  const navbarStyles = {
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    position: 'fixed', // Fixed navbar
    top: '0',
    left: '250px', // Align with sidebar
    width: 'calc(100% - 250px)',
    zIndex: '1000',
  };

  const navbarLinkStyles = {
    color: '#ecf0f1',
    textDecoration: 'none',
    margin: '0 10px',
  };

  const summaryStyles = {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '70px', // Offset to account for navbar height
  };

  const summaryItemStyles = {
    backgroundColor: '#ecf0f1',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '200px',
  };

  const summaryItemHeadingStyles = {
    margin: '0',
    fontSize: '20px',
  };

  const summaryItemParagraphStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  return (
    <div style={containerStyles}>
      <aside style={sidebarStyles}>
        <ul className="sidebar-links">
          <li><Link to="/admin/dashboard" style={sidebarLinkStyles}>Admin Dashboard</Link></li>
          <li><Link to="/admin/manage-users" style={sidebarLinkStyles}>Manage Users</Link></li>
          <li><Link to="/instructor/courses" style={sidebarLinkStyles}>Instructor Courses</Link></li>
          <li><Link to="/student/enrolled" style={sidebarLinkStyles}>Enrolled Courses</Link></li>
          <li><Link to="/reports" style={sidebarLinkStyles}>Reports</Link></li>
        </ul>
      </aside>
      <div style={mainContentStyles}>
        <nav style={navbarStyles}>
          <div className="navbar-logo">
            <Link to="/" style={{ ...navbarLinkStyles, fontWeight: 'bold' }}>Learning Management System</Link>
          </div>
          <ul className="navbar-links" style={{ display: 'flex' }}>
            <li><Link to="/dashboard" style={navbarLinkStyles}>Dashboard</Link></li>
            <li><Link to="/profile" style={navbarLinkStyles}>Profile</Link></li>
            <li><Link to="/logout" style={navbarLinkStyles}>Logout</Link></li>
          </ul>
        </nav>
        <div className="content">
          <h1>Admin Dashboard</h1>
          <div className="summary" style={summaryStyles}>
            <div className="summary-item" style={summaryItemStyles}>
              <h2 style={summaryItemHeadingStyles}>Total Users</h2>
              <p style={summaryItemParagraphStyles}>1200</p>
            </div>
            <div className="summary-item" style={summaryItemStyles}>
              <h2 style={summaryItemHeadingStyles}>Total Courses</h2>
              <p style={summaryItemParagraphStyles}>50</p>
            </div>
            <div className="summary-item" style={summaryItemStyles}>
              <h2 style={summaryItemHeadingStyles}>Total Revenue</h2>
              <p style={summaryItemParagraphStyles}>$25,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
