const taskEvents = require('./events');

/**
 * Practical 10: Event Listeners Registration
 * Registers asynchronous listeners for task lifecycle events.
 * Uses artificial delay (setTimeout) to simulate external side-effects
 * (email dispatch, push notifications, audit logging) and prove that
 * the API response returns immediately without being blocked.
 */

// 1. Task Created Listener (Core Requirement)
taskEvents.on('task-created', (task) => {
  const listenerReceivedAt = new Date().toISOString();
  const assignedUser = task.user?.email || task.assignedUser || 'authenticated-user';
  const apiSentAt = task.apiResponseTimestamp || 'N/A';

  console.log(`\n🔔 [Notification Listener: task-created] Event received`);
  console.log(`   Task Title: "${task.title}"`);
  console.log(`   Priority:   ${task.priority || 'medium'}`);
  console.log(`   Assigned:   ${assignedUser}`);
  console.log(`   API Responded At:   ${apiSentAt}`);
  console.log(`   Listener Started:   ${listenerReceivedAt}`);
  console.log(`   Status: Dispatching simulated email/notification in background (1500ms delay)...`);

  // Artificial non-blocking delay simulating external delivery (e.g., SendGrid / AWS SES)
  setTimeout(() => {
    const listenerCompletedAt = new Date().toISOString();
    console.log(`✅ [Notification Worker: task-created] Background dispatch finished!`);
    console.log(`   Task Title: "${task.title}"`);
    console.log(`   Finished At: ${listenerCompletedAt}`);
    console.log(`   ⏱️ [Timing Proof] Main API response was sent at ${apiSentAt}, BEFORE background job completed at ${listenerCompletedAt}\n`);

    taskEvents.logEvent({
      event: 'task-created',
      taskId: task._id || task.id,
      title: task.title,
      priority: task.priority,
      user: assignedUser,
      apiResponseTimestamp: apiSentAt,
      listenerReceivedAt,
      listenerCompletedAt,
      delayMs: 1500,
      status: 'delivered',
      message: `Notification email dispatched for task "${task.title}" to ${assignedUser}`
    });
  }, 1500);
});

// 2. Task Deleted Listener (Supplementary Requirement)
taskEvents.on('task-deleted', (task) => {
  const listenerReceivedAt = new Date().toISOString();
  const assignedUser = task.user?.email || 'authenticated-user';
  const apiSentAt = task.apiResponseTimestamp || 'N/A';

  console.log(`\n🗑️ [Notification Listener: task-deleted] Event received`);
  console.log(`   Task Title: "${task.title}" (ID: ${task._id || task.id})`);
  console.log(`   API Responded At: ${apiSentAt}`);
  console.log(`   Listener Started: ${listenerReceivedAt}`);

  setTimeout(() => {
    const listenerCompletedAt = new Date().toISOString();
    console.log(`🧹 [Notification Worker: task-deleted] Cleanup archive finished for "${task.title}" at ${listenerCompletedAt}\n`);

    taskEvents.logEvent({
      event: 'task-deleted',
      taskId: task._id || task.id,
      title: task.title,
      user: assignedUser,
      apiResponseTimestamp: apiSentAt,
      listenerReceivedAt,
      listenerCompletedAt,
      delayMs: 1000,
      status: 'archived',
      message: `Task "${task.title}" archived and deletion notice broadcasted`
    });
  }, 1000);
});

// 3. Error Event Listener (Supplementary Requirement: Safe Error Boundary)
// EventEmitter throws an uncaught exception if an 'error' event has no listener.
taskEvents.on('error', (err) => {
  const timestamp = new Date().toISOString();
  console.error(`\n⚠️ [Event Error Handler] Caught EventEmitter error safely at ${timestamp}:`);
  console.error(`   Error Message: ${err.message}`);
  console.error(`   Server remains online and uninhibited!\n`);

  taskEvents.logEvent({
    event: 'error',
    errorMessage: err.message,
    timestamp,
    status: 'handled',
    message: `Caught EventEmitter error without crashing server: ${err.message}`
  });
});

console.log('[Event System] Practical 10 EventEmitter listeners successfully registered');

module.exports = taskEvents;
