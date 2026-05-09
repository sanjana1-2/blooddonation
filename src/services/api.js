import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Donors API
export const donorsAPI = {
  register: (donorData) => api.post('/donors/register', donorData),
  getAll: () => api.get('/donors'),
  getById: (id) => api.get(`/donors/${id}`),
  update: (id, data) => api.put(`/donors/${id}`, data),
  searchByBloodGroup: (bloodGroup) => api.get(`/donors/search/${bloodGroup}`),
};

// Blood Banks API
export const bloodBanksAPI = {
  getAll: (params = {}) => api.get('/bloodbanks', { params }),
  getById: (id) => api.get(`/bloodbanks/${id}`),
  create: (data) => api.post('/bloodbanks', data),
  updateInventory: (id, inventory) => api.put(`/bloodbanks/${id}/inventory`, inventory),
  getAvailabilitySummary: () => api.get('/bloodbanks/availability/summary'),
};

// Blood Requests API
export const requestsAPI = {
  getAll: (params = {}) => api.get('/requests', { params }),
  create: (data) => api.post('/requests', data),
  getById: (id) => api.get(`/requests/${id}`),
  updateStatus: (id, status) => api.put(`/requests/${id}/status`, { status }),
  getUrgent: () => api.get('/requests/urgent/list'),
};

// Camps API
export const campsAPI = {
  getAll: () => api.get('/camps'),
  getById: (id) => api.get(`/camps/${id}`),
  create: (data) => api.post('/camps', data),
  rsvp: (id) => api.post(`/camps/${id}/rsvp`),
};

// Notifications API
export const notificationsAPI = {
  getAll: (userId) => api.get(`/notifications/${userId}`),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
};

// Blogs API
export const blogsAPI = {
  getAll: () => api.get('/blogs'),
  getById: (id) => api.get(`/blogs/${id}`),
  create: (data) => api.post('/blogs', data),
};

// Chats API
export const chatsAPI = {
  getAll: (userId) => api.get(`/chats/${userId}`),
  getMessages: (chatId) => api.get(`/chats/${chatId}/messages`),
  sendMessage: (chatId, data) => api.post(`/chats/${chatId}/messages`, data),
};

// Authentication API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data) => api.put('/auth/profile', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
};

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // Prevent infinite loop if called from interceptor
    }
    return Promise.reject(error);
  }
);

export default api;