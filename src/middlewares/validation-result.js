const { validationResult } = require('express-validator');

module.exports = (message) => (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    res.status(400).json({
      message,
      errors: validationResult(req).array(),
    });
  } else {
    next();
  }
};
