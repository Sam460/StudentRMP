const Status = require('../models/Status');

exports.createStatus = async (req, res) => {
  const { educationLevel, stream, goal, preferredLocation } = req.body;
  const userId = req.user.id;

  try {
    const newStatus = new Status({
      userId,
      educationLevel,
      stream,
      goal,
      preferredLocation
    });
    await newStatus.save();
    res.json({ message: "Status saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
