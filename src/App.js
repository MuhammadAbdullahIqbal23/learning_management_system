import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminHome from './panels/admin/pages/Admin/Dashboard'; // Adjust this to the correct path
import Login from './panels/admin/pages/Auth/Login'; // Correct import for Login
import Register from './panels/admin/pages/Auth/Register'; // Correct import for Register

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" />} />
          {/* Define routes for different pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminHome />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
