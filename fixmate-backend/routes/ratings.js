const express = require('express');
const router = express.Router();
const { userOnly } = require('../middleware/auth');

router.post('/', userOnly, (req, res) => {
  res.json({ success: true, message: 'Create rating' });
});

router.get('/worker/:workerId', (req, res) => {
  res.json({ success: true, data: [] });
});

module.exports = router;
