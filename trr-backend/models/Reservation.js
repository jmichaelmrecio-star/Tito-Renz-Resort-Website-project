const mongoose = require('mongoose');

// Define the structure of a Reservation document
const ReservationSchema = new mongoose.Schema({
    // Guest Information
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },

    // This field links to the Account model, but is optional (null for guests)
    accountId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: false, // <-- CRITICAL: Set to false
        default: null     // <-- Set default to null
    },
    
    // Reservation Details
    serviceId: { type: String, required: true },
    serviceType: { type: String, required: true },
    check_in: { type: Date, required: true }, // Store as a Date object for easy sorting/comparison
    check_out: { type: Date, required: true }, // <-- RE-ADDED
    guests: { type: Number, required: true },    // <-- RE-ADDED
    address: { type: String, required: false }, // Address from the form
    
    // Duration & Time Slot Details (for duration-based pricing)
    selectedDuration: { type: String, required: false }, // e.g., 'duration_12h', 'duration_22h'
    selectedTimeSlot: { type: String, required: false }, // e.g., 'slot_day_30_40' for pool area
    durationLabel: { type: String, required: false }, // e.g., '12 Hours', 'Day (7am - 5pm) - 30 to 40 pax'
    inclusions: { type: [String], default: [] }, // Array of included amenities/services
    
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

    // *** CRITICAL FIX: Renamed field to match controller lookup ***
    reservationHash: { 
        type: String,
        required: false, // Will be generated and set upon creation
        unique: true,
        sparse: true, // Allows null values but enforces uniqueness for non-null values
    },
    
    // Payment Data
    paymentRef: { type: String }, // Now less critical, will be replaced by PayMongo ID
    paymentStatus: { type: String, default: 'pending' }, // e.g., 'pending', 'paid', 'failed'
    
    // QR Code Data
    qrCodeData: { type: String }
});

module.exports = mongoose.model('Reservation', ReservationSchema);