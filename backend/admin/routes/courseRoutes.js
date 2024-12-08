const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const courseController = require('../controllers/courseController');
const studentController = require('../controllers/studentController');

const router = express.Router();

// Create a course (Admin/Instructor only)
router.post('/', authMiddleware, adminMiddleware, courseController.createCourse);

// Get all courses (Public route)
router.get('/', courseController.getCourses);

// Get a single course by ID
router.get('/:id', courseController.getCourseById);

// Update a course (Admin/Instructor only)
router.put('/:id', authMiddleware, adminMiddleware, courseController.updateCourse);

// Delete a course (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, courseController.deleteCourse);

// Get enrolled students for a specific course
router.get('/:id/enrolled-students', authMiddleware, adminMiddleware, studentController.getEnrolledStudents);


module.exports = router;
