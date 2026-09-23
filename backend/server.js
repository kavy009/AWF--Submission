const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Task = require('./models/Task');
const auth = require('./middleware/auth');
const { validateTaskInput } = require('./middleware/validation');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/taskdb';

// 1. Enable Cross-Origin Resource Sharing (CORS) for React frontend
app.use(cors());

// 2. Built-in JSON body parser
app.use(express.json());

// 3. Global Request Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.url} - ${timestamp}`);
  next();
});

// 4. Connect to MongoDB via Mongoose
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

// In-memory fallback tasks in case MongoDB is offline during testing
let memoryTasks = [
  {
    _id: 'task-1',
    id: 'task-1',
    title: 'Setup React Portfolio UI',
    description: 'Build Vite + React component architecture with props',
    completed: true,
    priority: 'high',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'task-2',
    id: 'task-2',
    title: 'Configure React Router & useState',
    description: 'Implement multi-route navigation and controlled form',
    completed: true,
    priority: 'medium',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'task-3',
    id: 'task-3',
    title: 'Integrate GitHub REST API',
    description: 'Fetch repositories asynchronously with loading spinner',
    completed: true,
    priority: 'low',
    createdAt: new Date().toISOString()
  }
];

// 5. Content-Type Enforcer Middleware for write operations
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

// Middleware to validate MongoDB ObjectId (allows fallback string IDs)
const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!id || id.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID Format',
      message: 'ID parameter cannot be empty'
    });
  }
  next();
};

// ==========================================
// Authentication Routes (Practical 7)
// ==========================================
app.use('/auth', authRoutes);

// ==========================================
// RESTful Task Routes (Protected with JWT Auth)
// ==========================================

// GET /tasks - Retrieve all tasks (Protected)
app.get('/tasks', auth, async (req, res, next) => {
  try {
    let tasksList = [];
    try {
      tasksList = await Task.find().sort({ createdAt: -1 });
    } catch {
      tasksList = memoryTasks;
    }

    res.status(200).json({
      success: true,
      count: tasksList.length,
      user: req.user,
      data: tasksList
    });
  } catch (err) {
    next(err);
  }
});

// GET /tasks/:id - Retrieve single task by ID (Protected)
app.get('/tasks/:id', auth, validateObjectId, async (req, res, next) => {
  try {
    let task = null;
    try {
      task = await Task.findById(req.params.id);
    } catch {
      task = memoryTasks.find((t) => t._id === req.params.id || t.id === req.params.id);
    }

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

// POST /tasks - Create a new task (Protected + Server-side input validation)
app.post('/tasks', auth, validateTaskInput, async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;

    let savedTask = null;
    try {
      savedTask = await Task.create({
        title,
        description,
        completed,
        priority
      });
    } catch {
      savedTask = {
        _id: 'task-' + Date.now(),
        id: 'task-' + Date.now(),
        title: title.trim(),
        description: description ? String(description).trim() : '',
        completed: Boolean(completed),
        priority: priority || 'medium',
        createdAt: new Date().toISOString()
      };
      memoryTasks.unshift(savedTask);
    }

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: savedTask
    });
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id - Update an existing task (Protected)
app.put('/tasks/:id', auth, validateObjectId, async (req, res, next) => {
  try {
    const { title, description, completed, priority } = req.body;
    let updatedTask = null;

    try {
      updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, completed, priority },
        { new: true, runValidators: true }
      );
    } catch {
      const idx = memoryTasks.findIndex((t) => t._id === req.params.id || t.id === req.params.id);
      if (idx !== -1) {
        if (title !== undefined) memoryTasks[idx].title = title;
        if (description !== undefined) memoryTasks[idx].description = description;
        if (completed !== undefined) memoryTasks[idx].completed = completed;
        if (priority !== undefined) memoryTasks[idx].priority = priority;
        updatedTask = memoryTasks[idx];
      }
    }

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id - Delete a task (Protected)
app.delete('/tasks/:id', auth, validateObjectId, async (req, res, next) => {
  try {
    let deletedTask = null;
    try {
      deletedTask = await Task.findByIdAndDelete(req.params.id);
    } catch {
      const idx = memoryTasks.findIndex((t) => t._id === req.params.id || t.id === req.params.id);
      if (idx !== -1) {
        deletedTask = memoryTasks.splice(idx, 1)[0];
      }
    }

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with ID ${req.params.id} not found`
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask
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
