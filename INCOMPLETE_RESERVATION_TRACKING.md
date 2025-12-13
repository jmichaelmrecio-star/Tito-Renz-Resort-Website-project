# Incomplete Reservation Tracking System

## Overview

The Incomplete Reservation Tracking System allows users to save their reservation progress and resume where they left off. If a user navigates away or closes the browser before completing their reservation, they can click "Resume Reservation" in the navigation menu upon their next login to continue from exactly where they stopped.

---

## Features Implemented

✅ **Auto-Save Progress** - Automatically saves user data at key points:
- When selecting a service
- When filling out the reservation form (with 1-second debouncing)

✅ **Resume Navigation Button** - Appears in the navbar when user has incomplete reservations

✅ **Modal Popup** - Shows incomplete reservation details with options to:
- Resume the reservation
- Start fresh

✅ **Data Restoration** - Restores all saved form data and selections when resuming

✅ **Per-User Tracking** - Each user's incomplete reservations are stored separately by email

✅ **Auto-Clear** - Automatically clears saved progress after successful payment

---

## Files Modified

### New Files Created
1. **`incomplete-reservation-tracker.js`** (11 KB)
   - Core tracking system with 8 main functions
   - All functions exposed globally for easy access

### HTML Files Updated
1. **`index.html`** - Added tracker script reference
2. **`services-list.html`** - Added tracker script reference + auto-save on service selection
3. **`reserve.html`** - Added tracker script reference + form change tracking with debouncing
4. **`payment.html`** - Added tracker script reference + auto-clear on payment submission
5. **`profile.html`** - Added tracker script reference

### JavaScript Files Updated
1. **`script.js`** - Key modifications:
   - Added email storage to `loginUser()` function (line ~1245)
   - Added resume nav button call to `renderNavigation()` function (line ~2174)
   - Added auto-save tracking to `selectServiceAndRedirect()` function (line ~2505)

### CSS Files Updated
1. **`style.css`** - Added modal and button styles (end of file):
   - Modal backdrop and content animations
   - Close button styling
   - Resume button navigation styling

---

## Core Functions

### `saveReservationProgress(page, data)`
Saves current reservation progress to localStorage. Called automatically when:
- User selects a service and clicks to reserve
- User changes any field on the reservation form

**Parameters:**
- `page` (string): Current page ('services-list' or 'reserve')
- `data` (object): Reservation data to save

**Storage Key:** `qreserve_incomplete_reservations` (array of all incomplete reservations)

---

### `getIncompleteReservations()`
Retrieves all incomplete reservations for the current logged-in user.

**Returns:** Array of incomplete reservation objects

**Example:**
```javascript
const reservations = getIncompleteReservations();
if (reservations.length > 0) {
    console.log('Found', reservations.length, 'incomplete reservation(s)');
}
```

---

### `resumeReservation(reservation)`
Resumes a previously saved reservation. Restores all sessionStorage values and redirects to the appropriate page.

**Parameters:**
- `reservation` (object): The incomplete reservation object to resume

**Behavior:**
1. Restores all saved data to sessionStorage
2. Clears the incomplete reservation from localStorage
3. Redirects user to the page where they left off

---

### `showResumeReservationModal()`
Displays a modal popup showing incomplete reservations. User can choose to resume or start fresh.

**Triggered by:** Clicking "Resume Reservation" button in navigation

**Modal Features:**
- Service name and last saved date/time
- Current page indicator
- "Resume" and "Start Fresh" buttons

---

### `closeResumeModal()`
Closes the modal popup.

---

### `addResumeReservationNav()`
Adds the "Resume Reservation" button to the navigation menu when:
- User is logged in
- User has incomplete reservations

Called automatically by `renderNavigation()` after profile dropdown is created.

---

### `clearIncompleteReservation(email)`
Removes a saved incomplete reservation from localStorage.

**Parameters:**
- `email` (string): User's email address

**Called after:**
- User clicks "Start Fresh" in the modal
- User successfully completes payment

---

## Data Structure

### Incomplete Reservation Object
```javascript
{
    email: "user@example.com",
    page: "reserve",  // or "services-list"
    data: {
        selectedServiceId: "villa_room_1",
        selectedServiceName: "Villa #1",
        selectedServicePrice: "3000.00",
        selectedServiceMaxGuests: 4,
        selectedServiceType: "villa",
        selectedDuration: "duration_12h",
        selectedDurationLabel: "12 Hours",
        serviceInclusions: "[\"Item1\", \"Item2\"]",
        guests: "2",
        checkinDate: "2025-12-15T14:00",
        checkoutDate: "2025-12-16T12:00",
        customerName: "John Doe",
        customerContact: "09171234567",
        customerEmail: "john@example.com",
        customerAddress: "123 Main St",
        customerNotes: "Early check-in please",
        finalTotal: "3000.00",
        discountValue: "0",
        appliedPromoCode: ""
    },
    savedAt: "2025-12-06T10:30:45.123Z",
    timestamp: 1733476245123
}
```

