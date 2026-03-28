const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
// const mongoURL = process.env.MONGODB_URL_LOCAL  // Replace 'mydatabase' with your data base name
 const mongoURL = process.env.MONGODB_URL

// Setup MongoDB connection 
mongoose.connect(mongoURL)

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB Connection
const db = mongoose.connection;


// Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error: ', err);
});

db.on('disconnected',() => {
    console.log('MongoDB disconnected');
});


module.exports = db;

