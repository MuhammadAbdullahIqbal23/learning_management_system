import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminHome from './panels/admin/components/html/home'; // Ensure the correct file path
import Login from './panels/admin/components/html/login'; // Ensure the correct file path
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
          <Route path="/admin" element={<AdminHome />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
