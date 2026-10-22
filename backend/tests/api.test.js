/**
 * Practical 12: Automated Integration & Unit Test Suite
 * ITUE301: Advanced Web Development Frameworks
 * Student: Kavya Chauhan (24CE017)
 * 
 * Executed automatically in CI/CD pipeline (.github/workflows/ci.yml)
 */

const request = require('supertest');
const app = require('../server');

describe('Practical 12: CI/CD Automated Test Suite', () => {

  // ---------------------------------------------------------------------------
  // 1. Health & In-Memory Cache Stats (Practical 9 & 11)
  // ---------------------------------------------------------------------------
  describe('GET /cache-stats - Service Health & Telemetry', () => {
    it('should return status 200 with cache telemetry metrics', async () => {
      const res = await request(app).get('/cache-stats');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('cache');
      expect(res.body.cache).toHaveProperty('hits');
      expect(res.body.cache).toHaveProperty('misses');
    });
  });

  // ---------------------------------------------------------------------------
  // 2. Route Security & JWT Authentication Gate (Practical 7)
  // ---------------------------------------------------------------------------
  describe('GET /tasks - Route Protection & Authentication Guard', () => {
    it('should reject unauthenticated requests with 401 Unauthorized', async () => {
      const res = await request(app).get('/tasks');
      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toMatch(/token/i);
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Request Validation Pipeline & Content-Type Enforcement (Practical 4 & 5)
  // ---------------------------------------------------------------------------
  describe('POST /tasks - Input Validation & Middleware Pipeline', () => {
    it('should reject non-JSON Content-Type with 400 Bad Request', async () => {
      const res = await request(app)
        .post('/tasks')
        .set('Content-Type', 'text/plain')
        .send('raw text payload');

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body.message).toMatch(/Content-Type must be application\/json/i);
    });

    it('should reject requests without authorization header with 401', async () => {
      const res = await request(app)
        .post('/tasks')
        .set('Content-Type', 'application/json')
        .send({ title: 'New Task', description: 'Sample' });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Asynchronous Event System Verification (Practical 10)
  // ---------------------------------------------------------------------------
  describe('GET /events/logs - Event-Driven Architecture Log', () => {
    it('should return recent EventEmitter log array with status 200', async () => {
      const res = await request(app).get('/events/logs');
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(Array.isArray(res.body.events)).toBe(true);
    });
  });

  // ---------------------------------------------------------------------------
  // 5. Practical 12 Requirement: Demonstrable Pipeline Fail/Pass Assertion
  // ---------------------------------------------------------------------------
  describe('CI/CD Pipeline Failure & Recovery Demonstration (Practical 12 Rubric)', () => {
    it('should pass in standard mode, and fail when FAIL_TEST=true is simulated', async () => {
      const res = await request(app).get('/cache-stats');

      if (process.env.FAIL_TEST === 'true') {
        // Deliberately broken assertion to demonstrate failed pipeline in GitHub Actions
        console.log('\n[SIMULATED CI FAILURE] Intentionally triggering test failure for Practical 12 demonstration...');
        expect(res.statusCode).toBe(999); // Deliberate failure: expected 999 but received 200
      } else {
        // Normal verified passing behavior
        expect(res.statusCode).toBe(200);
      }
    });
  });

});
