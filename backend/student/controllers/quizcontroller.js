const Quiz = require('../models/Quiz');

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
