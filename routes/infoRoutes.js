const express = require('express');
const router = express.Router();
const infoController = require('../controller/infoController');
const { validate } = require('../middlewares/validationMiddleware');
const { infoSchema } = require('../schemas/validationSchemas');
const upload = require('../config/cloudinaryConfig'); // Cloudinary upload middleware

// Route to get all information
router.get('/getInfo', infoController.getAllInfo);

// Route to create new information with file upload and validation
router.post(
  '/createInfo', 
  upload.single('resume'), // Middleware for file upload to Cloudinary
  validate(infoSchema),    // Middleware for request validation
  infoController.createInfo // Controller for creating info
);

module.exports = router;
