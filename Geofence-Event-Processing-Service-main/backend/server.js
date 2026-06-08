require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const vehicleRoutes = require('./routes/vehicleRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Routes
// CHANGED: We use '/api' here so the full URL becomes /api/location
app.use('/api', vehicleRoutes);

// Use Environment Variable for Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));