const express  = require('express');
const router   = express.Router();
const Booking  = require('../models/Booking');
const auth     = require('../middleware/authMiddleware');

// POST /api/bookings — create booking (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { farmName, farmId, checkIn, checkOut, adults, children, firstName, lastName, email, phone, special, experiences, amount, paymentId, orderId } = req.body;
    if (!farmName || !checkIn || !checkOut || !firstName || !email || !amount)
      return res.status(400).json({ msg: 'Missing required booking fields' });

    const booking = new Booking({
      user: req.user.id,
      farmName, farmId, checkIn, checkOut,
      adults: adults || 2, children: children || 0,
      firstName, lastName, email, phone, special,
      experiences: experiences || [],
      amount, paymentId, orderId,
      status: paymentId ? 'confirmed' : 'pending'
    });
    await booking.save();
    res.json({ msg: 'Booking confirmed!', booking });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// GET /api/bookings/my — user's bookings (protected)
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
