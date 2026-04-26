const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/users', (req, res) => {
  res.json({ success: true, data: [] });
});

module.exports = router;
