const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
