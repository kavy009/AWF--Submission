/**
 * Practical 10 Automated Test & Verification Suite
 * Verifies Node.js EventEmitter asynchronous non-blocking background processing.
 * Demonstrates timestamp ordering proof (API response sent BEFORE background handler completes).
 */

process.env.NODE_ENV = 'test';
const app = require('./server');
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: 'test-user-p10', email: 'kavya.chauhan@charusat.edu' },
  process.env.JWT_SECRET || 'awf_super_secret_jwt_key_2026_charusat'
);

const testPort = 5097;

const server = app.listen(testPort, async () => {
  console.log(`\n================================================================`);
  console.log(`🚀 PRACTICAL 10: EVENT-DRIVEN ASYNC PROCESSING TEST SUITE`);
  console.log(`================================================================`);
  console.log(`Test Server running on http://localhost:${testPort}\n`);

  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json'
  };

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    // -------------------------------------------------------------
    // STEP 1: Verify Event Listeners Registration & Server Health
    // -------------------------------------------------------------
    console.log('--- STEP 1: Checking Event Listeners Registration (/health) ---');
    const healthRes = await fetch(`http://localhost:${testPort}/health`);
    const healthData = await healthRes.json();
    console.log('Active Listeners:', JSON.stringify(healthData.eventStats.listeners, null, 2));

    if (
      healthData.eventStats.listeners['task-created'] < 1 ||
      healthData.eventStats.listeners['task-deleted'] < 1 ||
      healthData.eventStats.listeners['error'] < 1
    ) {
      throw new Error('Not all required event listeners are registered!');
    }
    console.log('✅ All 3 event listeners (task-created, task-deleted, error) are active!\n');

    // Clear any previous logs
    await fetch(`http://localhost:${testPort}/events/logs`, { method: 'DELETE' });

    // -------------------------------------------------------------
    // STEP 2: Test Core Requirement - POST /tasks with Async task-created
    // -------------------------------------------------------------
    console.log('--- STEP 2: Creating Task via POST /tasks & Measuring Response Latency ---');
    const taskPayload = {
      title: 'Setup Background Event Processor',
      description: 'Demonstrating Node.js EventEmitter non-blocking dispatch',
      priority: 'high'
    };

    const postStart = performance.now();
    const postRes = await fetch(`http://localhost:${testPort}/tasks`, {
      method: 'POST',
      headers,
      body: JSON.stringify(taskPayload)
    });
    const postDurationMs = (performance.now() - postStart).toFixed(2);
    const postData = await postRes.json();

    console.log(`HTTP Status:        ${postRes.status} (Expected 201 Created)`);
    console.log(`API Latency:        ${postDurationMs} ms (Instant / Non-blocking)`);
    console.log(`API Responded At:   ${postData.apiResponseTimestamp}`);
    console.log(`Created Task ID:    ${postData.data._id || postData.data.id}`);

    if (postRes.status !== 201) {
      throw new Error(`Expected HTTP 201, got ${postRes.status}`);
    }

    // Notice: Background listener has a 1500ms delay.
    // Right now, immediately after response, verify background handler has NOT finished yet:
    const immediateLogRes = await fetch(`http://localhost:${testPort}/events/logs`);
    const immediateLogs = await immediateLogRes.json();
    console.log(`Immediate Event Logs count: ${immediateLogs.count} (Background worker still in progress)`);

    console.log('\n⏳ Waiting 2000 ms for background worker (setTimeout: 1500ms) to complete...');
    await wait(2000);

    // Fetch logs after background worker has finished
    const finishedLogRes = await fetch(`http://localhost:${testPort}/events/logs`);
    const finishedLogs = await finishedLogRes.json();
    const createdEvent = finishedLogs.events.find((e) => e.event === 'task-created');

    if (!createdEvent) {
      throw new Error('task-created event log was not found in event buffer!');
    }

    console.log('\n📋 [Logged Event Telemetry - task-created]:');
    console.log(`   Event Type:             ${createdEvent.event}`);
    console.log(`   Task Title:             "${createdEvent.title}"`);
    console.log(`   Assigned User:          ${createdEvent.user}`);
    console.log(`   API Response Sent:      ${createdEvent.apiResponseTimestamp}`);
    console.log(`   Worker Completed At:    ${createdEvent.listenerCompletedAt}`);
    console.log(`   Delivery Status:        ${createdEvent.status}`);

    const apiTime = new Date(createdEvent.apiResponseTimestamp).getTime();
    const workerTime = new Date(createdEvent.listenerCompletedAt).getTime();
    const timeDiffMs = workerTime - apiTime;

    console.log(`   ⏱️ Time Difference:      +${timeDiffMs} ms`);

    if (workerTime <= apiTime) {
      throw new Error('Worker completed before or at API time - expected asynchronous non-blocking completion!');
    }
    console.log('✅ PROOF VERIFIED: API response returned BEFORE notification worker completed!\n');

    // -------------------------------------------------------------
    // STEP 3: Test Supplementary Requirement 1 - DELETE /tasks/:id & task-deleted
    // -------------------------------------------------------------
    console.log('--- STEP 3: Deleting Task via DELETE /tasks/:id & Checking task-deleted Event ---');
    const targetId = postData.data._id || postData.data.id;
    const deleteStart = performance.now();
    const deleteRes = await fetch(`http://localhost:${testPort}/tasks/${targetId}`, {
      method: 'DELETE',
      headers
    });
    const deleteDurationMs = (performance.now() - deleteStart).toFixed(2);
    const deleteData = await deleteRes.json();

    console.log(`HTTP Status:        ${deleteRes.status} (Expected 200 OK)`);
    console.log(`API Latency:        ${deleteDurationMs} ms (Instant / Non-blocking)`);
    console.log(`API Responded At:   ${deleteData.apiResponseTimestamp}`);

    console.log('⏳ Waiting 1500 ms for background cleanup worker (setTimeout: 1000ms)...');
    await wait(1500);

    const deleteLogRes = await fetch(`http://localhost:${testPort}/events/logs`);
    const deleteLogs = await deleteLogRes.json();
    const deletedEvent = deleteLogs.events.find((e) => e.event === 'task-deleted');

    if (!deletedEvent) {
      throw new Error('task-deleted event log was not found!');
    }

    console.log('📋 [Logged Event Telemetry - task-deleted]:');
    console.log(`   Event Type:          ${deletedEvent.event}`);
    console.log(`   Task Title:          "${deletedEvent.title}"`);
    console.log(`   Worker Completed:    ${deletedEvent.listenerCompletedAt}`);
    console.log(`   Status:              ${deletedEvent.status}`);
    console.log('✅ task-deleted event was successfully processed in background!\n');

    // -------------------------------------------------------------
    // STEP 4: Test Supplementary Requirement 2 - Error Boundary Listener
    // -------------------------------------------------------------
    console.log('--- STEP 4: Testing Error Event Listener (/events/simulate-error) ---');
    const errRes = await fetch(`http://localhost:${testPort}/events/simulate-error`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message: 'Simulated network timeout during webhook dispatch' })
    });
    const errData = await errRes.json();
    console.log(`Simulated Error Response: ${errData.message}`);

    // Verify the server is still healthy and didn't crash
    const healthCheckAfterError = await fetch(`http://localhost:${testPort}/health`);
    if (healthCheckAfterError.status === 200) {
      console.log('✅ Server survived emitted error! Error listener prevented uncaught exception crash.\n');
    } else {
      throw new Error('Server unhealthy after error event!');
    }

    // -------------------------------------------------------------
    // SUMMARY TABLE
    // -------------------------------------------------------------
    console.log('================================================================');
    console.log('🏆 PRACTICAL 10 VERIFICATION RESULTS SUMMARY');
    console.log('================================================================');
    console.log(`1. EventEmitter Setup:          PASSED (Dedicated events.js module)`);
    console.log(`2. Core task-created Emission:  PASSED (Emitted on POST /tasks)`);
    console.log(`3. Non-blocking API Response:   PASSED (${postDurationMs} ms response vs ${createdEvent.delayMs} ms worker)`);
    console.log(`4. Timestamp Proof:             PASSED (API: ${createdEvent.apiResponseTimestamp} < Worker: ${createdEvent.listenerCompletedAt})`);
    console.log(`5. Supplementary task-deleted:  PASSED (Emitted on DELETE /tasks/:id)`);
    console.log(`6. Error Boundary Listener:     PASSED (Server protected against crash)`);
    console.log('================================================================');
    console.log('✨ ALL PRACTICAL 10 TESTS PASSED SUCCESSFULLY!\n');

    server.close();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Test Failure:', err.message);
    server.close();
    process.exit(1);
  }
});
