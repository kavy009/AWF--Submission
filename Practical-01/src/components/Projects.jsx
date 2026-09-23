import React from 'react';

function Projects({ projectsList }) {
  const defaultProjects = [
    {
      id: 1,
      title: 'DevPortfolio Platform',
      description: 'A responsive single page application showcasing web development skills built with Vite and React.',
      tags: ['React', 'Vite', 'CSS3']
    },
    {
      id: 2,
      title: 'Task Tracker REST API',
      description: 'Full-stack task manager application with Express backend, middleware pipeline, and MongoDB.',
      tags: ['Node.js', 'Express', 'MongoDB']
    },
    {
      id: 3,
      title: 'Weather & Forecast Dashboard',
      description: 'Dynamic dashboard consuming REST APIs with real-time state synchronization and cached responses.',
      tags: ['JavaScript', 'REST API', 'Tailwind']
    }
  ];

  const projectsToDisplay = projectsList || defaultProjects;

  return (
    <section id="projects" className="section projects-section">
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">A collection of academic and personal work</p>
      </div>

      <div className="projects-grid">
        {projectsToDisplay.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-card-header">
              <span className="project-number">0{project.id}</span>
              <h3 className="project-title">{project.title}</h3>
            </div>
            <p className="project-desc">{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
