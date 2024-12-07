const Chat = require('../models/Chat');

exports.sendMessage = async (chatData) => {
  const message = new Chat(chatData);
  return await message.save();
};

exports.getMessagesByUser = async (userId) => {
  return await Chat.find({
    $or: [{ senderId: userId }, { receiverId: userId }],
  }).sort({ createdAt: -1 });
};
