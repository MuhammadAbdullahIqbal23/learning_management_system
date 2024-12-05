import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>Admin Panel</h2>
      </div>
      <div className="navbar-right">
        <Link to="/profile" className="profile-link">
          <button className="btn">Profile</button>
        </Link>
        <Link to="/login" className="logout-link">
          <button className="btn">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
