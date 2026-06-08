const Vehicle = require('../models/Vehicle');

// ---------------------------------------------------------
// CONFIG: THE ZONES (Define the Polygon "Tech Park")
// ---------------------------------------------------------
// In a real app, this might come from a file like '../config/zones'
const ZONES = [
  {
    id: "Tech_Park_Zone", // Strings are better for IDs than names
    coordinates: [
      { lat: 12.9750, lng: 77.6000 }, // Top Left
      { lat: 12.9750, lng: 77.6100 }, // Top Right
      { lat: 12.9650, lng: 77.6100 }, // Bottom Right
      { lat: 12.9650, lng: 77.6000 }  // Bottom Left
    ]
  }
];

// ---------------------------------------------------------
// ALGORITHM: Ray Casting (Point inside Polygon)
// ---------------------------------------------------------
const isPointInPolygon = (point, polygon) => {
  let isInside = false;
  let i, j = polygon.length - 1;

  for (i = 0; i < polygon.length; i++) {
    if (
      (polygon[i].lat > point.lat) !== (polygon[j].lat > point.lat) &&
      (point.lng < (polygon[j].lng - polygon[i].lng) * (point.lat - polygon[i].lat) / (polygon[j].lat - polygon[i].lat) + polygon[i].lng)
    ) {
      isInside = !isInside;
    }
    j = i;
  }
  return isInside;
};

// Helper: Find which zone a point is in
const findZone = (lat, lng) => {
  for (const zone of ZONES) {
    if (isPointInPolygon({ lat, lng }, zone.coordinates)) {
      return zone.id;
    }
  }
  return null; // Outside
};

// ---------------------------------------------------------
// CONTROLLER LOGIC
// ---------------------------------------------------------

// @desc    Process a location event
// @route   POST /api/location
exports.processEvent = async (req, res) => {
  try {
    const { vehicleId, latitude, longitude } = req.body;

    // --- VALIDATION (Edge Cases) ---
    if (!vehicleId || typeof vehicleId !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing vehicleId' });
    }
    if (
      typeof latitude !== 'number' || latitude < -90 || latitude > 90 ||
      typeof longitude !== 'number' || longitude < -180 || longitude > 180
    ) {
      return res.status(400).json({ error: 'Invalid GPS coordinates' });
    }
    // --------------------------------

    // 1. Determine the NEW Zone based on GPS
    const newZoneId = findZone(latitude, longitude);

    // 2. Get the OLD state from DB
    let vehicle = await Vehicle.findOne({ vehicleId });

    // Handle first-time vehicle
    if (!vehicle) {
      vehicle = new Vehicle({ vehicleId, currentZone: null });
    }

    const oldZoneId = vehicle.currentZone;
    const events = [];

    // 3. Logic: Detect Change
    // CASE: EXIT
    if (oldZoneId && oldZoneId !== newZoneId) {
      events.push({ type: 'EXIT', zoneId: oldZoneId, timestamp: new Date() });
    }

    // CASE: ENTER
    if (newZoneId && newZoneId !== oldZoneId) {
      events.push({ type: 'ENTER', zoneId: newZoneId, timestamp: new Date() });
    }

    // 4. Update Database
    vehicle.currentZone = newZoneId;
    vehicle.lastLatitude = latitude;
    vehicle.lastLongitude = longitude;
    vehicle.lastUpdated = new Date();
    await vehicle.save();

    // 5. Respond
    res.status(200).json({
      success: true,
      event: events.length > 0 ? events[0].type : "LOCATION_UPDATE", // Simplified for frontend
      currentZone: newZoneId,
      vehicleId: vehicleId
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get current status of a vehicle
// @route   GET /api/status/:id
exports.getVehicleStatus = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ vehicleId: req.params.id });
    if (!vehicle) return res.status(404).json({ msg: 'Vehicle not found' });

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};