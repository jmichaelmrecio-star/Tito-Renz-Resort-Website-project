# HTML & Admin Dashboard Modifications

## File: reserve.html

### Changes Needed

1. **No HTML changes required** - All functionality is JavaScript-driven
2. The three features will automatically work once the JS functions are called

---

## File: admin-dashboard.html

### Service Table Modification

**FIND THIS SECTION:**
```html
<tbody id="serviceTableBody">
    <!-- Data will be inserted here by JavaScript -->
    <tr><td colspan="7" class="text-center">Loading services...</td></tr>
</tbody>
```

**HOW IT'S GENERATED:**
The table is populated by the `renderServiceTable()` function in script.js.

### UPDATE renderServiceTable() in script.js

**FIND:** Lines in renderServiceTable() that build the Actions column

**REPLACE:**
```javascript
// OLD:
<td>
    ${service.isActive !== false 
        ? `<button onclick="deactivateServiceAndRefresh('${service._id || service.id}')" class="button-danger">Deactivate</button>` 
        : '<span style="color: #999;">Deactivated</span>'}
</td>

// NEW:
<td>
    ${service.isActive !== false 
        ? `<button onclick="editService('${service._id}')" class="button-secondary" style="margin-right: 5px;">✏️ Edit</button>
           <button onclick="deactivateServiceAndRefresh('${service._id}')" class="button-danger">🗑️ Deactivate</button>` 
        : '<span style="color: #999;">Deactivated</span>'}
</td>
```

### UPDATE handleCreateServiceForm() in script.js

**FIND:** The part that calls `createService()`

**REPLACE WITH:**
```javascript
// Check if we're in edit mode
const submitBtn = event.target.querySelector('button[type="submit"]');
const mode = submitBtn?.dataset.mode || 'create';
const editServiceId = submitBtn?.dataset.serviceId;

try {
    let result;
    
    if (mode === 'edit' && editServiceId) {
        // UPDATE existing service
        result = await updateService(editServiceId, serviceData);
        statusMessage.textContent = '✅ Service updated successfully!';
        statusMessage.style.color = 'green';
        
        // Refresh service table and clear form
        renderServiceTable();
        cancelServiceEdit();
        
    } else {
        // CREATE new service
        result = await createService(serviceData);
        statusMessage.textContent = '✅ Service created successfully!';
        statusMessage.style.color = 'green';
        
        // Clear form for next service
        document.getElementById('createServiceForm').reset();
        document.getElementById('durationsContainer').innerHTML = '';
    }
    
    // Refresh the services cache
    await fetchServices();
    
} catch (error) {
    statusMessage.textContent = `❌ ${error.message}`;
    statusMessage.style.color = 'red';
}
```

---

## Integration Checklist

### Step 1: Add Functions to script.js
1. Copy all functions from `reservation-automation-functions.js`
2. Insert before the `// --- NEW PROMOTION CALCULATION FUNCTION ---` comment (around line 2668)
3. This includes:
   - `setupCheckoutAutoCalculation()`
   - `setupDateValidation()`
   - `highlightUnavailableDates()`
   - `editService()`
   - `cancelServiceEdit()`
   - `updateService()`

### Step 2: Update DOMContentLoaded for reserve.html
Find this section in script.js:
```javascript
// --- Reservation Page Logic (reserve.html) ---
if (window.location.pathname.includes('reserve.html')) {
    // ... existing code ...
    
    if (form) {
        form.addEventListener('submit', reserveNow);
        // ... existing code ...
    }
}
```

**ADD THESE LINES** right before the closing `}` of that if block:
```javascript
    // 5. SET UP RESERVATION DATE AUTOMATION AND VALIDATION
    setupCheckoutAutoCalculation();
    setupDateValidation();
    highlightUnavailableDates();
}
```

### Step 3: Expose Functions Globally
Find the end of script.js where global functions are exposed:
```javascript
// Expose service management functions globally for HTML
window.deactivateServiceAndRefresh = deactivateServiceAndRefresh;
window.addDurationRow = addDurationRow;
// ... etc ...
```

**ADD THESE LINES:**
```javascript
window.editService = editService;
window.cancelServiceEdit = cancelServiceEdit;
window.updateService = updateService;
window.setupCheckoutAutoCalculation = setupCheckoutAutoCalculation;
window.setupDateValidation = setupDateValidation;
window.highlightUnavailableDates = highlightUnavailableDates;
```

