import React, { useState, useEffect } from 'react';
import { AlertCircle, PlusCircle, Edit, Trash2 } from 'lucide-react';
import './Course.css';

// Simulated API for courses (replace with actual backend API)
const courseAPI = {
  async fetchCourses() {
    // Simulate API delay and response
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { _id: '1', title: 'Introduction to React', description: 'Learn React basics', instructor: 'Jane Doe' },
      { _id: '2', title: 'Advanced JavaScript', description: 'Deep dive into JS', instructor: 'John Smith' }
    ];
  },

  async createCourse(courseData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...courseData, _id: Math.random().toString() };
  },

  async updateCourse(id, courseData) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...courseData, _id: id };
  },

  async deleteCourse(id) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  }
};

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseAPI.fetchCourses();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await courseAPI.updateCourse(editingId, formData);
      } else {
        await courseAPI.createCourse(formData);
      }
      
      await fetchCourses();
      setFormData({ title: '', description: '', instructor: '' });
      setEditingId(null);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to save course');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      await courseAPI.deleteCourse(id);
      await fetchCourses();
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to delete course');
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor
    });
    setEditingId(course._id);
  };

  const handleCancelEdit = () => {
    setFormData({ title: '', description: '', instructor: '' });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Course Management</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b border-gray-200 p-4">
          <h2 className="text-xl font-semibold">
            {editingId ? 'Edit Course' : 'Add New Course'}
          </h2>
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Instructor</label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                {editingId ? 'Update Course' : 'Add Course'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading courses...</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-600">No courses available.</p>
        ) : (
          courses.map(course => (
            <div key={course._id} className="bg-white rounded-lg shadow-md">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-2">{course.description}</p>
                    <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(course)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CourseManagement;