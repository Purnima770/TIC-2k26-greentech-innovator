const express  = require('express');
const Razorpay = require('razorpay');
const crypto   = require('crypto');
const router   = express.Router();

const instance = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// POST /api/payment/create-order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR (not paise)
    if (!amount) return res.status(400).json({ msg: 'Amount is required' });

    const options = {
      amount:   Math.round(amount * 100), // convert to paise
      currency: 'INR',
      receipt:  'receipt_' + Date.now()
    };
    const order = await instance.orders.create(options);
    res.json({ ...order, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    res.status(500).json({ msg: 'Payment order creation failed', error: err.message });
  }
});

// POST /api/payment/verify — verify signature after payment
router.post('/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({ success: true, paymentId: razorpay_payment_id });
    } else {
      res.status(400).json({ success: false, msg: 'Invalid signature' });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Verification error', error: err.message });
  }
});

module.exports = router;
