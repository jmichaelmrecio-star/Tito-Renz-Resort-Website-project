const mongoose = require('mongoose');

const BlockedDateSchema = new mongoose.Schema({
    // Optional legacy single date reference (kept for backward compatibility)
    date: {
        type: Date,
    },
    // Start and end dates for the blocked period
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    // Optional list of service IDs this block applies to. Empty === all services.
    serviceIds: {
        type: [String],
        default: [],
    },
    appliesToAllServices: {
        type: Boolean,
        default: true,
    },
    // The reason for the block (e.g., "Maintenance," "Renovation," "Holiday")
    reason: {
        type: String,
        required: true,
        trim: true,
    },
    // Who blocked the date (optional reference to the Admin/Manager account)
    blockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account', // Assuming 'Account' is the name of your Account model
        required: false, // Can be set as required if logging is critical
    },
    // Timestamp for tracking when the block was created
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const BlockedDate = mongoose.model('BlockedDate', BlockedDateSchema);

module.exports = BlockedDate;