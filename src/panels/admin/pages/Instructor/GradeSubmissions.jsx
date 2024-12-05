import React, { useState, useEffect } from 'react';
import './styles.css'; // Use centralized styles file

const GradeSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch grade submissions from API
    const fetchSubmissions = async () => {
      // Example API call to fetch submissions
      // const response = await fetch('/api/instructor/submissions');
      // setSubmissions(response.data);
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="submissions-container">
      <h1>Grade Submissions</h1>
      <table className="submissions-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Assignment</th>
            <th>Submitted On</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td>{submission.studentName}</td>
              <td>{submission.assignmentTitle}</td>
              <td>{new Date(submission.submittedAt).toLocaleDateString()}</td>
              <td>{submission.grade}</td>
              <td>
                <button className="btn">Grade</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeSubmissions;
