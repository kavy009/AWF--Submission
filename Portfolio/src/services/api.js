// Central API client with JWT Authentication support (Practical 7)
const BASE_URL = 'http://localhost:5000';

function getAuthHeader() {
  const token = localStorage.getItem('awf_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Auth: POST /auth/register
  async register(userData) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    const data = await res.json();
    if (!res.ok) {
      const msg = data.messages ? data.messages.join(' ') : (data.message || 'Registration failed');
      throw new Error(msg);
    }
    return data;
  },

  // Auth: POST /auth/login
  async login(credentials) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  },

  // Auth: GET /auth/me (Supplementary)
  async getMe() {
    const res = await fetch(`${BASE_URL}/auth/me`, {
      headers: { ...getAuthHeader() }
    });
    if (res.status === 401) {
      localStorage.removeItem('awf_auth_token');
      localStorage.removeItem('awf_auth_user');
      throw new Error('Session expired. Please log in again.');
    }
    return res.json();
  },

  // Task: GET /tasks (Protected)
  async getTasks() {
    const res = await fetch(`${BASE_URL}/tasks`, {
      headers: { ...getAuthHeader() }
    });
    if (res.status === 401) {
      throw new Error('Authentication required. Please log in to view and manage tasks.');
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to fetch tasks (HTTP ${res.status})`);
    }
    return res.json();
  },

  // Task: POST /tasks (Protected)
  async createTask(taskData) {
    const res = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(taskData)
    });
    if (res.status === 401) {
      throw new Error('Unauthorized: please log in to add tasks.');
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.messages ? err.messages.join(', ') : (err.message || `Failed to create task`);
      throw new Error(msg);
    }
    return res.json();
  },

  // Task: PUT /tasks/:id (Protected)
  async updateTask(id, updateData) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader()
      },
      body: JSON.stringify(updateData)
    });
    if (res.status === 401) {
      throw new Error('Unauthorized: please log in to modify tasks.');
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to update task`);
    }
    return res.json();
  },

  // Task: DELETE /tasks/:id (Protected)
  async deleteTask(id) {
    const res = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeader() }
    });
    if (res.status === 401) {
      throw new Error('Unauthorized: please log in to delete tasks.');
    }
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to delete task`);
    }
    return res.json();
  }
};

export default api;
