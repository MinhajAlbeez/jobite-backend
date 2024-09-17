const express = require('express');
const router = express.Router();
const infoController = require('../controller/infoController');
const { validate } = require('../middlewares/validationMiddleware');
const { infoSchema } = require('../schemas/validationSchemas');
const upload = require('../middlewares/uploadMiddleware');  

router.get('/getInfo', infoController.getAllInfo);
// router.post('/createInfo', validate(infoSchema), infoController.createInfo);
router.post(
    '/createInfo', 
    upload.single('resume'), // File upload (resume)
    validate(infoSchema),    // Zod validation after file upload
    infoController.createInfo // Controller to handle the creation
  );
module.exports = router;
