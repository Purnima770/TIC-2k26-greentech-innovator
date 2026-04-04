const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  location:    { type: String, required: true },
  state:       { type: String, default: '' },
  description: { type: String, default: '' },
  price:       { type: Number, required: true },
  maxGuests:   { type: Number, default: 8 },
  area:        { type: String, default: '' },
  crops:       { type: String, default: '' },
  tags:        [String],
  emoji:       { type: String, default: '🌾' },
  rating:      { type: Number, default: 0 },
  reviews:     { type: Number, default: 0 },
  featured:    { type: Boolean, default: false },
  verified:    { type: Boolean, default: false },
  owner:       { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farm', farmSchema);
