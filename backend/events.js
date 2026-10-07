const EventEmitter = require('events');

/**
 * Practical 10: Asynchronous Processing with Event-Driven Architecture
 * Node.js built-in EventEmitter subclass for decoupling side-effects
 * (email notifications, logging, audits) from the critical API request path.
 */
class TaskEvents extends EventEmitter {
  constructor() {
    super();
    // Allow up to 20 concurrent listeners without leak warnings
    this.setMaxListeners(20);
    // In-memory buffer to store recent event dispatch logs for telemetry & verification
    this.eventLogs = [];
    this.maxLogs = 50;
  }

  /**
   * Record an event execution log entry with timing telemetry
   */
  logEvent(entry) {
    this.eventLogs.unshift({
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      ...entry
    });
    if (this.eventLogs.length > this.maxLogs) {
      this.eventLogs.pop();
    }
  }

  /**
   * Retrieve event logs for testing and frontend telemetry
   */
  getEventLogs() {
    return [...this.eventLogs];
  }

  /**
   * Reset the event log history
   */
  clearEventLogs() {
    this.eventLogs = [];
  }
}

// Export a singleton instance across the application
module.exports = new TaskEvents();
