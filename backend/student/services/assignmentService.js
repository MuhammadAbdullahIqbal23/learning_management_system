const Assignment = require('../models/Assignment');

exports.createAssignment = async (assignmentData) => {
  const assignment = new Assignment(assignmentData);
  return await assignment.save();
};

exports.getAssignmentsByCourse = async (courseId) => {
  return await Assignment.find({ courseId });
};

exports.getAssignmentById = async (id) => {
  return await Assignment.findById(id);
};

exports.updateAssignment = async (id, updateData) => {
  return await Assignment.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteAssignment = async (id) => {
  return await Assignment.findByIdAndDelete(id);
};
