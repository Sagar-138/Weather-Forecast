const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  requestDate: { type: Date, default: Date.now },
  data: { type: mongoose.Schema.Types.Mixed }
});

module.exports = mongoose.model('Weather', WeatherSchema);
