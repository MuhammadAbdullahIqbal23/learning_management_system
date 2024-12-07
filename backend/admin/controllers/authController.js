// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust the path to match your project structure

const registerUser = async (req, res) => {
  const { username, password, email, name, role } = req.body;

  // Validate all required fields
  if (!username || !password || !email || !name || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Username already exists.' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword, email, name, role });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = { registerUser };
