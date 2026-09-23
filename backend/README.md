# Practical 4: Building a RESTful API with Node.js and Express

## Subject: Advanced Web Development Frameworks (ITUE301)
**Semester:** 5th  
**Student:** Kavya Chauhan (24CE017)  
**Course Outcomes / Program Outcomes:** CO2 / PO3, PO5  

---

## 🎯 Objective
To design and implement a RESTful backend server with complete CRUD endpoints using an Express middleware pipeline.

---

## 🏗️ Architecture & Middleware Pipeline
```
Client (Postman / Browser / Thunder Client)
 │
 ▼
[JSON Parser Middleware] (express.json())
 │
 ▼
[Global Request Logger] (Logs Method, URL, and Timestamp)
 │
 ▼
[Content-Type Validator] (Rejects non-application/json on POST/PUT with 400)
 │
 ▼
Express Router & Route-Specific Middlewares
 ├── GET    /tasks      ──► Retrieve all tasks (200 OK)
 ├── GET    /tasks/:id  ──► Validate Task ID ──► Retrieve task (200 OK / 404)
 ├── POST   /tasks      ──► Validate Title   ──► Create task (201 Created)
 ├── PUT    /tasks/:id  ──► Validate Task ID ──► Update task (200 OK / 404)
 └── DELETE /tasks/:id  ──► Validate Task ID ──► Delete task (200 OK / 404)
 │
 ▼
[404 Route Not Found Handler] (Returns structured JSON for undefined paths)
 │
 ▼
[Centralized Global Error Handler] (Catches unhandled errors, returns structured 500 JSON)
```

---

## 📋 REST Endpoints Summary

| Method | Endpoint | Description | Expected Status |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Get all tasks | `200 OK` |
| `GET` | `/tasks/:id` | Get specific task by numeric ID | `200 OK` / `404 Not Found` |
| `POST` | `/tasks` | Create a new task (body requires `title`) | `201 Created` / `400 Bad Request` |
| `PUT` | `/tasks/:id` | Update task fields (`title`, `description`, `completed`) | `200 OK` / `404 Not Found` |
| `DELETE` | `/tasks/:id` | Remove a task by ID | `200 OK` / `404 Not Found` |
| `GET` | `/trigger-error` | Deliberate exception to demonstrate error handler | `500 Internal Server Error` |

---

## 💻 How to Run Locally

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start Express server (default port: 5000)
npm start

# Or run with auto-reload (development mode)
npm run dev
```

Server will run at `http://localhost:5000`. You can test endpoints via Postman or Thunder Client.
