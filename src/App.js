import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './panels/admin/pages/Admin/Dashboard';
import Login from './panels/admin/pages/Auth/Login';
import Register from './panels/admin/pages/Auth/Register';
import ManageUsers from './panels/admin/pages/Admin/ManageUsers';
import ManageCourses from './panels/admin/pages/Admin/ManageCourses'; // Import the ManageCourses component
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Dashboard />}>
            <Route index element={<Navigate to="/admin/dashboard" />} />
            <Route path="dashboard" element={<Dashboard/>} />

            {/* Admin Routes */}
            <Route path="manageusers" element={<ManageUsers />} />
            <Route path="courses" element={<ManageCourses />} /> {/* Fixed route */}
          </Route>
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
