const mongoose = require('mongoose');

// Define the structure for duration pricing
const DurationSchema = new mongoose.Schema({
    id: { type: String, required: true },
    label: { type: String, required: true },
    hours: { type: Number, required: true },
    price: { type: Number, required: true }
}, { _id: false });

// Define the structure for time slot pricing (used by venues like pool area)
const TimeSlotSchema = new mongoose.Schema({
    id: { type: String, required: true },
    label: { type: String, required: true },
    timeRange: { type: String, required: false }, // 'day', 'night', etc.
    guestRange: {
        min: { type: Number, required: false },
        max: { type: Number, required: false }
    },
    price: { type: Number, required: true }
}, { _id: false });

// Define the main Service schema
const ServiceSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true }, // 'villa', 'charm', 'venue'
    category: { type: String, required: true }, // 'accommodation', 'event_space', 'water_facility'
    max_guests: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    gallery: { type: [String], default: [] },
    durations: { type: [DurationSchema], default: [] },
    defaultDuration: { type: String, required: false },
    timeSlots: { type: [TimeSlotSchema], default: [] },
    inclusions: { type: [String], default: [] },
    notes: { type: String, required: false },
    extensionRate: {
        day: { type: Number, required: false },
        night: { type: Number, required: false }
    },
    isActive: { type: Boolean, default: true }, // For admin to enable/disable services
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt timestamp on save
ServiceSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Service', ServiceSchema);
