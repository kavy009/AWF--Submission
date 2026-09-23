// Server-Side Input Validation Middlewares

const validateRegisterInput = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];

  // Rule 1: Required fields
  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('Name is required and cannot be empty.');
  }

  // Rule 2: Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    errors.push('A valid email address is required.');
  }

  // Rule 3: Password length check (min 6 characters)
  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Password must be at least 6 characters long.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      messages: errors
    });
  }

  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string' || email.trim() === '') {
    errors.push('Email is required.');
  }

  if (!password || typeof password !== 'string') {
    errors.push('Password is required.');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      messages: errors
    });
  }

  next();
};

const validateTaskInput = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || title.trim().length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Task title is required and must be at least 3 characters long.'
    });
  }
  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateTaskInput
};
