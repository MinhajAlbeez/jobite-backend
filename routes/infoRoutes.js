const express = require('express');
const router = express.Router();
const infoController = require('../controller/infoController');
const { validate } = require('../middlewares/validationMiddleware');
const { infoSchema } = require('../schemas/validationSchemas');


router.get('/getInfo', infoController.getAllInfo);
router.post('/createInfo', validate(infoSchema), infoController.createInfo);

module.exports = router;
