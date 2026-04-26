const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// ✅ Import controller
const {
  createOrder,
  verifyPayment,
} = require('../controllers/paymentController');

// 🟢 Create Razorpay Order
router.post('/create-order', protect, createOrder);

// 🟢 Verify Payment
router.post('/verify-payment', protect, verifyPayment);

module.exports = router;