import React from 'react';

function Skills({ skillList }) {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-header">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>
      </div>

      <div className="skills-container">
        <ul className="skills-list">
          {skillList && skillList.map((skill, index) => (
            <li key={typeof skill === 'string' ? skill : index} className="skill-item">
              <span className="skill-dot"></span>
              <span className="skill-name">{typeof skill === 'string' ? skill : skill.name}</span>
              {skill.level && <span className="skill-level">{skill.level}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;
