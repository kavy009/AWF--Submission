# Practicals 4, 5 & 7: REST API, MongoDB Mongoose & JWT Authentication

## Subject: Advanced Web Development Frameworks (ITUE301)
**Semester:** 5th  
**Student:** Kavya Chauhan (24CE017)  
**Course Outcomes / Program Outcomes:** CO2, CO3, CO6 / PO3, PO5  

---

## 🎯 Practical 7: Authentication and Middleware Pipeline
- **Objective:** To implement JWT-based authentication and input validation as part of the Express middleware pipeline.

### 🛡️ Authentication Architecture & Request Lifecycle
```
POST /auth/register ──► Validate Input ──► Hash Password (bcryptjs, 10 rounds) ──► Save User ──► Sign JWT (1h)
POST /auth/login    ──► Validate Input ──► Compare Hash (bcrypt.compare)        ──► Sign JWT (1h) ──► Return Token

Protected Route Request:
Client Header: [Authorization: Bearer <token>]
 │
 ▼
[Global Request Logger]
 │
 ▼
[Auth Middleware (middleware/auth.js)]
 ├── Verifies JWT via process.env.JWT_SECRET
 ├── Decodes user payload (id, email, name) and attaches to req.user
 └── Returns 401 Unauthorized if missing, malformed, or expired
 │
 ▼
[Server-side Validation Middleware (middleware/validation.js)]
 ├── Enforces email format regex
 ├── Enforces password minimum 6 characters
 └── Validates non-empty required fields
 │
 ▼
Protected Route Controllers (/tasks, /auth/me)
```

---

## 📋 API Endpoints

### 🔐 Auth Endpoints (`/auth`)
| Method | Endpoint | Description | Auth Required | Status Codes |
| :--- | :--- | :--- | :---: | :--- |
| `POST` | `/auth/register` | Register new user with hashed password | ❌ | `201`, `400` |
| `POST` | `/auth/login` | Authenticate user & receive signed JWT | ❌ | `200`, `400`, `401` |
| `GET` | `/auth/me` | Retrieve current authenticated user profile | ✅ Bearer Token | `200`, `401` |

### 📝 Task Endpoints (`/tasks` - Protected)
| Method | Endpoint | Description | Auth Required | Status Codes |
| :--- | :--- | :--- | :---: | :--- |
| `GET` | `/tasks` | Retrieve tasks belonging to session | ✅ Bearer Token | `200`, `401` |
| `POST` | `/tasks` | Create task with server validation | ✅ Bearer Token | `201`, `400`, `401` |
| `PUT` | `/tasks/:id` | Update existing task | ✅ Bearer Token | `200`, `400`, `401`, `404` |
| `DELETE` | `/tasks/:id` | Delete task from database | ✅ Bearer Token | `200`, `401`, `404` |

---

## 🔐 Environment Configuration
In `backend/.env` (see `backend/.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskdb
JWT_SECRET=awf_super_secret_jwt_key_2026_charusat
```
> **Security Note:** `.env` is never committed to source control. Only `.env.example` is tracked.
