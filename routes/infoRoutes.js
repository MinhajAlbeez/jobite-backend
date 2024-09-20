const express = require('express');
const router = express.Router();
const infoController = require('../controller/infoController');
const { validate } = require('../middlewares/validationMiddleware');
const { infoSchema } = require('../schemas/validationSchemas');
const upload = require('../config/cloudinaryConfig'); 

router.get('/getInfo', infoController.getAllInfo);

router.post(
  '/createInfo', 
  upload.single('resume'),
  validate(infoSchema),    
  infoController.createInfo
);

module.exports = router;
