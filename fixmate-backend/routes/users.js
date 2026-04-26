const express = require('express');
const router = express.Router();
const { userOnly } = require('../middleware/auth');

router.get('/profile', userOnly, (req, res) => {
  res.json({ success: true, data: req.user });
});

router.put('/profile', userOnly, (req, res) => {
  res.json({ success: true, message: 'Update profile endpoint' });
});

module.exports = router;
