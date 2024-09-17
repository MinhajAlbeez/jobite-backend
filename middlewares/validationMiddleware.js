const { z } = require('zod');

//  * @param {z.ZodSchema} schema - The Zod schema to validate the request body.
//  * @returns {Function} 
const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); 
    next(); 
  } catch (e) {
    // Handle validation errors
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        errors: e.errors.map((error) => ({
          path: error.path,
          message: error.message,
        })),
      });
    } else {
      // General error handling
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = { validate };
