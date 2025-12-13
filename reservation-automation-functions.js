/**
 * FEATURE 1: Auto-Calculate Checkout Date/Time Based on Duration
 * Location: Add before DOMContentLoaded on reserve.html
 * Call: setupCheckoutAutoCalculation();
 */
function setupCheckoutAutoCalculation() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const durationSelector = document.getElementById('duration-selector');
    
    if (!checkinInput || !checkoutInput || !durationSelector) return;

    // Make checkout field readonly with visual indicator
    checkoutInput.readOnly = true;
    checkoutInput.style.backgroundColor = '#f5f5f5';
    checkoutInput.style.cursor = 'not-allowed';
    checkoutInput.title = 'Automatically calculated based on check-in time and duration';

    function calculateCheckout() {
        const checkinValue = checkinInput.value;
        const selectedDuration = durationSelector.value;
        
        if (!checkinValue || !selectedDuration) return;

        const serviceId = sessionStorage.getItem('selectedServiceId');
        const services = getActiveServices();
        const service = services.find(s => s.id === serviceId);
        
        if (!service) return;

        let checkinDate = new Date(checkinValue);
        let checkoutDate = new Date(checkinDate);

        // For services with timeSlots (like Private Pool Area)
        if (service.timeSlots && service.timeSlots.length > 0) {
            const slot = service.timeSlots.find(ts => ts.id === selectedDuration);
            if (slot) {
                if (slot.timeRange === 'day') {
                    // Day slot: 7am - 5pm (same day)
                    checkinDate.setHours(7, 0, 0, 0);
                    checkoutDate = new Date(checkinDate);
                    checkoutDate.setHours(17, 0, 0, 0);
                } else if (slot.timeRange === 'night') {
                    // Night slot: 7pm - 5am (next day)
                    checkinDate.setHours(19, 0, 0, 0);
                    checkoutDate = new Date(checkinDate);
                    checkoutDate.setDate(checkoutDate.getDate() + 1);
                    checkoutDate.setHours(5, 0, 0, 0);
                }
                // Update checkin input to reflect forced time
                checkinInput.value = checkinDate.toISOString().slice(0, 16);
            }
        }
        // For services with durations (rooms and halls)
        else if (service.durations && service.durations.length > 0) {
            const duration = service.durations.find(d => d.id === selectedDuration);
            if (duration && duration.hours) {
                checkoutDate.setHours(checkoutDate.getHours() + duration.hours);
            }
        }

        checkoutInput.value = checkoutDate.toISOString().slice(0, 16);
    }

    // Attach listeners
    checkinInput.addEventListener('change', calculateCheckout);
    durationSelector.addEventListener('change', calculateCheckout);
    
    // Calculate immediately if values exist
    if (checkinInput.value && durationSelector.value) {
        calculateCheckout();
    }
}

/**
 * FEATURE 2: Validate Against Blocked Dates and Existing Reservations
 * Location: Add after setupCheckoutAutoCalculation
 * Call: setupDateValidation();
 */
