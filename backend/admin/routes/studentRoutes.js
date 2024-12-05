const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Student routes
router.get('/courses', studentController.getEnrolledCourses);   // Get enrolled courses
router.post('/enroll', studentController.enrollInCourse);       // Enroll in a course
router.post('/submit-quiz', studentController.submitQuiz);      // Submit a quiz
router.get('/grades', studentController.getGrades);             // Get grades for enrolled courses

module.exports = router;
