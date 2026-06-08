const express = require('express');
const router = express.Router();
const { processEvent, getVehicleStatus } = require('../controllers/vehicleController');

// Define the endpoints

// 1. Matches Frontend: POST /api/location
router.post('/location', processEvent);

// 2. Matches Frontend: GET /api/status/:id
router.get('/status/:id', getVehicleStatus);

module.exports = router;