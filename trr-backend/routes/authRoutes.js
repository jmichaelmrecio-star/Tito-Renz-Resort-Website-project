const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Define the routes for registration and login
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// NEW: Endpoint to generate staff check-in token (no authentication required)
router.get('/staff-token', authController.getStaffToken);

// Admin account management routes
router.post('/admin/accounts/create', authController.createAccountAsAdmin);
router.put('/admin/accounts/:userId', authController.updateAccountAsAdmin);
router.put('/admin/accounts/:userId/deactivate', authController.deactivateAccount);
router.put('/admin/accounts/:userId/activate', authController.activateAccount);
router.get('/roles', authController.getAllRoles);

// User self-service profile update (name/email/phone)
router.put('/profile', verifyToken, authController.updateProfile);

module.exports = router;