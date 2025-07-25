const express = require('express');
const router = express.Router();
const College = require('../models/College');

// GET /api/colleges/:state/:city?type=&stream=&degree=
router.get('/:state/:city', async (req, res) => {
  try {
    const { state, city } = req.params;
    const { type, stream, degree } = req.query;

    const filters = {
      state: new RegExp(state, 'i'),
      city: new RegExp(city, 'i'),
    };

    if (type) filters.type = new RegExp(type, 'i');     // govt, private
    if (stream) filters.stream = new RegExp(stream, 'i'); // science, commerce, arts
    if (degree) filters.degreeType = new RegExp(degree, 'i'); // ug, pg

    const colleges = await College.find(filters);
    res.json(colleges);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

module.exports = router;
