const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Course routes
router.get('/', courseController.getAllCourses);                // Get all courses
router.get('/:id', courseController.getCourseById);             // Get course by ID
router.get('/category/:category', courseController.getCoursesByCategory); // Get courses by category

module.exports = router;
