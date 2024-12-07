import React, { useEffect, useState } from 'react';

const CourseCatalogue = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Simulating fetching data from an API
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Course Catalogue</h1>
      {courses.length ? (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <h2>{course.name}</h2>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading courses...</p>
      )}
    </div>
  );
};

export default CourseCatalogue;
