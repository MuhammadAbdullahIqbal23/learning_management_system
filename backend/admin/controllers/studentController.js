  const Course = require("../models/Course");
  const User = require("../models/User");
  const Enrollment = require("../models/Enrollment");
  const mongoose = require('mongoose');
  // Get enrolled courses for a student
  exports.getEnrolledCourses = async (req, res) => {
    try {
      const studentId = req.user._id; // Assuming you're using authentication middleware
      
      const enrollments = await Enrollment
        .find({ studentId, status: 'active' })
        .populate({
          path: 'courseId',
          select: 'title description instructor',
          populate: {
            path: 'instructor',
            select: 'username'
          }
        });

      const courses = enrollments.map(enrollment => enrollment.courseId);
      
      res.status(200).json({
        success: true,
        courses
      });
    } catch (err) {
      console.error("Error fetching enrolled courses:", err);
      res.status(500).json({
        success: false,
        message: "Error fetching enrolled courses"
      });
    }
  };

  // Get all students
  exports.getUsers = async (req, res) => {
    try {
      const users = await User.find({ role: "student" })
        .select("_id username email")
        .lean();

      // Log the response to help with debugging
      console.log("Users found:", users);

      // Return the users directly
      res.status(200).json({
        success: true,
        users
      });
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching students"
      });
    }
  };

  // Enroll a student in a course
  exports.enrollInCourse = async (req, res) => {
    const { studentId, courseId } = req.body;

    try {
      // Verify both student and course exist
      const [student, course] = await Promise.all([
        User.findOne({ _id: studentId, role: 'student' }),
        Course.findById(courseId)
      ]);

      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found"
        });
      }

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found"
        });
      }

      // Check if student is already enrolled
      const existingEnrollment = await Enrollment.findOne({
        studentId,
        courseId,
        status: 'active'
      });

      if (existingEnrollment) {
        return res.status(400).json({
          success: false,
          message: "Student is already enrolled in this course"
        });
      }

      // Create new enrollment
      const enrollment = new Enrollment({
        studentId,
        courseId
      });

      await enrollment.save();

      // Add student to course's students array if not already there
      if (!course.students.includes(studentId)) {
        course.students.push(studentId);
        await course.save();
      }

      res.status(200).json({
        success: true,
        message: "Student enrolled successfully",
        enrollment
      });
    } catch (error) {
      console.error("Enrollment error:", error);
      res.status(500).json({
        success: false,
        message: "Error enrolling student"
      });
    }
  };

  // Note: Add placeholder functions for other routes you're referencing
  exports.submitQuiz = async (req, res) => {
    res.status(501).json({ message: "Not implemented" });
  };

  exports.getGrades = async (req, res) => {
    res.status(501).json({ message: "Not implemented" });
  };
 

// Enroll a student in a course
exports.enrollInCourse = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Validate input
    if (!studentId || !courseId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student ID and Course ID are required' 
      });
    }

    // Check if student exists
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ 
        success: false, 
        message: 'Student not found' 
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      studentId,
      courseId
    });

    if (existingEnrollment) {
      return res.status(400).json({ 
        success: false, 
        message: 'Student is already enrolled in this course' 
      });
    }

    // Create new enrollment
    const newEnrollment = new Enrollment({
      studentId,
      courseId
    });

    await newEnrollment.save();

    res.status(201).json({ 
      success: true, 
      message: 'Student enrolled successfully',
      enrollment: newEnrollment
    });

  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during enrollment' 
    });
  }
};

// Get enrolled students for a specific course
exports.getEnrolledStudents = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid Course ID' 
      });
    }

    // Find enrollments and populate student details
    const enrolledStudents = await Enrollment.find({ courseId })
      .populate({
        path: 'studentId',
        select: 'username email' // Select only username and email
      })
      .lean(); // Convert to plain JavaScript object

    // Transform the result to match the expected format
    const formattedEnrolledStudents = enrolledStudents.map(enrollment => ({
      _id: enrollment.studentId._id,
      username: enrollment.studentId.username,
      email: enrollment.studentId.email
    }));

    res.status(200).json({ 
      success: true, 
      enrolledStudents: formattedEnrolledStudents 
    });

  } catch (error) {
    console.error('Get enrolled students error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error retrieving enrolled students' 
    });
  }
};

