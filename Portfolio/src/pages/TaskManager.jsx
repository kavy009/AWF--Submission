import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete confirmation state (Supplementary requirement)
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Toast notification state (Supplementary requirement)
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // Priority filter state
  const [filterPriority, setFilterPriority] = useState('all');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const clearToast = () => {
    setToast({ message: '', type: 'success' });
  };

  // Fetch tasks from Express / MongoDB backend
  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getTasks();
      // Handle both Mongoose data shape { success: true, data: [...] } and direct array
      const taskList = response.data || response;
      setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (err) {
      setError(
        `${err.message}. Make sure backend server is running at http://localhost:5000`
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Create Task with Optimistic UI Update (Supplementary requirement)
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Task title is required', 'error');
      return;
    }

    const tempId = 'temp-' + Date.now();
    const optimisticTask = {
      _id: tempId,
      id: tempId,
      title: newTitle.trim(),
      description: newDescription.trim(),
      priority: newPriority,
      completed: false,
      createdAt: new Date().toISOString(),
      isOptimistic: true
    };

    // 1. Optimistic Update: Render immediately before server responds
    setTasks((prev) => [optimisticTask, ...prev]);
    const savedTitle = newTitle;
    const savedDesc = newDescription;
    const savedPriority = newPriority;

    setNewTitle('');
    setNewDescription('');
    setIsSubmitting(true);

    try {
      const response = await api.createTask({
        title: savedTitle,
        description: savedDesc,
        priority: savedPriority
      });

      const serverTask = response.data || response;

      // Replace optimistic placeholder with confirmed server document
      setTasks((prev) =>
        prev.map((t) => (t._id === tempId || t.id === tempId ? serverTask : t))
      );
      showToast(`Task "${serverTask.title}" created successfully!`, 'success');
    } catch (err) {
      // Rollback on failure
      setTasks((prev) => prev.filter((t) => t._id !== tempId && t.id !== tempId));
      showToast(`Failed to create task: ${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Task Completion
  const handleToggleComplete = async (task) => {
    const taskId = task._id || task.id;
    const updatedStatus = !task.completed;

    // Optimistic toggle
    setTasks((prev) =>
      prev.map((t) => ((t._id || t.id) === taskId ? { ...t, completed: updatedStatus } : t))
    );

    try {
      await api.updateTask(taskId, { completed: updatedStatus });
      showToast(
        `Task marked as ${updatedStatus ? 'completed' : 'pending'}`,
        'success'
      );
    } catch (err) {
      // Revert on error
      setTasks((prev) =>
        prev.map((t) => ((t._id || t.id) === taskId ? { ...t, completed: !updatedStatus } : t))
      );
      showToast(`Failed to update task: ${err.message}`, 'error');
    }
  };

  // Delete Task with Confirmation (Supplementary requirement)
  const confirmDelete = async () => {
    if (!taskToDelete) return;
    const taskId = taskToDelete._id || taskToDelete.id;
    const taskTitle = taskToDelete.title;

    setTaskToDelete(null);

    // Optimistic remove
    setTasks((prev) => prev.filter((t) => (t._id || t.id) !== taskId));

    try {
      await api.deleteTask(taskId);
      showToast(`Task "${taskTitle}" deleted successfully`, 'success');
    } catch (err) {
      showToast(`Delete failed: ${err.message}`, 'error');
      loadTasks(); // re-fetch if failed
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filterPriority === 'all') return true;
    return task.priority === filterPriority;
  });

  return (
    <section className="section task-manager-section">
      <Toast message={toast.message} type={toast.type} onClose={clearToast} />

      {/* Confirmation Dialog Modal (Supplementary requirement) */}
      {taskToDelete && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>⚠️ Confirm Delete</h3>
            <p>
              Are you sure you want to delete task:
              <br />
              <strong>"{taskToDelete.title}"</strong>?
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setTaskToDelete(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-delete-confirm"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="section-header">
        <h2 className="section-title">Full Stack Task Management</h2>
        <p className="section-subtitle">
          End-to-end integration between React Frontend and Express + MongoDB Backend (Practical 6)
        </p>
      </div>

      <div className="task-manager-layout">
        {/* Create Task Form */}
        <div className="task-form-panel">
          <h3>Create New Task</h3>
          <p className="panel-desc">
            Submit a new task to persist in MongoDB database. Supports optimistic UI update.
          </p>

          <form onSubmit={handleCreateTask} className="task-create-form">
            <div className="form-group">
              <label htmlFor="taskTitle">Task Title *</label>
              <input
                id="taskTitle"
                type="text"
                className="form-input"
                placeholder="e.g. Design authentication middleware"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskDesc">Description</label>
              <textarea
                id="taskDesc"
                rows="3"
                className="form-textarea"
                placeholder="Add optional task details..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="taskPriority">Priority Level</label>
              <select
                id="taskPriority"
                className="form-input select-priority"
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary submit-task-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving to Database...' : '+ Add Task (Optimistic)'}
            </button>
          </form>
        </div>

        {/* Task List Panel */}
        <div className="task-list-panel">
          <div className="panel-top-controls">
            <div className="panel-title-group">
              <h3>Live Tasks ({filteredTasks.length})</h3>
              <span className="api-badge">API: http://localhost:5000/tasks</span>
            </div>

            <div className="filter-controls">
              <select
                className="filter-select"
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
              >
                <option value="all">All Priorities</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={loadTasks}
                disabled={loading}
              >
                🔄 Refresh
              </button>
            </div>
          </div>

          {loading && <Spinner message="Fetching tasks from Express backend & MongoDB..." />}

          {!loading && error && (
            <ErrorMessage message={error} onRetry={loadTasks} />
          )}

          {!loading && !error && filteredTasks.length === 0 && (
            <div className="empty-tasks-card">
              <p>No tasks found. Create a new task on the left to test full-stack persistence!</p>
            </div>
          )}

          {!loading && !error && filteredTasks.length > 0 && (
            <div className="tasks-cards-container">
              {filteredTasks.map((task) => {
                const id = task._id || task.id;
                return (
                  <div
                    key={id}
                    className={`task-item-card priority-${task.priority} ${
                      task.completed ? 'is-completed' : ''
                    }`}
                  >
                    <div className="task-checkbox-col">
                      <input
                        type="checkbox"
                        checked={Boolean(task.completed)}
                        onChange={() => handleToggleComplete(task)}
                        title="Click to toggle completion status"
                        className="task-checkbox"
                      />
                    </div>

                    <div className="task-details-col">
                      <div className="task-header-row">
                        <h4 className="task-card-title">{task.title}</h4>
                        <span className={`priority-tag tag-${task.priority}`}>
                          {task.priority}
                        </span>
                      </div>

                      {task.description && (
                        <p className="task-card-desc">{task.description}</p>
                      )}

                      <div className="task-footer-row">
                        <span className="task-date">
                          📅 {new Date(task.createdAt || Date.now()).toLocaleDateString()}
                        </span>
                        {task.isOptimistic && (
                          <span className="optimistic-badge">Syncing...</span>
                        )}
                      </div>
                    </div>

                    <div className="task-actions-col">
                      <button
                        type="button"
                        className="btn-delete-task"
                        onClick={() => setTaskToDelete(task)}
                        title="Delete task with confirmation"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TaskManager;
