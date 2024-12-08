const Event = require('../models/Event');

exports.createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

exports.getAllEvents = async () => {
  return await Event.find();
};

exports.getEventById = async (id) => {
  return await Event.findById(id);
};

exports.updateEvent = async (id, updateData) => {
  return await Event.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteEvent = async (id) => {
  return await Event.findByIdAndDelete(id);
};
