import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/home.css"; // Import the CSS file for styling

const AdminHome = () => {
  const [totalStudents, setTotalStudents] = useState("Loading...");
  const [totalCourses, setTotalCourses] = useState("Loading...");
  const [activeEnrollments, setActiveEnrollments] = useState("Loading...");
  const [latestActivities, setLatestActivities] = useState([]);

  // State to manage which dropdowns are open
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

  // Fetch admin data on component mount
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/dashboard");
        const data = response.data;

        setTotalStudents(data.totalStudents);
        setTotalCourses(data.totalCourses);
        setActiveEnrollments(data.activeEnrollments);
        setLatestActivities(data.latestActivities);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAdminData();
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

        {/* Learning Materials & Media Section */}
        <div className="sidebar-item">
          <h2 onClick={() => toggleDropdown("learningMaterials")}>
            Learning Materials & Media
          </h2>
          {dropdowns.learningMaterials && (
            <ul className="dropdown-list">
              <li><Link to="/lecture-upload">Lecture Upload (Video/Audio)</Link></li>
              <li><Link to="/lecture-notes">Lecture Notes/Handouts</Link></li>
              <li><Link to="/multi-media-support">Multi-Media Support</Link></li>
              <li><Link to="/file-sharing">File Sharing</Link></li>
            </ul>
          )}
        </div>

        {/* Progress & Tracking Section */}
        <div className="sidebar-item">
          <h2 onClick={() => toggleDropdown("progressTracking")}>
            Progress & Tracking
          </h2>
          {dropdowns.progressTracking && (
            <ul className="dropdown-list">
              <li><Link to="/progress-tracking">Progress Tracking</Link></li>
              <li><Link to="/quiz-module">Quiz Module</Link></li>
              <li><Link to="/auto-grading">Auto-Grading System</Link></li>
              <li><Link to="/certificate-generation">Certificate Generation</Link></li>
              <li><Link to="/attendance-tracking">Attendance Tracking</Link></li>
              <li><Link to="/attendance-reports">Attendance Reports</Link></li>
            </ul>
          )}
        </div>

        {/* Interaction & Communication Section */}
        <div className="sidebar-item">
          <h2 onClick={() => toggleDropdown("interactionCommunication")}>
            Interaction & Communication
          </h2>
          {dropdowns.interactionCommunication && (
            <ul className="dropdown-list">
              <li><Link to="/discussion-forums">Discussion Forums</Link></li>
              <li><Link to="/notification-system">Notification System</Link></li>
              <li><Link to="/live-chat-support">Live Chat Support</Link></li>
              <li><Link to="/student-leaderboard">Student Leaderboard</Link></li>
              <li><Link to="/faq-section">FAQ Section</Link></li>
              <li><Link to="/virtual-whiteboard">Virtual Whiteboard</Link></li>
            </ul>
          )}
        </div>

        {/* Assessments & Evaluations Section */}
        <div className="sidebar-item">
          <h2 onClick={() => toggleDropdown("assessmentsEvaluations")}>
            Assessments & Evaluations
          </h2>
          {dropdowns.assessmentsEvaluations && (
            <ul className="dropdown-list">
              <li><Link to="/assignment-submission">Assignment Submission</Link></li>
              <li><Link to="/timed-quizzes">Timed Quizzes</Link></li>
              <li><Link to="/group-projects">Group Projects/Team Assignments</Link></li>
              <li><Link to="/real-time-quiz-responses">Real-Time Quiz Responses</Link></li>
            </ul>
          )}
        </div>

        {/* Advanced Features Section */}
        <div className="sidebar-item">
          <h2 onClick={() => toggleDropdown("advancedFeatures")}>
            Advanced Features
          </h2>
          {dropdowns.advancedFeatures && (
            <ul className="dropdown-list">
              <li><Link to="/ai-tutor">AI-Powered Tutor/Chatbot</Link></li>
              <li><Link to="/ai-course-recommendations">AI-Based Course Recommendations</Link></li>
              <li><Link to="/skills-certification">Skills-Based Certification</Link></li>
              <li><Link to="/learning-analytics">Learning Analytics Dashboard</Link></li>
            </ul>
          )}
        </div>

        {/* Administrative Features Section */}
        <div className="sidebar-item">
          <h2 onClick={() => toggleDropdown("administrativeFeatures")}>
            Administrative Features
          </h2>
          {dropdowns.administrativeFeatures && (
            <ul className="dropdown-list">
              <li><Link to="/analytics-reporting">Analytics and Reporting</Link></li>
              <li><Link to="/data-import-export">Data Import/Export</Link></li>
              <li><Link to="/enrollment-management">Enrolment Management</Link></li>
            </ul>
          )}
        </div>

        {/* User Experience & Personalization Section */}
        <div className="sidebar-item">
          <h2 onClick={() => toggleDropdown("userExperience")}>
            User Experience & Personalization
          </h2>
          {dropdowns.userExperience && (
            <ul className="dropdown-list">
              <li><Link to="/feedback-rating">Feedback and Rating</Link></li>
              <li><Link to="/search-courses">Search and Filter Courses</Link></li>
              <li><Link to="/instructor-rating">Instructor Rating and Feedback</Link></li>
            </ul>
          )}
        </div>
      </div>

      {/* Main Content */}
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
};

export default AdminHome;
