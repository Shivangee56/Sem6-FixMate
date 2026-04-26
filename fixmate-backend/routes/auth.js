const express = require('express');
const router = express.Router();
const {
  registerUser,
  registerWorker,
  loginUser,
  loginWorker,
  getMe,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  verifyPhone
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register/user', registerUser);
router.post('/register/worker', registerWorker);
router.post('/login/user', loginUser);
router.post('/login/worker', loginWorker);
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/verify-phone', protect, verifyPhone);

module.exports = router;
