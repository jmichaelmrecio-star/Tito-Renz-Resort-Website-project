// ========================================
// INCOMPLETE RESERVATION TRACKING SYSTEM
// ========================================

/**
 * Saves the current reservation progress to localStorage
 * Called whenever user makes changes on services-list.html or reserve.html
 * @param {string} page - Current page ('services-list' or 'reserve')
 * @param {object} data - Reservation data to save
 */
function saveReservationProgress(page, data) {
    const userEmail = localStorage.getItem('qreserve_logged_user_email');
    
    // Only save if user is logged in
    if (!userEmail) {
        console.log('User not logged in, skipping save');
        return;
    }
    
    // Get existing incomplete reservations
    let incompleteReservations = JSON.parse(localStorage.getItem('qreserve_incomplete_reservations')) || [];
    
    // Remove any existing reservation for this user
    incompleteReservations = incompleteReservations.filter(r => r.email !== userEmail);
    
    // Create new incomplete reservation object
    const newReservation = {
        email: userEmail,
        page: page,
        data: data,
        savedAt: new Date().toISOString(),
        timestamp: Date.now()
    };
    
    // Add to array and save
    incompleteReservations.push(newReservation);
    localStorage.setItem('qreserve_incomplete_reservations', JSON.stringify(incompleteReservations));
    
    console.log('Reservation progress saved:', newReservation);
}

/**
 * Retrieves all incomplete reservations for the current logged-in user
 * @returns {array} Array of incomplete reservation objects
 */
function getIncompleteReservations() {
    const userEmail = localStorage.getItem('qreserve_logged_user_email');
    
    if (!userEmail) {
        return [];
    }
    
    const allIncomplete = JSON.parse(localStorage.getItem('qreserve_incomplete_reservations')) || [];
    
    // Filter to only this user's incomplete reservations
    return allIncomplete.filter(r => r.email === userEmail);
}

/**
 * Clears a saved incomplete reservation for a specific user
 * Called after user completes reservation or chooses to start fresh
 * @param {string} email - User's email address
 */
function clearIncompleteReservation(email) {
    let incompleteReservations = JSON.parse(localStorage.getItem('qreserve_incomplete_reservations')) || [];
    
    // Remove reservation for this email
    incompleteReservations = incompleteReservations.filter(r => r.email !== email);
    
    localStorage.setItem('qreserve_incomplete_reservations', JSON.stringify(incompleteReservations));
    
    console.log('Incomplete reservation cleared for:', email);
}

/**
 * Resumes a previously saved reservation
 * Restores sessionStorage with saved data and redirects to appropriate page
 * @param {object} reservation - The incomplete reservation object to resume
 */
