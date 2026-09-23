# Practicals 1–3 & 6: React Frontend with Full-Stack Task Integration

## Subject: Advanced Web Development Frameworks (ITUE301)
**Semester:** 5th  
**Student:** Kavya Chauhan (24CE017)  
**Course Outcomes / Program Outcomes:** CO1, CO2 / PO3, PO5  

---

## 🎯 Practical 6: Full Stack Integration (React + Node + MongoDB)
- **Objective:** To wire the React frontend to the Node/Express/MongoDB backend into a fully functional full-stack application with proper state synchronization.

### 🔄 End-to-End Architecture
```
React Frontend (localhost:5173)
 │
 │ [api.js service: getTasks, createTask, updateTask, deleteTask]
 ▼
Express Backend (localhost:5000)
 │
 │ [CORS enabled, JSON body parser, ObjectId validator, global error handler]
 ▼
MongoDB Database (tasks collection)
```

### ✨ Full-Stack Features & Supplementary Solutions:
1. **Centralized API Client (`services/api.js`):** Unified REST client configuring `BASE_URL = http://localhost:5000` with clean error unpacking.
2. **Optimistic UI Updates:** New tasks are immediately rendered in the UI list before the server response finishes, providing instant user feedback. If the API fails, the state automatically rolls back.
3. **Delete Confirmation Dialog:** Interactive modal prompt protecting users against accidental task deletion.
4. **Toast Notification System (`components/Toast.jsx`):** Non-blocking notifications displaying operation status (success / error) for every create, update, and delete action.
5. **Real-time Synchronization:** Complete CRUD cycle (Create, View, Update status, Delete) synchronized between the browser and backend database.

---

## 💻 How to Run the Full-Stack Application Locally

### 1. Start the Backend Server (Terminal 1)
```bash
cd backend
npm install
npm start
# Server listens on http://localhost:5000 with MongoDB connected
```

### 2. Start the Frontend Dev Server (Terminal 2)
```bash
cd Practical-01
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

Navigate to `http://localhost:5173/tasks` to interact with the live full-stack Task Management system.
