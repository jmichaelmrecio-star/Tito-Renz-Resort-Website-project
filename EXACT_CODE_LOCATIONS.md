# Implementation Code Locations & Exact Changes

## QUICK REFERENCE

### Files to Modify
1. `script.js` - Add 7 new functions + modify 2 existing functions + call 3 functions in DOMContentLoaded
2. `reservationRoutes.js` - Add 2 new routes
3. `reservationController.js` - Add 2 new methods
4. `serviceController.js` - Add/update 1 method
5. `serviceRoutes.js` - Ensure 1 route exists

---

## STEP 1: Add Functions to script.js

### Location in script.js
**Find this comment:** `// --- NEW PROMOTION CALCULATION FUNCTION ---`
**This appears around line 2668**

### What to do:
Insert ALL functions from `reservation-automation-functions.js` BEFORE that comment.

**The functions to add (in order):**
1. `setupCheckoutAutoCalculation()` - 78 lines
2. `setupDateValidation()` - 105 lines
3. `highlightUnavailableDates()` - 95 lines
4. `editService()` - 125 lines
5. `cancelServiceEdit()` - 20 lines
6. `updateService()` - 30 lines

**Total new code: ~450 lines**

---

## STEP 2: Modify DOMContentLoaded for reserve.html

### Location in script.js
**Find this section:**
```javascript
    // --- Reservation Page Logic (reserve.html) ---
if (window.location.pathname.includes('reserve.html')) {
    // ... lots of existing code ...
    
    if (form) {
        form.addEventListener('submit', reserveNow);
        // ... existing code ...
        calculateFinalPrice(finalBasePrice); 
    }
}
```

### What to change:
**Find the closing `}` of the `if (form)` block**

**BEFORE the `}` that closes the form section, ADD:**
```javascript

    // 5. SET UP RESERVATION DATE AUTOMATION AND VALIDATION
    setupCheckoutAutoCalculation();
    setupDateValidation();
    highlightUnavailableDates();
```

### Visual Guide:
```javascript
    if (form) {
        form.addEventListener('submit', reserveNow);
        const debouncedCalculatePrice = debounce(() => {
            calculateFinalPrice(finalBasePrice);
        }, 500);
        document.getElementById('promoCodeInput')?.addEventListener('input', debouncedCalculatePrice);
        calculateFinalPrice(finalBasePrice);
        
        // ← INSERT HERE ← 
        // NEW: 3 function calls for date automation
        setupCheckoutAutoCalculation();
        setupDateValidation();
        highlightUnavailableDates();
    }
}
```

---

## STEP 3: Expose Functions Globally

### Location in script.js
**Find this section at the very end:**
```javascript
// Expose service management functions globally for HTML
window.deactivateServiceAndRefresh = deactivateServiceAndRefresh;
window.addDurationRow = addDurationRow;
window.toggleDurationType = toggleDurationType;
window.fetchServices = fetchServices;
window.getActiveServices = getActiveServices;
```

### What to add:
**ADD these 6 lines after the existing global exposures:**
```javascript
window.editService = editService;
window.cancelServiceEdit = cancelServiceEdit;
window.updateService = updateService;
window.setupCheckoutAutoCalculation = setupCheckoutAutoCalculation;
window.setupDateValidation = setupDateValidation;
window.highlightUnavailableDates = highlightUnavailableDates;
```

---

## STEP 4: Update Service Table (renderServiceTable function)

### Location in script.js
**Find the function:**
```javascript
async function renderServiceTable() {
```

**This function generates HTML for the service table**

### What to find and replace:

**FIND THIS CODE** (in the HTML template string that builds table rows):
```javascript
<td>
    ${service.isActive !== false 
        ? `<button onclick="deactivateServiceAndRefresh('${service._id || service.id}')" class="button-danger">Deactivate</button>` 
        : '<span style="color: #999;">Deactivated</span>'}
</td>
```

**REPLACE WITH:**
```javascript
<td>
    ${service.isActive !== false 
        ? `<button onclick="editService('${service._id}')" class="button-secondary" style="margin-right: 5px;">✏️ Edit</button>
           <button onclick="deactivateServiceAndRefresh('${service._id}')" class="button-danger">🗑️ Deactivate</button>` 
        : '<span style="color: #999;">Deactivated</span>'}
</td>
```

