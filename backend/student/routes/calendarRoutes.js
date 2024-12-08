const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarcontroller');

// Routes for calendar events
router.post('/', calendarController.createEvent); // Create a new event
router.get('/', calendarController.getAllEvents); // Get all events
router.get('/:id', calendarController.getEventById); // Get event by ID
router.put('/:id', calendarController.updateEvent); // Update event
router.delete('/:id', calendarController.deleteEvent); // Delete event

module.exports = router;
