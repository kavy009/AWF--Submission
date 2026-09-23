const NodeCache = require('node-cache');

// Initialize cache with standard 60-second TTL
const nodeCacheInstance = new NodeCache({
  stdTTL: 60,
  checkperiod: 120
});

// Cache telemetry counters (Practical 9 Supplementary requirement)
let hitCount = 0;
let missCount = 0;

const cache = {
  get(key) {
    const value = nodeCacheInstance.get(key);
    if (value !== undefined) {
      hitCount++;
      return { data: value, hit: true };
    }
    missCount++;
    return { data: null, hit: false };
  },

  set(key, value, ttl = 60) {
    return nodeCacheInstance.set(key, value, ttl);
  },

  del(key) {
    return nodeCacheInstance.del(key);
  },

  flush() {
    return nodeCacheInstance.flushAll();
  },

  getStats() {
    const keys = nodeCacheInstance.keys();
    const totalRequests = hitCount + missCount;
    const hitRate = totalRequests > 0 ? ((hitCount / totalRequests) * 100).toFixed(1) + '%' : '0%';

    return {
      hits: hitCount,
      misses: missCount,
      totalRequests,
      hitRate,
      activeKeys: keys,
      stdTTL: 60
    };
  }
};

module.exports = cache;
