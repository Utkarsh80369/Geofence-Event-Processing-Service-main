const mongoose = require('mongoose');
require('dotenv').config(); // <--- THIS LINE LOADS IT FOR THE WHOLE APP
const express = require('express');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database Connection Failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
