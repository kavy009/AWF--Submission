import React, { useState, useEffect, useCallback } from 'react';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [simulateError, setSimulateError] = useState(false);

  const username = 'kavy009';

  const fetchRepositories = useCallback(() => {
    setLoading(true);
    setError(null);

    // If simulateError is true, test the error state explicitly for viva / lab evaluation
    const url = simulateError
      ? 'https://api.github.com/invalid-url-for-testing-awf'
      : `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`GitHub API request failed with status: ${res.status} (${res.statusText})`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRepos(data);
        } else {
          setRepos([]);
        }
      })
      .catch((err) => {
        setError(err.message || 'Unable to fetch repositories.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [simulateError]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  // Filter repositories dynamically by name
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section id="projects" className="section projects-section">
      <div className="section-header">
        <h2 className="section-title">GitHub Projects & Repositories</h2>
        <p className="section-subtitle">
          Live repository data fetched directly via GitHub REST API (Practical 3 Integration)
        </p>
      </div>

      {/* Control bar: Search Filter + Simulated Error Toggle for Testing */}
      <div className="projects-controls">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search repositories by name or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>

        <div className="demo-controls">
          <button
            type="button"
            className={`btn-test-error ${simulateError ? 'active' : ''}`}
            onClick={() => setSimulateError((prev) => !prev)}
            title="Toggle invalid endpoint to test Error Boundary / Error state"
          >
            {simulateError ? '⚠️ Revert to Valid API' : '🧪 Simulate API Error'}
          </button>
          <button
            type="button"
            className="btn btn-secondary reload-btn"
            onClick={fetchRepositories}
            disabled={loading}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Conditional Rendering based on state */}
      {loading && <Spinner message="Fetching public repositories from api.github.com..." />}

      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={fetchRepositories}
        />
      )}

      {!loading && !error && filteredRepos.length === 0 && (
        <div className="empty-state-card">
          <p>No repositories found matching "<strong>{searchTerm}</strong>".</p>
        </div>
      )}

      {!loading && !error && filteredRepos.length > 0 && (
        <div className="projects-grid">
          {filteredRepos.map((repo) => (
            <div key={repo.id} className="project-card repo-card">
              <div className="project-card-header">
                <span className="repo-icon">📦</span>
                <h3 className="project-title repo-title">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-link"
                  >
                    {repo.name}
                  </a>
                </h3>
              </div>

              <p className="project-desc repo-desc">
                {repo.description || 'No description provided for this repository.'}
              </p>

              <div className="repo-metadata">
                {repo.language && (
                  <span className="repo-meta-item">
                    <span className="lang-indicator"></span>
                    {repo.language}
                  </span>
                )}
                {/* Star count requirement */}
                <span className="repo-meta-item stars-badge">
                  ⭐ {repo.stargazers_count || 0}
                </span>
                {repo.forks_count !== undefined && (
                  <span className="repo-meta-item forks-badge">
                    🍴 {repo.forks_count}
                  </span>
                )}
              </div>

              <div className="project-card-footer">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-external-link"
                >
                  View on GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;
