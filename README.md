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

## 📑 Comprehensive Practical Index (Practicals 1 to 11)

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
| **Practical 10** | **Asynchronous Processing with Event-Driven Architecture** | Node.js `events` (EventEmitter), Express | [`backend/events.js`](backend/events.js) | Decoupled background processing using native EventEmitter. Emits non-blocking `task-created` & `task-deleted` events, error boundary listener, and live timestamp ordering verification. |
| **Practical 11** | **Containerization with Docker & Docker Compose** | Docker, Docker Compose, Alpine Linux | [`docker-compose.yml`](docker-compose.yml) | Multi-container orchestration (React frontend + Node/Express backend + MongoDB) with bridge network, multi-stage frontend build, and persistent named volume. |

---

## 📂 Repository Structure

```
AWF--Submission/
├── Portfolio/                             # Frontend React 18 Application (Practicals 1, 2, 3, 6, 8, 11)
│   ├── src/
│   │   ├── components/                    # Header, Footer, NavBar, Projects, Spinner, ErrorMessage, Toast, PageFallback, PerformanceProfiler
│   │   ├── pages/                         # Home, Contact, TaskManager, AuthPage, NotFound
│   │   ├── services/                      # api.js (Centralized API client with JWT header injection)
│   │   ├── App.jsx                        # React Router + React.lazy() + Suspense
│   │   ├── index.css                      # Unified Design System (Dark/Light mode themes)
│   │   └── main.jsx                       # BrowserRouter Root Entry
│   ├── Dockerfile                         # Practical 11: Multi-stage React build & preview runner
│   ├── .dockerignore                      # Build context exclusion (node_modules, dist, secrets)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js                     # Configured with host: 0.0.0.0 for Docker networking
│   └── README.md                          # Frontend Documentation
│
├── backend/                               # Full-Stack Express REST API (Practicals 4, 5, 6, 7, 9, 10, 11)
│   ├── models/                            # Task.js (Mongoose Schema + Hooks), User.js
│   ├── routes/                            # auth.js (Register, Login, /me)
│   ├── middleware/                        # auth.js (JWT verify), validation.js (Input sanitization)
│   ├── utils/                             # cache.js (node-cache singleton & telemetry)
│   ├── events.js                          # Practical 10: TaskEvents EventEmitter singleton & buffer
│   ├── listeners.js                       # Practical 10: task-created, task-deleted, error listeners
│   ├── test-cache.js                      # Automated cache latency benchmark script (Practical 9)
│   ├── test-events.js                     # Automated EventEmitter test suite (Practical 10)
│   ├── test-docker.js                     # Docker configuration test runner (Practical 11)
│   ├── Dockerfile                         # Practical 11: Node.js 18 Express container image
│   ├── .dockerignore                      # Backend build context exclusion
│   ├── server.js                          # Express application entry point (CRUD + CORS + Events + Cache)
│   ├── .env.example                       # Environment variables template
│   ├── package.json
│   └── README.md                          # Backend Documentation
│
├── docker-compose.yml                     # Practical 11: Multi-container orchestration (React + Express + Mongo)
├── .dockerignore                          # Root build context ignore rules
├── test-cache.js                          # Root proxy runner for Practical 9 benchmark
├── test-events.js                         # Root proxy runner for Practical 10 test suite
├── test-docker.js                         # Root proxy runner for Practical 11 verification suite
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

### 5. Running Practical 10 EventEmitter Async Verification Suite
From the **repository root**:
```bash
node test-events.js
```

---

### 6. Running the Entire Stack via Docker Compose (Practical 11)
From the **repository root**, launch all 3 services simultaneously with a single command:
```bash
docker compose up --build
```
- **React Frontend**: [http://localhost:5173](http://localhost:5173)
- **Node/Express API**: [http://localhost:5000](http://localhost:5000)
- **MongoDB**: `localhost:27017`

To view container status:
```bash
docker ps
```

To stop and tear down containers:
```bash
docker compose down
```

---

### 7. Running Practical 11 Docker Verification Suite
From the **repository root**:
```bash
node test-docker.js
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

### Practical 10: Asynchronous Processing with Event-Driven Architecture (EventEmitter)

Demonstrating decoupled background processing using Node.js native `EventEmitter` without blocking the main request/response cycle:

#### Architecture & Decoupling Flow:
```
POST /tasks (Client HTTP Request)
     │
     ▼
Save Task (MongoDB)
     │
     ├──► [API Response sent immediately: HTTP 201 Created] (e.g., 09:15:02.473Z)
     │
     └──► taskEvents.emit('task-created', taskData)
              │
              ▼ (Asynchronous non-blocking background worker with 1500ms delay)
          [Notification Listener]
              └──► Notification dispatch completed at 09:15:03.976Z (+1503 ms)
```

#### Real Benchmark Timestamp Evidence (`node test-events.js`):
| Step / Phase | Operation | Executed Timestamp | Measured Latency | Non-Blocking Status |
| :--- | :--- | :---: | :---: | :--- |
| **API Response** | `POST /tasks` returns HTTP 201 | `09:15:02.473Z` | **27.62 ms** | **Response Sent BEFORE worker finishes** |
| **Listener Start** | `task-created` event handled | `09:15:02.475Z` | `+2 ms` | Event received in next tick of event loop |
| **Worker Finish** | Email notification dispatch | `09:15:03.976Z` | **+1503 ms** | Decoupled background execution without blocking |
| **Delete Event** | `task-deleted` event handled | `09:15:05.539Z` | **+1013 ms** | Supplementary cleanup notification |
| **Error Boundary** | Safe `error` listener handled | Handled Safely | `0 ms` | Prevented uncaught exception process crash |

