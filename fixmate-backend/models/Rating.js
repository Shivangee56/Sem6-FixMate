const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  rating: {
    overall: { type: Number, required: true, min: 1, max: 5 },
    quality: Number,
    punctuality: Number
  },
  review: String,
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

ratingSchema.index({ worker: 1 });

module.exports = mongoose.model('Rating', ratingSchema);
