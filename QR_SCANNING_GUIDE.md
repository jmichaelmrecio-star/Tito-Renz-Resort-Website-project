# QR Code Scanning & Check-In Flow - Testing Guide

## Overview
The QR code scanning system allows resort staff to quickly verify guest reservations and mark them as checked in when they arrive.

## Flow Diagram
```
1. Guest makes reservation → Receives confirmation.html with QR code
2. QR code contains: Unique reservation hash (encrypted identifier)
3. Staff opens checkin.html → Scans guest's QR code with device camera
4. System validates hash against database → Displays guest details
5. Status updated to "CHECKED_IN" in database
```

## Prerequisites

### 1. Camera Permissions
- **Desktop Browser**: When checkin.html loads, browser will request camera access
- **Grant permission** when prompted
- **Mobile Device**: Ensure app/browser has camera permissions enabled

### 2. Backend Server Running
```powershell
cd c:\Users\JOHNMICHAEL\Desktop\new website\trr-backend
npm start
# Server should be running on http://localhost:3000
```

### 3. Valid JWT Token
The `STAFF_JWT_TOKEN` in checkin.html (line ~70) must be valid:
- Token must have `role: 'Staff'` or `'Admin'` or `'Manager'`
- Token must not be expired
- Current token in file is valid for testing

## Testing Steps

### Test 1: Make a Complete Reservation (End-to-End)

#### Step 1a: Navigate to Services List
```
URL: http://localhost:3000/services-list.html
```

#### Step 1b: Select a Service
- Click on any villa, charm room, or venue
- Click "Book Now" button

