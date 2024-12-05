import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [studentInfo, setStudentInfo] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Fetch student information
    fetch('/api/student/info')
      .then((res) => res.json())
      .then((data) => setStudentInfo(data))
      .catch((err) => console.error(err));

    // Fetch enrolled courses
    fetch('/api/student/courses')
      .then((res) => res.json())
      .then((data) => setEnrolledCourses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Student Dashboard</h1>
      <h2>Welcome, {studentInfo.name}</h2>
      <h3>Your Enrolled Courses:</h3>
      <ul>
        {enrolledCourses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
