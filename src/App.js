import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentDashboard from './panels/students front/components/pages/StudentDashboard';


// Auth component (placeholder)
const RequireAuth = ({ children }) => {
  // Add your authentication logic here
  const isAuthenticated = true; // Replace with actual auth check
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
        
        {/* Protected student routes */}
        <Route
          path="/student/*"
          element={
            <RequireAuth>
              <StudentDashboard />
            </RequireAuth>
          }
        >
          <Route path="dashboard" element={<div>Dashboard Home</div>} />
          {/* <Route path="courses/*" element={<Courses />} /> */}
          {/* <Route path="assignments/*" element={<Assignments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="chat" element={<Chat />} />
          <Route path="profile" element={<Profile />} /> */}
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/forgot-password" element={<div>Forgot Password Page</div>} />
        
        {/* 404 route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;