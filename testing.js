// --- Global Service Data ---
const resortServices = [
    {
        id: 'std_room_1', // Changed from 'std_room'
        name: 'Standard Room 1', // Changed for clarity
        price: 2500.00,
        description: 'Comfortable, air-conditioned rooms perfect for individuals or couples. Ideal for a short, restful stay with essential amenities.',
        image: 'room.jpg' 
    },
    {
        id: 'std_room_2', // Changed from 'std_room'
        name: 'Standard Room 2',
        price: 3000.00, // Adjusted price to make it distinct
        description: 'A larger standard room with a better view and slightly higher price point.',
        image: 'standard room 2.jpg'
    },
    {
        id: 'family_cottage_1', // Changed from 'family_cottage'
        name: 'Family Cottage 1',
        price: 4000.00,
        description: 'Spacious and private cottages designed for larger groups or families. Includes dedicated dining space and outdoor grill access.',
        image: 'cottage.jpg'
    },
    {
        id: 'family_cottage_2', // Changed from 'family_cottage'
        name: 'Family Cottage 2',
        price: 4500.00, // Adjusted price to make it distinct
        description: 'A premium family cottage with a small private deck.',
        image: 'cottage.jpg'
    },
    {
        id: 'pool_rental',
        name: 'Pool Area Rental',
        price: 8000.00,
        description: 'Book our main pool and pavilion area for private events, parties, or large gatherings. Full-day access and exclusive use.',
        image: 'pool.jpg'
    },
];

// --- Global Data Store Simulation (Replaces Database) ---
// Initialize reservations array from localStorage or as an empty array
let reservations = JSON.parse(localStorage.getItem('qreserve_reservations')) || [];
// --- NEW DATA STORE: Promotions and Discounts ---
let promotions = JSON.parse(localStorage.getItem('qreserve_promotions')) || [];

// --- NEW DATA STORE: Users (For Authentication) ---
let users = JSON.parse(localStorage.getItem('qreserve_users')) || [
    // Pre-populate an Admin user for testing
    { email: 'admin@resort.com', password: 'password', firstName: 'Admin', lastName: 'User', name: 'Admin User', role: 'admin', contactNumber: 'N/A' },
    // Pre-populate a Customer user for testing
    { email: 'manager@resort.com', password: 'password', firstName: 'Manage', lastName: 'Renz', name: 'Manage Renz', role: 'manager', contactNumber: '09000000000' }, 
    // Pre-populate a Customer user for testing
    { email: 'customer@test.com', password: 'password', firstName: 'Test', lastName: 'Customer', name: 'Test Customer', role: 'customer', contactNumber: '09123456789' }
];


// Function to save the current reservations array to the browser's local storage
function saveReservations() {
    localStorage.setItem('qreserve_reservations', JSON.stringify(reservations));
    console.log('Reservations saved to local storage:', reservations);
}

// Function to save the current promotions array to Local Storage
function savePromotions() {
    localStorage.setItem('qreserve_promotions', JSON.stringify(promotions));
    console.log('Promotions saved to local storage:', promotions);
}

// Function to save the current users array to Local Storage
function saveUsers() {
    localStorage.setItem('qreserve_users', JSON.stringify(users));
    console.log('Users saved to local storage:', users);
}

// Function to retrieve promotions
function getPromotions() {
    return promotions;
}

// --- Global Role Management Functions ---
// Function to get the current role from Local Storage (Default is 'public')
function getCurrentRole() {
    return localStorage.getItem('qreserve_user_role') || 'public';
}

// Function to set the user role
function setRole(role) {
    localStorage.setItem('qreserve_user_role', role);
}

// Function to handle logout
function logout() {
    localStorage.removeItem('qreserve_user_role');
    localStorage.removeItem('qreserve_logged_user_email'); // CRITICAL: Clear the user identity
    alert('Logged out successfully!');
    window.location.href = 'index.html';
}

// --- NEW AUTHENTICATION FUNCTIONS (DFD 1.0) ---

// Function to handle new user registration
function registerUser(event) {
    event.preventDefault();
    
    // --- UPDATED FIELD CAPTURE ---
    const firstNameInput = document.getElementById('registerFirstName').value.trim();
    const middleInitialInput = document.getElementById('registerMiddleInitial').value.trim() || 'N/A';
    const lastNameInput = document.getElementById('registerLastName').value.trim();
    const contactNumberInput = document.getElementById('registerContactNumber').value.trim();
    // -----------------------------
    
    const emailInput = document.getElementById('registerEmail').value.toLowerCase().trim();
    const passwordInput = document.getElementById('registerPassword').value;

    if (users.some(user => user.email === emailInput)) {
        alert('Registration Failed: An account with this email already exists.');
        return;
    }

    if (passwordInput.length < 6) {
        alert('Registration Failed: Password must be at least 6 characters.');
        return;
    }

    const newUser = {
        // --- NEW DATA STRUCTURE ---
        firstName: firstNameInput,
        middleInitial: middleInitialInput,
        lastName: lastNameInput,
        name: `${firstNameInput} ${middleInitialInput !== 'N/A' ? middleInitialInput + ' ' : ''}${lastNameInput}`, // Full name for display
        contactNumber: contactNumberInput,
        // --------------------------
        email: emailInput,
        password: passwordInput, 
        role: 'customer' 
    };

    users.push(newUser);
    saveUsers();
    
    // Simulate immediate login and redirect
    setRole(newUser.role); 
    localStorage.setItem('qreserve_logged_user_email', newUser.email);
    
    alert(`Registration successful! Welcome, ${newUser.name}. Redirecting to home...`);
    window.location.href = 'index.html';
}


// Function to handle user login
function loginUser(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('loginEmail').value.toLowerCase().trim();
    const passwordInput = document.getElementById('loginPassword').value;

    const user = users.find(u => u.email === emailInput && u.password === passwordInput);

    if (user) {
        // Successful login
        setRole(user.role); // Set the role (admin, customer, or public)
        localStorage.setItem('qreserve_logged_user_email', user.email); // Save the user's email for profile/session use
        
        alert(`Login successful! Welcome back, ${user.name} (${user.role}).`);
        window.location.href = 'index.html';
    } else {
        // Failed login
        alert('Login Failed: Invalid email or password.');
    }
}

// --- END NEW AUTHENTICATION FUNCTIONS ---


// --- DFD 2.0 Manage Profile Functions ---

/**
 * Finds the currently logged-in user object.
 * @returns {object|null} The user object or null if not found.
 */
