const Job = require('../models/Job');
const User = require('../models/User');
const Worker = require('../models/Worker');

// Generate 4 digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, category, location, pricing, scheduledDate } = req.body;

    const job = await Job.create({
      title,
      description,
      category,
      user: req.user._id,
      location: location || { coordinates: [0, 0] },
      pricing: { estimatedBudget: pricing?.estimatedBudget || 0 },
      scheduledDate,
      status: 'pending'
    });

    await job.populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      message: 'Job created successfully',
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create job',
      error: error.message
    });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const { status, category, userId, workerId } = req.query;

    let query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (userId) query.user = userId;
    if (workerId) query.worker = workerId;

    if (req.user) {
      query.user = req.user._id;
    } else if (req.worker) {
      query.$or = [
        { status: 'pending' },
        { worker: req.worker._id }
      ];
    }

    const jobs = await Job.find(query)
      .populate('user', 'name email phone')
      .populate('worker', 'name email phone rating')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch jobs',
      error: error.message
    });
  }
};

// Get single job
exports.getJobById = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id)
      .populate('user', 'name email phone address')
      .populate('worker', 'name email phone rating bio');

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    res.status(200).json({
      success: true,
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to fetch job',
      error: error.message
    });

  }
};

// Worker accepts job
exports.acceptJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Job is not available'
      });
    }

    job.worker = req.worker._id;
    job.status = 'accepted';

    // 🔐 Generate OTP
    job.otp = {
      code: generateOTP(),
      verified: false
    };

    await job.save();

    await job.populate('worker', 'name email phone');

    res.status(200).json({
      success: true,
      message: 'Job accepted successfully',
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to accept job',
      error: error.message
    });

  }

};

// 🔐 Verify OTP and start job
exports.verifyJobOTP = async (req, res) => {

  try {

    const { otp } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    if (!job.otp || job.otp.code !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    job.otp.verified = true;
    job.status = "in_progress";

    await job.save();

    res.status(200).json({
      success: true,
      message: "OTP verified. Job started.",
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: error.message
    });

  }

};

// Update job status
exports.updateJobStatus = async (req, res) => {

  try {

    const { status } = req.body;

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.status = status;

    await job.save();

    res.status(200).json({
      success: true,
      message: `Job status updated to ${status}`,
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to update job status',
      error: error.message
    });

  }

};

// Complete job
exports.completeJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    if (job.status !== 'in_progress') {
      return res.status(400).json({
        success: false,
        message: 'Job must be in progress to complete'
      });
    }

    job.status = 'completed';

    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job completed successfully',
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to complete job',
      error: error.message
    });

  }

};

// Cancel job
exports.cancelJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    job.status = 'cancelled';

    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job cancelled successfully',
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to cancel job',
      error: error.message
    });

  }

};

// Update job
exports.updateJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    Object.assign(job, req.body);

    await job.save();

    res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: job
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to update job',
      error: error.message
    });

  }

};

// Delete job
exports.deleteJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }

    await job.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully'
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to delete job',
      error: error.message
    });

  }

};