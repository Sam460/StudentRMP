const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  educationLevel: String,
  stream: String,
  goal: String,
  preferredLocation: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Status', statusSchema);
