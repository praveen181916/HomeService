const mongoose = require('mongoose');

const serviceProviderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  serviceCategory: { type: String, required: true },
  availability: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  completedJobs: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
