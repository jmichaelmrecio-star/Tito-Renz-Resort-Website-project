const Account = require('../models/Account'); 
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); // Included for potential ObjectId checks
const Reservation = require('../models/Reservation');

// Secret key for JWT (Make sure this matches your environment variable)
const jwtSecret = process.env.JWT_SECRET || 'your_default_secret_key'; 

// Helper to split a full name into first/middle/last (best-effort)
function splitFullName(fullName = '') {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return { first: '', middle: null, last: '' };
    if (parts.length === 1) return { first: parts[0], middle: null, last: '' };
    if (parts.length === 2) return { first: parts[0], middle: null, last: parts[1] };
    return { first: parts[0], middle: parts.slice(1, -1).join(' '), last: parts.at(-1) };
}

// --- Registration Logic (Server-Side) ---
exports.registerUser = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, email, phone, password, role_id } = req.body;
        
        let user = await Account.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists with this email address.' });
        }

        user = await Account.create({
            email,
            password: password, 
            first_name,
            middle_name: middle_name || null, 
            last_name,
            phone,
            role_id, 
        });

        return res.status(201).json({ 
            message: 'Registration successful. Please log in.', 
            redirect: 'login.html',
        }); 

    } catch (error) {
        console.error('SERVER ERROR during registration:', error);
        res.status(500).json({ message: 'Server error during registration.', details: error.message });
    }
};

// --- Login Logic (Server-Side) ---
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. Check if user exists and select the password field
        const user = await Account.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials (User not found).' });
        }

        // 2. Check if account is active
        if (user.isActive === false) {
            return res.status(403).json({ message: 'This account has been deactivated. Please contact an administrator.' });
        }

        // 3. Check password using bcrypt.compare
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) { 
             return res.status(401).json({ message: 'Invalid credentials (Password incorrect).' });
        }

        
        // 4. Combine names correctly (Handles null/undefined middle names cleanly)
        const fullName = `${user.first_name || ''} ${user.middle_name || ''} ${user.last_name || ''}`
            .trim()
            .replace(/\s+/g, ' ');

        // ----------------------------------------------------------------------
        // *** IMPORTANT: REPLACE THIS PLACEHOLDER WITH THE ACTUAL ***
        // *** MONGODB ObjectId STRING for your Admin role and Manager role in 'role_tbl'.   ***
        // ----------------------------------------------------------------------
        const ADMIN_ROLE_ID = '6911d923e3fb923eed25f44d'; 
        const MANAGER_ROLE_ID = '6911d910e3fb923eed25f44c'; // <-- NEW ID REQUIRED
        // ----------------------------------------------------------------------

        let userRole = 'Customer';
        let redirectPath = 'index.html';

        const userRoleIdString = user.role_id ? user.role_id.toString() : '';

        if (userRoleIdString === ADMIN_ROLE_ID) { 
            userRole = 'Admin';
            redirectPath = 'admin-dashboard.html'; 
        } else if (userRoleIdString === MANAGER_ROLE_ID) {
            userRole = 'Manager';
            redirectPath = 'admin-dashboard.html'; 
        }
        
        // 3. Generate token (NEW WAY: Use the calculated userRole string)
        const token = jwt.sign(
            { 
                id: user._id, 
                // CRITICAL FIX: The checkin middleware expects the role string here
                role: userRole 
            }, 
            jwtSecret, 
            { expiresIn: '1h' }
        );


        // 6. Send COMPLETE response payload to the client
        return res.status(200).json({ 
            message: 'Login successful.', 
            token, 
            role: userRole, 
            user: { 
                id: user._id, 
                full_name: fullName, 
                email: user.email, 
                phone: user.phone || 'N/A', // Ensures phone is sent
                role: userRole 
            },
            redirect: redirectPath
        });

    } catch (error) {
        console.error('SERVER ERROR during login:', error);
        res.status(500).json({ message: 'Server error during login.', details: error.message });
    }
};

// --- Staff Token Generation (for check-in terminal) ---
// This endpoint issues a fresh JWT token for staff check-in operations
// No authentication required - can be called by any client
exports.getStaffToken = async (req, res) => {
    try {
        // Generate a temporary staff token valid for 1 hour
        const token = jwt.sign(
            { 
                id: 'staff-check-in-system',
                role: 'Admin'  // Check-in terminal needs Admin permissions
            }, 
            jwtSecret, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Staff token generated successfully',
            token: token,
            expiresIn: 3600  // 1 hour in seconds
        });

    } catch (error) {
        console.error('SERVER ERROR during token generation:', error);
        res.status(500).json({ message: 'Server error generating token.', details: error.message });
    }
};

