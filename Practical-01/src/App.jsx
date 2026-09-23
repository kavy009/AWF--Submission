import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('header');

  const studentData = {
    name: 'Kavya Chauhan',
    title: 'Full Stack Web Developer & Computer Engineering Student',
    tagline: 'Passionate about building scalable modern web applications with React, Node.js, and cloud technologies.',
    themeColor: '#4f46e5',
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

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app">
      <NavBar activeSection={activeSection} onNavigate={handleNavigate} />
      <main className="main-content">
        <Header
          name={studentData.name}
          title={studentData.title}
          tagline={studentData.tagline}
          themeColor={studentData.themeColor}
        />
        <About
          bio={studentData.bio}
          education={studentData.education}
          location={studentData.location}
          experienceYear={studentData.experienceYear}
        />
        <Skills skillList={studentData.skills} />
        <Projects />
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
