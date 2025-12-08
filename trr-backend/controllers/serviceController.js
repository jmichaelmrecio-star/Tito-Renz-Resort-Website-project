const Service = require('../models/Service');

/**
 * Get all active services
 * @route GET /api/services
 */
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find({ isActive: true }).sort({ type: 1, name: 1 });
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ 
            message: 'Failed to fetch services', 
            error: error.message 
        });
    }
};

/**
 * Get ALL services (including inactive) - Admin only
 * @route GET /api/services/admin/all
 */
exports.getAllServicesAdmin = async (req, res) => {
    try {
        const services = await Service.find({}).sort({ type: 1, name: 1 });
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching all services:', error);
        res.status(500).json({ 
            message: 'Failed to fetch services', 
            error: error.message 
        });
    }
};

/**
 * Get a single service by ID
 * @route GET /api/services/:id
 */
exports.getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({ 
            message: 'Failed to fetch service', 
            error: error.message 
        });
    }
};

/**
 * Calculate price for a service based on duration/timeslot
 * @route POST /api/services/calculate-price
 * @body { serviceId, durationId, guestCount }
 */
exports.calculatePrice = async (req, res) => {
    try {
        const { serviceId, durationId, guestCount = 1 } = req.body;
        
        if (!serviceId || !durationId) {
            return res.status(400).json({ 
                message: 'serviceId and durationId are required' 
            });
        }
        
        const service = await Service.findOne({ id: serviceId, isActive: true });
        
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
};

/**
 * Create a new service (Admin only - add auth middleware later)
 * @route POST /api/services
 */
exports.createService = async (req, res) => {
    try {
        const serviceData = req.body;
        const newService = new Service(serviceData);
        await newService.save();
        
        res.status(201).json({
            message: 'Service created successfully',
            service: newService
        });
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ 
            message: 'Failed to create service', 
            error: error.message 
        });
    }
};

/**
 * Update a service (Admin only - add auth middleware later)
 * @route PUT /api/services/:id
 */
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        const service = await Service.findOneAndUpdate(
            { id: id },
            { ...updates, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.status(200).json({
            message: 'Service updated successfully',
            service
        });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ 
            message: 'Failed to update service', 
            error: error.message 
        });
    }
};

/**
 * Delete (deactivate) a service (Admin only - add auth middleware later)
 * @route DELETE /api/services/:id
 */
exports.deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        
        const service = await Service.findByIdAndUpdate(
            id,
            { isActive: false, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.status(200).json({
            message: 'Service deactivated successfully'
        });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ 
            message: 'Failed to delete service', 
            error: error.message 
        });
    }
};

/**
 * Activate a service (Admin only - add auth middleware later)
 * @route PUT /api/services/:id/activate
 */
exports.activateService = async (req, res) => {
    try {
        const { id } = req.params;
        
        const service = await Service.findByIdAndUpdate(
            id,
            { isActive: true, updatedAt: Date.now() },
            { new: true }
        );
        
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.status(200).json({
            message: 'Service activated successfully',
            service
        });
    } catch (error) {
        console.error('Error activating service:', error);
        res.status(500).json({ 
            message: 'Failed to activate service', 
            error: error.message 
        });
    }
};

/**
 * Update an existing service (full update for editing)
 * @route PUT /api/services/:id
 */
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        if (!updateData.id || !updateData.name) {
            return res.status(400).json({ 
                message: 'Service ID and Name are required' 
            });
        }
        
        const updated = await Service.findByIdAndUpdate(
            id,
            {
                $set: {
                    id: updateData.id,
                    name: updateData.name,
                    type: updateData.type,
                    category: updateData.category,
                    max_guests: updateData.max_guests,
                    description: updateData.description,
                    image: updateData.image,
                    gallery: updateData.gallery || [],
                    durations: updateData.durations || [],
                    timeSlots: updateData.timeSlots || [],
                    inclusions: updateData.inclusions || [],
                    notes: updateData.notes || '',
                    defaultDuration: updateData.defaultDuration || null,
                    isActive: updateData.isActive !== false,
                    updatedAt: new Date()
                }
            },
            { new: true, runValidators: true }
        );
        
        if (!updated) {
            return res.status(404).json({ message: 'Service not found' });
        }
        
        res.json({ 
            message: 'Service updated successfully', 
            service: updated 
        });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ 
            message: 'Failed to update service', 
            error: error.message 
        });
    }
};
