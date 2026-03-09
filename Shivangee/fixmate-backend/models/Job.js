const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' },

  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true },
    address: {
      street: String,
      city: String,
      state: String
    }
  },

  status: {
    type: String,
    enum: ['pending', 'assigned', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },

  pricing: {
    estimatedBudget: Number,
    finalAmount: { type: Number, default: 0 }
  },

  scheduledDate: Date,

  // 🔐 OTP Verification System
  otp: {
    code: { type: String },
    verified: { type: Boolean, default: false }
  },

  createdAt: { type: Date, default: Date.now }

}, { timestamps: true });

jobSchema.index({ user: 1 });
jobSchema.index({ worker: 1 });
jobSchema.index({ status: 1 });

module.exports = mongoose.model('Job', jobSchema);
