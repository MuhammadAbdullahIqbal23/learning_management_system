const express = require('express');
const router = express.Router();
const courseController = require('../controllers/coursecontroller');

// Routes for courses
router.post('/', courseController.createCourse); // Create a new course
router.get('/', courseController.getAllCourses); // Get all courses
router.get('/:id', courseController.getCourseById); // Get course by ID
router.put('/:id', courseController.updateCourse); // Update course
router.delete('/:id', courseController.deleteCourse); // Delete course

module.exports = router;
