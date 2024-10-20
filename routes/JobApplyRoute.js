const express = require('express');
const { getApplyJobs, createApplyJob, createJobApplyWithLocal } = require('../controller/JobApplyController'); // Correct import
const router = express.Router();

router.get('/get', getApplyJobs);

router.post('/create', createApplyJob);

router.post('/apply-job-local', createJobApplyWithLocal);

module.exports = router;
