const mongoose = require('mongoose');

const InfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  city: { type: String, required: true },
  expectedSalary: { type: Number, required: true },
  currentEmployer: { type: String },
  currentPosition: { type: String },
  jobType: { type: String, enum: ['Full Time', 'Part Time', 'Contract'], required: true },
  skills: { type: [String], required: true },
  resume: { 
    cloudinaryUrl: { type: String },  // Store Cloudinary URL
    localPath: { type: String }       // Store local file path
  },
  aboutUs: { type: String }
});

const InfoModel = mongoose.model('Info', InfoSchema);
module.exports = InfoModel;
