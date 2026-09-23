const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Access denied. Bearer token missing in Authorization header.'
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
        message: 'Access denied. Token is empty.'
      });
    }

    const secret = process.env.JWT_SECRET || 'awf_super_secret_jwt_key_2026_charusat';
    const decoded = jwt.verify(token, secret);

    // Attach decoded user payload to request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: err.name === 'TokenExpiredError' ? 'Token has expired. Please log in again.' : 'Invalid or malformed token.'
    });
  }
};

module.exports = auth;