---

### Practical 11: Containerization with Docker & Docker Compose

Containerizing the entire full-stack application into isolated, portable microservices and orchestrating them via Docker Compose.

#### Multi-Container Architecture & Network Topology:
```
docker-compose.yml (app-network: bridge)
  ├── frontend  (React 18 + Vite, built & previewed, port 5173:5173)
  ├── backend   (Node.js & Express REST API, port 5000:5000)
  └── mongodb   (Official MongoDB 6.0 engine, port 27017:27017)

Network Topology:
  Host Browser (localhost:5173) ──► Frontend Container (Vite Preview on 0.0.0.0:5173)
  Host Browser (localhost:5000) ──► Backend Container (Express on 0.0.0.0:5000)
  Backend Container ──────────────► mongodb:27017 (Internal Docker DNS resolution)
  MongoDB Data Directory ─────────► mongo-data (Named persistent host volume)
```

#### Core Components & Best Practices:
1. **Frontend Multi-Stage Build ([`Portfolio/Dockerfile`](Portfolio/Dockerfile))**:
   - **Stage 1 (Builder)**: Installs build dependencies and generates the optimized production bundle (`npm run build`).
   - **Stage 2 (Runner)**: Uses a clean `node:18-alpine` environment containing only runtime dependencies to serve the distribution via `vite preview --host 0.0.0.0 --port 5173`, reducing final image size.
2. **Backend Container ([`backend/Dockerfile`](backend/Dockerfile))**:
   - Uses `node:18-alpine` base image.
   - Leverages Docker layer caching by copying `package*.json` prior to `npm install`.
   - Binds to port `5000`.
3. **Build Context Optimization ([`.dockerignore`](.dockerignore))**:
   - Dedicated `.dockerignore` files in root, `backend/`, and `Portfolio/` prevent host `node_modules`, `.env`, and compilation artifacts from polluting the container image context.
4. **Data Persistence**:
   - Named volume `mongo-data` mapped to `/data/db` prevents data loss when the MongoDB container is stopped or recreated.
5. **Single-Command Orchestration**:
   - Entire application lifecycle managed with `docker compose up --build` and `docker compose down`.

#### Key Viva / Exam Concept Questions:
| Question | Answer for Viva |
| :--- | :--- |
| **Why does the backend connect via `mongodb` instead of `localhost`?** | In Docker bridge networks, `localhost` (127.0.0.1) refers to each container's own isolated loopback network. Docker Compose creates an internal DNS network allowing services to communicate seamlessly using their service names (e.g. `mongodb://mongodb:27017/taskdb`). |
| **What is the difference between `EXPOSE` and `ports`?** | `EXPOSE` is internal documentation declaring which ports the container listens on. `ports` in `docker-compose.yml` binds the container's internal port to a host machine port (e.g., `5000:5000`), making it accessible from the host browser. |
| **Why should `node_modules` be excluded via `.dockerignore`?** | Host `node_modules` contains binary bindings compiled for the host OS (e.g., Windows x64). Copying them into a Linux container causes platform mismatch errors. Running `npm install` inside the container guarantees pure Linux-compiled dependencies. |
| **Why use a multi-stage Docker build?** | Separating build tools from the runtime container drastically shrinks image size, speeds up deployments, and minimizes the container attack surface by excluding unnecessary source files and build devDependencies. |

---

## 📡 API Endpoints Reference

| Method | Route | Protection | Practical | Purpose |
| :--- | :--- | :--- | :--- :--- | :--- |
| `POST` | `/auth/register` | Public | P7 | Register new user with hashed password (bcrypt) |
| `POST` | `/auth/login` | Public | P7 | Authenticate user & return signed JWT token (1h) |
| `GET` | `/auth/me` | Protected (JWT) | P7 | Retrieve authenticated user profile from decoded token |
| `GET` | `/tasks` | Protected (JWT) | P4, P5, P6, P9 | Fetch all tasks (Cached in RAM for 60s) |
| `GET` | `/tasks/:id` | Protected (JWT) | P4, P5, P9 | Fetch single task by ID (Cached individually) |
| `POST` | `/tasks` | Protected (JWT) | P4, P5, P6, P9, P10 | Create task (Invalidates cache & emits `task-created`) |
| `PUT` | `/tasks/:id` | Protected (JWT) | P4, P5, P6, P9 | Update task (Invalidates `all_tasks` & `task_<id>`) |
| `DELETE`| `/tasks/:id` | Protected (JWT) | P4, P5, P6, P9, P10 | Delete task (Invalidates cache & emits `task-deleted`) |
| `GET` | `/events/logs` | Public | P10 | Retrieve background event execution telemetry & timestamp logs |
| `DELETE`| `/events/logs` | Public | P10 | Clear in-memory event telemetry buffer |
| `POST` | `/events/simulate-error` | Public | P10 | Emit simulated error event to test error boundary safely |
| `GET` | `/cache-stats` | Public | P9 | View cache hits, misses, hit ratio %, and active keys |
| `POST` | `/cache-clear` | Public | P9 | Manually flush all keys from in-memory cache |
| `GET` | `/health` | Public | P5, P9, P10 | Server health, database connection, cache & event stats |

---

## 📜 Course Syllabus & Resources
- [ITUE301 Practical List Manual](2026-27-ODD-ITUE301-AWF-PracticalList%20(1).pdf)
- [Frontend Documentation](Portfolio/README.md)
- [Backend Documentation](backend/README.md)
