import React from 'react';

function Footer({ email, github, studentName, rollNo }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="site-footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>Get In Touch</h3>
          <p>Interested in collaborating or discussing web development projects?</p>
          <div className="footer-links">
            {email && (
              <a href={`mailto:${email}`} className="footer-link">
                ✉️ {email}
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="footer-link">
                💻 GitHub Profile
              </a>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {studentName} ({rollNo}). ITUE301 Advanced Web Development Frameworks.
          </p>
          <p className="built-with">Built with Vite + React 18</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
