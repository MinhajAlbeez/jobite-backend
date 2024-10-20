const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
    required: false,
  },
  jobTitle: {
    type: String,
    required: false,
  },
  position: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  jobType: {
    type: String,
    enum: ["Full Time", "Part Time", "Contract", "internship"],
    required: true,
  },
  salaryRange: {
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
  },
  description: {
    type: String,
    required: true,
  },
  requirements: {
    type: [String],
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: false,
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  contactEmail: {
    type: String,
    required: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;
