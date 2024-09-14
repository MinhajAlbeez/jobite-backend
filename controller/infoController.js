const InfoModel = require('../models/Information');

exports.getAllInfo = (req, res) => {
  InfoModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
};

exports.createInfo = (req, res) => {
  InfoModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
};


