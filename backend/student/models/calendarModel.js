const mongoose = require('mongoose');

// Schema for events
const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

// Create the model for Event
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
