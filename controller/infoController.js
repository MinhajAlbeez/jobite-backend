const InfoModel = require('../models/Information');
const path = require('path');
const upload = require('../config/cloudinaryConfig'); // Assuming this config file handles Cloudinary setup

// Function to get all info
exports.getAllInfo = async (req, res) => {
  try {
    const users = await InfoModel.find({});
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching data', details: err.message });
  }
};

exports.createInfo = async (req, res) => {
  const skills = req.body.skills || [];
  const expectedSalary = parseFloat(req.body.expectedSalary);

  if (isNaN(expectedSalary)) {
    return res.status(400).json({ error: 'Invalid salary value' });
  }

  const resumeUrl = req.file ? req.file.path : null; // Cloudinary URL
  const newInfo = {
    ...req.body,
    skills, // Skills is an array
    expectedSalary, // Store as a number
    resume: resumeUrl, // Cloudinary URL
  };

  try {
    const user = await InfoModel.create(newInfo);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error saving data', details: err.message });
  }
};
