import React from 'react';

function About({ bio, education, location, experienceYear }) {
  return (
    <section id="about" className="section about-section">
      <div className="section-header">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">Get to know more about my journey and background</p>
      </div>

      <div className="about-grid">
        <div className="about-card main-bio">
          <h3>Background & Passion</h3>
          <p>{bio}</p>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">{experienceYear}+</span>
              <span className="stat-label">Years of Coding</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Projects Built</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Dedication</span>
            </div>
          </div>
        </div>

        <div className="about-card education-card">
          <h3>Education & Details</h3>
          <ul className="details-list">
            <li>
              <strong>Degree:</strong> {education.degree}
            </li>
            <li>
              <strong>Institution:</strong> {education.institution}
            </li>
            <li>
              <strong>Specialization:</strong> {education.field}
            </li>
            <li>
              <strong>Location:</strong> {location}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;
