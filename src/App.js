import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Schedule from './pages/Schedule';
import Assignments from './pages/Assignments';
import Certifications from './pages/Certifications';
import GroupProjects from './pages/GroupProjects';
import Discussions from './pages/Discussions';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/projects" element={<GroupProjects />} />
              <Route path="/discussions" element={<Discussions />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;