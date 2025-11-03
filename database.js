const mongoose = require('mongoose');

const DB_HOST = process.env.DB_HOST || 'mongodb';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'taskflow';

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    console.log(`MongoDB connected: ${DB_HOST}:${DB_PORT}/${DB_NAME}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;