import React from 'react';

function Header({ name, title, tagline, themeColor }) {
  return (
    <header id="header" className="hero-header" style={{ borderColor: themeColor }}>
      <div className="hero-content">
        <span className="badge" style={{ backgroundColor: `${themeColor}22`, color: themeColor }}>
          Welcome to my portfolio
        </span>
        <h1 className="hero-title">
          Hi, I'm <span style={{ color: themeColor }}>{name}</span>
        </h1>
        <h2 className="hero-subtitle">{title}</h2>
        <p className="hero-tagline">{tagline}</p>
        <div className="hero-actions">
          <a
            href="#projects"
            className="btn btn-primary"
            style={{ backgroundColor: themeColor, borderColor: themeColor }}
          >
            View Projects
          </a>
          <a href="#about" className="btn btn-secondary">
            Learn More
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
