const Quiz = require('../models/quizModel'); // Ensure this path is correct


exports.createQuiz = async (req, res) => {
  try {
    const { title, questions, courseId } = req.body;
    const quiz = new Quiz({ title, questions, courseId });
    await quiz.save();
    res.status(201).json({ message: 'Quiz created', quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuizzesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await Quiz.find({ courseId });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ message: 'Quiz updated', quiz: updatedQuiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.status(200).json({ message: 'Quiz deleted successfully', quiz: deletedQuiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};