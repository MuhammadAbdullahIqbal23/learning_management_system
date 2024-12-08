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

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/admin/users");
      console.log("API Response for users:", response.data); // Log API response
  
      if (response.data && response.data.users) {
        const filteredStudents = response.data.users.filter(
          (user) => user.role === "student"
        );
        console.log("Filtered students:", filteredStudents); // Log filtered students
        setStudents(filteredStudents);
      } else {
        setError("Failed to fetch students. No users data found.");
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Error fetching students."); // Update error state
    }
  };
  

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/courses");
      if (response.data && response.data.courses) {
        setCourses(response.data.courses);
      } else {
        setError("Failed to fetch courses.");
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Error fetching courses.");
    }
  };

  const handleEnrollment = async () => {
    if (!selectedStudent || !selectedCourse) {
      setError("Please select both a student and a course.");
      return;
    }
    setError(""); // Clear previous errors

    try {
      const payload = {
        studentId: selectedStudent,
        courseId: selectedCourse,
      };
      const response = await axios.post(
        "http://localhost:5002/api/student/enroll",
        payload
      );
      alert(response.data.message || "Student enrolled successfully.");
    } catch (err) {
      console.error("Error enrolling student:", err);
      setError("Enrollment failed. Please try again.");
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
        >
          <option value="">-- Select Student --</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.username || student.name} {/* Ensure correct field */}
            </option>
          ))}
        </Select>

        <Label htmlFor="course-select">Select Course</Label>
        <Select
          id="course-select"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </Select>

        <Button onClick={handleEnrollment}>Enroll Student</Button>
      </EnrollmentCard>
    </PageContainer>
  );
};

export default EnrollStudents;
