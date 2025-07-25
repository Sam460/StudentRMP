const Status = require('../models/Status');

exports.createStatus = async (req, res) => {
  const {
    name,
    gender,
    studyStatus,
    interestedField,
    address,
    district,
    pin,
    educationLevel,
    stream,
    goal,
    preferredLocation
  } = req.body;

  const userId = req.user.id;

  try {
    // Optional: Basic validation
    if (!name || !gender || !studyStatus || !interestedField || !address || !district || !pin) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    const newStatus = new Status({
      userId,
      name,
      gender,
      studyStatus,
      interestedField,
      address,
      district,
      pin,
      educationLevel,
      stream,
      goal,
      preferredLocation
    });

    await newStatus.save();
    res.status(201).json({ message: "Status saved successfully" });
  } catch (err) {
    console.error("createStatus error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