#### Step 1c: Fill Reservation Details
- **Duration**: Select any duration option (e.g., "12 Hours")
- **Guests**: Enter number of guests (e.g., 3)
- **Check-in**: Select a future date and time
- **Check-out**: Auto-calculated (don't change)
- **Guest Details**: Fill in name, contact, email, address
- **Terms**: Check the checkbox

#### Step 1d: Submit Reservation
- Click "Confirm & Submit Reservation"
- System should redirect to **payment.html**

#### Step 1e: Make Payment
- On payment.html, enter a dummy GCash reference (10-13 digits, e.g., `1234567890123`)
- Click "Submit Payment & Confirm Booking"
- System should redirect to **confirmation.html**

#### Step 1f: View QR Code
- confirmation.html should display a QR code
- QR code contains the reservation hash
- **Note the hash** displayed below the QR code (e.g., `3f4339bca407...`)

---

### Test 2: Scan QR Code with Camera

#### Step 2a: Open Check-In Page
```
URL: http://localhost:3000/checkin.html
```

#### Step 2b: Allow Camera Access
- Browser will prompt: "This website wants to use your camera"
- **Click "Allow"** or "Grant Permission"
- Camera should initialize with message "Initializing camera..."

#### Step 2c: Scan QR Code
- Hold the QR code (from confirmation.html) in front of the camera
- Keep code steady and well-lit
- Scanner should detect the code within 2-5 seconds
- Console should show: `✅ QR Code scanned successfully: [hash]`

#### Step 2d: System Processes Check-In
- Page shows "Checking reservation details..." with loading spinner
- Backend verifies the hash and checks reservation status
- If successful, displays guest details:
  - Guest Name
  - Service Type
  - Check-in Date
  - Number of Guests
  - Total Paid Amount

---

### Test 3: Manual Hash Testing (Without QR Code)

If camera is unavailable or QR code scanning fails, test with URL parameter:

```
http://localhost:3000/checkin.html?hash=3f4339bca407f90e466fc3221b97459
```

Replace `3f4339bca407f90e466fc3221b97459` with actual hash from confirmation.html

The system should process the check-in immediately.

---

## Expected Results

### ✅ Success Scenario
- ✅ QR code scans successfully
- ✅ Guest details display correctly
- ✅ Check mark (✅) shown with green status
- ✅ Message: "Check-in successful for [Guest Name]."
- ✅ Button options: "Scan Another QR Code" and "Return to Dashboard"

### ⚠️ Already Checked In
- ℹ️ Information icon shown (ℹ️)
- Message: "Reservation is already marked as checked-in."
- Details still displayed correctly

### ❌ Error Scenarios

#### Camera Not Available
```
Error: ❌ Camera access denied or not available. 
Please check browser permissions.
```
**Solution**: 
- Check browser camera permissions
- Use URL parameter method instead: `?hash=...`

#### Invalid/Expired Hash
```
Error: No matching reservation found for this hash.
```
**Solution**: 
- Verify hash is correct
- Ensure reservation payment was confirmed
- Check that hash matches the one in confirmation.html

#### Payment Status Not PAID
```
Error: Check-in Failed: Payment status is PENDING. 
Payment must be PAID.
```
**Solution**: 
- Ensure guest completed payment on payment.html
- Verify GCash reference was submitted

#### Server Not Running
```
Error: Network error: Failed to fetch. Check server connection.
```
**Solution**: 
- Start Node.js backend server
- Verify server is running on http://localhost:3000

#### Invalid JWT Token
```
Error: Authorization Error: Please set a valid STAFF_JWT_TOKEN in the script to proceed.
```
**Solution**: 
- Update STAFF_JWT_TOKEN on line ~70 of checkin.html
- Ensure token has `role: 'Staff'`, `'Admin'`, or `'Manager'`

---

## Debugging Tips

### 1. Check Browser Console
Open Browser DevTools (F12) and check the Console tab:
- Look for `✅ QR Code scanned successfully`
- Look for `📡 API URL: http://localhost:3000/...`
- Look for `📥 API Response Status: 200`

### 2. Check Network Tab
In DevTools, go to Network tab:
- Look for request to `/api/reservations/check-in/[hash]`
- Should return HTTP 200 with guest details
- Headers should include `Authorization: Bearer [token]`

### 3. Check Browser Permissions
**For Chrome/Edge**:
1. Click lock icon (🔒) in address bar
2. Find "Camera" permission
3. Set to "Allow"

**For Firefox**:
1. Click shield icon (🛡️) in address bar
2. Find "Camera" in permissions
3. Allow access

**For Safari (macOS)**:
1. System Preferences → Security & Privacy → Camera
2. Grant access to Safari

### 4. Test with QR Code Generator
If you need to test with a different hash:
1. Go to https://qr-server.com/qr/create/
2. Data: `3f4339bca407f90e466fc3221b97459` (or your hash)
3. Generate QR code
4. Scan on checkin.html

---

## Feature Details

### QR Code Content
The QR code encodes a **reservation hash** - a unique 32-character hexadecimal string:
```
Example: 3f4339bca407f90e466fc3221b97459
```

This hash is:
- ✅ Unique per reservation
- ✅ Generated during payment confirmation
- ✅ Stored in database's `reservationHash` field
- ✅ Used to look up guest details during check-in

### Camera Support
- ✅ Desktop: Chrome, Firefox, Edge, Safari
- ✅ Mobile: iOS Safari, Chrome, Firefox
- ✅ Tablets: All modern browsers
- ✅ Requires HTTPS on production (HTTP works locally)

### Multi-Scan Prevention
- ✅ Scanner pauses after first successful scan
- ✅ "Scan Another QR Code" button reloads page
- ✅ Prevents accidental double check-ins

---

## Production Checklist

Before deploying to production:

- [ ] Update STAFF_JWT_TOKEN with production-signed token
- [ ] Ensure backend uses HTTPS (not HTTP)
- [ ] Update `http://localhost:3000` to actual production URL
- [ ] Test camera access on real devices
- [ ] Set up proper SSL certificates
- [ ] Implement token refresh mechanism
- [ ] Add logging for audit trail
- [ ] Test with multiple staff members

---

## Support

If QR scanning is not working:

1. **Check console logs** (F12 → Console tab)
2. **Verify backend is running** (`npm start` in trr-backend folder)
3. **Check camera permissions** in browser settings
4. **Test URL parameter method** first
5. **Try different browser** if issue persists
6. **Check JWT token validity** and role

For more help, review the error messages displayed on-screen - they provide specific guidance on what to fix.
