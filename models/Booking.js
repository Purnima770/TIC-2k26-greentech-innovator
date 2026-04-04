const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmName:   { type: String, required: true },
  farmId:     { type: String, default: '' },
  checkIn:    { type: Date, required: true },
  checkOut:   { type: Date, required: true },
  adults:     { type: Number, default: 2 },
  children:   { type: Number, default: 0 },
  firstName:  { type: String, required: true },
  lastName:   { type: String, default: '' },
  email:      { type: String, required: true },
  phone:      { type: String, default: '' },
  special:    { type: String, default: '' },
  experiences:[String],
  amount:     { type: Number, required: true },
  paymentId:  { type: String, default: '' },
  orderId:    { type: String, default: '' },
  status:     { type: String, enum: ['pending','confirmed','completed','cancelled'], default: 'pending' },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
