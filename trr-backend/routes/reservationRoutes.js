// --- routes/reservationRoutes.js (Example) ---
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation'); // Import your Mongoose model

// EXISTING POST Route (for creating a reservation)
router.post('/', async (req, res) => {
    // ... (your existing reservation creation logic) ...
});

// NEW GET Route (to fetch reservations for a specific user)
router.get('/user/:email', async (req, res) => {
    try {
        const userEmail = req.params.email;
        // Find reservations where the email matches the logged-in user's email
        // NOTE: The key name must match your Mongoose schema (which uses 'email').
        const reservations = await Reservation.find({ email: userEmail }).sort({ dateCreated: -1 });
        
        // Respond with the array of reservations
        res.status(200).json(reservations);
        
    } catch (error) {
        console.error("Error fetching user reservations:", error);
        res.status(500).json({ message: 'Error retrieving reservations', error: error.message });
    }
});

module.exports = router;