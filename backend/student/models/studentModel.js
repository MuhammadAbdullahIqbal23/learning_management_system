const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course', // References the 'Course' model
    },
  },
  { timestamps: true } // Automatically manages createdAt and updatedAt fields
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
