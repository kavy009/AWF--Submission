import React, { useState } from 'react';

function Contact({ studentEmail }) {
  // useState 1: Controlled form fields
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    message: ''
  });

  // useState 2: Toggle UI visibility (Help Tooltip)
  const [showTooltip, setShowTooltip] = useState(false);

  // Status message
  const [submitted, setSubmitted] = useState(false);

  const maxChars = 250;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (submitted) setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.senderName || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section className="section contact-page">
      <div className="section-header">
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">
          Feel free to reach out for collaborations or project discussions
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-form-card">
          <div className="card-top-bar">
            <h3>Send a Message</h3>
            <button
              type="button"
              className="tooltip-toggle-btn"
              onClick={() => setShowTooltip(!showTooltip)}
              title="Click to toggle instructions tooltip"
            >
              ℹ️ {showTooltip ? 'Hide Help' : 'Help & Guidelines'}
            </button>
          </div>

          {/* useState UI visibility toggle element */}
          {showTooltip && (
            <div className="help-tooltip-box">
              <p>
                <strong>Form Instructions:</strong> Please provide your name, valid email, and your
                inquiry. All inputs are controlled via React <code>useState</code> and reflect in real-time.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="senderName">Your Name:</label>
              <input
                id="senderName"
                type="text"
                name="senderName"
                placeholder="e.g. John Doe"
                value={formData.senderName}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="senderEmail">Your Email:</label>
              <input
                id="senderEmail"
                type="email"
                name="senderEmail"
                placeholder="e.g. john@example.com"
                value={formData.senderEmail}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                maxLength={maxChars}
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
                className="form-textarea"
              ></textarea>
              {/* Live character count requirement */}
              <div className="char-count-bar">
                <span>
                  Character Count: <strong>{formData.message.length}</strong> / {maxChars}
                </span>
                <span className="remaining-text">
                  {maxChars - formData.message.length} characters remaining
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              Send Message
            </button>

            {submitted && (
              <div className="success-banner">
                ✅ Thank you, {formData.senderName}! Your message was captured into React state.
              </div>
            )}
          </form>
        </div>

        {/* Real-Time Live Preview showing controlled input reflection */}
        <div className="live-preview-card">
          <div className="preview-header">
            <h3>⚡ Real-Time State Preview</h3>
            <span className="live-indicator">LIVE</span>
          </div>
          <p className="preview-desc">
            Demonstrates controlled component reactivity powered by <code>useState</code>:
          </p>

          <div className="preview-item">
            <span className="preview-label">Name:</span>
            <span className="preview-value">{formData.senderName || '(typing preview...)'}</span>
          </div>

          <div className="preview-item">
            <span className="preview-label">Email:</span>
            <span className="preview-value">{formData.senderEmail || '(typing preview...)'}</span>
          </div>

          <div className="preview-item">
            <span className="preview-label">Live Message Stream:</span>
            <div className="preview-message-box">
              {formData.message || 'Start typing in the message box to see live state reflection...'}
            </div>
          </div>

          <div className="preview-item">
            <span className="preview-label">Direct Contact:</span>
            <span className="preview-value">{studentEmail}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
