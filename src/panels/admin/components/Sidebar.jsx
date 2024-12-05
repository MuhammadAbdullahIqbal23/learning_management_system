import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; // Use appropriate class names for styling

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="sidebar-links">
        <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
        <li><Link to="/admin/manage-users">Manage Users</Link></li>
        <li><Link to="/instructor/courses">Instructor Courses</Link></li>
        <li><Link to="/student/enrolled">Enrolled Courses</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
