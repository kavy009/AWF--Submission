# Practical 1 & 2: React Component Architecture, State Management & Routing

## Subject: Advanced Web Development Frameworks (ITUE301)
**Semester:** 5th  
**Course Outcomes / Program Outcomes:** CO1 / PO3, PO5  

---

## 🎯 Practical 1: Introduction to React and Component Architecture
- **Objective:** To set up a React development environment using Vite and build a static UI using independently structured, reusable components.
- **Components Built:** `Header`, `About`, `Skills`, `Projects`, `Footer`.
- **Props Flow:** Structured data passed into `Header`, `About`, `Skills`, and `Footer`.

---

## 🎯 Practical 2: State Management and Routing in React
- **Objective:** To implement reactive state management using `useState` and multi-page navigation using `React Router v6` without full page reload.

### 🗺️ Multi-Route Architecture
The application is wrapped in `<BrowserRouter>` inside `src/main.jsx`. Routes are defined using `<Routes>` and `<Route>` in `src/App.jsx`:

| Route Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Composes Hero Header, About, Skills, and toggleable highlights |
| `/projects` | `Projects.jsx` | Showcases featured student development projects |
| `/contact` | `Contact.jsx` | Controlled form with real-time state preview, character count & help toggle |
| `*` | `NotFound.jsx` | Custom 404 page for handling undefined/unknown routes |

### ⚡ State Management (`useState`) Highlights:
1. **Dark/Light Mode Theme Toggle:** Controlled via `darkMode` state in `App.jsx`, applies dynamic theme class to root body.
2. **Controlled Contact Form:** Controlled inputs for `senderName`, `senderEmail`, and `message` capturing user input in real-time.
3. **Live Character Counter:** Dynamically updates and displays character count / remaining quota below the textarea.
4. **Real-time State Preview:** Live visual feedback card displaying input values on every keystroke.
5. **UI Visibility Toggles:** 
   - `showTooltip` in `Contact.jsx` toggles guidelines and help banner.
   - `showMoreInfo` in `Home.jsx` toggles quick academic highlights.

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

Visit `http://localhost:5173` to test navigation across `/`, `/projects`, `/contact`, and any unknown URL to verify the 404 page.
