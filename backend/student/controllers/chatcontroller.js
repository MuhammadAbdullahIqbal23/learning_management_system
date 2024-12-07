const Chat = require('../models/chatModel');

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    // Validate input
    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const chat = new Chat({ senderId, receiverId, message });
    await chat.save();

    res.status(201).json({ message: 'Message sent', chat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages for a user
exports.getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch messages where the user is either the sender or the receiver
    const messages = await Chat.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).populate('senderId', 'name email') // Populate sender details
      .populate('receiverId', 'name email'); // Populate receiver details

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