function getLoggedInUser() {
    const userEmail = localStorage.getItem('qreserve_logged_user_email');
    if (!userEmail) return null;
    
    // Ensure the global 'users' array is up-to-date (it should be, but this is defensive)
    let currentUsers = JSON.parse(localStorage.getItem('qreserve_users')) || [];
    
    return currentUsers.find(u => u.email === userEmail.toLowerCase());
}

/**
 * Renders the logged-in user's personal details on profile.html.
 */
function renderProfileDetails() {
    const user = getLoggedInUser();
    
    if (!user) {
        // If no user is found, redirect to login or show an error
        const display = document.getElementById('user-info-display');
        if(display) {
             display.innerHTML = '<p style="color: red;">Not logged in. Redirecting...</p>';
        }
        setTimeout(() => {
             window.location.href = 'login.html';
        }, 1000);
        return;
    }

    // Display the user's details
    document.getElementById('profile-name').textContent = user.name || `${user.firstName} ${user.lastName}`;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-contact').textContent = user.contactNumber;
    document.getElementById('profile-role').textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
}


/**
 * Renders the logged-in user's reservation history.
 */
function renderUserReservations() {
    const user = getLoggedInUser();
    const list = document.getElementById('user-reservations-list');
    
    if (!list || !user) {
        // Stop if not on the profile page or if user is missing
        return; 
    }

    // Filter all reservations to find ones matching the user's email
    // NOTE: In a real app, 'reservations' would need a 'userEmail' property.
    // For now, we'll SIMULATE history by showing the last 5 reservations for the current user.
    
    // TEMPORARY: Match based on name/email until reservation object is fully updated
    // For now, we'll SIMULATE by showing the last 5 overall, or you can use a property like 'full_name' 
    // from the reservation object if the user used their real name during booking.
    
    // We'll use the last 5 as a safe, temporary simulation, as it was in your previous version, but 
    // we'll update the table rendering to match the new profile table structure.
    const userReservations = reservations.slice(-5).reverse(); // Show newest first
    
    list.innerHTML = '';
    
    if (userReservations.length === 0) {
        list.innerHTML = '<tr><td colspan="5" style="text-align: center;">You have no reservations on record.</td></tr>';
        return;
    }

    userReservations.forEach(res => {
        const row = document.createElement('tr');
                // --- UPDATED STATUS CLASS LOGIC FOR PROFILE ---
        let statusClass = 'status-pending'; 

        if (res.status === 'confirmed') {
            statusClass = 'status-confirmed'; 
        } else if (res.status === 'completed') {
            statusClass = 'status-completed'; 
        } else if (res.status === 'cancelled') {
            statusClass = 'status-cancelled'; 
        }
        // ---------------------------------------------
        const priceDisplay = res.finalTotal ? `P${res.finalTotal.toFixed(2)}` : `P${res.basePrice ? res.basePrice.toFixed(2) : 'N/A'}`;

        row.innerHTML = `
            <td>${res.id}</td>
            <td>${res.serviceType}</td>
            <td>${new Date(res.check_in).toLocaleDateString()}</td>
            <td><span class="${statusClass}">${res.status}</span></td>
            <td>${priceDisplay}</td>
        `;
        list.appendChild(row);
    });
}
// --- END DFD 2.0 Manage Profile Functions ---


// Expose functions globally so HTML elements (like onclick) can use them
window.logout = logout;
window.setRole = setRole;

// --- DFD 15.0 Admin User Management Functions ---

/**
 * Saves the current 'users' array back to Local Storage.
 */
function saveUsers() {
    localStorage.setItem('qreserve_users', JSON.stringify(users));
    // Re-synchronize the global array just in case
    window.users = users; 
}


/**
 * Renders the list of users on user-management.html based on filters.
 */
function renderUsersList() {
    const tbody = document.getElementById('users-list-tbody');
    const userCountDisplay = document.getElementById('user-count');
    if (!tbody) return;

    // 1. Get Filters
    const searchTerm = document.getElementById('user-search-input')?.value.toLowerCase().trim() || '';
    const roleFilter = document.getElementById('user-role-filter')?.value || 'all';

    // Ensure 'users' array is up-to-date
    let currentUsers = JSON.parse(localStorage.getItem('qreserve_users')) || [];
    
    // 2. Apply Filters
    let filteredUsers = currentUsers.filter(user => {
        const nameMatch = user.name.toLowerCase().includes(searchTerm);
        const emailMatch = user.email.toLowerCase().includes(searchTerm);
        const roleMatch = roleFilter === 'all' || user.role === roleFilter;
        
        return (nameMatch || emailMatch) && roleMatch;
    });

    // 3. Update User Count Display
    if (userCountDisplay) {
        userCountDisplay.textContent = filteredUsers.length;
    }
    
    // 4. Render Table
    tbody.innerHTML = '';
    if (filteredUsers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No users found matching the criteria.</td></tr>';
        return;
    }

    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        
        // Disable actions if the user is the currently logged-in admin (prevent self-lockout)
        const loggedInEmail = localStorage.getItem('qreserve_logged_user_email');
        const isSelf = user.email === loggedInEmail;
        const disableClass = isSelf ? 'disabled-action' : '';
        const roleText = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        
        // Dynamic Role Selector for quick change
        const roleSelector = `
            <select onchange="changeUserRole('${user.email}', this.value)" ${isSelf ? 'disabled' : ''}>
                <option value="customer" ${user.role === 'customer' ? 'selected' : ''}>Customer</option>
                <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Admin</option>
            </select>
        `;

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.contactNumber}</td>
            <td>${roleSelector}</td>
            <td>
                <button class="button-secondary ${disableClass}" 
                        onclick="resetUserPassword('${user.email}')" 
                        ${isSelf ? 'disabled' : ''}>
                    Reset
                </button>
            </td>
            <td>
                <button class="button-danger ${disableClass}" 
                        onclick="deleteUser('${user.email}')" 
                        ${isSelf ? 'disabled' : ''}>
                    Delete
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

/**
 * Changes the role of a user and re-renders the list.
 * @param {string} email - The email of the user to modify.
 * @param {string} newRole - The new role ('customer' or 'admin').
 */
function changeUserRole(email, newRole) {
    if (!confirm(`Are you sure you want to change ${email}'s role to ${newRole.toUpperCase()}?`)) {
        document.getElementById('user-role-filter').value = users.find(u => u.email === email).role; // Reset selector if canceled
        renderUsersList(); // Re-render to ensure selector is correct
        return;
    }

    // 1. Find the user and update their role in the global 'users' array
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex !== -1) {
        users[userIndex].role = newRole;
        saveUsers();
        alert(`Role for ${email} successfully changed to ${newRole}.`);
        
        // 2. Re-render the list to show the change
        renderUsersList();
        
        // CRITICAL: If the user is viewing the page, refresh the navigation bar too
        renderNavigation();
    }
}

