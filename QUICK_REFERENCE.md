# Quick Reference Card - Copy-Paste Ready

## 📋 What to Do Right Now

### 1️⃣ Copy Functions to script.js (5 minutes)

**Open:** `reservation-automation-functions.js` (in your workspace)
**Copy:** ALL code
**Open:** `script.js`
**Find:** `// --- NEW PROMOTION CALCULATION FUNCTION ---` (press Ctrl+F to find)
**Paste:** BEFORE this line
**Save:** Ctrl+S

---

### 2️⃣ Add Function Calls (1 minute)

**Find in script.js:**
```javascript
    // --- Reservation Page Logic (reserve.html) ---
if (window.location.pathname.includes('reserve.html')) {
    // ... existing code ...
    
    if (form) {
        form.addEventListener('submit', reserveNow);
        // ... existing lines ...
        calculateFinalPrice(finalBasePrice);
        
        // ← PASTE HERE ←
```

**Paste:**
```javascript
        // 5. SET UP RESERVATION DATE AUTOMATION AND VALIDATION
        setupCheckoutAutoCalculation();
        setupDateValidation();
        highlightUnavailableDates();
```

**Save:** Ctrl+S

---

### 3️⃣ Expose Functions (1 minute)

**Find in script.js (bottom):**
```javascript
window.deactivateServiceAndRefresh = deactivateServiceAndRefresh;
window.addDurationRow = addDurationRow;
window.toggleDurationType = toggleDurationType;
window.fetchServices = fetchServices;
window.getActiveServices = getActiveServices;
```

**Add after:**
```javascript
window.editService = editService;
window.cancelServiceEdit = cancelServiceEdit;
window.updateService = updateService;
window.setupCheckoutAutoCalculation = setupCheckoutAutoCalculation;
window.setupDateValidation = setupDateValidation;
window.highlightUnavailableDates = highlightUnavailableDates;
```

**Save:** Ctrl+S

---

### 4️⃣ Update Service Table in renderServiceTable() (2 minutes)

**Find in script.js:**
```javascript
<td>
    ${service.isActive !== false 
        ? `<button onclick="deactivateServiceAndRefresh('${service._id || service.id}')" class="button-danger">Deactivate</button>` 
        : '<span style="color: #999;">Deactivated</span>'}
</td>
```

**Replace with:**
```javascript
<td>
    ${service.isActive !== false 
        ? `<button onclick="editService('${service._id}')" class="button-secondary" style="margin-right: 5px;">✏️ Edit</button>
           <button onclick="deactivateServiceAndRefresh('${service._id}')" class="button-danger">🗑️ Deactivate</button>` 
        : '<span style="color: #999;">Deactivated</span>'}
</td>
```

**Save:** Ctrl+S

---

### 5️⃣ Update handleCreateServiceForm() (3 minutes)

**Find in script.js:**
```javascript
async function handleCreateServiceForm(event) {
    event.preventDefault();
    // ... lots of code ...
    
    try {
        const response = await createService(serviceData);
        // ... success handling ...
    } catch (error) {
        // ... error handling ...
    }
}
```

**Replace the try-catch with:**
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
            document.getElementById('createServiceForm').reset();
            document.getElementById('durationsContainer').innerHTML = '';
        }
        
        await fetchServices();
        
    } catch (error) {
        const statusMessage = document.getElementById('createServiceMessage');
        if (statusMessage) {
            statusMessage.textContent = `❌ ${error.message}`;
            statusMessage.style.color = 'red';
        }
    }
