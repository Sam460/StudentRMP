const Status = require('../models/Status');

exports.getRoadmap = async (req, res) => {
  try {
    const status = await Status.findOne({ userId: req.user.id }).sort({ createdAt: -1 });

    if (!status) return res.status(404).json({ error: "No status found for user" });

    const { educationLevel, stream, goal } = status;

    // Simple example logic
    let roadmap = [];

    if (educationLevel === "12th" && stream === "Science" && goal.toLowerCase().includes("engineer")) {
      roadmap = [
        "1. Prepare for JEE Main & Advanced",
        "2. Apply to IITs, NITs, IIITs based on your rank",
        "3. Choose branches like CSE, ECE, ME, EE based on interest",
        "4. Take internships and projects during B.Tech",
        "5. Appear for GATE or campus placements"
      ];
    } else if (goal.toLowerCase().includes("doctor")) {
      roadmap = [
        "1. Prepare for NEET exam",
        "2. Apply to government/private medical colleges",
        "3. Complete MBBS + Internship",
        "4. Appear for PG/NEET PG or start practicing"
      ];
    } else {
      roadmap = [
        "1. Identify entrance exams related to your goal",
        "2. Apply for relevant courses",
        "3. Choose top colleges near your location",
        "4. Build skills through internships and certifications",
        "5. Prepare for competitive exams or placements"
      ];
    }

    res.json({ roadmap });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
