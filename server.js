require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// CORS — allow frontend (file:// and localhost)
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());

// DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => { console.error('❌ MongoDB Error:', err.message); process.exit(1); });

// Routes
app.use('/api/auth',    require('./routes/authRoutes'));
app.use('/api/farms',   require('./routes/farmRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/ai',      require('./routes/aiRoutes'));
app.use('/api/bookings',require('./routes/bookingRoutes'));

app.get('/', (req, res) => res.json({ msg: 'GreenTech API Running 🚀' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
