const Assignment = require('../models/assignmentModel');

exports.createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, courseId } = req.body;
    const assignment = new Assignment({ title, description, dueDate, courseId });
    await assignment.save();
    res.status(201).json({ message: 'Assignment created successfully', assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAssignmentById = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment updated successfully', updatedAssignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
