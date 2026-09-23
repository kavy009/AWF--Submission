# Practicals 4 & 5: Express RESTful API & MongoDB Integration with Mongoose

## Subject: Advanced Web Development Frameworks (ITUE301)
**Semester:** 5th  
**Student:** Kavya Chauhan (24CE017)  
**Course Outcomes / Program Outcomes:** CO2, CO3 / PO3, PO5  

---

## 🎯 Practical 4: RESTful API with Node.js and Express
- **Objective:** To design and implement a RESTful backend server with complete CRUD endpoints using an Express middleware pipeline.
- **Features:** Global logging middleware, Content-Type verification, 404 handler, in-memory CRUD operations, centralized error handling.

---

## 🎯 Practical 5: MongoDB Integration and Schema Design with Mongoose
- **Objective:** To connect a MongoDB database to an Express server and enforce strict data validation through a Mongoose schema.

### 🗄️ Task Schema Design (`models/Task.js`)
```javascript
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [3, 'Task title must be at least 3 characters long']
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: 'Priority must be either low, medium, or high'
    },
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });
```

### ⚡ Supplementary Solutions:
1. **Priority Enum Field:** Restricted to `low`, `medium`, `high` with a default of `medium`.
2. **Pre-Save Hook:** Automatically cleans and trims leading/trailing whitespace from the task title before persisting to MongoDB.
3. **Structured Validation Error Handling:** Intercepts Mongoose `ValidationError` and `CastError` to return user-friendly, structured JSON responses (`400 Bad Request`) instead of raw stack traces.
4. **GET `/tasks/:id` Endpoint:** Validates MongoDB `ObjectId` format and returns `404 Not Found` if the document does not exist.

---

## 🔐 Environment Configuration
Create a `.env` file in the `backend/` directory (see `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
```

> **Security Note:** The `.env` file is excluded from Git tracking via `.gitignore`. `.env.example` is committed for reference.

---

## 📋 API Endpoints

| Method | Endpoint | Description | Status Codes |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Fetch all tasks sorted by creation date | `200`, `500` |
| `GET` | `/tasks/:id` | Fetch single task by MongoDB ObjectId | `200`, `400`, `404` |
| `POST` | `/tasks` | Create new task with schema validation | `201`, `400`, `500` |
| `PUT` | `/tasks/:id` | Update task with validator checks | `200`, `400`, `404` |
| `DELETE` | `/tasks/:id` | Remove task from database | `200`, `400`, `404` |
| `GET` | `/health` | Server & Database connectivity check | `200` |

---

## 💻 How to Run Locally

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start Express server connected to MongoDB
npm start
```