/**
 * Deletes a user account and re-renders the list.
 * @param {string} email - The email of the user to delete.
 */
function deleteUser(email) {
    if (!confirm(`WARNING: Are you sure you want to permanently delete the account for ${email}?`)) {
        return;
    }
    
    // 1. Filter out the user from the global 'users' array
    users = users.filter(user => user.email !== email);
    saveUsers();
    alert(`Account for ${email} has been permanently deleted.`);

    // 2. Re-render the list to show the deletion
    renderUsersList();
}

/**
 * Generates a new temporary password and updates the user's record.
 * @param {string} email - The email of the user whose password to reset.
 */
function resetUserPassword(email) {
    // Generate a simple temporary password for simulation
    const newPassword = Math.random().toString(36).slice(-8); 

    if (!confirm(`Are you sure you want to reset the password for ${email}? The new password will be: ${newPassword}`)) {
        return;
    }

    // 1. Find the user and update their password in the global 'users' array
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex !== -1) {
        // CRITICAL: Update the password in the data store
        users[userIndex].password = newPassword;
        saveUsers(); 

        alert(`Success! Password for ${email} has been reset to: ${newPassword}. (In a real system, this would be emailed to the user.)`);
    }
}


// Expose these functions globally for HTML calls
window.renderUsersList = renderUsersList;
window.changeUserRole = changeUserRole;
window.deleteUser = deleteUser;
window.resetUserPassword = resetUserPassword;

// --- Dynamic Navigation Data and Renderer ---
const navLinks = {
    public: [
        { text: 'Promotions', href: 'promotions.html' },
        { text: 'Check-in Demo', href: 'checkin-demo.html' } // Still available for public viewing
    ],
    customer: [
        { text: 'Promotions', href: 'promotions.html' },
        { text: 'Check-in Demo', href: 'checkin-demo.html' },
    ],
    admin: [
        { text: 'Reserve Now', href: 'services-list.html'},
        { text: 'Admin Dashboard', href: 'admin-dashboard.html' },
        { text: 'Promotions', href: 'promotions.html' }
    ]
};

