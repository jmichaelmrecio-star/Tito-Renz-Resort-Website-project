const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/calculate-price', serviceController.calculatePrice);

// Admin routes (TODO: Add auth middleware)
router.get('/admin/all', serviceController.getAllServicesAdmin); // Get all services including inactive
router.post('/create', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.put('/:id/activate', serviceController.activateService);
router.put('/:id/deactivate', serviceController.deleteService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
