const mongoose = require('mongoose');

const PromoCodeSchema = new mongoose.Schema({
    // The actual code the user enters (e.g., 'SAVE15', 'BIGDISCOUNT')
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    // The discount amount (e.g., 0.15 for 15% off)
    discountPercentage: {
        type: Number,
        required: true,
        min: 0.01,
        max: 1.00, // Max 100% discount
    },
    // The date and time the code stops working
    expirationDate: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default to 30 days from creation
    },
    // The minimum purchase amount required to use the code
    minPurchaseAmount: {
        type: Number,
        default: 0,
        min: 0,
    },
    // Optional: How many times this code can be used globally
    usageLimit: {
        type: Number,
        default: 50,
        min: 1,
    },
    // The number of times the code has been used so far
    timesUsed: {
        type: Number,
        default: 0,
    },
    // Date of creation (for tracking)
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('PromoCode', PromoCodeSchema);