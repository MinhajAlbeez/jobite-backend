const InfoModel = require('../models/Information');
const path = require('path'); // Ensure path is required properly

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

  const resumeUrl = req.file ? req.file.path : null; 
  const newInfo = {
    ...req.body,
    skills, 
    expectedSalary, 
    resume: resumeUrl,
  };

  try {
    const user = await InfoModel.create(newInfo);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Error saving data', details: err.message });
  }
};

// This function should be renamed to match the router reference
exports.createInfoWithLocal = async (req, res) => { // Changed the name to match your route
  try {
    const localPath = path.join('uploads', req.file.filename); // Local file path

    const newInfo = new InfoModel({ // Ensure you're using the correct model
      ...req.body,
      resume: { localPath: localPath }, // Save local file path in DB
    });
    
    await newInfo.save();
    res.status(201).json({ message: 'Info created with local file upload', newInfo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
