const Event = require('../models/calendarModel');

// Add Event
exports.addEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    // Validate input
    if (!title || !date) {
      return res.status(400).json({ message: 'Title and Date are required' });
    }

    const event = new Event({ title, date, description });
    await event.save();

    res.status(201).json({ message: 'Event added successfully', event });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Server error while adding event' });
  }
};

// Get Events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sorting events by date

    if (events.length === 0) {
      return res.status(404).json({ message: 'No events found' });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error('Error getting events:', error);
    res.status(500).json({ error: 'Server error while retrieving events' });
  }
};
