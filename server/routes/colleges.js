const express = require('express');
const router = express.Router();
const College = require('../models/College'); // your Mongoose model

// GET /api/colleges/:state/:city
router.get('/:state/:city', async (req, res) => {
  try {
    const { state, city } = req.params;
    const colleges = await College.find({
      state: new RegExp(state, 'i'),
      city: new RegExp(city, 'i'),
    });

    res.json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

module.exports = router;
