import React from 'react';

function NavBar({ activeSection, onNavigate }) {
  const navItems = [
    { id: 'header', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="#header" className="nav-logo">
          <span className="logo-accent">&lt;</span>DevPortfolio<span className="logo-accent">/&gt;</span>
        </a>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav-link-btn ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
