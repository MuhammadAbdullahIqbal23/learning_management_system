const mongoose = require('mongoose');

// Define the schema for a User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, { timestamps: true });  // Timestamps will automatically add 'createdAt' and 'updatedAt'

// Create the User model from the schema
const User = mongoose.model('UserModel', userSchema);

module.exports = User;
