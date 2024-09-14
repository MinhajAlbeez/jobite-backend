const validate = (schema) => (req, res, next) => {
    try {
      schema.parse(req.body); // Zod will parse and validate req.body
      next();
    } catch (e) {
      return res.status(400).json({ errors: e.errors });
    }
  };
  
  module.exports = { validate };
  