// trr-backend/routes/services.js
// This file provides a hardcoded service list that mirrors the frontend resortServices
// For production, consider using the Service model and serviceRoutes.js instead

const express = require('express');
const router = express.Router();

// Service data matching frontend resortServices structure
const services = require('../config/servicesData');

// Get all services
router.get('/', (req, res) => {
    try {
        res.json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
});

// Get a single service by ID
router.get('/:id', (req, res) => {
    try {
        const service = services.find(s => s.id === req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({ message: 'Error fetching service', error: error.message });
    }
});

// Calculate price for a service based on duration/timeslot
router.post('/calculate-price', (req, res) => {
    try {
        const { serviceId, durationId, guestCount = 1 } = req.body;
        
        if (!serviceId || !durationId) {
            return res.status(400).json({ 
                message: 'serviceId and durationId are required' 
            });
        }
        
        const service = services.find(s => s.id === serviceId);
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        let calculatedPrice = null;
        let durationLabel = '';
        
        // Check if service uses timeSlots (like Private Pool Area)
        if (service.timeSlots && service.timeSlots.length > 0) {
            const slot = service.timeSlots.find(ts => ts.id === durationId);
            if (!slot) {
                return res.status(400).json({ message: 'Invalid time slot selected' });
            }
            
            // Validate guest count is within range
            if (slot.guestRange) {
                if (guestCount < slot.guestRange.min || guestCount > slot.guestRange.max) {
                    return res.status(400).json({ 
                        message: `Guest count must be between ${slot.guestRange.min} and ${slot.guestRange.max} for this time slot` 
                    });
                }
            }
            
            calculatedPrice = slot.price;
            durationLabel = slot.label;
        }
        // Check if service uses durations (rooms and halls)
        else if (service.durations && service.durations.length > 0) {
            const duration = service.durations.find(d => d.id === durationId);
            if (!duration) {
                return res.status(400).json({ message: 'Invalid duration selected' });
            }
            
            calculatedPrice = duration.price;
            durationLabel = duration.label;
        }
        else {
            return res.status(400).json({ message: 'Service does not have duration-based pricing' });
        }
        
        res.status(200).json({
            serviceId,
            durationId,
            durationLabel,
            guestCount,
            price: calculatedPrice,
            inclusions: service.inclusions || []
        });
        
    } catch (error) {
        console.error('Error calculating price:', error);
        res.status(500).json({ 
            message: 'Failed to calculate price', 
            error: error.message 
        });
    }
});

module.exports = router;