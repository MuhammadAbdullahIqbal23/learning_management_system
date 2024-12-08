const Notification = require('../models/notificationModel'); // Import the Notification model

// Send a new notification
exports.sendNotification = async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    const notification = new Notification({ recipientId, message });
    await notification.save();
    res.status(201).json({ message: 'Notification sent successfully', notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get notifications for a specific user
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from request parameters
    const notifications = await Notification.find({ recipientId: userId }); // Fetch notifications for the user
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
