const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { validateRegisterInput, validateLoginInput } = require('../middleware/validation');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'awf_super_secret_jwt_key_2026_charusat';

// In-memory fallback users in case MongoDB server is not active during local demo
let memoryUsers = [];

// POST /register - Register a new user
router.post('/register', validateRegisterInput, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    let existingUser = null;
    try {
      existingUser = await User.findOne({ email: normalizedEmail });
    } catch {
      existingUser = memoryUsers.find((u) => u.email === normalizedEmail);
    }

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Conflict',
        message: 'An account with this email already exists.'
      });
    }

    // Hash the password with bcrypt (10 salt rounds)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let savedUser = null;
    try {
      savedUser = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword
      });
    } catch {
      savedUser = {
        _id: 'usr-' + Date.now(),
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        createdAt: new Date().toISOString()
      };
      memoryUsers.push(savedUser);
    }

    // Generate JWT Token (1 hour expiry)
    const token = jwt.sign(
      {
        id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (err) {
    next(err);
  }
});

// POST /login - Authenticate user & return signed JWT
router.post('/login', validateLoginInput, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    let user = null;
    try {
      user = await User.findOne({ email: normalizedEmail });
    } catch {
      user = memoryUsers.find((u) => u.email === normalizedEmail);
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Error',
        message: 'Invalid email or password.'
      });
    }

    // Compare plain password to bcrypt hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Authentication Error',
        message: 'Invalid email or password.'
      });
    }

    // Sign JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
});

// GET /me - Supplementary: Retrieve current logged-in user details from decoded JWT
router.get('/me', auth, async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
