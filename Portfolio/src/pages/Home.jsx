import React, { useState } from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Skills from '../components/Skills';

function Home({ studentData }) {
  // useState variable for toggling UI visibility (additional info / highlights)
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <div className="page home-page">
      <Header
        name={studentData.name}
        title={studentData.title}
        tagline={studentData.tagline}
        themeColor={studentData.themeColor}
      />

      <div className="section-toggle-container">
        <button
          type="button"
          className="btn btn-secondary toggle-btn"
          onClick={() => setShowMoreInfo(!showMoreInfo)}
        >
          {showMoreInfo ? '▲ Hide Quick Highlights' : '▼ Show Quick Highlights'}
        </button>

        {showMoreInfo && (
          <div className="toggleable-info-card">
            <h4>💡 Quick Academic Highlights</h4>
            <p>
              Current Focus: Microservices, React 18, and scalable API pipelines.
              Actively exploring performant client-side state caching and event-driven architectures.
            </p>
          </div>
        )}
      </div>

      <About
        bio={studentData.bio}
        education={studentData.education}
        location={studentData.location}
        experienceYear={studentData.experienceYear}
      />

      <Skills skillList={studentData.skills} />
    </div>
  );
}

export default Home;