function resumeReservation(reservation) {
    // Restore session storage from saved data
    const data = reservation.data;
    
    // Restore session storage values
    if (data.selectedServiceId) sessionStorage.setItem('selectedServiceId', data.selectedServiceId);
    if (data.selectedServiceName) sessionStorage.setItem('selectedServiceName', data.selectedServiceName);
    if (data.selectedServicePrice) sessionStorage.setItem('selectedServicePrice', data.selectedServicePrice);
    if (data.selectedServiceMaxGuests) sessionStorage.setItem('selectedServiceMaxGuests', data.selectedServiceMaxGuests);
    if (data.selectedServiceType) sessionStorage.setItem('selectedServiceType', data.selectedServiceType);
    if (data.selectedDuration) sessionStorage.setItem('selectedDuration', data.selectedDuration);
    if (data.selectedDurationLabel) sessionStorage.setItem('selectedDurationLabel', data.selectedDurationLabel);
    if (data.serviceInclusions) sessionStorage.setItem('serviceInclusions', data.serviceInclusions);
    if (data.guests) sessionStorage.setItem('guests', data.guests);
    if (data.checkinDate) sessionStorage.setItem('checkinDate', data.checkinDate);
    if (data.checkoutDate) sessionStorage.setItem('checkoutDate', data.checkoutDate);
    if (data.customerName) sessionStorage.setItem('customerName', data.customerName);
    if (data.customerContact) sessionStorage.setItem('customerContact', data.customerContact);
    if (data.customerEmail) sessionStorage.setItem('customerEmail', data.customerEmail);
    if (data.customerAddress) sessionStorage.setItem('customerAddress', data.customerAddress);
    if (data.customerNotes) sessionStorage.setItem('customerNotes', data.customerNotes);
    if (data.finalTotal) sessionStorage.setItem('finalTotal', data.finalTotal);
    if (data.discountValue) sessionStorage.setItem('discountValue', data.discountValue);
    if (data.appliedPromoCode) sessionStorage.setItem('appliedPromoCode', data.appliedPromoCode);
    if (data.promoCode) sessionStorage.setItem('promoCode', data.promoCode);
    if (data.gcashReference) sessionStorage.setItem('gcashReference', data.gcashReference);
    
    // Clear the incomplete reservation from localStorage
    clearIncompleteReservation(reservation.email);
    
    // Redirect to the page where they left off
    if (reservation.page === 'services-list') {
        window.location.href = 'services-list.html';
    } else if (reservation.page === 'reserve') {
        window.location.href = 'reserve.html';
    } else if (reservation.page === 'payment') {
        // If resuming payment page, redirect with reservation ID from URL if available
        const currentUrl = window.location.href;
        if (currentUrl.includes('reservationId=')) {
            // Keep the same URL with parameters
            window.location.href = 'payment.html' + window.location.search;
        } else {
            window.location.href = 'payment.html';
        }
    }
}

// Global variable to store current reservation for modal
let currentReservationForModal = null;
let allIncompleteReservations = [];

/**
 * Detect current page name based on URL
 * @returns {string} - 'services-list', 'reserve', 'payment', or null
 */
function getCurrentPageName() {
    const currentUrl = window.location.pathname;
    
    if (currentUrl.includes('services-list.html')) {
        return 'services-list';
    } else if (currentUrl.includes('reserve.html')) {
        return 'reserve';
    } else if (currentUrl.includes('payment.html')) {
        return 'payment';
    }
    return null;
}

/**
 * Capture all relevant data from the current page
 * @param {string} pageName - Current page name
 * @returns {object} - All captured data
 */
function captureCurrentPageData(pageName) {
    const data = {};
    
    // Always capture service data from sessionStorage (available on all pages)
    data.selectedServiceId = sessionStorage.getItem('selectedServiceId') || '';
    data.selectedServiceName = sessionStorage.getItem('selectedServiceName') || '';
    data.selectedServicePrice = sessionStorage.getItem('selectedServicePrice') || '';
    data.selectedServiceMaxGuests = sessionStorage.getItem('selectedServiceMaxGuests') || '';
    data.selectedServiceType = sessionStorage.getItem('selectedServiceType') || '';
    data.selectedDuration = sessionStorage.getItem('selectedDuration') || '';
    data.selectedDurationLabel = sessionStorage.getItem('selectedDurationLabel') || '';
    data.serviceInclusions = sessionStorage.getItem('serviceInclusions') || '';
    
    // If on reserve page, capture form data
    if (pageName === 'reserve') {
        data.guests = document.getElementById('guests')?.value || '';
        data.checkinDate = document.getElementById('checkin')?.value || '';
        data.checkoutDate = document.getElementById('checkout')?.value || '';
        data.customerName = document.getElementById('name')?.value || '';
        data.customerContact = document.getElementById('contact')?.value || '';
        data.customerEmail = document.getElementById('email')?.value || '';
        data.customerAddress = document.getElementById('address')?.value || '';
        data.customerNotes = document.getElementById('notes')?.value || '';
        data.promoCode = document.getElementById('promo-code-input')?.value || '';
        data.finalTotal = document.getElementById('finalTotalInput')?.value || sessionStorage.getItem('finalTotal') || '';
        data.discountValue = document.getElementById('discountValueInput')?.value || sessionStorage.getItem('discountValue') || '';
        data.appliedPromoCode = sessionStorage.getItem('appliedPromoCode') || document.getElementById('promoCodeInput')?.value || '';
        data.termsAccepted = document.getElementById('termsCheckbox')?.checked || false;
    }
    
    // If on payment page, capture payment data
    if (pageName === 'payment') {
        data.gcashReference = document.getElementById('gcashReferenceNumber')?.value || '';
        data.finalTotal = document.getElementById('paymentAmount')?.textContent || '';
        data.paymentPage = true;
    }
    
    return data;
}

