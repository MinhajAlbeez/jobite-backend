const express = require('express');
const router = express.Router();
const infoController = require('../controller/infoController');
const { validate } = require('../middlewares/validationMiddleware');
const { infoSchema } = require('../schemas/validationSchemas');
const upload = require('../config/cloudinaryConfig'); 
const uploadLocal = require('../middlewares/localStorageConfig');   
const auth = require('../middlewares/auth');
const authRole = require('../middlewares/authRole '); 

// router.get('/getInfo', auth, authRole(['superadmin']), infoController.getAllInfo);
router.get('/getInfo', infoController.getAllInfo);


router.post(
  '/createInfo', 
  upload.single('resume'),
  validate(infoSchema),    
  infoController.createInfo
);

router.post(
  '/createInfo/local',
  uploadLocal.single('resume'),  
  validate(infoSchema),
  infoController.createInfoWithLocal
);

module.exports = router;
