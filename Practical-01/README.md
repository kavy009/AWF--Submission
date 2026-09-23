# Practicals 1, 2 & 3: Component Architecture, Routing & REST API Integration

## Subject: Advanced Web Development Frameworks (ITUE301)
**Semester:** 5th  
**Course Outcomes / Program Outcomes:** CO1 / PO3, PO5  

---

## 🎯 Practical 1: Introduction to React and Component Architecture
- **Objective:** To set up a React development environment using Vite and build a static UI using independently structured, reusable components.
- **Components:** `Header`, `About`, `Skills`, `Projects`, `Footer`.
- **Props Flow:** Passing data from parent `App.jsx` into child components.

---

## 🎯 Practical 2: State Management and Routing in React
- **Objective:** To implement reactive state management using `useState` and multi-page navigation using `React Router v6` without full page reload.
- **Routes:** `/` (Home), `/projects` (Projects), `/contact` (Contact), `*` (404 NotFound).
- **State Hooks:** Dark/Light mode theme switch, controlled inputs, live character counter, and UI help tooltips.

---

## 🎯 Practical 3: API Integration and Data Rendering in React
- **Objective:** To consume a public REST API in React and handle asynchronous data with loading, error, and success states.

### 🌐 REST API Integrated
- **Endpoint:** `https://api.github.com/users/kavy009/repos`
- **Method:** `GET`
- **Hook Used:** `useEffect` with dependency array `[]` (fires once on component mount to prevent infinite re-fetching).
- **Asynchronous States Handled:**
  1. **Loading State:** Displays `<Spinner />` with a spinner animation while data is being fetched.
  2. **Error State:** Catches network/HTTP errors and displays `<ErrorMessage />` with an interactive **"Try Again"** retry button.
  3. **Success State:** Parses JSON response and renders repository cards with:
     - Repository Name & Direct Link
     - Description
     - Programming Language
     - Stargazers Count (⭐)
     - Forks Count (🍴)
4. **Supplementary Enhancements:**
   - **Real-time Search Filter:** Instantly filters repositories by keyword/name.
   - **Simulate Error Mode:** Interactive toggle to test the error boundary / failure handling during lab viva evaluation.

---

## 💻 How to Run Locally

```bash
# Navigate to the portfolio directory
cd Practical-01

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Visit `http://localhost:5173` and click on **Projects** in the navigation bar to see live GitHub API data rendering with loading indicators and search filter.
