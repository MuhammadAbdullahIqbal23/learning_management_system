import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/admin/courses');
      setCourses(response.data.courses);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5002/api/admin/courses/${currentCourse._id}`, currentCourse);
      } else {
        await axios.post('/api/courses', currentCourse);
      }
      setIsModalOpen(false);
      fetchCourses();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://localhost:5002/api/admin/courses/${id}`);
        fetchCourses();
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="container">
      <h1>Manage Courses</h1>
      <button onClick={() => setIsModalOpen(true)}>Add New Course</button>

      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            {course.title} - {course.description}
            <button onClick={() => {
              setCurrentCourse(course);
              setIsEditing(true);
              setIsModalOpen(true);
            }}>Edit</button>
            <button onClick={() => handleDelete(course._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={currentCourse.title}
                onChange={(e) =>
                  setCurrentCourse({ ...currentCourse, title: e.target.value })
                }
              />
            </label>
            <label>
              Description:
              <textarea
                value={currentCourse.description}
                onChange={(e) =>
                  setCurrentCourse({ ...currentCourse, description: e.target.value })
                }
              ></textarea>
            </label>
            <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
            <button onClick={() => setIsModalOpen(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
