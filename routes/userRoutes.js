const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Define a GET route
router.get('/users', userController.getAllUsers);

module.exports = router;
