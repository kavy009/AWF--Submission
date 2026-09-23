const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Built-in JSON body parser
app.use(express.json());

// 2. Global Request Logging Middleware (Practical 4 Core Requirement)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${req.method}] ${req.url} - ${timestamp}`);
  next();
});

// 3. Supplementary Middleware: Enforce Content-Type for POST and PUT requests
const requireJsonContent = (req, res, next) => {
  if (['POST', 'PUT'].includes(req.method)) {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Content-Type must be application/json for POST and PUT requests'
      });
    }
  }
  next();
};

app.use(requireJsonContent);

// In-Memory Task Storage
let tasks = [
  {
    id: 1,
    title: 'Setup React Portfolio UI',
    description: 'Build Vite + React component architecture with props',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: 'Implement Multi-Route Navigation',
    description: 'Configure React Router v6 with controlled form and useState',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: 'Connect GitHub REST API',
    description: 'Integrate live repository data with loading and error states',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: 4,
    title: 'Design Express RESTful Backend',
    description: 'Create CRUD routes, logging middleware, and error pipeline',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

let nextId = 5;

// Supplementary Middleware: Route-specific Task ID Validation
const validateTaskId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: 'Invalid ID',
      message: 'Task ID must be a positive integer'
    });
  }
  req.taskId = id;
  next();
};

// ==========================================
// RESTful CRUD Routes for /tasks
// ==========================================

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// GET /tasks/:id - Retrieve single task by ID
app.get('/tasks/:id', validateTaskId, (req, res) => {
  const task = tasks.find((t) => t.id === req.taskId);
  if (!task) {
    return res.status(404).json({
      success: false,
      error: 'Not Found',
      message: `Task with id ${req.taskId} not found`
    });
  }
  res.status(200).json({
    success: true,
    data: task
  });
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    // Field validation
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Field "title" is required and cannot be empty'
      });
    }

    const newTask = {
      id: nextId++,
      title: title.trim(),
      description: description ? String(description).trim() : '',
      completed: Boolean(completed),
      createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: newTask
    });
  } catch (err) {
    next(err);
  }
});

// PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', validateTaskId, (req, res, next) => {
  try {
    const taskIndex = tasks.findIndex((t) => t.id === req.taskId);
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with id ${req.taskId} not found`
      });
    }

    const { title, description, completed } = req.body;

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Field "title" cannot be empty'
        });
      }
      tasks[taskIndex].title = title.trim();
    }

    if (description !== undefined) {
      tasks[taskIndex].description = String(description).trim();
    }

    if (completed !== undefined) {
      tasks[taskIndex].completed = Boolean(completed);
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: tasks[taskIndex]
    });
  } catch (err) {
    next(err);
  }
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', validateTaskId, (req, res, next) => {
  try {
    const taskIndex = tasks.findIndex((t) => t.id === req.taskId);
    if (taskIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: `Task with id ${req.taskId} not found`
      });
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask
    });
  } catch (err) {
    next(err);
  }
});

// Supplementary: Deliberate error endpoint for demonstrating error pipeline
app.get('/trigger-error', (req, res, next) => {
  const deliberateError = new Error('Demonstrating centralized Express error handling pipeline');
  deliberateError.status = 500;
  next(deliberateError);
});

// 4. Supplementary: 404 Handler for Undefined Routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// 5. Global Centralized Error Handling Middleware (must be defined last)
app.use((err, req, res, next) => {
  console.error('[Error caught by global handler]:', err.message);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: status === 500 ? 'Internal Server Error' : 'Application Error',
    message: err.message || 'Something went wrong on the server'
  });
});

// Server listener
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Task Manager API running at http://localhost:${PORT}`);
  });
}

module.exports = app;