// Re-define the dropdown toggle function to be callable externally
function attachDropdownToggle() {
    const profileButton = document.getElementById('profile-icon');
    const profileMenu = document.getElementById('profile-menu');

    if (profileButton && profileMenu) {
        profileButton.addEventListener('click', () => {
            profileMenu.classList.toggle('show-dropdown');
            const isExpanded = profileButton.getAttribute('aria-expanded') === 'true' || false;
            profileButton.setAttribute('aria-expanded', !isExpanded);
        });
        window.addEventListener('click', (event) => {
            if (!event.target.matches('#profile-icon') && !event.target.closest('.profile-dropdown')) {
                if (profileMenu.classList.contains('show-dropdown')) {
                    profileMenu.classList.remove('show-dropdown');
                    profileButton.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
}

// --- Updated renderNavigation() Function in script.js ---

function renderNavigation() {
    const navUl = document.querySelector('nav ul');
    if (!navUl) return;

    let roleFromStorage = getCurrentRole(); // The actual role stored in Local Storage
    let currentRoleToUse = roleFromStorage; // The role used to select links
    const currentPath = window.location.pathname;

    // --- 1. ROLE ENFORCEMENT LOGIC (The Fix) ---
    // If the user lands on an Admin page, enforce the Admin view, 
    // overriding the potentially corrupted role from a different tab.
    if (currentPath.includes('admin-dashboard.html') || currentPath.includes('user-management.html')) {
        if (roleFromStorage !== 'public') {
            currentRoleToUse = 'admin'; // FORCE Admin links if any user is logged in
        }
    } 
    // --- 2. REDIRECT LOGIC (Prevent logged-in user from hitting login/register) ---
    else if ((currentPath.includes('login.html') || currentPath.includes('register.html')) && roleFromStorage !== 'public') {
         // If a logged-in user hits login/register, redirect them home
         window.location.href = 'index.html';
         return; 
    }
    // -------------------------------------------------------------------------

    // ... (Keep existing REDIRECT LOGIC for login/register pages)

    // --- NEW: Role Key Mapping for Manager Access ---
    // If the stored role is 'manager', map it to 'admin' to pull the correct links.
    let roleKey = currentRoleToUse;
    if (currentRoleToUse === 'manager') {
        roleKey = 'admin';
    }
    const links = navLinks[roleKey]; // Use the roleKey for link selection
    
    navUl.innerHTML = '';  

    // 1. Add universal links (Home is always first)
    const homeLi = document.createElement('li');
    homeLi.innerHTML = `<a href="index.html">Home</a>`;
    navUl.appendChild(homeLi);
    
    // 2. Add role-specific links
    links.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${link.href}">${link.text}</a>`;
        navUl.appendChild(li);
    });

    // 3. Add Help/Guides (always visible)
    const helpLi = document.createElement('li');
    helpLi.innerHTML = `<a href="help.html">Help</a>`;
    navUl.appendChild(helpLi);

    // 4. Add Login/Profile based on status (Uses the actual stored role for status check)
    if (roleFromStorage !== 'public') { 
        // Logged-in: Show Profile Dropdown
        const profileLi = document.createElement('li');
        profileLi.classList.add('profile-dropdown');
        
        profileLi.innerHTML = `
            <button id="profile-icon" class="icon-button" aria-expanded="false" aria-controls="profile-menu">
                <span style="font-size: 1.5rem;">👤</span> 
            </button>
            <div class="dropdown-content" id="profile-menu">
                <a href="profile.html">My Profile</a>
                <a href="#" onclick="logout(); return false;">Logout</a>
            </div>
        `;
        navUl.appendChild(profileLi);

        attachDropdownToggle();

    } else {
        // Logged-out: Show Login and Register
        const loginLi = document.createElement('li');
        const registerLi = document.createElement('li');
        
        loginLi.innerHTML = `<a href="login.html">Login</a>`;
        registerLi.innerHTML = `<a href="register.html">Register</a>`;

        navUl.appendChild(loginLi);
        navUl.appendChild(registerLi);
    }
}

// Call renderNavigation and NEW AUTHENTICATION LISTENERS on every page load
document.addEventListener('DOMContentLoaded', () => {
    renderNavigation();

    // --- NEW AUTHENTICATION LISTENERS ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }
    // --- END AUTHENTICATION LISTENERS ---
});

// --- NEW PROMOTION CALCULATION FUNCTION ---
/**
 * Calculates discount and updates the total price display on reserve.html.
 * @param {number} basePrice - The service's original price.
 * @returns {object} An object containing the final total and discount value.
 */
function calculateFinalPrice(basePrice) {
    // Check if the required elements exist before proceeding (only runs on reserve.html)
    const promoCodeInput = document.getElementById('promoCodeInput');
    const promoMessage = document.getElementById('promoMessage');
    const discountAmountDisplay = document.getElementById('discountAmount');
    const finalTotalDisplay = document.getElementById('finalTotal');
    const summaryBasePriceDisplay = document.getElementById('summaryBasePrice'); // Added to ensure base price is shown
    
    if (!finalTotalDisplay) return { finalTotal: basePrice, discountValue: 0, appliedCode: '' }; // Exit if not on reserve.html

    const promos = getPromotions(); 

    let discountPercent = 0;
    let finalTotal = basePrice;
    let discountValue = 0;
    
    // Check if the user has entered a code (or if we are running the function for the form submission)
    const enteredCode = promoCodeInput ? promoCodeInput.value.toUpperCase().trim() : '';

    if (enteredCode) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const validPromo = promos.find(promo => 
            promo.code === enteredCode && new Date(promo.expires) >= today
        );

        if (validPromo) {
            discountPercent = validPromo.discount;
            discountValue = (basePrice * discountPercent) / 100;
            finalTotal = basePrice - discountValue;

            if (promoMessage) {
                promoMessage.textContent = `${validPromo.code} applied successfully! You saved ${discountPercent}%.`;
                promoMessage.style.color = 'green';
            }
        } else {
            // Check if code exists but is expired
            const expiredPromo = promos.find(promo => promo.code === enteredCode);
            if (promoMessage) {
                 if (expiredPromo) {
                    promoMessage.textContent = 'Code is valid but has expired.';
                } else {
                    promoMessage.textContent = 'Invalid or non-existent promotion code.';
                }
                promoMessage.style.color = 'red';
            }
        }
    } else if (promoMessage) {
        promoMessage.textContent = 'Enter a code to check availability.';
        promoMessage.style.color = 'initial';
    }

    // Update the UI displays
    const formatPrice = (price) => `P${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    if (summaryBasePriceDisplay) {
         summaryBasePriceDisplay.textContent = formatPrice(basePrice);
    }
    if (discountAmountDisplay) {
        discountAmountDisplay.textContent = formatPrice(discountValue);
    }
    if (finalTotalDisplay) {
        finalTotalDisplay.textContent = formatPrice(finalTotal);
    }

    // Return the final calculated values
    return { finalTotal: finalTotal, discountValue: discountValue, appliedCode: enteredCode };
}

// --- Function to Render Public-Facing Promotions List ---
function renderPublicPromotions() {
    const container = document.getElementById('active-promotions-list');
    if (!container) return;

    const activePromos = getPromotions();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Filter for codes that haven't expired yet
    const currentPromos = activePromos.filter(promo => 
        new Date(promo.expires) >= today
    );

    if (currentPromos.length === 0) {
        container.innerHTML = '<p class="no-promos">We currently do not have any active discount codes.</p>';
        return;
    }

    let html = '<div class="promo-grid">';
    currentPromos.forEach(promo => {
        html += `
            <div class="promo-card">
                <h3>${promo.discount}% OFF!</h3>
                <p>Use Code:</p>
                <div class="promo-code-box">
                    <strong>${promo.code}</strong> 
                </div>
                <p class="expiry-text">Expires: ${promo.expires}</p>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}
// Ensure this runs when the promotions.html loads
document.addEventListener('DOMContentLoaded', renderPublicPromotions);

// --- End of Public Promotions List Renderer ---


// --- Reservation Form Submission Handler (UPDATED for UC 9: Manage Schedule & DFD 8.0: Discounts) ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservationForm');
    const urlParams = new URLSearchParams(window.location.search);
    const serviceId = urlParams.get('service');
    let baseServicePrice = 0;

    // --- 1. SET UP RESERVATION PAGE (reserve.html) ---
    if (document.getElementById('reservationForm')) {
        const currentService = resortServices.find(s => s.id === serviceId);
        if (currentService) {
            baseServicePrice = currentService.price;
            document.getElementById('summaryServiceName').textContent = currentService.name;
            
            // Initial price calculation (to display the base price)
            calculateFinalPrice(baseServicePrice);
        }

        // Add event listener for the APPLY button
        const applyPromoButton = document.getElementById('applyPromoButton');
        if (applyPromoButton) {
            applyPromoButton.addEventListener('click', () => {
                calculateFinalPrice(baseServicePrice); // Recalculate price on click
            });
        }
    }

    // --- 2. FORM SUBMISSION LOGIC ---
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Stop the page from reloading

            // 1. Get the check-in date from the form
            const checkInDateInput = document.getElementById('checkin');
            const checkInDate = checkInDateInput ? checkInDateInput.value.split('T')[0] : null; 

            // --- UC 9: CHECK FOR BLOCKED DATES (CRITICAL NEW LOGIC) ---
            const blockedDates = getBlockedDates(); 
            const isBlocked = blockedDates.some(item => item.date === checkInDate);

            if (isBlocked) {
                const reason = blockedDates.find(item => item.date === checkInDate).reason;
                alert(`RESERVATION FAILED: The chosen date (${checkInDate}) is blocked due to: ${reason}. Please select another date.`);
                return; // STOP submission if date is blocked
            }
            // --- END UC 9 CHECK ---


            // 2. Proceed with data collection (DFD 4.0)
            const formData = new FormData(form);
            const reservationData = {};

            // Convert form data to a JavaScript object
            formData.forEach((value, key) => {
                reservationData[key] = value;
            });

            // 3. CAPTURE DISCOUNT DATA AND FINAL PRICE (DFD 8.0)
            const priceData = calculateFinalPrice(baseServicePrice); // Recalculate one last time
            
            reservationData.basePrice = baseServicePrice;
            reservationData.discountCode = priceData.appliedCode;
            reservationData.discountValue = priceData.discountValue;
            reservationData.finalTotal = priceData.finalTotal; // CRITICAL: Save the final discounted price
            
            // Add service details for completeness
            reservationData.serviceId = serviceId;
            reservationData.serviceType = resortServices.find(s => s.id === serviceId).name;

            // --- CRITICAL SIMULATION LOGIC ---
            const date = new Date();
            const timestamp = date.getTime();
            reservationData.id = `QRES-${timestamp}`; 
            reservationData.dateCreated = date.toLocaleString();
            reservationData.status = 'pending'; // New default reservation status

            // 4. Generate QR Code Data (The key for Check-in Demo)
            reservationData.qrCodeData = JSON.stringify({
                resId: reservationData.id,
                checkInTime: reservationData.check_in,
                guest: reservationData.full_name || 'Guest Name Placeholder' 
            });

            // 5. Simulate Payment Confirmation (DFD 5.0)
            reservationData.paymentStatus = 'pending'; // New default payment status

            // 6. Store the data (Simulate DFD 4.0 - Create Reservation)
            reservations.push(reservationData);
            saveReservations();

            // 7. Provide Feedback and Next Step (UC 11.0 Simulation)
            alert(`Reservation Confirmed! \nID: ${reservationData.id} \nFinal Price: P${priceData.finalTotal.toFixed(2)} \n\nYour request is PENDING confirmation by management. A confirmation notification has been simulated.`);

            // Redirect the user to a confirmation page
            window.location.href = `checkin-demo.html?id=${reservationData.id}`;
        });
    }
});

