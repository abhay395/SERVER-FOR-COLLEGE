const mongoose = require('mongoose');

// Time Table Schema
const timeTableSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  pdfLink: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TimeTable = mongoose.model('TimeTable', timeTableSchema);

module.exports = TimeTable;
