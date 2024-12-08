const mongoose = require('mongoose');

// Define the notification schema
const notificationSchema = new mongoose.Schema({
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',  // Referencing a Student model (make sure 'Student' model exists in your project)
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false, // Default value is false for unread notifications
  },
}, { timestamps: true });  // Timestamps will automatically add 'createdAt' and 'updatedAt'

// Create the Notification model from the schema
const Notification = mongoose.model('Notification', notificationSchema);

// Export the Notification model for use in controllers
module.exports = Notification;
