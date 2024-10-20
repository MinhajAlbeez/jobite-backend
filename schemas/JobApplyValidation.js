const { z } = require('zod');

const JobApplySchema = z.object({
  fullName: z.string().min(1, 'Full Name is required'),
  city: z.string().min(1, 'City is required'),
  currentEmployer: z.string().optional(),
  currentPosition: z.string().optional(),
  jobType: z.enum(['Full Time', 'Part Time', 'Contract']),
  skills: z.array(z.string()).min(1, 'At least one skill is required'),
  resume: z.string().optional(),
  aboutUs: z.string().optional() 
});

module.exports = { JobApplySchema };
