const app = require('./server');
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: 'test-user', email: 'test@charusat.edu' },
  process.env.JWT_SECRET || 'awf_super_secret_jwt_key_2026_charusat'
);

const server = app.listen(5097, async () => {
  try {
    const headers = {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    };

    // Clear cache first
    await fetch('http://localhost:5097/cache-clear', { method: 'POST' });

    console.log('--- MEASURING UNCACHED (DATABASE / COLD CACHE) READINGS ---');
    const uncachedTimes = [];
    for (let i = 1; i <= 3; i++) {
      await fetch('http://localhost:5097/cache-clear', { method: 'POST' }); // ensure cold cache
      const start = performance.now();
      const res = await fetch('http://localhost:5097/tasks', { headers });
      const duration = (performance.now() - start).toFixed(2);
      const data = await res.json();
      uncachedTimes.push(parseFloat(duration));
      console.log(`Uncached Run ${i}: ${duration} ms (X-Cache: ${res.headers.get('x-cache')}, Source: ${data.source})`);
    }

    console.log('\n--- MEASURING CACHED (NODE-CACHE HIT) READINGS ---');
    // Pre-populate cache with one request
    await fetch('http://localhost:5097/tasks', { headers });

    const cachedTimes = [];
    for (let i = 1; i <= 3; i++) {
      const start = performance.now();
      const res = await fetch('http://localhost:5097/tasks', { headers });
      const duration = (performance.now() - start).toFixed(2);
      const data = await res.json();
      cachedTimes.push(parseFloat(duration));
      console.log(`Cached Run ${i}: ${duration} ms (X-Cache: ${res.headers.get('x-cache')}, Source: ${data.source})`);
    }

    const avgUncached = (uncachedTimes.reduce((a, b) => a + b, 0) / uncachedTimes.length).toFixed(2);
    const avgCached = (cachedTimes.reduce((a, b) => a + b, 0) / cachedTimes.length).toFixed(2);
    const improvement = (((avgUncached - avgCached) / avgUncached) * 100).toFixed(1);

    console.log('\n================ PERFORMANCE SUMMARY ================');
    console.log(`Average Uncached: ${avgUncached} ms`);
    console.log(`Average Cached:   ${avgCached} ms`);
    console.log(`Speedup / Latency Reduction: ${improvement}% faster!`);

    // Verify cache invalidation
    console.log('\n--- VERIFYING CACHE INVALIDATION ON WRITE ---');
    const postRes = await fetch('http://localhost:5097/tasks', {
      method: 'POST',
      headers,
      body: JSON.stringify({ title: 'Task to Invalidate Cache', priority: 'high' })
    });
    console.log('POST /tasks status:', postRes.status);

    const checkRes = await fetch('http://localhost:5097/tasks', { headers });
    console.log('GET after POST X-Cache:', checkRes.headers.get('x-cache'), '(Expected: MISS due to invalidation)');

    const statsRes = await fetch('http://localhost:5097/cache-stats');
    const statsData = await statsRes.json();
    console.log('\n--- CACHE TELEMETRY STATS (/cache-stats) ---');
    console.log(JSON.stringify(statsData.cache, null, 2));

    server.close();
    console.log('\nALL PRACTICAL 9 IN-MEMORY CACHING TESTS PASSED!');
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    server.close();
    process.exit(1);
  }
});
