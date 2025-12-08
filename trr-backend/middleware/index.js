// trr-backend/middleware/index.js
const { verifyToken } = require('./authMiddleware');
const { requireRole } = require('./authMiddleware');

module.exports = {
    authenticate: verifyToken,
    authorize: requireRole
};