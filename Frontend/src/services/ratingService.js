import api from './api';

export default {
  createRating: (data) => api.post('/ratings', data),
  getWorkerRatings: (workerId) => api.get(`/ratings/worker/${workerId}`),
};
