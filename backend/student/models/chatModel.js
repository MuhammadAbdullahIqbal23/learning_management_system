const mongoose = require('mongoose');

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

// Define the 'Chat' model using the chatSchema
const Chat = mongoose.model('Chat', chatSchema);

// Export the model so it can be used in other files
module.exports = Chat;
