const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  studyStatus: { type: String, required: true },
  interestedField: { type: String, required: true },
  address: { type: String, required: true },
  district: { type: String, required: true },
  pin: { type: String, required: true },
  educationLevel: { type: String },
  stream: { type: String },
  goal: { type: String },
  preferredLocation: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Status', statusSchema);
