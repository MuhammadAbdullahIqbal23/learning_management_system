const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationcontroller'); // Import the notificationController

// Route to send a new notification
router.post('/', notificationController.sendNotification); 

// Route to get notifications for a specific user
router.get('/:userId', notificationController.getNotifications); 

// Export the router to use in the app.js or server.js
module.exports = router;
