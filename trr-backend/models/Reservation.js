const mongoose = require('mongoose');

// Define the structure of a Reservation document
const ReservationSchema = new mongoose.Schema({
    // Guest Information
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    
    // Reservation Details
    serviceId: { type: String, required: true },
    serviceType: { type: String, required: true },
    check_in: { type: Date, required: true }, // Store as a Date object for easy sorting/comparison
    
    // Financial Data (Crucial for DFD 8.0)
    basePrice: { type: Number, required: true },
    discountCode: { type: String },
    discountValue: { type: Number, default: 0 },
    finalTotal: { type: Number, required: true },
    
    // System Status
    dateCreated: {
        type: Date,
        default: Date.now, // Automatically set the date
        // REMOVE 'required: true' if it exists
    },
    status: { type: String, default: 'pending' }, // e.g., 'pending', 'confirmed', 'cancelled'

    // CRITICAL: DOES THIS FIELD EXIST IN YOUR SCHEMA?
    gcashReferenceNumber: {
        type: String,
        required: false, // It's optional for old reservations, but present for new ones
        trim: true,
        default: null
    },
    
    // Payment Data
    paymentRef: { type: String }, // Now less critical, will be replaced by PayMongo ID
    paymentStatus: { type: String, default: 'pending' }, // e.g., 'pending', 'paid', 'failed'
    
    // QR Code Data
    qrCodeData: { type: String }
});

module.exports = mongoose.model('Reservation', ReservationSchema);