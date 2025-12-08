const express = require('express');
const router = express.Router();
const blockedDateController = require('../controllers/blockedDateController');

// POST /api/blocked-dates - block a new date range
router.post('/', blockedDateController.blockDateRange);

// GET /api/blocked-dates - fetch all blocked ranges (admin view)
router.get('/', blockedDateController.getAllBlockedDates);

// GET /api/blocked-dates/active - fetch future/active blocks (public view)
router.get('/active/list', blockedDateController.getActiveBlockedDates);

// DELETE /api/blocked-dates/:id - remove a block
router.delete('/:id', blockedDateController.unblockDate);

module.exports = router;

