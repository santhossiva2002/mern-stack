const mongoose = require('mongoose');

const airwaysSchema = new mongoose.Schema({
  FlightName: { type: String, required: true },
  Departure: { type: String, required: true },
  Arrival: { type: String, required: true },
  Stop: { type: String, required: true },
  FlightNumber: { type: String, required: true },
});

// Create a model for the 'airways' collection
const airwaysModel = mongoose.model('airways', airwaysSchema);

module.exports = airwaysModel;
