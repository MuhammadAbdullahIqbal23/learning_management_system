const { body, validationResult } = require('express-validator');
const User = require('./models/UserModel');
const Assignment = require('./models/assignmentModel');
const Course = require('./models/courseModel');
const Event = require('./models/calendarModel');
const Chat = require('./models/chatModel');
const Notification = require('./models/notificationModel');
const Quiz = require('./models/quizModel');
const Student = require('./models/studentModel');

// Middleware for validating user creation and update
module.exports.userValidation = [
  body('name')
    .isString().withMessage('Name must be a string')
    .notEmpty().withMessage('Name is required'),
  body('email')
    .isEmail().withMessage('Must be a valid email address')
    .notEmpty().withMessage('Email is required')
    .custom(async (email) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already in use');
      }
    }),
  body('password')
    .isString().withMessage('Password must be a string')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Middleware for validating assignment creation and updates
module.exports.assignmentValidation = [
  body('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('description')
    .isString().withMessage('Description must be a string')
    .notEmpty().withMessage('Description is required'),
  body('dueDate')
    .isDate().withMessage('Due date must be a valid date'),
  body('courseId')
    .isMongoId().withMessage('Invalid course ID')
    .custom(async (courseId) => {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Middleware for validating course creation and updates
module.exports.courseValidation = [
  body('title')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
  body('description')
    .isString().withMessage('Description must be a string')
    .notEmpty().withMessage('Description is required'),
  body('instructor')
    .isString().withMessage('Instructor name must be a string')
    .notEmpty().withMessage('Instructor name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Middleware for validating event creation and updates
module.exports.eventValidation = [
  body('title')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title is required'),
  body('date')
    .isDate().withMessage('Date must be a valid date')
    .notEmpty().withMessage('Date is required'),
  body('description')
    .isString().withMessage('Description must be a string'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Middleware for validating chat message creation
module.exports.chatValidation = [
  body('senderId')
    .isMongoId().withMessage('Invalid sender ID'),
  body('receiverId')
    .isMongoId().withMessage('Invalid receiver ID'),
  body('message')
    .isString().withMessage('Message must be a string')
    .notEmpty().withMessage('Message is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Middleware for validating notification creation
module.exports.notificationValidation = [
  body('recipientId')
    .isMongoId().withMessage('Invalid recipient ID')
    .custom(async (recipientId) => {
      const student = await Student.findById(recipientId);
      if (!student) {
        throw new Error('Student not found');
      }
    }),
  body('message')
    .isString().withMessage('Message must be a string')
    .notEmpty().withMessage('Message is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];

// Middleware for validating quiz creation and updates
module.exports.quizValidation = [
  body('title')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title is required'),
  body('questions').isArray().withMessage('Questions must be an array'),
  body('questions.*.question')
    .isString().withMessage('Question must be a string')
    .notEmpty().withMessage('Question is required'),
  body('questions.*.options')
    .isArray().withMessage('Options must be an array')
    .isLength({ min: 2 }).withMessage('There must be at least 2 options'),
  body('questions.*.correctOption')
    .isInt({ min: 0 }).withMessage('Correct option must be an integer and greater than or equal to 0'),
  body('courseId')
    .isMongoId().withMessage('Invalid course ID')
    .custom(async (courseId) => {
      const course = await Course.findById(courseId);
      if (!course) {
        throw new Error('Course not found');
      }
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  }
];