---

## User Experience Flow

### Step 1: User Login
```
1. User logs in → Email stored in localStorage['qreserve_logged_user_email']
2. Navigation renders
3. If user has incomplete reservations → "Resume Reservation" button appears
```

### Step 2: User Selects Service
```
1. User browses services on services-list.html
2. User selects a service and clicks duration
3. selectServiceAndRedirect() called
   → Auto-saves progress to incomplete reservations array
   → Redirects to reserve.html
```

### Step 3: User Fills Reservation Form
```
1. User on reserve.html fills out form fields
2. Each form field change triggers auto-save (with 1-second debounce)
3. Progress continuously updated in localStorage
```

### Step 4: User Leaves/Closes Browser
```
1. User navigates away or closes browser
2. All reservation data remains in localStorage
3. Session data in sessionStorage is cleared
```

### Step 5: User Returns Later
```
1. User logs back in
2. Navigation renders with "Resume Reservation" button
3. User clicks button
4. Modal appears showing incomplete reservation details
5. User clicks "Resume"
6. All saved data restored to sessionStorage
7. User redirected to reserve.html (or services-list.html if they were selecting)
8. All form fields pre-filled with previous data
9. User can continue from where they left off
```

### Step 6: Payment Completion
```
1. User completes payment on payment.html
2. Form submission triggers auto-clear
3. Incomplete reservation removed from localStorage
4. User can now start fresh if needed
```

---

## Storage Details

### localStorage Keys
- **`qreserve_logged_user_email`** - Current logged-in user's email
- **`qreserve_incomplete_reservations`** - Array of incomplete reservations (JSON stringified)

### sessionStorage Keys (Existing, now used with restore)
- `selectedServiceId`
- `selectedServiceName`
- `selectedServicePrice`
- `selectedServiceMaxGuests`
- `selectedServiceType`
- `selectedDuration`
- `selectedDurationLabel`
- `serviceInclusions`
- Plus all form field values

---

## Technical Notes

### Debouncing
The form auto-save on `reserve.html` uses 1-second debouncing to:
- Reduce localStorage writes (performance)
- Ensure complete form data is saved
- Prevent excessive API calls

### Email Storage
User email is stored in localStorage upon login to:
- Track incomplete reservations per user
- Enable proper data filtering
- Support multi-user scenarios

### Modal Implementation
The modal is dynamically created and injected into the DOM:
- No HTML form needed in page markup
- Automatically positioned in viewport center
- Includes backdrop for modal focus

### Browser Compatibility
- Uses standard localStorage API (IE10+)
- Uses standard sessionStorage API (IE8+)
- Uses modern animations (CSS3)
- Graceful degradation for older browsers

---

## Future Enhancements

1. **Database Backend** - Store incomplete reservations on server instead of localStorage
2. **Timeout** - Auto-delete incomplete reservations older than 30 days
3. **Notifications** - Email user when they have incomplete reservations
4. **Multiple Reservations** - Allow users to have multiple incomplete reservations
5. **Sync** - Sync between multiple devices/tabs
6. **Analytics** - Track where users abandon reservations most often

---

## Testing Checklist

- [ ] User can log in successfully
- [ ] "Resume Reservation" button appears in nav when user has incomplete reservations
- [ ] Service selection auto-saves to localStorage
- [ ] Form changes auto-save on reserve.html
- [ ] Closing browser and returning shows resume button
- [ ] Clicking resume button shows correct incomplete reservation
- [ ] Clicking "Resume" restores all data correctly
- [ ] User is redirected to correct page
- [ ] Form fields are pre-filled with saved data
- [ ] Clicking "Start Fresh" clears incomplete reservation
- [ ] Completing payment clears incomplete reservation
- [ ] User can start new reservation after completing one

---

## Troubleshooting

### "Resume Reservation" button not appearing
**Check:**
1. User is logged in (check localStorage for `qreserve_logged_user_email`)
2. There are incomplete reservations (check localStorage for `qreserve_incomplete_reservations`)
3. Browser console for errors (F12 > Console)

### Data not restoring correctly
**Check:**
1. All sessionStorage keys are being set in `resumeReservation()`
2. Form field IDs match the stored keys
3. Browser hasn't cleared localStorage (check Privacy settings)

### Modal not appearing
**Check:**
1. `showResumeReservationModal()` function is defined
2. DOM is fully loaded before calling
3. Browser console for JavaScript errors

---

## Support

For issues or questions about the Incomplete Reservation Tracking System, refer to:
1. This documentation file
2. Code comments in `incomplete-reservation-tracker.js`
3. Browser console for error messages
4. localStorage inspection in DevTools
