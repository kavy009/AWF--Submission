# Practical 8: Performance Optimization & Lazy Loading in React

## Subject: Advanced Web Development Frameworks (ITUE301)
**Semester:** 5th  
**Student:** Kavya Chauhan (24CE017)  
**Course Outcomes / Program Outcomes:** CO1 / PO3, PO5  

---

## 🎯 Objective
To improve frontend performance using route-based code splitting and on-demand component lazy loading with `React.lazy()` and `Suspense`.

---

## 🏗️ Architecture: Before vs. After Code-Splitting

### ❌ Before Optimization (Monolithic Upfront Bundle):
```
Client First Visit ──► Downloads Single 290.01 kB Bundle Upfront (Home + Projects + Tasks + Auth + Contact)
(High initial transfer size, slower time-to-interactive on constrained mobile networks)
```

### ✅ After Optimization (`React.lazy()` + `Suspense`):
```
Client First Visit ──► index.js (265.16 kB core vendor runtime)
                       ├── Home.chunk.js (4.19 kB)        ──► loaded ONLY when '/' is visited
                       ├── Projects.chunk.js (3.56 kB)    ──► loaded ONLY when '/projects' is visited
                       ├── TaskManager.chunk.js (6.92 kB) ──► loaded ONLY when '/tasks' is visited
                       ├── AuthPage.chunk.js (4.68 kB)    ──► loaded ONLY when '/auth' is visited
                       ├── Contact.chunk.js (4.11 kB)     ──► loaded ONLY when '/contact' is visited
                       └── Profiler.chunk.js (2.63 kB)    ──► loaded on-demand via floating button
```

---

## 📊 Before vs. After Performance Comparison Metrics

| Metric | Before Optimization (Single Bundle) | After Optimization (Code-Split Chunks) | Impact / Improvement |
| :--- | :--- | :--- | :--- |
| **Initial JS Download** | `290.01 kB` (gzip: `90.07 kB`) | `265.16 kB` (gzip: `84.45 kB`) | **~25 kB (-8.6%) reduction** in initial bundle size |
| **Number of JS Chunks** | `1` monolithic bundle | `10` dedicated chunk modules | Targeted deferred delivery |
| **Initial Parse / Exec Time**| ~180 ms | ~110 ms | Faster Time-To-Interactive (TTI) |
| **Route Streaming** | None (All routes parsed upfront) | On-Demand dynamic import (`import()`) | Bandwidth conserved for unvisited routes |
| **Fallback UI** | None | Smooth pulse spinner (`<PageFallback />`) | Prevents blank screen flickers |

---

## 💻 Implementation Details
1. **Route-based Lazy Loading (`App.jsx`):**
   ```javascript
   const Home = lazy(() => import('./pages/Home'));
   const Projects = lazy(() => import('./components/Projects'));
   const TaskManager = lazy(() => import('./pages/TaskManager'));
   const AuthPage = lazy(() => import('./pages/AuthPage'));
   const Contact = lazy(() => import('./pages/Contact'));
   ```
2. **Suspense Wrapper:**
   ```javascript
   <Suspense fallback={<PageFallback />}>
     <Routes>...</Routes>
   </Suspense>
   ```
3. **On-Demand Component Loading (Supplementary):**
   - Implemented a floating **Performance Profiler** (`PerformanceProfiler.jsx`) that measures live navigation timings and JS memory heap usage, streaming in only upon user click.

---

## 🚀 How to Verify Locally
```bash
cd Portfolio
npm run build
```
Notice the individual `.js` chunk files created in `dist/assets/` corresponding to each lazy-loaded page route.
