import React, { useState, useEffect } from 'react';

function PerformanceProfiler({ onClose }) {
  const [metrics, setMetrics] = useState({
    domNodes: 0,
    memoryUsedMB: null,
    navigationTimingMs: 0,
    activeChunks: []
  });

  useEffect(() => {
    const domCount = document.querySelectorAll('*').length;
    let memMB = null;
    if (window.performance && window.performance.memory) {
      memMB = (window.performance.memory.usedJSHeapSize / (1024 * 1024)).toFixed(2);
    }

    let navTiming = 0;
    if (window.performance && window.performance.getEntriesByType) {
      const navEntries = window.performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        navTiming = Math.round(navEntries[0].duration);
      }
    }

    // Detected code-split script chunks in document head
    const scripts = Array.from(document.querySelectorAll('script[src]'))
      .map((s) => s.src.split('/').pop())
      .filter((s) => s && s.endsWith('.js'));

    setMetrics({
      domNodes: domCount,
      memoryUsedMB: memMB,
      navigationTimingMs: navTiming,
      activeChunks: scripts
    });
  }, []);

  return (
    <div className="profiler-modal-overlay">
      <div className="profiler-modal-card">
        <div className="profiler-header">
          <h3>📊 Runtime Performance & Chunk Profiler</h3>
          <button type="button" className="close-profiler-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <p className="profiler-desc">
          Lazy-loaded on demand using <code>React.lazy()</code> to demonstrate deferred bundle parsing (Practical 8 Supplementary).
        </p>

        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-val">{metrics.navigationTimingMs} ms</span>
            <span className="metric-key">Page Navigation Timing</span>
          </div>

          <div className="metric-box">
            <span className="metric-val">{metrics.domNodes}</span>
            <span className="metric-key">Total DOM Elements</span>
          </div>

          <div className="metric-box">
            <span className="metric-val">{metrics.memoryUsedMB ? `${metrics.memoryUsedMB} MB` : 'N/A in browser'}</span>
            <span className="metric-key">JS Heap Memory</span>
          </div>

          <div className="metric-box">
            <span className="metric-val">6</span>
            <span className="metric-key">Split Route Chunks</span>
          </div>
        </div>

        <div className="chunk-list-box">
          <h4>🧩 Loaded JavaScript Bundles in DOM:</h4>
          <ul>
            {metrics.activeChunks.length > 0 ? (
              metrics.activeChunks.map((c, i) => <li key={i}>{c}</li>)
            ) : (
              <li>Vite Client Dev Bundle / ES Modules loaded dynamically</li>
            )}
          </ul>
        </div>

        <button type="button" className="btn btn-secondary profiler-close-btn" onClick={onClose}>
          Close Performance Inspector
        </button>
      </div>
    </div>
  );
}

export default PerformanceProfiler;
