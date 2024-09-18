const InfoModel = require('../models/Information');

exports.getAllInfo = (req, res) => {
  InfoModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
};

exports.createInfo = (req, res) => {
  const resumeUrl = req.file ? req.file.path : null; 

  const newInfo = {
    ...req.body,
    resume: resumeUrl 
  };

  InfoModel.create(newInfo)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ error: 'Error saving data', details: err.message }));
};