### Step 4: Update Backend Controllers

**FILE: trr-backend/controllers/reservationController.js**
- Add `checkAvailability` method
- Add `getReservationsByService` method

**FILE: trr-backend/routes/reservationRoutes.js**
- Add: `router.post('/check-availability', reservationController.checkAvailability);`
- Add: `router.get('/service/:serviceId', reservationController.getReservationsByService);`

**FILE: trr-backend/controllers/serviceController.js**
- Update or add `updateService` method

**FILE: trr-backend/routes/serviceRoutes.js**
- Ensure: `router.put('/:id', serviceController.updateService);` exists

### Step 5: Test All Features

**FEATURE 1: Auto-Checkout**
- [ ] Go to reserve.html after selecting a room (e.g., Villa #1, 12 hours)
- [ ] Set checkin date/time
- [ ] Verify checkout automatically calculates (checkin + 12 hours)
- [ ] Verify checkout field is read-only (grayed out)
- [ ] Test with Private Pool Area → checkin should force to 7am, checkout to 5pm
- [ ] Test night slot → checkin to 7pm, checkout to 5am next day

**FEATURE 2: Date Validation**
- [ ] Go to admin dashboard → Schedule → Block a date range for a service
- [ ] Try to reserve that service for blocked dates → alert should appear
- [ ] Block dates should clear the input
- [ ] Test with existing reservation → same behavior
- [ ] Form submit should be prevented if dates are invalid

**FEATURE 3: Highlight Dates**
- [ ] Go to reserve.html
- [ ] Check above the checkin input
- [ ] See list of unavailable dates with reasons
- [ ] If no unavailable dates, see green success message
- [ ] List should show "🔒 Blocked: [reason]" and "📅 Already booked"

**FEATURE 4: Edit Service**
- [ ] Go to admin dashboard → Services tab
- [ ] Click Edit button on a service
- [ ] Form populates with service data
- [ ] Service ID field is read-only (grayed out)
- [ ] Submit button shows "✏️ Update Service"
- [ ] Durations/timeSlots are populated correctly
- [ ] Modify a field and click Update
- [ ] Service is updated in database
- [ ] Table refreshes with updated data
- [ ] Submit button resets to "Create Service"
- [ ] Can create new service again

---

## API Endpoint Summary

### GET Endpoints
- `GET /api/services/{serviceId}` - Get single service (for edit form)
- `GET /api/reservations/service/{serviceId}` - Get reservations for service
- `GET /api/blocked-dates` - Get all blocked date ranges

### POST Endpoints
- `POST /api/reservations/check-availability` - Check if dates are available
  - Body: `{serviceId, checkin_date, checkout_date}`
  - Response: `{available: boolean, conflictingReservations: number}`

### PUT Endpoints
- `PUT /api/services/{serviceId}` - Update service
  - Headers: `Authorization: Bearer {token}`
  - Body: Service object with all fields

### Expected Blocked Date Format
```javascript
{
    _id: ObjectId,
    startDate: Date,
    endDate: Date,
    serviceIds: [String],  // null or empty = all services
    reason: String
}
```

### Expected Reservation Format
```javascript
{
    _id: ObjectId,
    serviceId: String,
    checkin_date: Date,
    checkout_date: Date,
    status: String, // "pending", "paid", "checked-in", "cancelled", etc.
    customer_name: String,
    customer_email: String,
    customer_contact: String
}
```

---

## Troubleshooting

### Issue: Checkout not auto-calculating
- Check that `setupCheckoutAutoCalculation()` is called
- Verify elements exist: `#checkin`, `#checkout`, `#duration-selector`
- Check console for errors

### Issue: Date validation not working
- Verify backend endpoints are running
- Check that `/api/blocked-dates` returns data
- Check that `/api/reservations/check-availability` exists
- Verify service IDs match between frontend and backend

### Issue: Edit button not appearing
- Verify `renderServiceTable()` has been updated
- Check that service is active (isActive !== false)
- Verify `editService` function is exposed globally

### Issue: Update not saving
- Check that service controller has `updateService` method
- Verify auth token is present in localStorage
- Check that API endpoint is `/api/services/{id}` with PUT method

