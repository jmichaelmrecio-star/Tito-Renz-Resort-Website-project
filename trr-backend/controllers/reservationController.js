const Reservation = require('../models/Reservation'); // Your Mongoose model
const BlockedDate = require('../models/BlockedDate');
const PromoCode = require('../models/PromoCode'); // Your Mongoose model
const Service = require('../models/Service'); // Service model for database queries
const crypto = require('crypto'); // Built-in Node.js module for unique IDs
const servicesData = require('../config/servicesData'); // Load service definitions (fallback)
const mongoose = require('mongoose');

// Helper function to generate a unique QR code string (UUID)
// NOTE: This function is not used since we use crypto.randomBytes(16).toString('hex') for reservationHash
function generateQRCodeString() {
    return crypto.randomUUID();
}

// Helper function to calculate price from service data
function calculateServicePrice(service, durationId, guestCount = 1) {
    if (!service) return null;

    // For services with timeSlots (like Private Pool Area)
    if (service.timeSlots && service.timeSlots.length > 0) {
        const slot = service.timeSlots.find(ts => ts.id === durationId);
        if (!slot) return null;
        
        // Validate guest count is within the slot's range
        if (slot.guestRange) {
            if (guestCount < slot.guestRange.min || guestCount > slot.guestRange.max) {
                return null; // Guest count out of range
            }
        }
        return { price: slot.price, label: slot.label, inclusions: service.inclusions || [] };
    }

    // For services with durations (rooms and halls)
    if (service.durations && service.durations.length > 0) {
        const duration = service.durations.find(d => d.id === durationId);
        if (!duration) return null;
        return { price: duration.price, label: duration.label, inclusions: service.inclusions || [] };
    }

    return null;
}

// Helper: tolerant service lookup supporting custom string ids and MongoDB ObjectIds
async function findServiceByAnyId(serviceId, { includeInactive = false } = {}) {
    if (!serviceId) return null;

    const or = [{ id: serviceId }]; // custom/legacy string IDs like "private_pool_area"
    if (mongoose.isValidObjectId(serviceId)) {
        or.push({ _id: serviceId });
    }

    const query = { $or: or };
    if (!includeInactive) query.isActive = true;

    return Service.findOne(query);
}

