const TimeTable = require('../models/TimeTable.js'); // Assuming the schema is in models folder

// Get all timetable entries
const getAllTimeTables = async (req, res) => {
  try {
    const timeTables = await TimeTable.find();
    res.status(200).json(timeTables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetables', error });
  }
};

// Get timetable by ID
const getTimeTableById = async (req, res) => {
  try {
    const timeTable = await TimeTable.findById(req.params.id);
    if (!timeTable) {
      return res.status(404).json({ message: 'Time table not found' });
    }
    res.status(200).json(timeTable);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching timetable', error });
  }
};

// Create a new timetable
const createTimeTable = async (req, res) => {
  const { courseName, pdfLink } = req.body;
  
  if (!courseName || !pdfLink) {
    return res.status(400).json({ message: 'Course name and PDF link are required' });
  }

  try {
    const newTimeTable = new TimeTable({
      courseName,
      pdfLink,
    });
    await newTimeTable.save();
    res.status(201).json(newTimeTable);
  } catch (error) {
    res.status(500).json({ message: 'Error creating timetable', error });
  }
};

// Update a timetable entry
const updateTimeTable = async (req, res) => {
  try {
    const timeTable = await TimeTable.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!timeTable) {
      return res.status(404).json({ message: 'Time table not found' });
    }

    res.status(200).json(timeTable);
  } catch (error) {
    res.status(500).json({ message: 'Error updating timetable', error });
  }
};

// Delete a timetable entry
const deleteTimeTable = async (req, res) => {
  try {
    const timeTable = await TimeTable.findByIdAndDelete(req.params.id);
    
    if (!timeTable) {
      return res.status(404).json({ message: 'Time table not found' });
    }

    res.status(200).json({ message: 'Time table deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting timetable', error });
  }
};

module.exports = {
  getAllTimeTables,
  getTimeTableById,
  createTimeTable,
  updateTimeTable,
  deleteTimeTable,
};