// --- Create Account (Admin) ---
exports.createAccountAsAdmin = async (req, res) => {
    try {
        const { first_name, middle_name, last_name, email, phone, password, role_id } = req.body;
        
        // Check if user already exists
        let user = await Account.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists with this email address.' });
        }

        // Validate role_id
        if (!role_id) {
            return res.status(400).json({ success: false, message: 'Role ID is required.' });
        }

        // Create new account
        user = await Account.create({
            email,
            password,
            first_name,
            middle_name: middle_name || null,
            last_name,
            phone,
            role_id,
            isActive: true
        });

        return res.status(201).json({ 
            success: true,
            message: 'Account created successfully.',
            user: {
                _id: user._id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                role_id: user.role_id,
                isActive: user.isActive
            }
        });

    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({ success: false, message: 'Server error during account creation.', error: error.message });
    }
};

// --- Update Account (Admin) ---
exports.updateAccountAsAdmin = async (req, res) => {
    try {
        const { userId } = req.params;
        const { first_name, middle_name, last_name, email, phone, role_id, password } = req.body;

        // Find the account
        const user = await Account.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Account not found.' });
        }

        // Update fields
        if (first_name) user.first_name = first_name;
        if (middle_name !== undefined) user.middle_name = middle_name || null;
        if (last_name) user.last_name = last_name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (role_id) user.role_id = role_id;
        if (password) user.password = password; // Will be hashed by pre-save hook

        await user.save();

        return res.status(200).json({ 
            success: true,
            message: 'Account updated successfully.',
            user: {
                _id: user._id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                role_id: user.role_id,
                isActive: user.isActive
            }
        });

    } catch (error) {
        console.error('Error updating account:', error);
        res.status(500).json({ success: false, message: 'Server error during account update.', error: error.message });
    }
};

// --- Deactivate Account (Admin) ---
exports.deactivateAccount = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await Account.findByIdAndUpdate(
            userId,
            { isActive: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'Account not found.' });
        }

        return res.status(200).json({ 
            success: true,
            message: 'Account deactivated successfully.',
            user
        });

    } catch (error) {
        console.error('Error deactivating account:', error);
        res.status(500).json({ success: false, message: 'Server error during deactivation.', error: error.message });
    }
};

// --- Activate Account (Admin) ---
exports.activateAccount = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await Account.findByIdAndUpdate(
            userId,
            { isActive: true },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'Account not found.' });
        }

        return res.status(200).json({ 
            success: true,
            message: 'Account activated successfully.',
            user
        });

    } catch (error) {
        console.error('Error activating account:', error);
        res.status(500).json({ success: false, message: 'Server error during activation.', error: error.message });
    }
};

// --- Get all roles ---
exports.getAllRoles = async (req, res) => {
    try {
        const Role = require('../models/Role');
        const roles = await Role.find();
        return res.status(200).json({ success: true, roles });
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ success: false, message: 'Server error fetching roles.', error: error.message });
    }
};

// --- Update Profile (User self-service: name/email/phone only) ---
exports.updateProfile = async (req, res) => {
    try {
        // Extract userId from JWT token (set by verifyToken middleware)
        const userId = req.user?.id;
        const { full_name, email, phone } = req.body;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Authentication required. No user ID in token.' });
        }

        const user = await Account.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Enforce unique email if changed
        if (email && email !== user.email) {
            const existing = await Account.findOne({ email });
            if (existing) {
                return res.status(400).json({ success: false, message: 'Email is already in use.' });
            }
        }

        // Update name parts from full_name (best-effort)
        if (full_name) {
            const { first, middle, last } = splitFullName(full_name);
            user.first_name = first || user.first_name;
            user.middle_name = middle;
            user.last_name = last || user.last_name;
        }

        if (email) user.email = email;
        if (phone) user.phone = phone;

        await user.save();

        // Backfill reservations to keep history visible when email changes
        if (email) {
            await Reservation.updateMany({ accountId: user._id }, { email });
        }
        if (phone) {
            await Reservation.updateMany({ accountId: user._id }, { customer_contact: phone });
        }

        const updatedFullName = `${user.first_name || ''} ${user.middle_name || ''} ${user.last_name || ''}`
            .trim()
            .replace(/\s+/g, ' ');

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully.',
            user: {
                id: user._id,
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                full_name: updatedFullName,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ success: false, message: 'Server error during profile update.', error: error.message });
    }
};