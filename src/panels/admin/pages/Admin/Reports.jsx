import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const Reports = () => {
  return (
    <div className="reports">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <h1>Generate Reports</h1>
          <form className="report-form">
            <label htmlFor="reportType">Select Report Type:</label>
            <select id="reportType">
              <option value="user_activity">User Activity</option>
              <option value="course_completion">Course Completion</option>
              <option value="financials">Financials</option>
            </select>

            <label htmlFor="dateRange">Select Date Range:</label>
            <input type="date" id="startDate" />
            <input type="date" id="endDate" />

            <button type="submit">Generate Report</button>
          </form>
          <div className="report-preview">
            <h3>Report Preview</h3>
            <p>[Report Preview Here]</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
