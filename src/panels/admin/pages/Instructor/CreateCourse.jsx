import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Use centralized styles file

const CreateCourse = () => {
  const [course, setCourse] = useState({ title: '', description: '', instructor: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you have an API function to create a course
    try {
      // API call to create course
      // await createCourseAPI(course);
      navigate('/instructor/dashboard'); // Redirect on success
    } catch (err) {
      setError('Error creating course');
    }
  };

  return (
    <div className="form-container">
      <h1>Create Course</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Course Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Instructor</label>
          <input
            type="text"
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourse;
