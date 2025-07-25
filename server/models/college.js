const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: String,
  type: String, // govt / private
  stream: String, // science / commerce / arts / all
  degreeType: String, // ug / pg / both
  city: String,
  state: String,
  lat: Number, // for map
  lng: Number
});

module.exports = mongoose.model('College', CollegeSchema);
