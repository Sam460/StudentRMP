const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, statusController.createStatus);
router.get('/latest', authMiddleware, async (req, res) => {
  try {
    const latest = await Status.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    if (!latest) return res.status(404).json({ error: "No status found" });
    res.json(latest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
