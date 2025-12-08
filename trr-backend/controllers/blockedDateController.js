const BlockedDate = require('../models/BlockedDate');

/**
 * Utility: safely parse service IDs from request body.
 */
function normalizeServiceIds(input) {
    if (!input || (Array.isArray(input) && input.length === 0)) {
        return { ids: [], appliesToAll: true };
    }

    if (typeof input === 'string') {
        // Attempt to parse JSON arrays, otherwise treat comma-separated list
        try {
            const parsed = JSON.parse(input);
            if (Array.isArray(parsed)) {
                return {
                    ids: parsed.filter(Boolean),
                    appliesToAll: parsed.length === 0,
                };
            }
        } catch (error) {
            const list = input.split(',').map(item => item.trim()).filter(Boolean);
            return { ids: list, appliesToAll: list.length === 0 };
        }
        return { ids: [], appliesToAll: true };
    }

    if (Array.isArray(input)) {
        const list = input.filter(Boolean);
        return { ids: list, appliesToAll: list.length === 0 };
    }

    return { ids: [], appliesToAll: true };
}

exports.blockDateRange = async (req, res) => {
    try {
        const { startDate, endDate, reason, serviceIds, appliesToAll } = req.body;

        if (!startDate || !endDate || !reason) {
            return res.status(400).json({
                success: false,
                message: 'startDate, endDate, and reason are required.',
            });
        }

        const normalizedStart = new Date(startDate);
        const normalizedEnd = new Date(endDate);

        if (Number.isNaN(normalizedStart) || Number.isNaN(normalizedEnd)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid date format provided.',
            });
        }

        if (normalizedEnd < normalizedStart) {
            return res.status(400).json({
                success: false,
                message: 'endDate must be greater than or equal to startDate.',
            });
        }

        // NEW: Prevent blocking past dates
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (normalizedStart < today) {
            return res.status(400).json({
                success: false,
                message: 'Cannot block dates in the past. Start date must be today or later.',
            });
        }

        // Use the appliesToAll flag from frontend, fallback to normalizeServiceIds for compatibility
        let finalServiceIds = [];
        let finalAppliesToAll = appliesToAll === true; // Respect frontend flag

        if (!finalAppliesToAll) {
            // If specific services are provided, use them
            const { ids } = normalizeServiceIds(serviceIds);
            finalServiceIds = ids;
            finalAppliesToAll = ids.length === 0; // If no IDs provided, applies to all
        }

        console.log('Creating blocked date:', {
            startDate: normalizedStart,
            endDate: normalizedEnd,
            reason: reason.trim(),
            serviceIds: finalServiceIds,
            appliesToAll: finalAppliesToAll,
            blockedBy: req.user?.accountId || 'anonymous',
        });

        const blockedRange = await BlockedDate.create({
            date: normalizedStart, // Legacy field for compatibility
            startDate: normalizedStart,
            endDate: normalizedEnd,
            reason: reason.trim(),
            serviceIds: finalServiceIds,
            appliesToAllServices: finalAppliesToAll,
            blockedBy: req.user?.accountId || null,
        });

        return res.status(201).json({
            success: true,
            message: 'Date range blocked successfully.',
            blockedDate: blockedRange,
        });
    } catch (error) {
        console.error('Error blocking date range:', error.message, error.stack);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while blocking date range.',
            error: error.message, // Include error details for debugging
        });
    }
};

exports.getAllBlockedDates = async (_req, res) => {
    try {
        const blockedDates = await BlockedDate.find().sort({ startDate: 1 });
        return res.status(200).json({ success: true, blockedDates });
    } catch (error) {
        console.error('Error fetching blocked dates:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching blocked dates.',
        });
    }
};

exports.getActiveBlockedDates = async (_req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const blockedDates = await BlockedDate.find({
            endDate: { $gte: today },
        }).sort({ startDate: 1 });

        return res.status(200).json({ success: true, blockedDates });
    } catch (error) {
        console.error('Error fetching active blocked dates:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while fetching active blocked dates.',
        });
    }
};

exports.unblockDate = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'Blocked date ID is required.',
            });
        }

        const deleted = await BlockedDate.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Blocked date not found.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Blocked date removed successfully.',
        });
    } catch (error) {
        console.error('Error deleting blocked date:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error while deleting blocked date.',
        });
    }
};