async function setupDateValidation() {
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');
    const form = document.getElementById('reservationForm');
    
    if (!checkinInput || !form) return;

    async function validateDates() {
        const serviceId = sessionStorage.getItem('selectedServiceId');
        const checkinValue = checkinInput.value;
        const checkoutValue = checkoutInput.value;
        
        if (!serviceId || !checkinValue || !checkoutValue) return true;

        const checkinDate = new Date(checkinValue);
        const checkoutDate = new Date(checkoutValue);

        try {
            // Fetch blocked dates
            const blockedResponse = await fetch('http://localhost:3000/api/blocked-dates');
            if (!blockedResponse.ok) throw new Error('Failed to fetch blocked dates');
            
            const blockedDates = await blockedResponse.json();

            // Check each blocked date range
            for (const block of blockedDates) {
                const blockStart = new Date(block.startDate);
                const blockEnd = new Date(block.endDate);

                // Check if service is affected (null/empty means all services)
                const isServiceBlocked = !block.serviceIds || 
                                        block.serviceIds.length === 0 || 
                                        block.serviceIds.includes(serviceId);

                if (isServiceBlocked) {
                    // Check if dates overlap
                    if (checkinDate <= blockEnd && checkoutDate >= blockStart) {
                        const blockStartStr = blockStart.toLocaleDateString();
                        const blockEndStr = blockEnd.toLocaleDateString();
                        alert(`❌ This service is unavailable from ${blockStartStr} to ${blockEndStr}.\n\nReason: ${block.reason}\n\nPlease select different dates.`);
                        checkinInput.value = '';
                        checkoutInput.value = '';
                        return false;
                    }
                }
            }

            // Check existing reservations for conflicts
            const availabilityResponse = await fetch('http://localhost:3000/api/reservations/check-availability', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    serviceId,
                    checkin_date: checkinValue,
                    checkout_date: checkoutValue
                })
            });

            if (!availabilityResponse.ok) throw new Error('Failed to check availability');
            
            const availabilityResult = await availabilityResponse.json();
            
            if (!availabilityResult.available) {
                alert(`❌ This service is already booked for the selected dates.\n\nPlease choose different dates or another service.`);
                checkinInput.value = '';
                checkoutInput.value = '';
                return false;
            }

            return true;

        } catch (error) {
            console.error('Error validating dates:', error);
            // Allow reservation if validation service is down
            return true;
        }
    }

    // Validate on checkin change
    checkinInput.addEventListener('blur', validateDates);

    // Validate before form submission (use capture phase to run first)
    form.addEventListener('submit', async function(e) {
        const isValid = await validateDates();
        if (!isValid) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    }, true);
}

/**
 * FEATURE 3: Highlight Unavailable Dates for the Selected Service
 * Location: Add after setupDateValidation
 * Call: highlightUnavailableDates();
 */
async function highlightUnavailableDates() {
    const checkinInput = document.getElementById('checkin');
    if (!checkinInput) return;

    const serviceId = sessionStorage.getItem('selectedServiceId');
    if (!serviceId) return;

    try {
        // Fetch blocked dates and reservations in parallel
        const [blockedResponse, reservationsResponse] = await Promise.all([
            fetch('http://localhost:3000/api/blocked-dates'),
            fetch(`http://localhost:3000/api/reservations/service/${serviceId}`)
        ]);

        if (!blockedResponse.ok || !reservationsResponse.ok) {
            throw new Error('Failed to fetch unavailable dates');
        }

        const blockedDates = await blockedResponse.json();
        const reservations = await reservationsResponse.json();

        // Build list of unavailable date ranges
        const unavailableRanges = [];

        // Add blocked dates
        blockedDates.forEach(block => {
            const isServiceBlocked = !block.serviceIds || 
                                    block.serviceIds.length === 0 || 
                                    block.serviceIds.includes(serviceId);
            if (isServiceBlocked) {
                unavailableRanges.push({
                    start: new Date(block.startDate),
                    end: new Date(block.endDate),
                    reason: `🔒 Blocked: ${block.reason}`
                });
            }
        });

        // Add booked dates
        reservations.forEach(res => {
            if (res.status !== 'cancelled' && res.status !== 'rejected') {
                unavailableRanges.push({
                    start: new Date(res.checkin_date),
                    end: new Date(res.checkout_date),
                    reason: '📅 Already booked'
                });
            }
        });

        // Set min date to today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        checkinInput.min = today.toISOString().slice(0, 16);

    } catch (error) {
        console.error('Error loading unavailable dates:', error);
        // Silently fail - don't block user experience
    }
}

/**
 * FEATURE 4: Edit Service Functionality
 * Location: Add in service management section
 */

/**
 * Load service data into the form for editing
 */
