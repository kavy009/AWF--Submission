import React from 'react';

function PageFallback({ routeName = 'chunk' }) {
  return (
    <div className="page-fallback-container">
      <div className="fallback-card">
        <div className="fallback-pulse-ring"></div>
        <div className="fallback-text-group">
          <h3>⚡ Code-Split Chunk Loading...</h3>
          <p>
            Dynamically streaming JavaScript bundle via <code>React.lazy()</code> & <code>Suspense</code>
          </p>
          <span className="network-hint">Network: Async Module Stream</span>
        </div>
      </div>
    </div>
  );
}

export default PageFallback;
