const { ZodError } = require('zod');
const JobPost = require('../models/JobPost');
const jobPostValidation = require('../schemas/jobPostValidation'); // Assuming Zod validation schema is in a validation folder

const createJobPost = async (req, res) => {
  try {
    const validatedData = jobPostValidation.parse(req.body);
    
    const newJobPost = await JobPost.create(validatedData);
    res.status(201).json({
      message: "Job post created successfully",
      jobPost: newJobPost,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    res.status(500).json({ error: "An error occurred while creating the job post" });
  }
};

const getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await JobPost.find();
    res.status(200).json({
      message: "Job posts fetched successfully",
      jobPosts,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching job posts" });
  }
};

const getJobPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const jobPost = await JobPost.findById(id);

    if (!jobPost) {
      return res.status(404).json({ error: "Job post not found" });
    }

    res.status(200).json({
      message: "Job post fetched successfully",
      jobPost,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching the job post" });
  }
};

module.exports = {
  createJobPost,
  getAllJobPosts,
  getJobPostById,
};