---

## STEP 5: Update handleCreateServiceForm function

### Location in script.js
**Find the function:**
```javascript
async function handleCreateServiceForm(event) {
```

### What to find and replace:

**FIND THIS SECTION** (around line 3240-3300, the part that creates/submits service):
```javascript
    try {
        const response = await createService(serviceData);
        // ... success handling ...
    } catch (error) {
        // ... error handling ...
    }
}
```

**REPLACE THE TRY-CATCH BLOCK WITH:**
```javascript
    // Check if we're in edit or create mode
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const mode = submitBtn?.dataset.mode || 'create';
    const editServiceId = submitBtn?.dataset.serviceId;

    try {
        let result;
        
        if (mode === 'edit' && editServiceId) {
            // UPDATE existing service
            result = await updateService(editServiceId, serviceData);
            const statusMessage = document.getElementById('createServiceMessage');
            if (statusMessage) {
                statusMessage.textContent = '✅ Service updated successfully!';
                statusMessage.style.color = 'green';
            }
            
            // Refresh service table and reset form
            renderServiceTable();
            cancelServiceEdit();
            
        } else {
            // CREATE new service
            result = await createService(serviceData);
            const statusMessage = document.getElementById('createServiceMessage');
            if (statusMessage) {
                statusMessage.textContent = '✅ Service created successfully!';
                statusMessage.style.color = 'green';
            }
            
            // Clear form for next service
            document.getElementById('createServiceForm').reset();
            document.getElementById('durationsContainer').innerHTML = '';
        }
        
        // Refresh the services cache
        await fetchServices();
        
    } catch (error) {
        const statusMessage = document.getElementById('createServiceMessage');
        if (statusMessage) {
            statusMessage.textContent = `❌ ${error.message}`;
            statusMessage.style.color = 'red';
        }
    }
```

---

## STEP 6: Backend - reservationRoutes.js

### Location
**File:** `trr-backend/routes/reservationRoutes.js`

### Current content:
```javascript
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Existing routes...
router.post('/', reservationController.createReservation);
router.get('/:id', reservationController.getReservationById);
// ... etc ...

module.exports = router;
```

### What to add:
**Add these 2 lines BEFORE the `module.exports` line:**
```javascript
router.post('/check-availability', reservationController.checkAvailability);
router.get('/service/:serviceId', reservationController.getReservationsByService);
```

---

## STEP 7: Backend - reservationController.js

### Location
**File:** `trr-backend/controllers/reservationController.js`

### What to add:
**Add these 2 methods to the exports** (before the `module.exports`):

#### Method 1: checkAvailability
```javascript
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
```

#### Method 2: getReservationsByService
```javascript
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
```

---

## STEP 8: Backend - serviceRoutes.js

### Location
**File:** `trr-backend/routes/serviceRoutes.js`

### Current content:
```javascript
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/calculate-price', serviceController.calculatePrice);

// Admin routes (TODO: Add auth middleware)
router.post('/create', serviceController.createService);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
```

### What to verify:
**Check if this line exists:**
```javascript
router.put('/:id', serviceController.updateService);
```

**If it does NOT exist, add it before the delete route**

---

## STEP 9: Backend - serviceController.js

### Location
**File:** `trr-backend/controllers/serviceController.js`

### What to add:
**Add or update this method:**
```javascript
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!updateData.id || !updateData.name) {
            return res.status(400).json({ 
                message: 'Service ID and Name are required' 
            });
        }

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
```

---

## Summary of Changes

| File | Type | Changes |
|------|------|---------|
| script.js | Modify | Add 6 functions, modify 2 functions, add 3 function calls, expose 6 functions globally |
| reservationRoutes.js | Modify | Add 2 new routes |
| reservationController.js | Modify | Add 2 new methods |
| serviceController.js | Modify | Add/update 1 method |
| serviceRoutes.js | Verify | Ensure PUT route exists |

**Total lines added: ~550 lines of code**
**Time to implement: 30-45 minutes**

---

## File Saving Instructions

After each modification:
1. Save the file (Ctrl+S)
2. Check for syntax errors (red squiggles in VS Code)
3. For backend files, test with Postman or curl

