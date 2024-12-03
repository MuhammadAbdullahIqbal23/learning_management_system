import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/home.css"; // Import the CSS file for styling

const AdminHome = () => {
  const [dashboardData, setDashboardData] = useState({
    totalStudents: "Loading...",
    totalCourses: "Loading...",
    activeEnrollments: "Loading...",
  });

  const [latestActivities, setLatestActivities] = useState([]);
  const [dropdowns, setDropdowns] = useState({
    courseManagement: false,
    learningMaterials: false,
    progressTracking: false,
    interactionCommunication: false,
    assessmentsEvaluations: false,
    advancedFeatures: false,
    administrativeFeatures: false,
    userExperience: false,
  });

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dashboard");
        const { totalStudents, totalCourses, activeEnrollments } = response.data;

        setDashboardData({
          totalStudents,
          totalCourses,
          activeEnrollments,
        });

        // For simplicity, generating mock activities
        setLatestActivities([
          "John Doe enrolled in 'React Basics'.",
          "New course 'Advanced Node.js' was created.",
          "Jane Smith completed 'JavaScript Essentials'.",
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error.message);
      }
    };

    fetchDashboardData();
  }, []);

  // Function to toggle dropdowns
  const toggleDropdown = (section) => {
    setDropdowns((prev) => ({
      ...prev,
      [section]: !prev[section], // Toggle the corresponding dropdown state
    }));
  };

  return (
    <div className="admin-home">
      {/* Sidebar */}
      <div className="sidebar">
        {/* Course Management Section */}
        <div className="sidebar-item">
          <h2 onClick={() => toggleDropdown("courseManagement")}>
            Course Management
          </h2>
          {dropdowns.courseManagement && (
            <ul className="dropdown-list">
              <li><Link to="/course-creation">Course Creation</Link></li>
              <li><Link to="/course-categorization">Course Categorization</Link></li>
              <li><Link to="/course-catalogue">Course Catalogue</Link></li>
              <li><Link to="/course-modules">Course Modules</Link></li>
              <li><Link to="/course-enrolment">Course Enrolment</Link></li>
              <li><Link to="/course-overview">Course Overview Pages</Link></li>
              <li><Link to="/content-access">Content Access Restrictions</Link></li>
              <li><Link to="/course-import-export">Course Import/Export</Link></li>
            </ul>
          )}
        </div>
        {/* Other sections remain unchanged */}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header>
          <h1>Welcome to the Admin Dashboard</h1>
        </header>

        {/* Dashboard Section */}
        <section id="dashboard">
          <h2>Dashboard Overview</h2>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Students</h3>
              <p>{dashboardData.totalStudents}</p>
            </div>
            <div className="stat-card">
              <h3>Total Courses</h3>
              <p>{dashboardData.totalCourses}</p>
            </div>
            <div className="stat-card">
              <h3>Active Enrollments</h3>
              <p>{dashboardData.activeEnrollments}</p>
            </div>
          </div>
        </section>

        {/* Latest Activities Section */}
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
};

export default AdminHome;
