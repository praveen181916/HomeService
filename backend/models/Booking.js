const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['Pending','Confirmed','Completed','Cancelled'], default: 'Pending' },
  totalAmount: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
