const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middleware/authMiddleware');
const Status = require('../models/Status'); // Make sure Status model is imported

// ✅ Create or Submit Status (POST)
router.post('/create', authMiddleware, statusController.createStatus);
router.post('/submit', authMiddleware, statusController.createStatus); // alias for frontend

// ✅ Get Latest Status (GET)
router.get('/latest', authMiddleware, async (req, res) => {
  try {
    // Assuming your Status model field is `user` not `userId`
    const latest = await Status.findOne({ user: req.user.id }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ error: "No status found" });
    }

    res.json({ status: latest });
  } catch (err) {
    console.error('Error in GET /latest:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
