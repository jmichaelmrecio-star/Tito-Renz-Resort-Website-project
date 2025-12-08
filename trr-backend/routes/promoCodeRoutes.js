const express = require('express');
const router = express.Router();
const PromoCode = require('../models/PromoCode');

// NOTE: For a real app, these routes would be protected by an isAdmin middleware.
// We are skipping that for this development phase.

// POST /api/promocodes/create - Create a new promo code (Admin/Manager action)
router.post('/create', async (req, res) => {
    try {
        const { code, discountPercentage, expirationDate, minPurchaseAmount, usageLimit } = req.body;

        // Simple validation
        if (!code || !discountPercentage || !expirationDate) {
            return res.status(400).json({ message: 'Missing required fields: code, discount percentage, and expiration date.' });
        }
        if (discountPercentage <= 0 || discountPercentage > 1) {
            return res.status(400).json({ message: 'Discount percentage must be between 0.01 and 1.00 (1% to 100%).' });
        }
        
        // Ensure the code doesn't already exist
        const existingCode = await PromoCode.findOne({ code: code.toUpperCase() });
        if (existingCode) {
            return res.status(409).json({ message: `Promo code '${code.toUpperCase()}' already exists.` });
        }

        const newCode = new PromoCode({
            code: code.toUpperCase(), // Store uppercase for easy lookup
            discountPercentage,
            expirationDate,
            minPurchaseAmount: minPurchaseAmount || 0,
            usageLimit: usageLimit || 50
        });

        const savedCode = await newCode.save();
        res.status(201).json({ 
            message: 'Promo code created successfully.', 
            code: savedCode 
        });

    } catch (error) {
        console.error('Error creating promo code:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET /api/promocodes/all - Get all promo codes (For Admin dashboard display)
router.get('/all', async (req, res) => {
    try {
        // Exclude sensitive fields like timesUsed for a general request if needed, 
        // but for admin purposes, we'll return everything.
        const codes = await PromoCode.find().sort({ createdAt: -1 });
        res.status(200).json(codes);
    } catch (error) {
        console.error('Error fetching promo codes:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET /api/promocodes/active - List active (non-expired) promo codes for public display
router.get('/active/list', async (_req, res) => {
    try {
        const now = new Date();
        const activeCodes = await PromoCode.find({
            expirationDate: { $gte: now },
            $expr: { $lt: ['$timesUsed', '$usageLimit'] },
        }).sort({ expirationDate: 1 });

        res.status(200).json(activeCodes);
    } catch (error) {
        console.error('Error fetching active promo codes:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// DELETE /api/promocodes/:id - Delete a promo code
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await PromoCode.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Promo code not found.' });
        }

        res.status(200).json({ message: 'Promo code deleted successfully.' });
    } catch (error) {
        console.error('Error deleting promo code:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET /api/promocodes/:code - Lookup a specific promo code (Customer action)
router.get('/:code', async (req, res) => {
    try {
        const code = req.params.code.toUpperCase(); // Get code from URL parameter

        // 1. Find the code in the database
        const promoCode = await PromoCode.findOne({ code: code });

        // 2. Handle the Not Found case correctly
        if (!promoCode) {
            // Sends a 404 status AND a clean JSON error message
            return res.status(404).json({ message: 'Promo code not found or invalid.' });
        }
        
        // 3. Optional: Check if the code is expired/fully used (for robust validation)
        const now = new Date();
        if (new Date(promoCode.expirationDate) < now) {
            return res.status(400).json({ message: 'Promo code has expired.' });
        }
        if (promoCode.timesUsed >= promoCode.usageLimit) {
            return res.status(400).json({ message: 'Promo code has reached its usage limit.' });
        }

        // 4. Send the valid promo code object
        res.status(200).json(promoCode);

    } catch (error) {
        console.error('Error fetching promo code by code:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;