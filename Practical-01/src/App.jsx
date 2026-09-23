import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import PageFallback from './components/PageFallback';

// Route-based Code Splitting using React.lazy() (Practical 8 Core Requirement)
const Home = lazy(() => import('./pages/Home'));
const Projects = lazy(() => import('./components/Projects'));
const TaskManager = lazy(() => import('./pages/TaskManager'));
const Contact = lazy(() => import('./pages/Contact'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Supplementary: Heavy Component Lazy Loading on Demand
const PerformanceProfiler = lazy(() => import('./components/PerformanceProfiler'));

function App() {
  // useState variable for theme mode toggle (Supplementary requirement)
  const [darkMode, setDarkMode] = useState(true);

  // Practical 7: Authentication state management
  const [authUser, setAuthUser] = useState(() => {
    try {
      const stored = localStorage.getItem('awf_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Practical 8: State to trigger on-demand lazy loaded profiler component
  const [showProfiler, setShowProfiler] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('awf_auth_token');
    localStorage.removeItem('awf_auth_user');
    setAuthUser(null);
  };

  const studentData = {
    name: 'Kavya Chauhan',
    title: 'Full Stack Web Developer & Computer Engineering Student',
    tagline: 'Passionate about building scalable modern web applications with React, Node.js, and cloud technologies.',
    themeColor: '#6366f1',
    bio: 'I am a 3rd-year student pursuing Information Technology / Computer Engineering at Charotar University of Science and Technology (CHARUSAT). I focus on modern frontend frameworks, RESTful API architecture, and scalable full-stack applications.',
    education: {
      degree: 'B.Tech in Computer Engineering',
      institution: 'Charotar University of Science and Technology (CHARUSAT)',
      field: 'Advanced Web Development Frameworks (ITUE301)'
    },
    location: 'Gujarat, India',
    experienceYear: 2,
    skills: [
      { name: 'React.js', level: 'Advanced' },
      { name: 'JavaScript (ES6+)', level: 'Advanced' },
      { name: 'Node.js & Express', level: 'Intermediate' },
      { name: 'MongoDB & Mongoose', level: 'Intermediate' },
      { name: 'HTML5 & Modern CSS3', level: 'Advanced' },
      { name: 'Git & GitHub', level: 'Intermediate' },
      { name: 'REST APIs & JWT Auth', level: 'Intermediate' },
      { name: 'Vite & Modern Tooling', level: 'Advanced' }
    ],
    email: 'chauhankavya9116@gmail.com',
    github: 'https://github.com/kavy009',
    rollNo: '24CE017'
  };

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
  }, [darkMode]);

  return (
    <div className={`portfolio-app ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      <NavBar
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        authUser={authUser}
      />

      {/* Floating button to trigger on-demand lazy loaded profiler */}
      <button
        type="button"
        className="floating-profiler-btn"
        onClick={() => setShowProfiler(true)}
        title="Open Lazy-Loaded Performance Profiler (Practical 8)"
      >
        ⚡ Performance Profiler
      </button>

      {/* Lazy loaded Heavy Component wrapped in Suspense */}
      {showProfiler && (
        <Suspense fallback={<div className="profiler-loading">Loading Profiler Chunk...</div>}>
          <PerformanceProfiler onClose={() => setShowProfiler(false)} />
        </Suspense>
      )}
      
      <main className="main-content">
        {/* Suspense wrapper with fallback UI for lazy-loaded route chunks */}
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Home studentData={studentData} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<TaskManager authUser={authUser} />} />
            <Route
              path="/auth"
              element={
                <AuthPage
                  user={authUser}
                  onAuthSuccess={setAuthUser}
                  onLogout={handleLogout}
                />
              }
            />
            <Route path="/contact" element={<Contact studentEmail={studentData.email} />} />
            {/* Supplementary 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer
        email={studentData.email}
        github={studentData.github}
        studentName={studentData.name}
        rollNo={studentData.rollNo}
      />
    </div>
  );
}

export default App;
