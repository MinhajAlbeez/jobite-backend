const express = require('express');
const router = express.Router();
const infoController = require('../controller/infoController');
const { validate } = require('../middlewares/validationMiddleware');
const { infoSchema } = require('../schemas/validationSchemas');
const upload = require('../config/cloudinaryConfig'); 
const InfoModel = require('../models/Information');

// router.get('/getInfo', infoController.getAllInfo);

router.get('/getInfo', async (req, res) => {
  try {
    const users = await InfoModel.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post(
  '/createInfo', 
  upload.single('resume'),
  validate(infoSchema),    
  infoController.createInfo
);

module.exports = router;