// Expose the data for other pages (like the Admin Dashboard) to access
window.qreserveReservations = reservations;

// --- DFD 7.0 Check-in Simulation Logic ---
// (No changes here, keeping your existing logic)
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the check-in demo page
    if (document.getElementById('qrcode')) {
        const urlParams = new URLSearchParams(window.location.search);
        const resId = urlParams.get('id');
        const checkinArea = document.getElementById('checkin-area');
        const infoDisplay = document.getElementById('reservation-info');
        const statusDisplay = document.getElementById('checkin-status');
        const scanButton = document.getElementById('scanButton');

        // 1. Retrieve the reservation data using the ID from the URL
        const currentReservation = reservations.find(res => res.id === resId);

        if (currentReservation) {
            // Display the reservation details
            infoDisplay.innerHTML = `Reservation ID: <strong>${currentReservation.id}</strong><br>
                                     Guests: ${currentReservation.number_of_guests} | Service: ${currentReservation.serviceType}<br>
                                     <span style="font-weight: bold; color: #dc3545;">TOTAL PAID: P${currentReservation.finalTotal ? currentReservation.finalTotal.toFixed(2) : currentReservation.basePrice.toFixed(2)}</span>`; // Added final total display

            // 2. Generate the QR Code (Uses the qrcode.js library we added)
            const qrData = currentReservation.qrCodeData;
            
            new QRCode(document.getElementById("qrcode"), {
                text: qrData, // This is the data the scanner reads
                width: 256,
                height: 256,
                colorDark : "#28a745", // Green
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.H
            });
            
            // 3. Handle the Check-in Scan Simulation
            if (scanButton) {
                scanButton.addEventListener('click', () => {
                    // Prevent repeated check-in
                    if (currentReservation.status === 'Checked In') {
                        alert('This guest has already been checked in!');
                        return;
                    }

                    // Simulate staff processing the QR data (DFD 7.0)
                    currentReservation.status = 'Checked In';
                    currentReservation.checkInTimeActual = new Date().toLocaleString();
                    saveReservations(); // Update local storage

                    // Update the UI
                    statusDisplay.textContent = `Status: Checked In at ${currentReservation.checkInTimeActual}`;
                    statusDisplay.classList.remove('pending');
                    statusDisplay.classList.add('success');

                    alert(`Success! Guest ${currentReservation.id} has been checked in.`);
                });
            }

        } else {
            // No ID found in URL or data store
            checkinArea.innerHTML = '<h2>Error: Reservation not found.</h2><p>Please start a new reservation.</p>';
        }
    }
        // Inside document.addEventListener('DOMContentLoaded', () => { ...

    // --- Dynamic Banner Logic (For services-list.html) ---
    if (document.getElementById('promo-banner')) {
        const banner = document.getElementById('promo-banner');
        const promos = getPromotions();
        const currentPromos = promos.filter(promo => new Date(promo.expires) >= new Date(new Date().toDateString()));

        if (currentPromos.length > 0) {
            // Display the first available promotion
            const firstPromo = currentPromos[0];
            // Note: The specific styling (e.g., span) here assumes you'll add the necessary CSS classes in style.css
            banner.innerHTML = `🔥 <span style"; font-weight: bold; color: #ffffff >**LIMITED TIME OFFER!** Use code</span> <span style="font-weight: bold; background-color: white; color: #dc3545; padding: 2px 5px; border-radius: 3px;">${firstPromo.code}</span> <span style"font-weight: bold; color: #ffffff > for a ${firstPromo.discount}% discount!</span>`;
            banner.style.display = 'block';
        }
    }
    // --- End Dynamic Banner Logic ---

    // ... (Rest of your existing DOMContentLoaded logic continues here) ...
});

// --- NEW LOGIC: Quick Search Form Handler (Index.html) ---
// (No changes here, keeping your existing logic)
document.addEventListener('DOMContentLoaded', () => {
    // ... (Existing code for renderNavigation, etc.) ...
    
    const quickSearchForm = document.getElementById('quickSearchForm');
    if (quickSearchForm) {
        quickSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const checkInDate = document.getElementById('searchCheckin').value;
            const checkOutDate = document.getElementById('searchCheckout').value;
            const guests = document.getElementById('searchGuests').value;
            
            // UC 9 Quick Check: Check if the check-in date is blocked
            const blockedDates = getBlockedDates(); // Use the existing global function
            const isBlocked = blockedDates.some(item => item.date === checkInDate);

            if (isBlocked) {
                const reason = blockedDates.find(item => item.date === checkInDate).reason;
                alert(`Sorry! The resort is fully booked or closed for maintenance on your check-in date (${checkInDate}) due to: ${reason}. Please choose a different start date.`);
                return; // STOP submission if date is blocked
            }

            // If not blocked, proceed to the Services List page with the dates attached
            window.location.href = `services-list.html?checkin=${checkInDate}&checkout=${checkOutDate}&guests=${guests}`;
        });
    }
    
    // ... (Existing code for Admin Dashboard init, etc.) ...
});

