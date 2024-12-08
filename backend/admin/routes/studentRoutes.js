const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/enrolled-courses/:studentId', studentController.getEnrolledCourses);
router.post('/enroll', studentController.enrollInCourse);
router.post('/submit-quiz', studentController.submitQuiz);
router.get('/grades', studentController.getGrades);

module.exports = router;
