const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentcontroller');

// Routes for students
router.post('/', studentController.registerStudent); // Register a new student
router.get('/', studentController.getAllStudents); // Get all students
router.get('/:id', studentController.getStudentById); // Get student by ID
router.get('/course/:courseId', studentController.getStudentsByCourse); // Get students by course
router.put('/:id', studentController.updateStudent); // Update a student
router.delete('/:id', studentController.deleteStudent); // Delete a student

module.exports = router;
