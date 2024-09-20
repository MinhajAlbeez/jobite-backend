const { z } = require('zod');

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); 
    next(); 
  } catch (e) {
    if (e instanceof z.ZodError) {
      return res.status(400).json({
        errors: e.errors.map((error) => ({
          path: error.path,
          message: error.message,
        })),
      });
    } else {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = { validate };
