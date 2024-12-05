const express = require('express');
const path = require('path');
const router = express.Router();
const courseController = require(path.resolve(__dirname, '../controllers/courseController'));

// Course Routes
router.get('/', courseController.getAllCourses); // Get all courses
router.get('/:id', courseController.getCourseById); // Get course by ID
router.get('/category/:category', courseController.getCoursesByCategory); // Get courses by category

module.exports = router;
