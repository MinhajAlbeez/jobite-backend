const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  expectedSalary: {
    type: Number,
    required: true
  },
  currentEmployer: {
    type: String,
    required: false
  },
  currentPosition: {
    type: String,
    required: false
  },
  jobType: {
    type: String,
    enum: ['Full Time', 'Part Time', 'Contract'],
    required: true
  },
  skills: {
    type: [String], 
    required: true
  },
  resume: {
    type: String,
    // required: false
  }
});

const InfoModel = mongoose.model('Info', InfoSchema);

module.exports = InfoModel;
