import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The requested route does not exist in this single page application.</p>
        <Link to="/" className="btn btn-primary back-home-btn">
          ← Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
