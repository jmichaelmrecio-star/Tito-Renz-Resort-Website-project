// --- middleware/authMiddleware.js ---
const jwt = require('jsonwebtoken');

// 1. JWT Verification Middleware
const verifyToken = (req, res, next) => {
    // Check for authorization header (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            message: 'Access denied. No token provided.',
            success: false 
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        // NOTE: Ensure this secret key matches the one used in authController.js
        const SECRET_KEY = 'your_default_secret_key'; 
        
        // Decodes the token. Now, req.user will contain { id: ..., role: 'Admin' }
        const decoded = jwt.verify(token, SECRET_KEY); 
        
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ 
            message: 'Invalid or expired token.',
            success: false 
        });
    }
};

// 2. Role Authorization Middleware 
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        
        if (!req.user) {
            return res.status(401).json({ 
                message: 'Access denied. Authentication failed before role check.',
                success: false 
            });
        }
        
        // CRITICAL FIX: The token now contains the role as a simple string (e.g., 'Admin') 
        // under req.user.role.
        if (!req.user.role) { 
            return res.status(403).json({ 
                message: 'Access denied. User role not defined in token.',
                success: false 
            });
        }

        // Get the role string directly from the decoded token
        const userRole = req.user.role; 

        if (allowedRoles.includes(userRole)) {
            next();
        } else {
            return res.status(403).json({ 
                message: 'Access denied. Insufficient privileges.',
                success: false 
            });
        }
    };
};

module.exports = {
    verifyToken,
    requireRole
};