import api from './api';

export default {
  createJob: (data) => api.post('/jobs', data),

  getJobs: (params) => api.get('/jobs', { params }),

  getJobById: (id) => api.get(`/jobs/${id}`),

  acceptJob: (id) => api.post(`/jobs/${id}/accept`),

  completeJob: (id) => api.post(`/jobs/${id}/complete`),

  cancelJob: (id) => api.post(`/jobs/${id}/cancel`),

chat: (messages) =>
    api.post('/chat', { messages }),

  // 🔐 OTP VERIFY
  verifyOTP: (id, otp) =>
    api.post(`/jobs/${id}/verify-otp`, { otp }),

  // 💰 SELECT PAYMENT METHOD
  selectPaymentMethod: (id, method) =>
    api.put(`/jobs/${id}/payment-method`, { method }),

  // 💳 CREATE RAZORPAY ORDER
  createOrder: (amount, jobId) =>
    api.post('/payment/create-order', { amount, jobId }),

  // 💳 VERIFY PAYMENT
  verifyPayment: (data) =>
    api.post('/payment/verify', data),
};