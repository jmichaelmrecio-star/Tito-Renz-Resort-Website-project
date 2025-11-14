// --- routes/reservationRoutes.js (Example) ---
const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation'); // Import your Mongoose model
// Assuming you have a reservationController file:
const reservationController = require('../controllers/reservationController');

// --- CRITICAL FIX: Place SPECIFIC routes FIRST ---

// 1. NEW ROUTE (Specific name: 'pending') - MUST be first!
router.get('/pending', reservationController.getPendingReservations); 

// 2. Existing Route (Finalize) - Also specific
router.post('/finalize', reservationController.finalizeReservation);

// 3. Existing Route (User specific) - COMMENTED OUT until function is defined
// router.get('/user/:email', reservationController.getUserReservations);


// --- Generic Route LAST ---

// 4. Existing Route (Generic ID: ':id') - MUST be last!
// This route will now only catch requests that are NOT 'pending' or 'finalize'
router.get('/:id', reservationController.getReservationById); 
router.put('/:id', reservationController.updateReservationStatus); // COMMENTED OUT until function is defined

module.exports = router;