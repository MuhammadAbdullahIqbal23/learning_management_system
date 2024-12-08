import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #f4f6f9;
  min-height: 100vh;
`;

const EnrollmentCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  padding: 2rem;
`;

const Title = styled.h2`
  margin-bottom: 1rem;
  color: #3b82f6;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

const Error = styled.div`
  color: #b91c1c;
  margin-bottom: 1rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #f8fafc;
`;

const TableHeader = styled.th`
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem;
  text-align: left;
  border: 1px solid #e5e7eb;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3f4f6;
  }

  &:hover {
    background-color: #e5e7eb;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
`;

const EmptyState = styled.div`
  text-align: center;
  color: #718096;
  padding: 1rem;
`;

const EnrollStudents = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const navigate = useNavigate();

  // Token and error handling methods
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const handleTokenError = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Fetch initial data on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([fetchStudents(), fetchCourses()]);
    };
    fetchInitialData();
  }, [navigate]);

  // Fetch students method
  const fetchStudents = async () => {
    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get('http://localhost:5002/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const studentsData = response.data.users.filter(user => user.role === "student");
      setStudents(studentsData);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to load users');

      if (err.response?.status === 401) {
        handleTokenError();
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses method
  const fetchCourses = async () => {
    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get('http://localhost:5002/api/courses', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const coursesData = Array.isArray(response.data)
        ? response.data
        : response.data?.courses || [];

      setCourses(coursesData);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.response?.data?.message || 'Failed to load courses');

      if (err.response?.status === 401) {
        handleTokenError();
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch enrolled students method
  const fetchEnrolledStudents = async (courseId) => {
    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }
  
    try {
      setLoading(true);
      setError("");
  
      const response = await axios.get(`http://localhost:5002/api/courses/${courseId}/enrolled-students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (response.data.success) {
        const enrolledStudentsData = response.data.enrolledStudents || [];
        
        // Enhance enrolled students data with course information
        const enhancedEnrolledStudents = enrolledStudentsData.map(student => ({
          ...student,
          courseName: selectedCourse ? 
            (courses.find(c => c._id === selectedCourse)?.title || "Unknown Course") 
            : "Unknown Course"
        }));
  
        setEnrolledStudents(enhancedEnrolledStudents);
      } else {
        setError(response.data.message || "Failed to fetch enrolled students");
      }
    } catch (err) {
      console.error('Error fetching enrolled students:', err);
      setError(err.response?.data?.message || 'Failed to load enrolled students');
  
      if (err.response?.status === 401) {
        handleTokenError();
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle course selection
  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    
    if (courseId) {
      fetchEnrolledStudents(courseId);
    } else {
      setEnrolledStudents([]);
    }
  };

  // Enrollment handler
  const handleEnrollment = async () => {
    if (!selectedStudent || !selectedCourse) {
      setError("Please select both a student and a course.");
      return;
    }

    const token = getToken();
    
    if (!token) {
      handleTokenError();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5002/api/student/enroll",
        {
          studentId: selectedStudent,
          courseId: selectedCourse,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        alert("Student enrolled successfully!");
        // Refresh enrolled students after successful enrollment
        fetchEnrolledStudents(selectedCourse);
        setSelectedStudent("");
      } else {
        setError(response.data.message || "Enrollment failed.");
      }
    } catch (err) {
      console.error('Error enrolling student:', err);
      
      if (err.response?.status === 401) {
        handleTokenError();
        return;
      }
      
      setError(err.response?.data?.message || "Failed to enroll student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <EnrollmentCard>
        <Title>Enroll Students in Courses</Title>
        
        {error && <Error>{error}</Error>}

        <Label htmlFor="student-select">Select Student</Label>
        <Select
          id="student-select"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Select Student --</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.username || student.email || "Unnamed Student"}
            </option>
          ))}
        </Select>

        <Label htmlFor="course-select">Select Course</Label>
        <Select
          id="course-select"
          value={selectedCourse}
          onChange={(e) => handleCourseSelect(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title || "Untitled Course"}
            </option>
          ))}
        </Select>

        <Button
          onClick={handleEnrollment}
          disabled={loading || !selectedStudent || !selectedCourse}
        >
          {loading ? "Processing..." : "Enroll Student"}
        </Button>

        {/* Enrolled Students Table */}
        {selectedCourse && (
          <>
            <Title>Enrolled Students</Title>
            {enrolledStudents.length > 0 ? (
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Student Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Course</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {enrolledStudents.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>
                        {student.username || "Unnamed Student"}
                      </TableCell>
                      <TableCell>{student.email || "No email"}</TableCell>
                      <TableCell>{student.courseName || "Unknown Course"}</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            ) : (
              <EmptyState>No students enrolled in this course</EmptyState>
            )}
          </>
        )}
      </EnrollmentCard>
    </PageContainer>
  );
};

export default EnrollStudents;