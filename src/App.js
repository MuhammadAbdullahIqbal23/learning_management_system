import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import StudentDashboard from './panels/students front/components/pages/StudentDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route 
          path="/" 
          element={<Navigate to="/student/dashboard" replace />} 
        />

        {/* Student routes */}
        <Route 
          path="/student/*" 
          element={<StudentDashboard />} 
        />

        {/* 404 route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;