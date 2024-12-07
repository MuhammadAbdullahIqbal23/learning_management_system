const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

module.exports = { registerUser };
