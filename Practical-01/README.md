# Practical 1: Introduction to React and Component Architecture

## Subject: Advanced Web Development Frameworks (ITUE301)
**Semester:** 5th  
**Course Outcomes / Program Outcomes:** CO1 / PO3, PO5  

---

## 🎯 Objective
To set up a React development environment using Vite and build a static UI using independently structured, reusable components.

---

## 🏗️ Architecture & Component Tree
```
App.jsx
 ├── NavBar.jsx     (navigation bar highlighting active section)
 ├── Header.jsx     (site title, name, theme color prop)
 ├── About.jsx      (short bio, education, experience)
 ├── Skills.jsx     (dynamic list of skills mapped via props)
 ├── Projects.jsx   (featured academic & personal projects)
 └── Footer.jsx     (contact, github link, copyright info)
```

---

## 🚀 Features & Rubrics Fulfillment
1. **Vite + React 18 Setup:** Fast, modern development environment with clean folder structure.
2. **Dedicated `/components` Folder:** All reusable components (`NavBar`, `Header`, `About`, `Skills`, `Projects`, `Footer`) are modular and cleanly separated.
3. **Props Usage:**
   - `Header`: Receives `name`, `title`, `tagline`, and `themeColor` (applied as inline style).
   - `Skills`: Receives an array of skill objects (`skillList`) and renders them dynamically using `.map()`.
   - `About`: Receives `bio`, `education`, `location`, `experienceYear`.
   - `Footer`: Receives `email`, `github`, `studentName`, `rollNo`.
4. **Supplementary Problems Solved:**
   - Active section navigation via `NavBar`.
   - Dynamic skill rendering from prop array.
   - Theme color prop passed to Header and applied inline.
   - 3 Hardcoded featured projects displayed cleanly.
5. **No Duplicate Logic or JSX:** Adheres strictly to component separation and DRY principles.

---

## 💻 How to Run Locally

```bash
# Navigate to Practical-01 directory
cd Practical-01

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev
```

Open your browser at `http://localhost:5173` to explore the student portfolio.
