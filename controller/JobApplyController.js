const JobApplyModel = require("../models/JobApply");
const path = require("path"); // Ensure path is required properly

exports.getApplyJobs = async (req, res) => {
  try {
    const users = await JobApplyModel.find({});
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: "Error fetching data", details: err.message });
  }
};

exports.createApplyJob = async (req, res) => {
  const skills = req.body.skills || [];
  // const expectedSalary = parseFloat(req.body.expectedSalary);

  // if (isNaN(expectedSalary)) {
  //   return res.status(400).json({ error: "Invalid salary value" });
  // }

  const resumeUrl = req.file ? req.file.path : null;
  const newInfo = {
    ...req.body,
    skills,
    // expectedSalary,
    resume: { cloudinaryUrl: resumeUrl }, // Adjusted to use cloudinaryUrl field
  };

  try {
    const user = await JobApplyModel.create(newInfo);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: "Error saving data", details: err.message });
  }
};

// Create job application with local file path
exports.createJobApplyWithLocal = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const localPath = path.join("uploads", req.file.filename); // Local file path

    const newInfo = new JobApplyModel({
      ...req.body,
      resume: { localPath: localPath }, // Save local file path in DB
    });

    await newInfo.save();
    res.status(201).json({ message: "Job application created with local file upload", newInfo });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
