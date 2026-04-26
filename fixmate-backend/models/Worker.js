const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Valid email required']
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    match: [/^[0-9]{10}$/, 'Valid 10-digit phone required']
  },
  password: { type: String, required: true, minlength: 6, select: false },
  avatar: {
    url: { type: String, default: 'https://via.placeholder.com/150' },
    publicId: String
  },
  skills: [{
    name: String,
    category: String,
    experience: Number
  }],
  categories: [String],
  bio: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }
  },
  pricing: {
    baseRate: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' }
  },
  rating: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  availability: {
    isAvailable: { type: Boolean, default: true }
  },
  role: { type: String, enum: ['worker', 'admin'], default: 'worker' },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

workerSchema.index({ email: 1 });
workerSchema.index({ categories: 1 });
workerSchema.index({ location: '2dsphere' });

workerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

workerSchema.methods.generateToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role, type: 'worker' },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

workerSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Worker', workerSchema);
