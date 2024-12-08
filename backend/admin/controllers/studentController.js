const Course = require('../models/Course');
const Student = require('../models/Student');

// Fetch enrolled courses for a student
exports.getEnrolledCourses = async (req, res) => {
  const { studentId } = req.params;

  try {
    const courses = await Course.find({ students: studentId });
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
// exports.get('/api/student', async (req, res) => {
//   try {
//     // Fetch users where role is 'student'
//     const students = await User.find({ role: 'student' }).select('_id username email');
//     res.status(200).json({ student: students });
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ message: 'Failed to fetch students' });
//   }
// });
// Enroll in a course
// exports.enrollInCourse = async (req, res) => {
//   const { studentId, courseId } = req.body;

//   try {
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ success: false, message: 'Course not found' });
//     }

//     if (!course.students.includes(studentId)) {
//       course.students.push(studentId);
//       await course.save();
//     }

//     res.status(200).json({ success: true, message: 'Enrolled successfully', course });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

exports.enrollInCourse = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // Find the student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Check if already enrolled
    if (course.students.includes(studentId)) {
      return res.status(400).json({ success: false, message: "Student already enrolled" });
    }

    // Enroll student
    course.students.push(studentId);
    await course.save();

    res.status(200).json({ success: true, message: "Student enrolled successfully" });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Submit a quiz
exports.submitQuiz = async (req, res) => {
  const { courseId, studentId, quiz } = req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    course.quizzes.push({ student: studentId, quiz });
    await course.save();
    res.status(200).json({ success: true, message: 'Quiz submitted successfully', course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get grades for enrolled courses
exports.getGrades = async (req, res) => {
  const { studentId } = req.query;

  try {
    const courses = await Course.find({ students: studentId }).select('grades');
    res.status(200).json({ success: true, grades: courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
