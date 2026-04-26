const User = require('../models/User');
const Worker = require('../models/Worker');

const sendTokenResponse = (model, statusCode, res, message = 'Success') => {
  const token = model.generateToken();
  res.status(statusCode).json({
    success: true,
    message,
    token,
    data: model
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, address, location } = req.body;

    const exists = await User.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const user = await User.create({
      name, email, phone, password, address, location
    });

    sendTokenResponse(user, 201, res, 'User registered successfully');
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

exports.registerWorker = async (req, res) => {
  try {
    const { name, email, phone, password, skills, categories, location, pricing } = req.body;

    const exists = await Worker.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Worker already exists'
      });
    }

    const worker = await Worker.create({
      name, email, phone, password, skills, categories, location, pricing
    });

    sendTokenResponse(worker, 201, res, 'Worker registered successfully');
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error.message
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

exports.loginWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const worker = await Worker.findOne({ email }).select('+password');
    if (!worker) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await worker.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    worker.lastLogin = Date.now();
    await worker.save({ validateBeforeSave: false });

    sendTokenResponse(worker, 200, res, 'Login successful');
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login failed', error: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const data = req.user || req.worker;
    const type = req.user ? 'user' : 'worker';

    res.status(200).json({
      success: true,
      type,
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error', error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    res.json({ success: true, message: 'Update password endpoint' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  res.json({ success: true, message: 'Forgot password endpoint' });
};

exports.resetPassword = async (req, res) => {
  res.json({ success: true, message: 'Reset password endpoint' });
};

exports.verifyEmail = async (req, res) => {
  res.json({ success: true, message: 'Verify email endpoint' });
};

exports.verifyPhone = async (req, res) => {
  res.json({ success: true, message: 'Verify phone endpoint' });
};
