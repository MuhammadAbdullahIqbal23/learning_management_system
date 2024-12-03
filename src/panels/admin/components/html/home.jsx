import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/home.css'; // Import the CSS file for styling

const AdminHome = () => {
  const [totalStudents, setTotalStudents] = useState('Loading...');
  const [totalCourses, setTotalCourses] = useState('Loading...');
  const [activeEnrollments, setActiveEnrollments] = useState('Loading...');
  const [latestActivities, setLatestActivities] = useState([]);

  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/dashboard');
        const data = response.data;
        
        setTotalStudents(data.totalStudents);
        setTotalCourses(data.totalCourses);
        setActiveEnrollments(data.activeEnrollments);
        setLatestActivities(data.latestActivities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="admin-home">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Manage Students</a></li>
          <li><a href="#">Manage Courses</a></li>
          <li><a href="#">View Reports</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#" onClick={logout}>Logout</a></li>
        </ul>
      </div>

      <div className="main-content">
        <header>
          <h1>Welcome to the Admin Dashboard</h1>
        </header>

        <section id="stats">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p>{totalStudents}</p>
          </div>
          <div className="stat-card">
            <h3>Total Courses</h3>
            <p>{totalCourses}</p>
          </div>
          <div className="stat-card">
            <h3>Active Enrollments</h3>
            <p>{activeEnrollments}</p>
          </div>
        </section>

        <section id="latest-activities">
          <h2>Latest Activities</h2>
          <ul>
            {latestActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );

  // Logout function to redirect
  function logout() {
    window.location.href = "/login"; // Redirect to login page
  }
};

export default AdminHome;
