import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const Analytics = () => {
  return (
    <div className="analytics">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <h1>Analytics</h1>
          <div className="charts">
            <div className="chart-item">
              <h2>User Activity</h2>
              <div className="chart">[Graph Here]</div>
            </div>
            <div className="chart-item">
              <h2>Course Completion</h2>
              <div className="chart">[Graph Here]</div>
            </div>
            <div className="chart-item">
              <h2>Revenue</h2>
              <div className="chart">[Graph Here]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
