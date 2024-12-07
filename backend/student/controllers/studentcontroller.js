const Student = require('../models/Student');

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, courseId } = req.body;
    const student = new Student({ name, email, courseId });
    await student.save();
    res.status(201).json({ message: 'Student registered', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const students = await Student.find({ courseId });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
