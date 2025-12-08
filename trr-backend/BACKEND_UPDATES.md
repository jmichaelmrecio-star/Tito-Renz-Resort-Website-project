/**
 * BACKEND UPDATES REQUIRED
 * 
 * File: trr-backend/controllers/reservationController.js
 * Add these methods to the existing controller
 */

// Method 1: Check availability for a specific service on given dates
exports.checkAvailability = async (req, res) => {
    try {
        const { serviceId, checkin_date, checkout_date } = req.body;
        
        if (!serviceId || !checkin_date || !checkout_date) {
            return res.status(400).json({ 
                message: 'Missing required fields: serviceId, checkin_date, checkout_date',
                available: true 
            });
        }

        const checkin = new Date(checkin_date);
        const checkout = new Date(checkout_date);

        // Find overlapping reservations that are not cancelled or rejected
        const overlapping = await Reservation.find({
            serviceId,
            status: { $nin: ['cancelled', 'rejected'] },
            $or: [
                {
                    checkin_date: { $lte: checkout },
                    checkout_date: { $gte: checkin }
                }
            ]
        });

        res.json({
            available: overlapping.length === 0,
            conflictingReservations: overlapping.length,
            conflicts: overlapping.map(r => ({
                guestName: r.customer_name,
                checkin: r.checkin_date,
                checkout: r.checkout_date
            }))
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ 
            message: error.message,
            available: true // Default to available on error to not block booking
        });
    }
};

// Method 2: Get all non-cancelled reservations for a specific service
exports.getReservationsByService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        
        if (!serviceId) {
            return res.status(400).json({ message: 'Missing serviceId' });
        }

        const reservations = await Reservation.find({ 
            serviceId,
            status: { $nin: ['cancelled', 'rejected'] }
        })
        .select('serviceId checkin_date checkout_date status customer_name')
        .sort({ checkin_date: 1 });
        
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations by service:', error);
        res.status(500).json({ message: error.message });
    }
};

/**
 * File: trr-backend/routes/reservationRoutes.js
 * Add these routes
 */

// Add to existing routes:
router.post('/check-availability', reservationController.checkAvailability);
router.get('/service/:serviceId', reservationController.getReservationsByService);

/**
 * File: trr-backend/routes/serviceRoutes.js
 * Ensure this route exists (update if missing)
 */

router.put('/:id', serviceController.updateService);

/**
 * File: trr-backend/controllers/serviceController.js
 * Add/update this method
 */

exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate required fields
        if (!updateData.id || !updateData.name) {
            return res.status(400).json({ 
                message: 'Service ID and Name are required' 
            });
        }

        // Don't allow changing the MongoDB _id, but allow changing the service id field
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
        res.status(500).json({ message: error.message });
    }
};
