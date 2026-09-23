# ITUE301: Advanced Web Development Frameworks - Lab Submissions

**Student Name:** Kavya Chauhan  
**Student ID / Roll No:** 24CE017  
**Institution:** Charotar University of Science and Technology (CHARUSAT)  
**Faculty of Technology and Engineering**  
**Repository:** [https://github.com/kavy009/AWF--Submission](https://github.com/kavy009/AWF--Submission)  

---

## 📚 Practical Submission Index (Practicals 1 – 9)

| Practical | Title | Core Technologies | Status |
| :---: | :--- | :--- | :---: |
| **01** | Introduction to React & Component Architecture | React 18, Vite, Reusable Components, Props | ✅ Completed |
| **02** | State Management & Routing in React | React Router v6, useState, Controlled Forms, 404 | ✅ Completed |
| **03** | API Integration & Data Rendering in React | Fetch API, useEffect, GitHub REST API, Spinner, Error Handling | ✅ Completed |
| **04** | Building a RESTful API with Node.js & Express | Express.js, Custom Middleware, In-Memory CRUD, Error Pipeline | ✅ Completed |
| **05** | MongoDB Integration & Schema Design with Mongoose | MongoDB, Mongoose ODM, Schema Validation, Pre-Save Hooks | ✅ Completed |
| **06** | Full Stack Integration (React + Node + MongoDB) | Full-Stack MERN, CORS, API Synchronization, Optimistic UI | ✅ Completed |
| **07** | Authentication & Middleware Pipeline | JWT (JSON Web Tokens), bcryptjs, Auth Middleware, Protected Routes | ✅ Completed |
| **08** | Performance Optimization & Lazy Loading in React | React.lazy(), Suspense, Code Splitting, DevTools Profiler | ✅ Completed |
| **09** | In-Memory Caching & Query Optimization | node-cache, Cache Invalidation, Response Profiling, /cache-stats | ✅ Completed |

---

## 🚀 Running the Full Stack Application Locally

The project is structured as a clean monorepo separating frontend and backend:
- `Practical-01/`: Vite + React 18 frontend application (with Code Splitting, Lazy Loading & JWT State)
- `backend/`: Node.js + Express + Mongoose + JWT + node-cache REST API backend

### Terminal 1 - Backend Server:
```bash
cd backend
npm install
npm start
# Express runs on http://localhost:5000 with MongoDB connected & in-memory caching active
```

To run the automated caching and latency profiling suite:
```bash
cd backend
node test-cache.js
```

### Terminal 2 - Frontend Development Server:
```bash
cd Practical-01
npm install
npm run dev
# React app runs on http://localhost:5173
```
