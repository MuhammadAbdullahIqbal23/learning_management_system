import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <h1>Admin Dashboard</h1>
          <div className="summary">
            <div className="summary-item">
              <h2>Total Users</h2>
              <p>1200</p>
            </div>
            <div className="summary-item">
              <h2>Total Courses</h2>
              <p>50</p>
            </div>
            <div className="summary-item">
              <h2>Total Revenue</h2>
              <p>$25,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
