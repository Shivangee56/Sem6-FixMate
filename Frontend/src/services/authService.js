import api from './api';

export default {
  register: (data, type) => api.post(`/auth/register/${type}`, data),
  login: (data, type) => api.post(`/auth/login/${type}`, data),
  getMe: () => api.get('/auth/me'),
};
