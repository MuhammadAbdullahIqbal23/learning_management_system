const Event = require('../models/calendarModel');

// Add Event
exports.createEvent = async (req, res) => {
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

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by date
    res.status(200).json(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ error: 'Server error while retrieving events' });
  }
};

// Get Event by ID
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error('Error retrieving event:', error);
    res.status(500).json({ error: 'Server error while retrieving event' });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, description } = req.body;

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, date, description },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Server error while updating event' });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully', deletedEvent });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Server error while deleting event' });
  }
};
