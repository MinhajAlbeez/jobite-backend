const InfoModel = require('../models/Information');
const path = require('path');
const upload = require('../config/cloudinaryConfig'); // Assuming this config file handles Cloudinary setup

// Function to get all info
exports.getAllInfo = (req, res) => {
  InfoModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ error: 'Error fetching data', details: err.message }));
};

exports.createInfo = (req, res) => {
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

  // Save new info to the database
  InfoModel.create(newInfo)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: 'Error saving data', details: err.message }));
};
