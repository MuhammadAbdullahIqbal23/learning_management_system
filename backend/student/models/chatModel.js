const mongoose = require('mongoose');

// Define the schema for chat messages
const chatSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the 'User' model for the sender
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the 'User' model for the receiver
    required: true,
  },
  message: {
    type: String,
    required: true, // The content of the message
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically sets the time when the message was sent
  },
});

// Create the Chat model from the schema
const Chat = mongoose.model('Chat', chatSchema);

// Export the model so it can be used in other files
module.exports = Chat;
