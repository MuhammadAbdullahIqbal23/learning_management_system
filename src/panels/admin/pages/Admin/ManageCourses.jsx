import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen as CoursesIcon, 
  Edit, 
  Trash2, 
  PlusCircle, 
  AlertTriangle 
} from 'lucide-react';

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f4f6f9;
  }
`;

// Styled Components (similar to ManageUsers)
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #e9f0f9 0%, #d6e2f0 100%);
  padding: 2rem;
  box-sizing: border-box;
`;

const CourseManagementCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const PageHeader = styled.div`
  background-color: #3b82f6;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  h1 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
  }
`;

const AddCourseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #3b82f6;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
`;

const CourseTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  thead {
    background-color: #f3f4f6;
    color: #374151;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  tbody tr {
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9fafb;
    }
  }
`;

const InstructorBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  background-color: #e0f2fe; 
  color: #0c4a6e;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.color || '#3b82f6'};
  transition: color 0.3s ease;
  margin-right: 0.5rem;

  &:hover {
    color: ${props => props.hoverColor || '#2563eb'};
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 8px;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #3b82f6;
    }
  }

  textarea {
    min-height: 100px;
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

const CancelButton = styled.button`
  background-color: #f3f4f6;
  color: #374151;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    _id: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Function to get the authentication token
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Function to handle token-related errors
  const handleTokenError = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchCourses = async () => {
    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      const response = await axios.get('http://localhost:5002/api/courses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCourses(response.data.courses);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.response?.data?.message || 'Failed to load courses');
      setLoading(false);

      if (err.response?.status === 401) {
        handleTokenError();
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [navigate]);

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    const token = getToken();
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      await axios.delete(`http://localhost:5002/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCourses(courses.filter((course) => course._id !== id));
      alert('Course deleted successfully');
    } catch (err) {
      console.error('Error deleting course:', err);
      
      if (err.response?.status === 401) {
        handleTokenError();
        return;
      }
      
      alert(err.response?.data?.message || 'Error deleting course');
    }
  };

  const openModal = (course = null) => {
    if (course) {
      setCurrentCourse({
        title: course.title,
        description: course.description,
        instructor: course.instructor._id || course.instructor,
        _id: course._id
      });
      setIsEditing(true);
    } else {
      setCurrentCourse({
        title: '',
        description: '',
        instructor: '',
        _id: null
      });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
  
    if (!token) {
      handleTokenError();
      return;
    }
  
    try {
      if (isEditing) {
        // Update course
        const response = await axios.put(
          `http://localhost:5002/api/courses/${currentCourse._id}`,
          currentCourse,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setCourses(courses.map((course) => (course._id === currentCourse._id ? response.data.course : course)));
        alert('Course updated successfully');
      } else {
        // Add new course
        const response = await axios.post(
          'http://localhost:5002/api/courses',
          currentCourse,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setCourses([...courses, response.data.course]);
        alert('Course created successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving course:', err);
      
      if (err.response?.status === 401) {
        handleTokenError();
        return;
      }
      
      alert(err.response?.data?.message || 'Error saving course');
    }
  };  

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center">
        <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-blue-600 font-semibold">Loading Courses...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-red-50">
      <div className="bg-white shadow-xl rounded-lg p-8 text-center border-2 border-red-200">
        <AlertTriangle className="mx-auto text-red-500 mb-4" size={48} />
        <p className="text-red-600 font-bold text-lg">{error}</p>
      </div>
    </div>
  );

  return (
    <>
      <GlobalStyle />
      <PageContainer>
        <CourseManagementCard>
          <PageHeader>
            <HeaderTitle>
              <CoursesIcon size={32} />
              <h1>Course Management</h1>
            </HeaderTitle>
            <AddCourseButton onClick={() => openModal()}>
              <PlusCircle size={18} />
              Add New Course
            </AddCourseButton>
          </PageHeader>

          <CourseTable>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Instructor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>
                    <InstructorBadge>
                      {course.instructor?.name || 'Unassigned'}
                    </InstructorBadge>
                  </td>
                  <td>
                    <ActionButton 
                      onClick={() => openModal(course)}
                      color="#3b82f6"
                      hoverColor="#2563eb"
                    >
                      <Edit size={18} />
                    </ActionButton>
                    <ActionButton 
                      onClick={() => deleteCourse(course._id)}
                      color="#ef4444"
                      hoverColor="#dc2626"
                    >
                      <Trash2 size={18} />
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </CourseTable>
        </CourseManagementCard>

        {isModalOpen && (
          <Modal>
            <ModalContent>
              <CloseButton onClick={() => setIsModalOpen(false)}>
                ✕
              </CloseButton>
              <h2>{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
              <Form onSubmit={handleSubmit}>
                <div>
                  <label>Title</label>
                  <input
                    type="text"
                    value={currentCourse.title}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Description</label>
                  <textarea
                    value={currentCourse.description}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Instructor ID</label>
                  <input
                    type="text"
                    value={currentCourse.instructor}
                    onChange={(e) => setCurrentCourse({ ...currentCourse, instructor: e.target.value })}
                    required
                  />
                </div>
                <FormActions>
                  <CancelButton type="button" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </CancelButton>
                  <SubmitButton type="submit">
                    {isEditing ? 'Update' : 'Add'}
                  </SubmitButton>
                </FormActions>
              </Form>
            </ModalContent>
          </Modal>
        )}
      </PageContainer>
    </>
  );
};

export default ManageCourses;