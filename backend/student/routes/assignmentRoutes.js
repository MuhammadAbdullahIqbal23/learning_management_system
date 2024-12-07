const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Routes for assignments
router.post('/', assignmentController.createAssignment); // Create a new assignment
router.get('/', assignmentController.getAllAssignments); // Get all assignments
router.get('/:id', assignmentController.getAssignmentById); // Get assignment by ID
router.put('/:id', assignmentController.updateAssignment); // Update assignment
router.delete('/:id', assignmentController.deleteAssignment); // Delete assignment

module.exports = router;