// --- DFD 6.0 Admin Dashboard Logic ---
// (No major changes here, only ensuring it runs)
document.addEventListener('DOMContentLoaded', () => {
    const reservationList = document.getElementById('reservation-list');
    const reportButton = document.getElementById('report-button');
    const clearButton = document.getElementById('clear-reservations-button');

    if (reservationList) {
        // Function to render the table content
        function renderReservations() {
            reservationList.innerHTML = ''; // Clear existing list

            if (reservations.length === 0) {
                reservationList.innerHTML = '<tr><td colspan="6" style="text-align: center;">No reservations found in the local database. Please create one!</td></tr>';
                return;
            }

            reservations.forEach(res => {
                const row = document.createElement('tr');
                // --- UPDATED STATUS CLASS LOGIC FOR ADMIN ---
                let statusClass = 'status-pending'; 

                if (res.status === 'confirmed') {
                    statusClass = 'status-confirmed'; 
                } else if (res.status === 'completed') {
                    statusClass = 'status-completed'; 
                } else if (res.status === 'cancelled') {
                    statusClass = 'status-cancelled'; 
                }
                // ---------------------------------------------
                
                // ...
                // Use finalTotal if available, otherwise use basePrice
                const priceDisplay = res.finalTotal ? `P${res.finalTotal.toFixed(2)}` : `P${res.basePrice ? res.basePrice.toFixed(2) : 'N/A'}`;
                
                // --- NEW: Reservation Status Selector ---
                const statusSelector = `
                    <select class="status-selector ${statusClass}" onchange="updateReservationStatus('${res.id}', this.value)">
                        <option value="pending" ${res.status === 'pending' ? 'selected' : ''}>PENDING</option>
                        <option value="confirmed" ${res.status === 'confirmed' ? 'selected' : ''}>CONFIRMED</option>
                        <option value="cancelled" ${res.status === 'cancelled' ? 'selected' : ''}>CANCELLED</option>
                        <option value="completed" ${res.status === 'completed' ? 'selected' : ''}>COMPLETED</option>
                    </select>
                `;
                // --- END NEW STATUS SELECTOR ---

                row.innerHTML = `
                    <td>${res.id}</td>
                    <td>${res.number_of_guests}</td>
                    <td>${res.serviceType}</td>
                    <td>${new Date(res.check_in).toLocaleDateString()}</td>
                    <td>${new Date(res.check_out).toLocaleDateString()}</td>
                    <td>${priceDisplay}</td>
                    <td>${statusSelector}</td>
                `;
                reservationList.appendChild(row);
            });
            
            // NOTE: We need to re-apply the status class after the selector is added to the DOM
            // This is optional, but helps keep the dropdown styled correctly.
            reservationList.querySelectorAll('select.status-selector').forEach(select => {
                const currentStatus = select.value;
                select.className = 'status-selector'; // Reset classes
                if (currentStatus === 'pending') {
                    select.classList.add('status-pending');
                } else if (currentStatus === 'confirmed') {
                    select.classList.add('status-confirmed');
                } else if (currentStatus === 'cancelled') {
                    select.classList.add('status-cancelled');
                } else if (currentStatus === 'completed') {
                    select.classList.add('status-completed');
                }
            });
        }
        
        // Initial rendering
        renderReservations();
    }

    // Handle Generate Report button (Use Case 14.0)
    if (reportButton) {
        reportButton.addEventListener('click', () => {
            alert('Simulation: Generating Report... (A PDF file containing reservation and payment data would be created and downloaded here.)');
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            const confirmed = confirm("Are you sure you want to clear ALL reservation data? This cannot be undone.");

            if (confirmed) {
                // 1. Reset the global JavaScript array
                reservations = [];
                
                // 2. Clear the Local Storage item
                localStorage.removeItem('qreserve_reservations');

                // 3. Update the window's global array (important for other scripts)
                window.qreserveReservations = reservations;
                
                // 4. Re-render the empty table (or show "No data" message)
                // Note: This relies on the renderReservations function you already have!
                if (document.getElementById('reservation-list')) {
                    renderReservations();
                }

                alert('All reservation data has been successfully cleared!');
            }
        });
    }

        /**
     * Updates the status of a specific reservation and re-renders the table.
     * @param {string} resId - The ID of the reservation to modify.
     * @param {string} newStatus - The new status ('pending', 'confirmed', etc.).
     */
    function updateReservationStatus(resId, newStatus) {
        if (!confirm(`Are you sure you want to change Reservation ${resId} status to ${newStatus.toUpperCase()}?`)) {
            // Re-render to ensure the selector snaps back to the original value if canceled
            renderReservations();
            return; 
        }

        // 1. Find the reservation and update its status
        const reservationIndex = reservations.findIndex(res => res.id === resId);
        
        if (reservationIndex !== -1) {
            reservations[reservationIndex].status = newStatus;

            // Optional: If confirmed, simulate payment confirmation
            if (newStatus === 'confirmed') {
                 reservations[reservationIndex].paymentStatus = 'confirmed';
            } 
            // Optional: If cancelled, assume refund/cancellation process starts
            else if (newStatus === 'cancelled') {
                reservations[reservationIndex].paymentStatus = 'cancelled'; // or 'refund_pending'
            }
            
            saveReservations(); 
            alert(`Reservation ${resId} status successfully changed to ${newStatus}.`);
            
            // 2. Re-render the list to show the change
            renderReservations();
        }
    }

// Expose the function globally
window.updateReservationStatus = updateReservationStatus;
});

// --- DFD 2.0 Manage Profile Logic (OLD SIMULATION REPLACED) ---
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the profile page
    if (document.getElementById('user-info-display')) {
        renderProfileDetails();
        renderUserReservations();
    }
});
// --- END DFD 2.0 Manage Profile Logic ---

// At the bottom of your main DOMContentLoaded block (around line 750, or wherever your main listeners are)
document.addEventListener('DOMContentLoaded', () => {
    // ... (Keep all your existing listeners here) ...

    // --- DFD 15.0 Admin User Management Init ---
    if (document.getElementById('users-list-tbody')) {
        renderUsersList();
    }
    // --- END DFD 15.0 Init ---
});



