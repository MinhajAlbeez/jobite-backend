const mongoose = require('mongoose');

const JobApplySchema = new mongoose.Schema({
  fullName: { type: String, required: false },
  city: { type: String, required: false },
  currentEmployer: { type: String,required: false },
  currentPosition: { type: String },
  jobType: { type: String, enum: ['Full Time', 'Part Time', 'Contract'], required: false },
  skills: { type: [String], required: true },
  resume: { 
    cloudinaryUrl: { type: String },  // Store Cloudinary URL
    localPath: { type: String }       // Store local file path
  },
  aboutUs: { type: String }
});

const JobApplyModel = mongoose.model('JobApply', JobApplySchema);
module.exports = JobApplyModel;