exports.createReservation = async (req, res) => {
    try {
        const {
            serviceId,
            serviceType,
            // Match Reservation Details (from fieldset 2)
            number_of_guests: numberOfGuests, // RENAME HERE
            checkin_date: checkInDateString, // Mapped to schema path 'check_in'
            checkout_date: checkOutDateString, // Mapped to schema path 'check_out'
            // Match Contact Details (from fieldset 3, div#guestDetailsForm)
            customer_name: fullName,
            customer_contact: contactNumber,
            customer_email: email,
            customer_address: address,
            customer_notes: notes,
            basePrice,
            finalTotal,
            // NEW: Duration-based pricing fields
            selectedDuration,
            selectedTimeSlot,
            discountCode,
            discountValue
            // ... any other fields like basePrice, etc.
        } = req.body;

        // --- A. Identify User and Validate Guest Data ---
        let accountId = null;
        let reservationEmail = email;
        let reservationContactNumber = contactNumber;

        if (req.user) {
            accountId = req.user.accountId; 
            // NOTE: Ideally, you'd fetch the user's current contact info here
        } else {
            // Guest user: Ensure mandatory contact fields are present
            if (!fullName || !email || !contactNumber) {
                return res.status(400).json({ success: false, message: 'Guest reservations require full contact details.' });
            }
        }

        // --- B. Server-Side Date Validation (Check Past Dates) ---
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (!checkInDateString || !checkOutDateString) {
            return res.status(400).json({ success: false, message: 'Check-in and Check-out dates are required.' });
        }

        // Convert the strings to Date objects
        const checkIn = new Date(checkInDateString);
        const checkOut = new Date(checkOutDateString);

        // NEW VALIDATION: Check if the resulting Date object is valid
        if (isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
            return res.status(400).json({ success: false, message: 'Invalid date format received for check-in or check-out.' });
        }


        if (checkIn < today || checkOut < today || checkOut <= checkIn) {
            return res.status(400).json({ success: false, message: 'Invalid dates. Check-in and Check-out must be future dates, and check-out must be after check-in.' });
        }

        // --- C. Check for Blocked Dates (Server-Side Validation) ---
        const blockedDates = await BlockedDate.find();
        for (const block of blockedDates) {
            const blockStart = new Date(block.startDate);
            const blockEnd = new Date(block.endDate);
            
            // Check if service is affected (empty serviceIds means all services)
            const isServiceBlocked = block.serviceIds.length === 0 || block.serviceIds.includes(serviceId);
            
            // Check if dates overlap
            if (isServiceBlocked && checkIn <= blockEnd && checkOut >= blockStart) {
                const blockStartStr = blockStart.toLocaleDateString();
                const blockEndStr = blockEnd.toLocaleDateString();
                return res.status(400).json({
                    success: false,
                    message: `This service is unavailable from ${blockStartStr} to ${blockEndStr}. Reason: ${block.reason || 'Maintenance/Closure'}`
                });
            }
        }

        // --- C2. CRITICAL: Check for Double Booking (Prevent Overlapping Reservations) ---
        const existingReservations = await Reservation.find({
            serviceId: serviceId,
            status: { $ne: 'CANCELLED' }, // Exclude cancelled reservations
            $or: [
                // Check if new reservation overlaps with existing ones
                // Overlap occurs if: new check-in < existing check-out AND new check-out > existing check-in
                {
                    check_in: { $lt: checkOut },
                    check_out: { $gt: checkIn }
                }
            ]
        });

        if (existingReservations.length > 0) {
            const conflictingReservation = existingReservations[0];
            const existingCheckinStr = new Date(conflictingReservation.check_in).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            const existingCheckoutStr = new Date(conflictingReservation.check_out).toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            console.error('DOUBLE BOOKING PREVENTED:', {
                attemptedService: serviceId,
                attemptedCheckin: checkIn,
                attemptedCheckout: checkOut,
                conflictingReservation: {
                    id: conflictingReservation._id,
                    checkin: conflictingReservation.check_in,
                    checkout: conflictingReservation.check_out,
                    customer: conflictingReservation.full_name,
                    status: conflictingReservation.status
                }
            });

            return res.status(409).json({
                success: false,
                message: `This service is already booked during your selected time. Existing reservation: ${existingCheckinStr} to ${existingCheckoutStr}. Please choose different dates.`,
                conflict: {
                    existingCheckin: existingCheckinStr,
                    existingCheckout: existingCheckoutStr,
                    status: conflictingReservation.status
                }
            });
        }

        // --- D. Service Validation & Price Calculation ---
        let service = await findServiceByAnyId(serviceId);
        if (!service) {
            // Fallback to hardcoded services (legacy)
            service = servicesData.find(s => s.id === serviceId);
        }
        
        if (!service) {
            console.error('Service not found for ID:', serviceId);
            return res.status(400).json({ success: false, message: 'Invalid service selected.' });
        }
        
        console.log('✅ Service found:', { id: service.id, _id: service._id, name: service.name });

        // Validate max guest limit from service data
        if (numberOfGuests > service.max_guests) {
            return res.status(400).json({ success: false, message: `The chosen service allows a maximum of ${service.max_guests} guests.` });
        }

        // Validate duration/timeslot and calculate expected price
        const durationOrSlot = selectedTimeSlot || selectedDuration;
        if (!durationOrSlot) {
            return res.status(400).json({ success: false, message: 'Duration or time slot selection is required.' });
        }

        const priceData = calculateServicePrice(service, durationOrSlot, numberOfGuests);
        if (!priceData) {
            return res.status(400).json({ success: false, message: 'Invalid duration/time slot or guest count for the selected service.' });
        }

        // Server-side price validation (prevent frontend manipulation)
        const expectedBasePrice = priceData.price;
        const expectedFinalTotal = discountValue ? (expectedBasePrice - discountValue) : expectedBasePrice;
        
        // Allow 1 peso tolerance for rounding differences
        if (Math.abs(parseFloat(basePrice) - expectedBasePrice) > 1 || Math.abs(parseFloat(finalTotal) - expectedFinalTotal) > 1) {
            console.error(`Price mismatch: Expected base=${expectedBasePrice}, received=${basePrice}; Expected final=${expectedFinalTotal}, received=${finalTotal}`);
            return res.status(400).json({ 
                success: false, 
                message: 'Price validation failed. Please refresh and try again.',
                debug: { expectedBasePrice, expectedFinalTotal, receivedBase: basePrice, receivedFinal: finalTotal }
            });
        }

        // --- E. Generate Reservation Hash ---
        const reservationHash = crypto.randomBytes(16).toString('hex');
        
        // --- F. Create Reservation Record ---
        const newReservation = new Reservation({
            accountId,
            serviceId,
            serviceType,
            full_name: fullName,
            check_in: checkIn,
            check_out: checkOut,
            guests: numberOfGuests,
            phone: contactNumber,
            email: reservationEmail,
            address,
            basePrice: expectedBasePrice,
            finalTotal: expectedFinalTotal,
            discountCode: discountCode || null,
            discountValue: discountValue || 0,
            reservationHash: reservationHash, // CRITICAL: Correctly defined and used here
            // NEW: Duration-based pricing fields
            selectedDuration: selectedDuration || null,
            selectedTimeSlot: selectedTimeSlot || null,
            durationLabel: priceData.label,
            inclusions: priceData.inclusions,
            // Initial Statuses
            status: 'PENDING', 
            paymentStatus: 'PENDING',
        });

        await newReservation.save();

        res.status(201).json({ 
            success: true, 
            message: 'Reservation created successfully. Proceed to payment.', 
            reservationId: newReservation._id,
            reservationHash: reservationHash // CRITICAL: Correct key returned in the response
        });

    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ success: false, message: 'Failed to create reservation.', error: error.message });
    }
};