```

**Save:** Ctrl+S

---

### 6️⃣ Backend - Add Routes (2 minutes)

**Open:** `trr-backend/routes/reservationRoutes.js`

**Add before `module.exports`:**
```javascript
router.post('/check-availability', reservationController.checkAvailability);
router.get('/service/:serviceId', reservationController.getReservationsByService);
```

**Save:** Ctrl+S

---

### 7️⃣ Backend - Add Controller Methods (3 minutes)

**Open:** `trr-backend/controllers/reservationController.js`

**Add before `module.exports`:**

#### Method 1:
```javascript
exports.checkAvailability = async (req, res) => {
    try {
        const { serviceId, checkin_date, checkout_date } = req.body;
        if (!serviceId || !checkin_date || !checkout_date) {
            return res.status(400).json({ message: 'Missing required fields', available: true });
        }
        const checkin = new Date(checkin_date);
        const checkout = new Date(checkout_date);
        const overlapping = await Reservation.find({
            serviceId,
            status: { $nin: ['cancelled', 'rejected'] },
            $or: [{ checkin_date: { $lte: checkout }, checkout_date: { $gte: checkin } }]
        });
        res.json({ available: overlapping.length === 0, conflictingReservations: overlapping.length });
    } catch (error) {
        res.status(500).json({ message: error.message, available: true });
    }
};
```

#### Method 2:
```javascript
exports.getReservationsByService = async (req, res) => {
    try {
        const { serviceId } = req.params;
        if (!serviceId) return res.status(400).json({ message: 'Missing serviceId' });
        const reservations = await Reservation.find({ 
            serviceId,
            status: { $nin: ['cancelled', 'rejected'] }
        }).select('serviceId checkin_date checkout_date status customer_name').sort({ checkin_date: 1 });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```

**Save:** Ctrl+S

---

### 8️⃣ Backend - Update Service Controller (2 minutes)

**Open:** `trr-backend/controllers/serviceController.js`

**Add or update this method:**
```javascript
exports.updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!updateData.id || !updateData.name) {
            return res.status(400).json({ message: 'Service ID and Name are required' });
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
        if (!updated) return res.status(404).json({ message: 'Service not found' });
        res.json({ message: 'Service updated successfully', service: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
```

**Save:** Ctrl+S

---

### 9️⃣ Backend - Verify Service Routes (1 minute)

**Open:** `trr-backend/routes/serviceRoutes.js`

**Check if this line exists:**
```javascript
router.put('/:id', serviceController.updateService);
```

**If NOT, add it before the delete route**

**Save:** Ctrl+S

---

## ✅ Quick Test

### Test Feature 1: Auto-Checkout
1. Go to `http://localhost:3000/services-list.html`
2. Select any Villa or Charm room
3. Go to reserve.html
4. Enter a check-in date/time
5. Change duration dropdown
6. ✅ Checkout should auto-calculate

### Test Feature 2: Date Validation
1. Go to Admin Dashboard
2. Block dates for a service (Dec 10-15)
3. Try to reserve that service for Dec 12
4. ✅ Should alert and block

### Test Feature 3: Highlight Dates
1. Go to reserve.html
2. Look above check-in input
3. ✅ Should see yellow/green box with dates

### Test Feature 4: Edit Service
1. Go to Admin Dashboard → Services
2. Click Edit button
3. ✅ Form should populate
4. Change a field
5. Click Update
6. ✅ Should save and refresh

---

## 🆘 Quick Help

| Problem | Solution |
|---------|----------|
| Functions not found | Copy all code from `reservation-automation-functions.js` and paste it before `// --- NEW PROMOTION CALCULATION FUNCTION ---` |
| Checkout not calculating | Verify `setupCheckoutAutoCalculation()` is called in DOMContentLoaded. Check DevTools Console (F12) for errors |
| Date validation not working | Start backend: `cd trr-backend && npm start`. Test API: visit `http://localhost:3000/api/blocked-dates` |
| Edit button not showing | Verify you updated the Actions `<td>` in renderServiceTable(). Service must be active (isActive !== false) |
| Update not saving | Check localStorage has authToken. Verify updateService method exists in serviceController.js |
| Errors in console | Check DevTools (F12) → Console tab. Backend logs in terminal running `npm start` |

---

## 📊 Completion Checklist

- [ ] Copied functions to script.js from reservation-automation-functions.js
- [ ] Added 3 function calls in reserve.html DOMContentLoaded section
- [ ] Exposed 6 functions globally (window.function = function)
- [ ] Updated renderServiceTable() with Edit button
- [ ] Updated handleCreateServiceForm() with edit mode logic
- [ ] Added 2 routes to reservationRoutes.js
- [ ] Added 2 methods to reservationController.js
- [ ] Added updateService method to serviceController.js
- [ ] Verified PUT route exists in serviceRoutes.js
- [ ] Tested all 4 features (checkout, validation, highlight, edit)
- [ ] No console errors

**Total Time: ~20 minutes**

