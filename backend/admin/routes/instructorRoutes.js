const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

// Instructor routes
router.post('/courses', instructorController.createCourse);       // Create a new course
router.get('/courses', instructorController.getCoursesByInstructor); // Get courses created by instructor
router.put('/course/:id', instructorController.updateCourse);     // Update course details
router.delete('/course/:id', instructorController.deleteCourse);  // Delete a course

module.exports = router;
