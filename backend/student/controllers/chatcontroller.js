const Chat = require('../models/chatModel');


exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;
    const chat = new Chat({ senderId, receiverId, message });
    await chat.save();
    res.status(201).json({ message: 'Message sent', chat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Chat.find({ $or: [{ senderId: userId }, { receiverId: userId }] });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
