const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  vehicleId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  currentZone: { 
    type: String, 
    default: null // null means "Outside all zones"
  },
  lastLatitude: Number,
  lastLongitude: Number,
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);