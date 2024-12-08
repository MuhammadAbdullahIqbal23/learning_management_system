import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen as CoursesIcon, 
  Edit, 
  Trash2, 
  PlusCircle, 
  AlertTriangle 
} from 'lucide-react';

// Import styled components
import { 
  GlobalStyle,
  PageContainer,
  CourseManagementCard,
  PageHeader,
  HeaderTitle,
  AddCourseButton,
  CourseTable,
  InstructorBadge,
  ActionButton,
  Modal,
  ModalContent,
  CloseButton,
  Form,
  FormActions,
  SubmitButton,
  CancelButton
} from './CourseManagementStyles';

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