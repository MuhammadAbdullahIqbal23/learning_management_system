const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'instructor', 'student'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },  googleId: {
    type: String,
    unique: true,
    sparse: true  // Allows multiple null values
  },
  name: String,
  profilePicture: String
});

module.exports = mongoose.model('User', userSchema);
