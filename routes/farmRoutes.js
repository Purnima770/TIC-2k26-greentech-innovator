const express = require('express');
const router  = express.Router();
const Farm    = require('../models/Farm');
const auth    = require('../middleware/authMiddleware');

// GET /api/farms — list all farms
router.get('/', async (req, res) => {
  try {
    const farms = await Farm.find().sort({ featured: -1, createdAt: -1 });
    res.json(farms);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// GET /api/farms/:id
router.get('/:id', async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ msg: 'Farm not found' });
    res.json(farm);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// POST /api/farms — add farm (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { name, location, state, description, price, maxGuests, area, crops, tags, emoji } = req.body;
    if (!name || !location || !price)
      return res.status(400).json({ msg: 'Name, location and price are required' });

    const farm = new Farm({
      name, location, state, description,
      price: Number(price),
      maxGuests: Number(maxGuests) || 8,
      area, crops,
      tags: tags || [],
      emoji: emoji || '🌾',
      owner: req.user.id,
      verified: false
    });
    await farm.save();
    res.json({ msg: 'Farm submitted for verification!', farm });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// PUT /api/farms/:id — update own farm (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);
    if (!farm) return res.status(404).json({ msg: 'Farm not found' });
    if (farm.owner && farm.owner.toString() !== req.user.id)
      return res.status(403).json({ msg: 'Not authorized' });

    Object.assign(farm, req.body);
    await farm.save();
    res.json({ msg: 'Farm updated', farm });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// POST /api/farms/seed — seed demo farms (dev helper)
router.post('/seed', async (req, res) => {
  try {
    const count = await Farm.countDocuments();
    if (count > 0) return res.json({ msg: 'Already seeded', count });

    const demos = [
      { name:'Sunrise Organic Farm', location:'Nashik, Maharashtra', state:'Maharashtra', description:'100% organic produce across 12 acres. Harvest wheat, tend cows, and sleep under the Deccan stars.', price:2500, tags:['Organic','Family','Harvest'], emoji:'🌾', rating:4.9, reviews:124, featured:true, verified:true },
      { name:'Tribal Heritage Stay', location:'Bastar, Chhattisgarh', state:'Chhattisgarh', description:'Immerse in Gondi tribal culture — traditional art, forest food, and ancient craft traditions.', price:1800, tags:['Tribal','Cultural','Art'], emoji:'🎨', rating:4.8, reviews:98, featured:true, verified:true },
      { name:'Golden Wheat Fields', location:'Amritsar, Punjab', state:'Punjab', description:'Wake to golden fields, join the harvest, and enjoy authentic Punjabi home cooking with local families.', price:2200, tags:['Harvest','Adventure','Family'], emoji:'🌻', rating:4.7, reviews:87, verified:true },
      { name:'Spice Trail Homestay', location:'Wayanad, Kerala', state:'Kerala', description:'Walk through cardamom forests, learn spice processing, and rejuvenate with Ayurvedic practices.', price:3100, tags:['Spice','Wellness','Nature'], emoji:'🌿', rating:5.0, reviews:201, verified:true },
      { name:'Bamboo Valley Retreat', location:'Majuli, Assam', state:'Assam', description:"Stay on the world's largest river island. Weave bamboo, fish with locals, and witness Sattriya dance.", price:1600, tags:['Adventure','Cultural','River'], emoji:'🎋', rating:4.6, reviews:63, verified:true },
      { name:'Desert Rose Farm', location:'Pushkar, Rajasthan', state:'Rajasthan', description:'Desert sunrise camel rides, rose harvest, and traditional Rajasthani meals cooked on chulhas.', price:2800, tags:['Desert','Camel','Festival'], emoji:'🌹', rating:4.8, reviews:145, verified:true }
    ];
    await Farm.insertMany(demos);
    res.json({ msg: 'Farms seeded!', count: demos.length });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
