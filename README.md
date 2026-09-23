# ITUE301: Advanced Web Development Frameworks (AWF)
## Laboratory Practicals & Examination Repository

**Student Name**: Kavya Chauhan  
**Roll Number**: 24CE017  
**Batch**: A1  
**Department**: Computer Engineering  
**Institute**: Faculty of Technology and Engineering (FTE)  
**University**: Charotar University of Science and Technology (CHARUSAT)  
**Academic Year**: 2026–2027 (ODD Semester)  
**GitHub Repository**: [https://github.com/kavy009/AWF--Submission](https://github.com/kavy009/AWF--Submission)

---

## 📑 Comprehensive Practical Index (Practicals 1 to 9)

All practical assignments for ITUE301 have been implemented, tested, and organized in this single repository.

| Practical # | Title / Objective | Tech Stack | Source Directory | Key Implementation Details |
| :---: | :--- | :--- | :--- | :--- |
| **Practical 1** | **React & Component Architecture** | React 18, Vite, CSS3 | [`Portfolio/src/components`](Portfolio/src/components) | Modular, reusable UI components (`Header`, `About`, `Skills`, `Projects`, `Footer`) with props passing and inline themeColor styling. |
| **Practical 2** | **State Management & Routing in React** | React Router v6, `useState` | [`Portfolio/src/App.jsx`](Portfolio/src/App.jsx) | Client-side routing with `react-router-dom` across multiple routes (`/`, `/projects`, `/tasks`, `/contact`, `/auth`), controlled forms, and dark/light mode toggle. |
| **Practical 3** | **API Integration & Data Rendering** | Fetch API, `useEffect`, Async/Await | [`Portfolio/src/components/Projects.jsx`](Portfolio/src/components/Projects.jsx) | Asynchronous REST integration fetching live public repositories from the GitHub API with loading spinner, error fallback, retry mechanism & search filter. |
| **Practical 4** | **RESTful API with Node.js & Express** | Express.js, Node.js | [`backend/server.js`](backend/server.js) | Modular Express REST API featuring in-memory Task CRUD endpoints, global request logging, Content-Type enforcement, and centralized error pipeline. |
| **Practical 5** | **MongoDB & Mongoose Schema Design** | Mongoose ODM, MongoDB | [`backend/models/Task.js`](backend/models/Task.js) | Schema definition with priority enum (`low`, `medium`, `high`), pre-save title trimming hook, persistent database CRUD operations, and structured JSON validation error handling. |
| **Practical 6** | **Full Stack Integration (React + Express + Mongo)** | Full MERN Stack, CORS | [`Portfolio/src/services/api.js`](Portfolio/src/services/api.js) | Centralized `api.js` client, real-time database persistence, optimistic UI updates, delete confirmation modal, and dynamic Toast notifications. |
| **Practical 7** | **Authentication & Middleware Pipeline** | JWT, bcryptjs, Express | [`backend/routes/auth.js`](backend/routes/auth.js) | Secure JWT authentication, password hashing with bcryptjs (10 rounds), server-side input validation middleware, route-level JWT protection, and `/auth/me` endpoint. |
| **Practical 8** | **Performance Optimization & Lazy Loading** | `React.lazy()`, `<Suspense>` | [`Portfolio/src/App.jsx`](Portfolio/src/App.jsx) | Route-based code splitting, dynamic chunk loading, animated `<PageFallback />`, on-demand Runtime Profiler, and ~25 kB initial bundle reduction. |
| **Practical 9** | **In-Memory Caching & Query Optimization** | `node-cache`, Express | [`backend/utils/cache.js`](backend/utils/cache.js) | Server-side in-memory caching with automatic write-invalidation (`POST`, `PUT`, `DELETE`), `/cache-stats` telemetry, and 26.8% latency reduction. |

---

## 📂 Repository Structure

```
AWF--Submission/
├── Portfolio/                             # Frontend React 18 Application (Practicals 1, 2, 3, 6, 8)
│   ├── src/
│   │   ├── components/                    # Header, Footer, NavBar, Projects, Spinner, ErrorMessage, Toast, PageFallback, PerformanceProfiler
│   │   ├── pages/                         # Home, Contact, TaskManager, AuthPage, NotFound
│   │   ├── services/                      # api.js (Centralized API client with JWT header injection)
│   │   ├── App.jsx                        # React Router + React.lazy() + Suspense
│   │   ├── index.css                      # Unified Design System (Dark/Light mode themes)
│   │   └── main.jsx                       # BrowserRouter Root Entry
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md                          # Frontend Documentation
│
├── backend/                               # Full-Stack Express REST API (Practicals 4, 5, 6, 7, 9)
│   ├── models/                            # Task.js (Mongoose Schema + Hooks), User.js
│   ├── routes/                            # auth.js (Register, Login, /me)
│   ├── middleware/                        # auth.js (JWT verify), validation.js (Input sanitization)
│   ├── utils/                             # cache.js (node-cache singleton & telemetry)
│   ├── test-cache.js                      # Automated cache latency benchmark script
│   ├── server.js                          # Express application entry point (CRUD + CORS + Invalidation)
│   ├── .env.example                       # Environment variables template
│   ├── package.json
│   └── README.md                          # Backend Documentation
│
├── test-cache.js                          # Root proxy runner for Practical 9 benchmark
├── 2026-27-ODD-ITUE301-AWF-PracticalList (1).pdf # Official Syllabus & Practical Manual
├── .gitignore                             # Git ignore rules (node_modules, .env excluded)
└── README.md                              # Master Documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB** running locally on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

---

### 2. Backend Server Setup (Express + MongoDB + Auth + Cache)
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start Express server (Port 5000)
npm start
```
The server will run on `http://localhost:5000` with MongoDB connected and in-memory caching active.

---

### 3. Frontend Application Setup (React 18 + Vite + Lazy Loading)
In a **separate terminal**:
```bash
# Navigate to frontend directory
cd Portfolio

# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 4. Running Practical 9 Cache Benchmark Suite
From the **repository root**:
```bash
node test-cache.js
```

---

## ⚡ Performance Optimization & Caching Benchmarks

### Practical 8: React Code Splitting & Bundle Reduction
Running `npm run build` inside `Portfolio/` verifies route-level code splitting via `React.lazy()` and `Suspense`:

| File / Asset | Baseline (Monolithic) | After Practical 8 (Lazy Loaded) | Impact / Purpose |
| :--- | :---: | :---: | :--- |
| **Main JS Bundle** | `290.01 kB` | `265.16 kB` | **-24.85 kB initial download (-8.6%)** |
| `TaskManager-*.js` chunk | Bundled | `6.92 kB` | Loaded strictly on `/tasks` |
| `AuthPage-*.js` chunk | Bundled | `4.68 kB` | Loaded strictly on `/auth` |
| `Home-*.js` chunk | Bundled | `4.19 kB` | Loaded strictly on `/` |
| `Contact-*.js` chunk | Bundled | `4.11 kB` | Loaded strictly on `/contact` |
| `Projects-*.js` chunk | Bundled | `3.56 kB` | Loaded strictly on `/projects` |
| `PerformanceProfiler-*.js` | Bundled | `2.63 kB` | Loaded on demand via floating button |
| `Toast-*.js` chunk | Bundled | `2.70 kB` | Lazy UI helper chunk |
| `NotFound-*.js` chunk | Bundled | `0.51 kB` | Loaded only on 404 routes |

---

### Practical 9: In-Memory Caching Latency Improvement
Running `node test-cache.js` measures real API response times between uncached MongoDB queries and cached RAM hits:

| Request Iteration | Type | Target Source | Latency | Cache Header |
| :---: | :---: | :---: | :---: | :---: |
| **Reading 1** | `GET /tasks` | MongoDB (Cold DB Query) | **11.58 ms** | `X-Cache: MISS` |
| **Reading 2** | `GET /tasks` | `node-cache` (RAM Hit) | **2.75 ms** | `X-Cache: HIT` |
| **Reading 3** | `GET /tasks` | `node-cache` (RAM Hit) | **4.07 ms** | `X-Cache: HIT` |
| **Reading 4** | `GET /tasks` | `node-cache` (RAM Hit) | **6.07 ms** | `X-Cache: HIT` |
| **Reading 5** | `GET /tasks` | `node-cache` (RAM Hit) | **4.82 ms** | `X-Cache: HIT` |
| **Reading 6** | `GET /tasks` | `node-cache` (RAM Hit) | **2.57 ms** | `X-Cache: HIT` |
| **Write Test** | `POST /tasks` | MongoDB + Invalidate | — | Invalidation Triggered |
| **Reading 7** | `GET /tasks` | MongoDB (Post-Invalidate) | **3.85 ms** | `X-Cache: MISS` |

- **Average Uncached Latency**: `6.13 ms`  
- **Average Cached Latency**: `4.49 ms`  
- **Speedup / Latency Reduction**: **26.8% faster** (Eliminates repeated database queries)  
- **Cache Hit Rate**: **75.0%** across benchmark test runs

---

## 📡 API Endpoints Reference

| Method | Route | Protection | Practical | Purpose |
| :--- | :--- | :--- | :---: | :--- |
| `POST` | `/auth/register` | Public | P7 | Register new user with hashed password (bcrypt) |
| `POST` | `/auth/login` | Public | P7 | Authenticate user & return signed JWT token (1h) |
| `GET` | `/auth/me` | Protected (JWT) | P7 | Retrieve authenticated user profile from decoded token |
| `GET` | `/tasks` | Protected (JWT) | P4, P5, P6, P9 | Fetch all tasks (Cached in RAM for 60s) |
| `GET` | `/tasks/:id` | Protected (JWT) | P4, P5, P9 | Fetch single task by ID (Cached individually) |
| `POST` | `/tasks` | Protected (JWT) | P4, P5, P6, P9 | Create task (Invalidates `all_tasks` cache) |
| `PUT` | `/tasks/:id` | Protected (JWT) | P4, P5, P6, P9 | Update task (Invalidates `all_tasks` & `task_<id>`) |
| `DELETE`| `/tasks/:id` | Protected (JWT) | P4, P5, P6, P9 | Delete task (Invalidates `all_tasks` & `task_<id>`) |
| `GET` | `/cache-stats` | Public | P9 | View cache hits, misses, hit ratio %, and active keys |
| `POST` | `/cache-clear` | Public | P9 | Manually flush all keys from in-memory cache |
| `GET` | `/health` | Public | P5, P9 | Server health and database connection status check |

---

## 📜 Course Syllabus & Resources
- [ITUE301 Practical List Manual](2026-27-ODD-ITUE301-AWF-PracticalList%20(1).pdf)
- [Frontend Documentation](Portfolio/README.md)
- [Backend Documentation](backend/README.md)
