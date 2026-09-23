import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function NavBar({ darkMode, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-accent">&lt;</span>DevPortfolio<span className="logo-accent">/&gt;</span>
        </Link>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'nav-link-btn active' : 'nav-link-btn'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive ? 'nav-link-btn active' : 'nav-link-btn'
              }
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive ? 'nav-link-btn active' : 'nav-link-btn'
              }
            >
              Tasks (Full Stack)
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? 'nav-link-btn active' : 'nav-link-btn'
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Theme mode toggle button using useState in App */}
        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle theme mode"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
