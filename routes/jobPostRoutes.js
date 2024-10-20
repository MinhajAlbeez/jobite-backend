const express = require('express');
const { createJobPost, getAllJobPosts, getJobPostById } = require('../controller/jobPostController');

const router = express.Router();

router.post('/create', createJobPost);

router.get('/get', getAllJobPosts);

router.get('/:id', getJobPostById);

module.exports = router;
