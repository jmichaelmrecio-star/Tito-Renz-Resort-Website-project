// Load environment variables from .env file
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose
const app = express();
const PORT = process.env.PORT || 3000; // Use port from environment or default to 3000

// --- MIDDLEWARE ---
// Allows your Node.js server to parse JSON data from incoming requests (like reservation data)
app.use(express.json()); 


// --- DATABASE CONNECTION ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB is connected successfully!');

    // Start the server ONLY if the DB connection succeeds
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // Exit process with failure code
    process.exit(1);
  }
};

// Execute the connection function
connectDB();


// --- ROUTES (API Endpoints) ---

// Basic test route (still works on /)
app.get('/', (req, res) => {
  res.send('Tito Renz Resort API is running!');
});

// We will add your reservation POST route here next...