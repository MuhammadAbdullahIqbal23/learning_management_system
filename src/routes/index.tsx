import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Courses from '../pages/Courses';
import Lectures from '../pages/Lectures';
import Assignments from '../pages/Assignments';
import Calendar from '../pages/Calendar';
import AITutor from '../pages/AITutor';
import Certifications from '../pages/Certifications';
import Settings from '../pages/Settings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/lectures" element={<Lectures />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/ai-tutor" element={<AITutor />} />
      <Route path="/certifications" element={<Certifications />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;