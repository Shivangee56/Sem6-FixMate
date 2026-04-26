import api from './api';

export default {
  getWorkers: (params) => api.get('/workers', { params }),
  getWorkerById: (id) => api.get(`/workers/${id}`),
  updateProfile: (data) => api.put('/workers/profile', data),
  getRecommendations: (data) => api.post('/recommendations', data),
};
