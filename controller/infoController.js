const InfoModel = require('../models/Information');
const path = require('path');

exports.getAllInfo = (req, res) => {
  InfoModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
};


exports.createInfo = (req, res) => {
  const resumeUrl = req.file ? path.join('uploads', req.file.filename) : null;

  const skills = req.body.skills || [];

  const expectedSalary = parseFloat(req.body.expectedSalary);

  if (isNaN(expectedSalary)) {
    return res.status(400).json({ error: 'Invalid salary value' });
  }

  const newInfo = {
    ...req.body,
    skills, // Skills is now an array
    expectedSalary, // Ensure this is stored as a number
    resume: resumeUrl, // Resume file path
  };

  InfoModel.create(newInfo)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: 'Error saving data', details: err.message }));
};