// ... existing imports

/**
 * Finalizes the reservation after payment confirmation.
 * This function FINDS the existing PENDING reservation and UPDATES its status.
 */
// --- Finalize Reservation (Handle Payment Submission) ---
exports.finalizeReservation = async (req, res) => {
    // 1. Destructure the required fields from the frontend payload
    // FIX 1: Change expected input field from qrCodeHash to reservationHash
    const { reservationHash, gcashReferenceNumber } = req.body; 

    // 2. Basic Validation
    if (!reservationHash || !gcashReferenceNumber) {
        return res.status(400).json({ success: false, message: "Missing hash or GCash reference number in the request body." });
    }

    try {
        // 3. Find the reservation using the unique reservation hash
        // FIX 2: Query the database using the correct field name
        const reservation = await Reservation.findOne({ reservationHash: reservationHash }); 

        if (!reservation) {
            return res.status(404).json({ success: false, message: "Reservation not found using the provided hash." });
        }

        // 4. Idempotency Check: Prevent confirming an already confirmed/paid reservation
        if (reservation.paymentStatus === 'PAID' && reservation.status !== 'PENDING') {
            // Use 409 Conflict status code
            return res.status(409).json({ success: false, message: "Reservation is already confirmed or payment has been processed." });
        }

        // 5. Update the payment and reservation statuses
        reservation.gcashReferenceNumber = gcashReferenceNumber;
        reservation.paymentStatus = 'PAID';
        // Auto-update status to PAID when payment is received
        reservation.status = 'PAID'; 
        
        // Save the updated reservation
        const updatedReservation = await reservation.save();

        // 6. Success Response
        res.status(200).json({
            success: true,
            message: "Payment confirmed and reservation finalized.",
            // FIX 3: Return the correct hash field in the response
            reservationHash: updatedReservation.reservationHash 
        });

    } catch (error) {
        console.error("Error finalizing reservation:", error);
        // Mongoose validation errors or other operational errors
        res.status(500).json({ success: false, message: "Internal server error during finalization." });
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
        // Query the database for paid reservations awaiting admin confirmation.
        const pendingReservations = await Reservation.find({ 
            status: 'PAID'
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

// Example in reservationController.js

exports.getReservationDetails = async (req, res) => {
    try {
        const { reservationId, hash } = req.params;

        // 1. Find the reservation using both ID and hash (for security)
        const reservation = await Reservation.findOne({ 
            _id: reservationId, 
            // FIX: Query the database using the correct field name
            reservationHash: hash 
        });

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found or invalid access.' });
        }

        // 2. Return the necessary data for the summary
        res.status(200).json({ 
            success: true, 
            reservation 
        });

    } catch (error) {
        console.error("Error fetching reservation details:", error);
        res.status(500).json({ message: 'Server error retrieving details.' });
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

        const normalizedStatus = status.toString().trim().toUpperCase();

        // Validate the status is one of the allowed admin actions
        const allowedStatuses = ['CONFIRMED', 'CANCELLED', 'COMPLETED'];
        if (!allowedStatuses.includes(normalizedStatus)) {
            return res.status(400).json({ message: `Invalid status provided: ${status}` });
        }

        const nextFields = { status: normalizedStatus };

        if (normalizedStatus === 'CANCELLED') {
            nextFields.paymentStatus = 'REFUNDED';
        } else if (normalizedStatus === 'CONFIRMED' || normalizedStatus === 'COMPLETED') {
            nextFields.paymentStatus = 'PAID';
        }
        nextFields.updatedAt = new Date();

        // Find the reservation by ID and update the status field
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            nextFields,
            { new: true } // Returns the updated document
        );

        if (!updatedReservation) {
            return res.status(404).json({ message: 'Reservation not found.' });
        }

        res.status(200).json({ 
            message: `Reservation ${id} successfully updated to status: ${normalizedStatus}`,
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

// Function to get all reservations for a specific user email
exports.getUserReservations = async (req, res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.status(400).json({ message: 'Email parameter is required.' });
        }
        
        // Find reservations matching the email or the accountId (if linked)
        const reservations = await Reservation.find({ email: decodeURIComponent(email) }).sort({ dateCreated: -1 });
        
        res.status(200).json(reservations);
        
    } catch (error) {
        console.error('SERVER ERROR fetching user reservations:', error);
        res.status(500).json({ message: 'Error fetching user reservations.', details: error.message });
    }
};

exports.blockDateForMaintenance = async (req, res) => {
    try {
        // NOTE: You must have a middleware function (like requireRole('Admin', 'Manager')) 
        // checking the user's role before this function runs.

        const { date, reason } = req.body;

        if (!date || !reason) {
            return res.status(400).json({ message: 'Missing date or reason for blocking.' });
        }

        const blockDate = new Date(date);
        blockDate.setUTCHours(0, 0, 0, 0); // Normalize date to start of day

        // Check if the date is already blocked
        const existingBlock = await BlockedDate.findOne({ date: blockDate });
        if (existingBlock) {
            return res.status(400).json({ message: `Date ${date} is already blocked for maintenance.` });
        }

        // Create the new blocked date entry
        const newBlockedDate = new BlockedDate({
            date: blockDate,
            reason: reason,
            blockedBy: req.user ? req.user.accountId : null, // Record who blocked it
        });

        await newBlockedDate.save();

        res.status(201).json({ 
            success: true, 
            message: `Successfully blocked date ${date} for maintenance.`,
            blockedDate: newBlockedDate
        });

    } catch (error) {
        console.error('Error blocking date:', error);
        res.status(500).json({ success: false, message: 'Failed to block date.' });
    }
};

// reservationController.js

exports.staffCheckIn = async (req, res) => {
    try {
        // --- 1. Get Hash from URL Parameters ---
        // We are renaming the variable here to be explicit
        const { reservationHash: hashFromUrl } = req.params; // <-- CHANGE IS HERE

        if (!hashFromUrl) { // Use the new variable name
            return res.status(400).json({ success: false, message: 'Reservation Hash is missing from the URL.' });
        }

        // --- 2. Find Reservation and Basic Checks ---
        // Use the schema key name (reservationHash) with the new variable (hashFromUrl)
        const reservation = await Reservation.findOne({ reservationHash: hashFromUrl }); // <-- CHANGE IS HERE
        
        if (!reservation) {
            // If this fires, the hash is bad, or the database is down. Since you verified the data, 
            // the query should now be correct.
            return res.status(404).json({ success: false, message: 'No matching reservation found for this hash.' });
        }
        
        // --- 3. Payment Status Check (CRITICAL) ---
        if (reservation.paymentStatus !== 'PAID') {
            return res.status(403).json({ 
                success: false, 
                message: `Check-in Failed: Payment status is ${reservation.paymentStatus}. Payment must be PAID.`,
                status: 'PAYMENT_PENDING' // Added a status code for the frontend to handle
            });
        }
        
        // --- 4. Already Checked In Check ---
        if (reservation.status === 'CHECKED_IN') {
             // Return success status but a clear message, so the staff knows it's already done.
            return res.status(200).json({ 
                success: true, 
                message: 'Reservation is already marked as checked-in.',
                status: 'ALREADY_CHECKED_IN'
            });
        }

        // --- 5. Perform Check-in Update ---
        reservation.status = 'CHECKED_IN';
        reservation.checkInTime = new Date();
        await reservation.save();

        // --- 6. Success Response ---
        res.status(200).json({ 
            success: true, 
            message: `Check-in successful for ${reservation.full_name || 'Guest User'}.`,
            status: 'CHECKED_IN',
            reservationDetails: {
                // Ensure these fields exist on your Reservation model:
                guestName: reservation.full_name || 'Registered User', 
                service: reservation.serviceType,
                checkIn: reservation.check_in,
                guests: reservation.guests,
                totalPaid: reservation.finalTotal
            }
        });

    } catch (error) {
        console.error('Error during staff check-in:', error);
        res.status(500).json({ success: false, message: 'Internal server error during check-in.', status: 'ERROR' });
    }
};

exports.generateReports = async (req, res) => {
    try {
        // NOTE: Assuming dates are passed as query parameters: /admin/reports/generate?startDate=...&endDate=...
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Start and End dates are required for report generation.' });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Ensure the end date includes the entire day

        // --- Aggregation Pipeline for Income and Count ---
        const reportData = await Reservation.aggregate([
            {
                // 1. Filter reservations within the chosen timeline AND where payment is PAID
                $match: {
                    dateCreated: { $gte: start, $lte: end },
                    paymentStatus: 'PAID'
                }
            },
            {
                // 2. Group the filtered results to calculate totals
                $group: {
                    _id: null, // Group all documents into one total result
                    totalIncome: { $sum: "$finalTotal" }, // Assuming the final paid amount is stored in 'finalTotal'
                    totalReservations: { $sum: 1 }, // Count the number of matched reservations
                }
            },
            {
                // 3. (Optional) Project the output to rename fields
                $project: {
                    _id: 0,
                    totalIncome: 1,
                    totalReservations: 1,
                    reportPeriod: {
                        startDate: start,
                        endDate: end
                    }
                }
            }
        ]);

        // Send the report back to the admin
        const report = reportData[0] || { totalIncome: 0, totalReservations: 0, reportPeriod: { startDate: start, endDate: end } };

        res.status(200).json({ 
            success: true, 
            message: 'Report generated successfully.', 
            report: report 
        });

    } catch (error) {
        console.error('Error generating report:', error);
        res.status(500).json({ success: false, message: 'Failed to generate report.', details: error.message });
    }
};

exports.getReservationByHash = async (req, res) => {
    try {
        const { hash } = req.params;

        if (!hash) {
            return res.status(400).json({ success: false, message: "Reservation hash is required." });
        }

        // 1. Search for the reservation using the short 'reservationHash' field.
        const reservation = await Reservation.findOne({ reservationHash: hash });

        if (!reservation) {
            // Use a 404 Not Found error if the hash doesn't match any reservation
            return res.status(404).json({ success: false, message: "Reservation not found or invalid hash." });
        }

        // 2. Success: Return the reservation data.
        res.status(200).json({
            success: true,
            reservation: reservation
            // Add a friendly message if needed: message: "Reservation details retrieved successfully."
        });

    } catch (error) {
        console.error("Error retrieving reservation by hash:", error);
        res.status(500).json({ success: false, message: "Server error while retrieving reservation." });
    }
};

/**
 * Check if a service is available for the given date range
 * @route POST /api/reservations/check-availability
 * @body { serviceId, checkin_date, checkout_date }
 */
exports.checkAvailability = async (req, res) => {
    try {
        const { serviceId, checkin_date, checkout_date } = req.body;
        
        if (!serviceId || !checkin_date || !checkout_date) {
            return res.status(400).json({ 
                message: 'Missing required fields', 
                available: true 
            });
        }
        
        const checkin = new Date(checkin_date);
        const checkout = new Date(checkout_date);
        
        // Tolerant service lookup
        const service = await findServiceByAnyId(serviceId);
        if (!service) {
            return res.status(404).json({ message: 'Service not found', available: true });
        }

        // Find overlapping reservations (excluding cancelled/rejected)
        const overlapping = await Reservation.find({
            $or: [
                { serviceId: serviceId },
                { serviceId: service.id },
                { serviceId: service._id?.toString() }
            ],
            status: { $nin: ['cancelled', 'rejected'] },
            // Overlap: new check_in < existing check_out AND new check_out > existing check_in
            check_in: { $lt: checkout },
            check_out: { $gt: checkin }
        });
        
        res.json({ 
            available: overlapping.length === 0, 
            conflictingReservations: overlapping.length 
        });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ 
            message: error.message, 
            available: true 
        });
    }
};

/**
 * Get all reservations for a specific service
 * @route GET /api/reservations/service/:serviceId
 */
exports.getReservationsByService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        
        if (!serviceId) {
            return res.status(400).json({ message: 'Missing serviceId' });
        }
        
        // Tolerant service lookup (allow inactive for history)
        const service = await findServiceByAnyId(serviceId, { includeInactive: true });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Query reservations using BOTH the custom id and MongoDB _id as stored
        const reservations = await Reservation.find({ 
            $or: [
                { serviceId: serviceId },
                { serviceId: service.id },
                { serviceId: service._id?.toString() }
            ],
            status: { $nin: ['cancelled', 'rejected'] }
        })
        .select('serviceId check_in check_out status full_name customer_name')
        .sort({ check_in: 1 });
        
        res.json(reservations);
    } catch (error) {
        console.error('Error fetching reservations by service:', error);
        res.status(500).json({ message: error.message });
    }
};