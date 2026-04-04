const express = require('express');
const router  = express.Router();

// POST /api/ai/recommend
router.post('/recommend', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ msg: 'Prompt is required' });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 600,
        system: `You are an expert agritourism planner for Green Tech Innovator, India's leading rural tourism platform.
Given a tourist's travel request, recommend 2-3 specific farms from rural India with real-sounding details.
Include farm name, location, best season, unique activities, and estimated cost per night.
Keep response friendly, enthusiastic, and under 200 words. Use relevant emojis.`,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ msg: data.error.message });

    const text = data.content?.map(b => b.text || '').join('') || 'No recommendation generated.';
    res.json({ result: text });
  } catch (err) {
    res.status(500).json({ msg: 'AI service error', error: err.message });
  }
});

module.exports = router;