// --- New Reservation Flow: Service Selection & Modal Logic (UPDATED) ---
// (No changes here, keeping your existing logic)
document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('service-cards-container');
    const modal = document.getElementById('serviceModal');
    const closeButton = document.querySelector('.close-button');
    const proceedButtonModal = document.getElementById('modal-proceed-button');
    
    // --- NEW SIDEBAR ELEMENTS ---
    const summaryDates = document.getElementById('summary-dates');
    const summaryRoom = document.getElementById('summary-room');
    const summaryPrice = document.getElementById('summary-price');
    const sidebarProceedButton = document.getElementById('sidebar-proceed-button');
    // --- NEW HEADER ELEMENTS ---
    const datesDisplay = document.getElementById('dates-display');
    const guestsDisplay = document.getElementById('guests-display');
    const urlParams = new URLSearchParams(window.location.search);
    
    const checkin = urlParams.get('checkin');
    const checkout = urlParams.get('checkout');
    const guests = urlParams.get('guests');

    // String containing the date/guest parameters to be passed to reserve.html
    const dateParams = checkin && checkout ? `&checkin=${checkin}&checkout=${checkout}&guests=${guests}` : '';

    // Function to initialize the Summary Bar and Header
    function initializeSummary() {
        if (checkin && checkout) {
            const checkinDate = new Date(checkin).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            const checkoutDate = new Date(checkout).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            
            // Header Update
            datesDisplay.textContent = `${checkinDate} to ${checkoutDate}`;
            guestsDisplay.textContent = guests || 'N/A';

            // Sidebar Update
            summaryDates.textContent = `${checkinDate} - ${checkoutDate}`;
            
        } else {
            // Fallback if user bypasses the search bar
            datesDisplay.textContent = 'Dates not selected';
            guestsDisplay.textContent = 'N/A';
            summaryDates.textContent = 'Please return to Home to search dates.';
        }
        
        // Disable the sidebar button by default
        updateSidebarSummary('No room selected yet', 0, '');
    }
    
    // Function to update the sidebar when a card is selected
    function updateSidebarSummary(roomName, price, serviceId) {
        summaryRoom.textContent = roomName;
        summaryPrice.textContent = `P${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        
        if (price > 0) {
            sidebarProceedButton.classList.remove('disabled');
            sidebarProceedButton.href = `reserve.html?service=${serviceId}${dateParams}`;
            sidebarProceedButton.onclick = null; // Remove the alert function
            sidebarProceedButton.textContent = 'Continue Booking';
        } else {
            sidebarProceedButton.classList.add('disabled');
            sidebarProceedButton.href = '#';
            sidebarProceedButton.onclick = () => { alert('Please select a room first!'); return false; };
            sidebarProceedButton.textContent = 'Continue Booking';
        }
    }


    if (cardsContainer) {
        // Function to render the service cards
        function renderServiceCards() {
            cardsContainer.innerHTML = ''; // Clear existing content

            resortServices.forEach(service => {
                const card = document.createElement('div');
                card.classList.add('service-card');
                card.setAttribute('data-service-id', service.id);
                
                // CRITICAL FIX: Ensure images display correctly!
                const imageUrl = service.image.startsWith('http') ? service.image : `images/${service.image}`;

                card.innerHTML = `
                    <img src="${imageUrl}" alt="${service.name} Photo"> 
                    <div class="card-content">
                        <h3>${service.name}</h3>
                        <p>${service.description.substring(0, 70)}...</p>
                        <p class="price">P${service.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                `;

                // Add click listener to show the modal
                card.addEventListener('click', () => {
                    // 1. Show the detail modal
                    showServiceModal(service.id, dateParams); 
                    // 2. Update the sidebar immediately when the user clicks the card
                    updateSidebarSummary(service.name, service.price, service.id);
                });
                cardsContainer.appendChild(card);
            });
        }
        
        // Function to show the modal with service details (Updated to accept dateParams)
        window.showServiceModal = function(serviceId, dateParams) {
            const service = resortServices.find(s => s.id === serviceId);

            if (service) {
                document.getElementById('modal-name').textContent = service.name;
                document.getElementById('modal-price').textContent = `P${service.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
                document.getElementById('modal-description').textContent = service.description;

                // Set the link for the proceed button (passing the service ID and dateParams)
                proceedButtonModal.href = `reserve.html?service=${service.id}${dateParams}`;

                modal.style.display = 'block';
            }
        }

        // Close modal functions
        closeButton.onclick = () => { modal.style.display = 'none'; };
        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        };

        // Initialize the new features
        initializeSummary();
        renderServiceCards();
    }
});

// --- Use Case 9: Manage Schedule Logic ---
// (No changes here, keeping your existing logic)
function getBlockedDates() {
    // Retrieves blocked dates from Local Storage
    const blockedDates = localStorage.getItem('qreserve_blocked_dates');
    return blockedDates ? JSON.parse(blockedDates) : [];
}

/**
 * Helper function to generate all dates between a start and end date (inclusive).
 * @returns {string[]} An array of date strings (YYYY-MM-DD).
 */
