import React, { useState, useEffect } from 'react';
import './styles.css'; // Use centralized styles file

const Dashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch instructor's courses from API
    const fetchCourses = async () => {
      // Example API call to fetch instructor's courses
      // const response = await fetch('/api/instructor/courses');
      // setCourses(response.data);
    };

    fetchCourses();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Instructor Dashboard</h1>
      <h2>My Courses</h2>
      <table className="courses-table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.title}</td>
              <td>{course.description}</td>
              <td>
                <button className="btn">View</button>
                <button className="btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
