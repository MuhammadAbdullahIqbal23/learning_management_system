const mongoose = require('mongoose');

// Define the schema for a course
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,  // Course title is required
  },
  description: {
    type: String,
    required: true,  // Course description is required
  },
  instructor: {
    type: String,  // Assuming instructor is a string, can be ObjectId if you want to link to a User model
    required: true,  // Instructor is required
  },
}, { timestamps: true });  // Timestamps will automatically add 'createdAt' and 'updatedAt'

// Create the Course model from the schema
const Course = mongoose.model('Course', courseSchema);

// Export the model for use in controllers
module.exports = Course;
