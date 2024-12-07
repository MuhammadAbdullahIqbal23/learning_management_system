import React, { useEffect, useState } from 'react';

const ViewGrades = () => {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // Fetch grades
    fetch('/api/student/grades')
      .then((res) => res.json())
      .then((data) => setGrades(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Your Grades</h1>
      {grades.length ? (
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <tr key={grade.id}>
                <td>{grade.courseName}</td>
                <td>{grade.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading grades...</p>
      )}
    </div>
  );
};

export default ViewGrades;
