const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatcontroller');

// Route to send a message
router.post('/send', chatController.sendMessage);

// Route to get all messages for a specific user
router.get('/:userId', chatController.getMessages);

module.exports = router;
