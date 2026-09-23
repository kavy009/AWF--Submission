import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Projects from './components/Projects';

function App() {
  // useState variable for theme mode toggle (Supplementary requirement)
  const [darkMode, setDarkMode] = useState(true);

  const studentData = {
    name: 'Kavya Chauhan',
    title: 'Full Stack Web Developer & Computer Engineering Student',
    tagline: 'Passionate about building scalable modern web applications with React, Node.js, and cloud technologies.',
    themeColor: '#6366f1',
    bio: 'I am a 3rd-year student pursuing Information Technology / Computer Engineering at Charotar University of Science and Technology (CHARUSAT). I focus on modern frontend frameworks, RESTful API architecture, and scalable full-stack applications.',
    education: {
      degree: 'B.Tech in Information Technology',
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
    rollNo: '22IT009'
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
      <NavBar darkMode={darkMode} onToggleTheme={handleToggleTheme} />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home studentData={studentData} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact studentEmail={studentData.email} />} />
          {/* Supplementary 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
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
