const { z } = require('zod');

const jobPostSchema = z.object({
  companyName: z.string().nonempty("Company name is required"),
  companyWebsite: z.string().url("Invalid URL").optional(),
  jobTitle: z.string().optional(),
  position: z.string().nonempty("Position is required"),
  location: z.string().nonempty("Location is required"),
  jobType: z.enum(["Full Time", "Part Time", "Contract", "internship"], "Job type must be one of the allowed values"),
  salaryRange: z.object({
    min: z.number().positive("Minimum salary must be a positive number"),
    max: z.number().positive("Maximum salary must be a positive number"),
  }).refine(data => data.min < data.max, {
    message: "Minimum salary must be less than maximum salary",
    path: ['min'],
  }),
  description: z.string().nonempty("Job description is required"),
  requirements: z.array(z.string()).min(1, "At least one requirement is required"),
  applicationDeadline: z.preprocess((value) => {
    return typeof value === 'string' ? new Date(value) : value;
  }, z.date().refine(date => date > new Date(), "Deadline must be in the future")),  contactEmail: z.string().email("Invalid email format"),
  isActive: z.boolean().optional().default(true),
});

module.exports = jobPostSchema;
