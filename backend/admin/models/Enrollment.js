const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Changed from "Student" to "User" since students are in User model
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'dropped'],
    default: "active"
  },
  enrollmentDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);