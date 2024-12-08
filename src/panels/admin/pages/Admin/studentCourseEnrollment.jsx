import React, { useState, useEffect } from "react";
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
  max-width: 600px;
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
`;

const Error = styled.div`
  color: #b91c1c;
  margin-bottom: 1rem;
`;

const EnrollStudents = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      await Promise.all([fetchStudents(), fetchCourses()]);
    };
    fetchInitialData();
  }, []);

const fetchStudents = async () => {
  try {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("authToken"); // Retrieve token from local storage
    const response = await axios.get("http://localhost:5002/api/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
      },
    });

    const studentsData = Array.isArray(response.data)
      ? response.data.filter(user => user.role === "student")
      : response.data?.users?.filter(user => user.role === "student") || [];

    setStudents(studentsData);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch students.");
  } finally {
    setLoading(false);
  }
};

const fetchCourses = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("authToken"); // Retrieve token
    const response = await axios.get("http://localhost:5002/api/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const coursesData = Array.isArray(response.data)
      ? response.data
      : response.data?.courses || [];

    setCourses(coursesData);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch courses.");
  } finally {
    setLoading(false);
  }
};

const handleEnrollment = async () => {
  if (!selectedStudent || !selectedCourse) {
    setError("Please select both a student and a course.");
    return;
  }

  try {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("authToken"); // Retrieve token
    const response = await axios.post(
      "http://localhost:5002/api/student/enroll",
      {
        studentId: selectedStudent,
        courseId: selectedCourse,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      alert("Student enrolled successfully!");
      setSelectedStudent("");
      setSelectedCourse("");
    } else {
      setError(response.data.message || "Enrollment failed.");
    }
  } catch (err) {
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
          {students.length > 0 ? (
            students.map((student) => (
              <option key={student._id} value={student._id}>
                {student.username || student.email || "Unnamed Student"}
              </option>
            ))
          ) : (
            <option disabled>No students available</option>
          )}
        </Select>

        <Label htmlFor="course-select">Select Course</Label>
        <Select
          id="course-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Select Course --</option>
          {courses.length > 0 ? (
            courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title || "Untitled Course"}
              </option>
            ))
          ) : (
            <option disabled>No courses available</option>
          )}
        </Select>

        <Button
          onClick={handleEnrollment}
          disabled={loading || !selectedStudent || !selectedCourse}
        >
          {loading ? "Processing..." : "Enroll Student"}
        </Button>
      </EnrollmentCard>
    </PageContainer>
  );
};

export default EnrollStudents;
