// controllers/reservationController.js

const Reservation = require('../models/Reservation'); // Your Mongoose model
const PromoCode = require('../models/PromoCode'); // Your Mongoose model
const crypto = require('crypto'); // Built-in Node.js module for unique IDs

// Helper function to generate a unique QR code string (UUID)
function generateQRCodeString() {
    return crypto.randomUUID();
}

exports.finalizeReservation = async (req, res) => {
    try {
        // 1. Extract ALL necessary fields, including the new GCash ref number
        const { 
            email, full_name, phone, serviceId, serviceType, check_in, check_out, 
            guests, basePrice, finalTotal, promoCodeUsed, gcashReferenceNumber // <-- CRITICAL FIX: EXTRACTED
        } = req.body;

        // Basic Validation
        if (!email || !serviceId || !finalTotal) {
            return res.status(400).json({ message: 'Missing required reservation fields.' });
        }

        // 2. Create the new Reservation document
        const newReservation = await Reservation.create({
            email,
            full_name,
            phone,
            serviceId,
            serviceType,
            check_in,
            check_out,
            guests,
            basePrice,
            finalTotal,
            promoCodeUsed,
            paymentMethod: 'GCash', 
            status: 'Paid', // Awaiting admin confirmation
            gcashReferenceNumber, // <-- CRITICAL FIX: SAVING TO DB
            dateCreated: new Date()
        });
        
        // 3. Optional: Mark promo code as used
        if (promoCodeUsed) {
            await PromoCode.findOneAndUpdate({ code: promoCodeUsed }, { $inc: { timesUsed: 1 } });
        }

        res.status(201).json({ 
            message: 'Reservation finalized successfully and is awaiting admin review.',
            reservationId: newReservation._id 
        });

    } catch (error) {
        console.error('SERVER ERROR finalising reservation:', error);
        res.status(500).json({ 
            message: 'Internal server error during reservation finalization.',
            details: error.message 
        });
    }
};

exports.getReservationById = async (req, res) => {
    try {
        const reservationId = req.params.id;
        
        const reservation = await Reservation.findById(reservationId);
        
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }
        
        res.status(200).json(reservation);

    } catch (error) {
        console.error('Error fetching reservation by ID:', error);
        res.status(500).json({ message: 'Server error retrieving reservation.' });
    }
};

exports.getPendingReservations = async (req, res) => {
    try {
        // Query the database for all reservations where the status is 'Paid'.
        const pendingReservations = await Reservation.find({ 
            status: 'Paid' 
        })
        .sort({ check_in: 1 }); // Sort by check-in date, oldest first

        res.status(200).json(pendingReservations);

    } catch (error) {
        console.error('SERVER ERROR fetching pending reservations for Admin:', error);
        res.status(500).json({ 
            message: 'Internal server error while retrieving pending reservations.',
            details: error.message 
        });
    }
};

/**
 * Updates the status of a specific reservation. (Used by Admin Confirm/Cancel buttons)
 */
exports.updateReservationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'New status is required in the request body.' });
        }

        // Validate the status is one of the allowed admin actions
        const allowedStatuses = ['Confirmed', 'Cancelled', 'Completed'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status provided: ${status}` });
        }

        // Find the reservation by ID and update the status field
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            { status: status },
            { new: true } // Returns the updated document
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }

        res.status(200).json({ 
            message: `Reservation ${id} successfully updated to status: ${status}`,
            reservation: updatedReservation
        });

    } catch (error) {
        console.error('SERVER ERROR updating reservation status:', error);
        res.status(500).json({ 
            message: 'Internal server error while updating reservation status.',
            details: error.message 
        });
    }
};