function getDatesInRange(startDateStr, endDateStr) {
    const dates = [];
    let currentDate = new Date(startDateStr);
    const stopDate = new Date(endDateStr);
    
    // Set time to midnight (00:00:00) for consistent date comparison across timezones
    currentDate.setHours(0, 0, 0, 0);
    stopDate.setHours(0, 0, 0, 0);

    while (currentDate <= stopDate) {
        // Format as YYYY-MM-DD
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        
        dates.push(`${year}-${month}-${day}`);
        
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

function saveBlockedDates(datesArray) {
    // Saves the updated array back to Local Storage
    localStorage.setItem('qreserve_blocked_dates', JSON.stringify(datesArray));
}

// --- Updated Function to render the list of blocked dates on Admin Dashboard ---
function renderBlockedDatesList() {
    const list = document.getElementById('blockedDatesList');
    if (!list) return;

    let dates = getBlockedDates();
    dates.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date

    list.innerHTML = '';
    
    // Map of Service IDs to Names for display (e.g., 'std_room' -> 'Standard Room')
    const serviceMap = resortServices.reduce((map, service) => {
        map[service.id] = service.name;
        return map;
    }, {});

    dates.forEach(item => {
        const li = document.createElement('li');
        let serviceDisplay;

        if (item.services && item.services.includes('ALL')) {
            serviceDisplay = '<span style="color: red; font-weight: bold;">ALL SERVICES</span>';
        } else if (item.services && item.services.length > 0) {
            // Convert IDs back to readable names
            const names = item.services.map(id => serviceMap[id] || id);
            serviceDisplay = names.join(', ');
        } else {
            // Fallback for old data or if services property is missing (should not happen with new logic)
            serviceDisplay = 'ALL SERVICES (Default)';
        }

        li.innerHTML = `
            <strong>${item.date}</strong> 
            (${serviceDisplay}) - 
            ${item.reason || 'No reason provided'} 
            <button class="button-secondary" onclick="removeBlockedDate('${item.date}')">Unblock</button>
        `;
        list.appendChild(li);
    });
}

// --- New function to dynamically render service checkboxes on admin-dashboard.html ---
function renderServiceCheckboxes() {
    const container = document.getElementById('serviceCheckboxes');
    if (!container) return;

    // Clear previous checkboxes
    container.innerHTML = ''; 

    // Loop through your list of services
    resortServices.forEach(service => {
        // --- START NEW CONTAINER DIV ---
        const checkboxItem = document.createElement('div');
        // CRITICAL: Add the class for CSS alignment
        checkboxItem.classList.add('checkbox-item'); 
        // --- END NEW CONTAINER DIV ---

        const checkboxId = `service-${service.id}`;

        checkboxItem.innerHTML = `
            <input type="checkbox" id="${checkboxId}" name="service-to-block" value="${service.id}">
            <label for="${checkboxId}">${service.name}</label>
        `;

        container.appendChild(checkboxItem);
    });
}

// Ensure this runs when the admin dashboard loads
document.addEventListener('DOMContentLoaded', renderServiceCheckboxes);

function removeBlockedDate(dateToRemove) {
    let dates = getBlockedDates();
    dates = dates.filter(item => item.date !== dateToRemove);
    saveBlockedDates(dates);
    renderBlockedDatesList();
}
window.removeBlockedDate = removeBlockedDate; // Make it globally accessible for the button

// At the bottom of your script.js file, find this block:
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the list on the Admin Dashboard
    renderBlockedDatesList();
    renderServiceCheckboxes(); // Initialize the checkboxes

    const blockForm = document.getElementById('blockDateForm');
    if (blockForm) {
        blockForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 1. Get Date Range Inputs
            const startDateInput = document.getElementById('blockDate').value;
            const endDateInput = document.getElementById('blockEndDate').value; 
            const reasonInput = document.getElementById('blockReason').value.trim();

            const startDate = new Date(startDateInput);
            const endDate = new Date(endDateInput);

            // 2. Date Validation
            if (startDate > endDate) {
                alert("Error: The Block Start Date cannot be after the Block End Date.");
                return;
            }

            // 3. Collect selected services
            const selectedCheckboxes = Array.from(document.querySelectorAll('#serviceCheckboxes input[type="checkbox"]:checked'));
            const selectedServices = selectedCheckboxes.map(checkbox => checkbox.value);
            
            // If no service is selected, default to blocking ALL
            const servicesToBlock = selectedServices.length > 0 ? selectedServices : ['ALL'];
            
            // 4. Generate all dates in the range
            const datesToBlock = getDatesInRange(startDateInput, endDateInput);

            let dates = getBlockedDates(); // Get current blocked dates
            let successfullyBlockedCount = 0;
            
            // 5. Loop through the dates and save a blocked entry for each
            datesToBlock.forEach(dateStr => {
                const dateExistsIndex = dates.findIndex(item => item.date === dateStr);

                if (new Date(dateStr) < new Date(new Date().toDateString())) {
                    return; // Skip past dates
                }

                if (dateExistsIndex !== -1) {
                    // If the date already exists, we do nothing to prevent duplicates
                    console.warn(`Date ${dateStr} is already blocked. Skipping.`);
                } else {
                    // Block the date with the selected services
                    dates.push({ 
                        date: dateStr, 
                        reason: reasonInput, 
                        services: servicesToBlock // Saves the specific room IDs
                    });
                    successfullyBlockedCount++;
                }
            });

            if (successfullyBlockedCount > 0) {
                saveBlockedDates(dates);
                alert(`${successfullyBlockedCount} day(s) between ${startDateInput} and ${endDateInput} successfully blocked!`);
            } else {
                alert("No new dates were blocked (they may have been already blocked or you selected a past date).");
            }
            
            renderBlockedDatesList();
            blockForm.reset();
            
            // Reset the checkboxes visually after successful submission
            document.querySelectorAll('#serviceCheckboxes input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
        });
    }
});

// --- Promotions Management Logic (Admin Dashboard) ---
// (No changes here, keeping your existing logic)

// Function to render the list of active promotions
function renderPromotionsList() {
    const list = document.getElementById('promotionsList');
    if (!list) return;

    list.innerHTML = '';
    const activePromos = getPromotions();

    if (activePromos.length === 0) {
        list.innerHTML = '<li>No active promotions currently available.</li>';
        return;
    }

    activePromos.forEach(promo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${promo.code}</strong> 
            (${promo.discount}%) - 
            Expires: ${promo.expires}
            <button class="button-secondary" onclick="deletePromotion('${promo.code}')">Delete</button>
        `;
        list.appendChild(li);
    });
}

// Function to delete a promotion code
function deletePromotion(codeToDelete) {
    if (!confirm(`Are you sure you want to delete the promotion code: ${codeToDelete}?`)) {
        return;
    }
    promotions = promotions.filter(promo => promo.code !== codeToDelete);
    savePromotions();
    renderPromotionsList();
    alert(`Promotion ${codeToDelete} deleted.`);
}
window.deletePromotion = deletePromotion; // Make it globally accessible

// Form Submission Handler
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the list of promotions
    renderPromotionsList(); 

    const promoForm = document.getElementById('createPromotionForm');
    if (promoForm) {
        promoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const codeInput = document.getElementById('promoCode').value.toUpperCase().trim();
            const discountInput = parseInt(document.getElementById('promoDiscount').value);
            const expiresInput = document.getElementById('promoExpires').value;
            
            // Basic Validation
            if (promotions.some(promo => promo.code === codeInput)) {
                alert(`Error: The code ${codeInput} already exists.`);
                return;
            }

            const newPromotion = {
                code: codeInput,
                discount: discountInput,
                expires: expiresInput,
            };

            promotions.push(newPromotion);
            savePromotions();
            
            alert(`Promotion code ${codeInput} created successfully!`);
            promoForm.reset();
            renderPromotionsList();
        });
    }
});
// Inside document.addEventListener('DOMContentLoaded', ...)
if (document.getElementById('promo-banner')) {
    const banner = document.getElementById('promo-banner');
    const promos = getPromotions();
    const currentPromos = promos.filter(promo => new Date(promo.expires) >= new Date(new Date().toDateString()));

    if (currentPromos.length > 0) {
        // Display the first available promotion
        const firstPromo = currentPromos[0];
        banner.innerHTML = `🔥 **LIMITED TIME OFFER!** Use code <span style="font-weight: bold; background-color: white; color: #dc3545; padding: 2px 5px; border-radius: 3px;">${firstPromo.code}</span> for a ${firstPromo.discount}% discount!`;
        banner.style.display = 'block';
    }
}