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
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },

  pricing: {
    estimatedBudget: Number,
    finalAmount: { type: Number, default: 0 }
  },

  scheduledDate: Date,

  // 🔐 OTP
  otp: {
    code: String,
    verified: { type: Boolean, default: false }
  },

  // 💰 PAYMENT
  paymentMethod: {
    type: String,
    enum: ['cash', 'online'],
    default: null
  },

  isPaid: {
    type: Boolean,
    default: false
  },

  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  }

}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);