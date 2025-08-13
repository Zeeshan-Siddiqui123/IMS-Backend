// middlewares/FormValidator.js
module.exports = function validate(schema) {
    return (req, res, next) => {
      const parsed = schema.safeParse(req.body);
  
      if (!parsed.success) {
        const firstError = parsed.error.issues?.[0];
        return res.status(400).json({
          field: firstError?.path?.[0] || null,
          message: firstError?.message || "Invalid input"
        });
      }
  
      
      req.validatedData = parsed.data;
      next();
    };
  };
  