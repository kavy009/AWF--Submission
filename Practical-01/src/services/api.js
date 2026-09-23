// Central API client for Full Stack Task Management
const BASE_URL = 'http://localhost:5000';

export const api = {
  // GET /tasks
  async getTasks() {
    const res = await fetch(`${BASE_URL}/tasks`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to fetch tasks (HTTP ${res.status})`);
    }
    return res.json();
  },

  // GET /tasks/:id
  async getTaskById(id) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Task not found (HTTP ${res.status})`);
    }
    return res.json();
  },

  // POST /tasks
  async createTask(taskData) {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.messages ? err.messages.join(', ') : (err.message || `Failed to create task`);
      throw new Error(msg);
    }
    return res.json();
  },

  // PUT /tasks/:id
  async updateTask(id, updateData) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to update task`);
    }
    return res.json();
  },

  // DELETE /tasks/:id
  async deleteTask(id) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to delete task`);
    }
    return res.json();
  }
};

export default api;
