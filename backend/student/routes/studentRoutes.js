const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Routes for students
router.post('/', studentController.createStudent); // Create a new student
router.get('/', studentController.getAllStudents); // Get all students
router.get('/:id', studentController.getStudentById); // Get student by ID
router.put('/:id', studentController.updateStudent); // Update student
router.delete('/:id', studentController.deleteStudent); // Delete student

module.exports = router;
