const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb';

// 1. Built-in JSON body parser
app.use(express.json());

// 2. Global Request Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.url} - ${timestamp}`);
  next();
});

// 3. Connect to MongoDB via Mongoose
let isDbConnected = false;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    isDbConnected = true;
    console.log(`[Database] MongoDB connected successfully to ${MONGO_URI}`);
  })
  .catch((err) => {
    console.error(`[Database Warning] Could not connect to MongoDB: ${err.message}`);
    console.log('[Database Info] Ensure MongoDB is running locally or provide a valid MONGO_URI in .env');
  });

// 4. Content-Type Enforcer Middleware for write operations
const requireJsonContent = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Content-Type must be application/json for POST and PUT requests'
      });
    }
  }
  next();
};

app.use(requireJsonContent);

// Middleware to validate MongoDB ObjectId
const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID Format',
      message: `"${req.params.id}" is not a valid MongoDB ObjectId`
    });
  }
  next();
};

// ==========================================
// RESTful CRUD Endpoints with Mongoose Model
// ==========================================

// GET /tasks - Retrieve all tasks
app.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id - Retrieve single task by ID (Supplementary requirement)
app.get('/tasks/:id', validateObjectId, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with ID ${req.params.id} not found`
      });
    }
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// POST /tasks - Create a new task with Mongoose validation
app.post('/tasks', async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;

    const task = await Task.create({
      title,
      description,
      completed,
      priority
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', validateObjectId, async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed, priority },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', validateObjectId, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task
    });
  } catch (err) {
    next(err);
  }
});

// Health / Status endpoint for quick verification
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    databaseConnected: mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString()
  });
});

// Supplementary 404 Handler for Undefined Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Centralized Global Error Handling Middleware (Handles Mongoose validation cleanly)
app.use((err, req, res, next) => {
  console.error('[Error Pipeline caught]:', err.message);

  // Mongoose Schema Validation Error Handler
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      messages: errors
    });
  }

  // Mongoose CastError (Invalid ID)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: 'Cast Error',
      message: `Invalid format for field ${err.path}: ${err.value}`
    });
  }

  // Default Internal Error
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: status === 500 ? 'Internal Server Error' : 'Application Error',
    message: err.message || 'An unexpected error occurred on the server'
  });
});

// Start Server if not testing
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Task Manager API running at http://localhost:${PORT}`);
  });
}

module.exports = app;
