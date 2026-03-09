const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');
const { workerOnly } = require('../middleware/auth');

// ✅ Get all workers
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find({});
    res.json({
      success: true,
      message: "Workers fetched successfully",
      data: workers
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ✅ Get worker by ID
router.get('/:id', async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);

    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found"
      });
    }

    res.json({
      success: true,
      data: worker
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ✅ Create new worker (IMPORTANT 🔥)
router.post('/', async (req, res) => {
  try {
    const newWorker = await Worker.create(req.body);

    res.status(201).json({
      success: true,
      message: "Worker created successfully",
      data: newWorker
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

// ✅ Update worker profile
router.put('/profile', workerOnly, async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedWorker
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;
