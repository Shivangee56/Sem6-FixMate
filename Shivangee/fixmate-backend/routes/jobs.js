const express = require('express');
const router = express.Router();

const { protect, userOnly, workerOnly } = require('../middleware/auth');

const {
  createJob,
  getAllJobs,
  getJobById,
  acceptJob,
  verifyJobOTP,
  updateJobStatus,
  completeJob,
  cancelJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');


// Public routes
router.get('/', protect, getAllJobs);
router.get('/:id', protect, getJobById);


// User routes
router.post('/', userOnly, createJob);
router.put('/:id', userOnly, updateJob);
router.delete('/:id', userOnly, deleteJob);
router.post('/:id/cancel', userOnly, cancelJob);


// Worker routes
router.post('/:id/accept', workerOnly, acceptJob);
router.post('/:id/verify-otp', workerOnly, verifyJobOTP);
router.post('/:id/complete', workerOnly, completeJob);
router.put('/:id/status', workerOnly, updateJobStatus);


module.exports = router;