/**
 * Shows modal popup with incomplete reservations
 * User can choose to resume or start fresh
 */
function showResumeReservationModal() {
    // NOTE: Do NOT auto-save current page state when showing modal
    // If user navigated to home page to click Resume, we don't want to overwrite
    // the previous incomplete state (e.g., payment.html) with home page data
    // Only the actual reservation pages (services-list, reserve, payment) should auto-save
    
    // Small delay to ensure any pending saves complete
    setTimeout(() => {
        const incompleteReservations = getIncompleteReservations();
        
        // Show message if no incomplete reservations, but still allow modal to show
        if (incompleteReservations.length === 0) {
            showToast('No incomplete reservations found. You can start a new reservation!', 'info');
            return;
        }
        
        // Store all reservations for reference
        allIncompleteReservations = incompleteReservations;
    
    // Build list of all incomplete reservations
    let reservationsHTML = '';
    incompleteReservations.forEach((reservation, index) => {
        const savedDate = new Date(reservation.savedAt);
        const formattedDate = savedDate.toLocaleDateString() + ' ' + savedDate.toLocaleTimeString();
        const pageLabel = reservation.page === 'services-list' ? 'Services Selection' : 
                         reservation.page === 'reserve' ? 'Reservation Form' : 'Payment Page';
        
        reservationsHTML += `
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 10px 0; border: 2px solid #e0e0e0;">
                <p style="margin: 5px 0;"><strong>Service:</strong> ${reservation.data.selectedServiceName || 'Not specified'}</p>
                <p style="margin: 5px 0;"><strong>Saved on:</strong> ${formattedDate}</p>
                <p style="margin: 5px 0; font-size: 0.85rem; color: #666;">Current Page: ${pageLabel}</p>
                ${reservation.data.customerName ? `<p style="margin: 5px 0; font-size: 0.85rem; color: #666;">Customer: ${reservation.data.customerName}</p>` : ''}
                <button onclick="resumeSpecificReservation(${index})" 
                        style="width: 100%; padding: 10px; margin-top: 10px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                    Resume This Reservation
                </button>
            </div>
        `;
    });
    
    // Create modal HTML dynamically
    const modalHTML = `
        <div id="resumeReservationModal" class="modal" style="display: block;">
            <div class="modal-content" style="max-width: 600px; max-height: 80vh; overflow-y: auto;">
                <span class="close-button" onclick="closeResumeModal()" style="cursor: pointer;">&times;</span>
                <h2 style="margin-top: 0; color: #333;">Resume Your Reservation?</h2>
                <p style="color: #666;">You have ${incompleteReservations.length} incomplete reservation(s). Select one to continue:</p>
                
                <div style="margin: 20px 0;">
                    ${reservationsHTML}
                </div>
                
                <div style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 15px;">
                    <button onclick="clearAllIncompleteReservations()" 
                            style="width: 100%; padding: 12px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem;">
                        Clear All & Start Fresh
                    </button>
                </div>
                <p style="text-align: center; font-size: 0.85rem; color: #999; margin-top: 15px;">
                    Or click the X to close this dialog.
                </p>
            </div>
        </div>
    `;
    
    // Add modal to page if not already present
    if (!document.getElementById('resumeReservationModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    } else {
        document.getElementById('resumeReservationModal').outerHTML = modalHTML;
    }
    }, 100); // Small delay to ensure save completes
}

/**
 * Resume a specific reservation from the list
 * @param {number} index - Index of the reservation in the array
 */
function resumeSpecificReservation(index) {
    if (allIncompleteReservations[index]) {
        // Mark that we're resuming (to prevent duplicate submission)
        sessionStorage.setItem('resuming_reservation', 'true');
        resumeReservation(allIncompleteReservations[index]);
    }
}

/**
 * Clear all incomplete reservations for the current user
 */
function clearAllIncompleteReservations() {
    const userEmail = localStorage.getItem('qreserve_logged_user_email');
    if (userEmail) {
        clearIncompleteReservation(userEmail);
        showToast('All incomplete reservations cleared. You can start fresh!', 'info');
        closeResumeModal();
        // Re-render navigation to remove resume button
        if (typeof renderNavigation === 'function') {
            renderNavigation();
        }
    }
}

/**
 * Closes the resume reservation modal
 */
function closeResumeModal() {
    const modal = document.getElementById('resumeReservationModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Adds "Resume Reservation" button to navigation
 * NOW ALWAYS SHOWN - with visual indicator if incomplete reservations exist
 * Called by renderNavigation()
 */
function addResumeReservationNav() {
    const incompleteReservations = getIncompleteReservations();
    const userEmail = localStorage.getItem('qreserve_logged_user_email');
    
    // Only show if user is logged in
    if (!userEmail) {
        return;
    }
    
    // Check if button already exists
    const existingBtn = document.getElementById('resume-reservation-nav-btn');
    if (existingBtn) {
        // Update existing button with indicator if needed
        const hasIncomplete = incompleteReservations.length > 0;
        const indicator = hasIncomplete ? ' <span style="color: #dc3545; font-weight: bold;">(!)</span>' : '';
        existingBtn.innerHTML = `
            <a href="#" onclick="showResumeReservationModal(); return false;" style="color: #28a745; font-weight: bold;">
                ↺ Resume${indicator}
            </a>
        `;
        return;
    }
    
    // Add button to navigation
    const navUl = document.querySelector('nav ul');
    if (!navUl) return;
    
    const resumeLi = document.createElement('li');
    resumeLi.id = 'resume-reservation-nav-btn';
    resumeLi.classList.add('nav-action'); // Add nav-action class for proper layout alignment
    
    // Add indicator if there are incomplete reservations
    const hasIncomplete = incompleteReservations.length > 0;
    const indicator = hasIncomplete ? ' <span style="color: #dc3545; font-weight: bold;">(!)</span>' : '';
    
    resumeLi.innerHTML = `
        <a href="#" onclick="showResumeReservationModal(); return false;" style="color: #28a745; font-weight: bold;">
            ↺ Resume${indicator}
        </a>
    `;
    
    // Insert AFTER Reserve Now button (2nd in action zone, right after Reserve Now)
    const reserveBtn = document.getElementById('nav-reserve-now-li');
    const profileDropdown = navUl.querySelector('.profile-dropdown');
    
    if (reserveBtn && reserveBtn.nextElementSibling) {
        // Insert after Reserve Now, before whatever comes next
        navUl.insertBefore(resumeLi, reserveBtn.nextElementSibling);
    } else if (profileDropdown) {
        // Fallback: insert before profile dropdown
        navUl.insertBefore(resumeLi, profileDropdown);
    } else {
        // Last resort: append to end
        navUl.appendChild(resumeLi);
    }
}

// Make functions globally accessible
window.saveReservationProgress = saveReservationProgress;
window.getIncompleteReservations = getIncompleteReservations;
window.clearIncompleteReservation = clearIncompleteReservation;
window.resumeReservation = resumeReservation;
window.resumeSpecificReservation = resumeSpecificReservation;
window.clearAllIncompleteReservations = clearAllIncompleteReservations;
window.showResumeReservationModal = showResumeReservationModal;
window.closeResumeModal = closeResumeModal;
window.addResumeReservationNav = addResumeReservationNav;
