const Student = require('../models/studentModel');

// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, courseId } = req.body;
    const student = new Student({ name, email, courseId });
    await student.save();
    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('courseId'); // Populates course info
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).populate('courseId');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get students by course ID
exports.getStudentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const students = await Student.find({ courseId }).populate('courseId');
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const student = await Student.findByIdAndUpdate(id, updatedData, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