async function editService(serviceId) {
    try {
        const response = await fetch(`http://localhost:3000/api/services/${serviceId}`);
        if (!response.ok) throw new Error('Failed to load service');
        
        const service = await response.json();

        // Populate basic fields
        const fields = {
            'serviceIdInput': service.id,
            'serviceNameInput': service.name,
            'serviceTypeInput': service.type,
            'serviceCategoryInput': service.category,
            'serviceMaxGuestsInput': service.max_guests,
            'serviceDescriptionInput': service.description,
            'serviceImageInput': service.image,
            'serviceGalleryInput': service.gallery ? service.gallery.join(', ') : '',
            'serviceInclusionsInput': service.inclusions ? service.inclusions.join(', ') : '',
            'serviceNotesInput': service.notes || ''
        };

        for (const [id, value] of Object.entries(fields)) {
            const element = document.getElementById(id);
            if (element) {
                element.value = value;
                if (id === 'serviceIdInput') element.readOnly = true;
            }
        }

        // Clear and populate durations/timeSlots
        const durationsContainer = document.getElementById('durationsContainer');
        if (durationsContainer) {
            durationsContainer.innerHTML = '';

            if (service.timeSlots && service.timeSlots.length > 0) {
                service.timeSlots.forEach((slot, index) => {
                    addDurationRow();
                    const rows = durationsContainer.querySelectorAll('.duration-row');
                    const lastRow = rows[rows.length - 1];
                    
                    const checkbox = lastRow.querySelector('.timeslot-checkbox');
                    if (checkbox) {
                        checkbox.checked = true;
                        toggleDurationType(checkbox);
                    }
                    
                    const fields = {
                        'durationId': slot.id,
                        'slotLabel': slot.label,
                        'slotPrice': slot.price,
                        'timeRange': slot.timeRange,
                        'guestMin': slot.guestRange?.min || '',
                        'guestMax': slot.guestRange?.max || ''
                    };

                    for (const [fieldName, value] of Object.entries(fields)) {
                        const input = lastRow.querySelector(`[name="${fieldName}"]`);
                        if (input) input.value = value;
                    }
                });
            } else if (service.durations && service.durations.length > 0) {
                service.durations.forEach(duration => {
                    addDurationRow();
                    const rows = durationsContainer.querySelectorAll('.duration-row');
                    const lastRow = rows[rows.length - 1];
                    
                    const fields = {
                        'durationId': duration.id,
                        'durationLabel': duration.label,
                        'durationHours': duration.hours,
                        'durationPrice': duration.price
                    };

                    for (const [fieldName, value] of Object.entries(fields)) {
                        const input = lastRow.querySelector(`[name="${fieldName}"]`);
                        if (input) input.value = value;
                    }
                });
            }
        }

        // Update submit button
        const submitBtn = document.querySelector('#createServiceForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = '✏️ Update Service';
            submitBtn.dataset.mode = 'edit';
            submitBtn.dataset.serviceId = serviceId;
        }

        // Scroll to form
        const formSection = document.getElementById('service-management');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
                document.getElementById('createServiceForm')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
        }

    } catch (error) {
        console.error('Error loading service for edit:', error);
        alert('❌ Failed to load service data for editing.');
    }
}

/**
 * Cancel editing and reset form to create mode
 */
function cancelServiceEdit() {
    document.getElementById('serviceIdInput').readOnly = false;
    document.getElementById('serviceIdInput').value = '';
    document.getElementById('serviceNameInput').value = '';
    document.getElementById('durationsContainer').innerHTML = '';
    
    const submitBtn = document.querySelector('#createServiceForm button[type="submit"]');
    if (submitBtn) {
        submitBtn.textContent = '➕ Create Service';
        submitBtn.dataset.mode = 'create';
        delete submitBtn.dataset.serviceId;
    }
}

/**
 * Update service via API
 */
async function updateService(serviceId, serviceData) {
    const token = localStorage.getItem('authToken');
    
    try {
        const response = await fetch(`http://localhost:3000/api/services/${serviceId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to update service');
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Error updating service:', error);
        throw error;
    }
}
