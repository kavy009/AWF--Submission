import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-card">
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h3 className="error-title">Failed to Load Repositories</h3>
        <p className="error-desc">{message || 'An unexpected network error occurred while reaching GitHub API.'}</p>
        {onRetry && (
          <button type="button" className="btn btn-primary retry-btn" onClick={onRetry}>
            🔄 Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;
