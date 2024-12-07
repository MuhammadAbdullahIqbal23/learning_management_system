const Notification = require('../models/Notification');

exports.createNotification = async (notificationData) => {
  const notification = new Notification(notificationData);
  return await notification.save();
};

exports.getNotificationsByUser = async (userId) => {
  return await Notification.find({ recipientId: userId }).sort({ createdAt: -1 });
};

exports.markNotificationAsRead = async (id) => {
  return await Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });
};
