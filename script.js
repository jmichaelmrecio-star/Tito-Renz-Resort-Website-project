// --- Global Service Data (UPDATED to match the card rendering logic) ---
const resortServices = [
    {
        id: 'std_room_1',
        name: 'Standard Room 1',
        price: 2500.00,
        description: 'Comfortable, air-conditioned rooms perfect for individuals or couples. Ideal for a short, restful stay with essential amenities.',
        image: 'images/room.jpg'
    },
    {
        id: 'std_room_2',
        name: 'Standard Room 2',
        price: 3000.00,
        description: 'A larger standard room with a better view and slightly higher price point.',
        image: 'images/standard room 2.jpg'
    },
    {
        id: 'family_cottage_1',
        name: 'Family Cottage 1',
        price: 4000.00,
        description: 'Spacious and private cottages designed for larger groups or families. Includes dedicated dining space and outdoor grill access.',
        image: 'images/cottage.jpg'
    },
    {
        id: 'family_cottage_2',
        name: 'Family Cottage 2',
        price: 4500.00,
        description: 'A premium family cottage with a small private deck.',
        image: 'images/cottage.jpg'
    },
    {
        id: 'pool_rental',
        name: 'Pool Area Rental',
        price: 8000.00,
        description: 'Book our main pool and pavilion area for private events, parties, or large gatherings. Full-day access and exclusive use.',
        image: 'images/pool.jpg'
    },
];
// --- END Global Service Data ---

// --- Global Menu Data (DFD 13.0) ---
const resortMenu = [
    {
        name: 'Adobo Flakes',
        price: 350.00,
        description: 'Crispy pork flakes seasoned with traditional adobo sauce, served with garlic rice and fried egg.',
        image: 'images/adobo.jpg'
    },
    {
        name: 'Bulalo Soup',
        price: 480.00,
        description: 'Rich and hearty beef marrow stew slow-cooked with corn, cabbage, and beans. A Filipino classic.',
        image: 'images/bulalo.jpg'
    },
    {
        name: 'Classic Burger',
        price: 280.00,
        description: 'A juicy 1/3 lb beef patty with lettuce, tomato, and our special sauce on a toasted bun.',
        image: 'images/burger.jpg'
    },
    // ... continue this pattern for all dishes
];
// --- END Menu Data ---

// --- Global Data Store Simulation (Replaces Database) ---
// ** NOTE: This variable is now OUTDATED. Data persistence is handled by the API. **
let reservations = JSON.parse(localStorage.getItem('qreserve_reservations')) || [];

// --- NEW DATA STORE: Promotions and Discounts ---
let promotions = JSON.parse(localStorage.getItem('qreserve_promotions')) || [];

// --- Debounce Utility Function ---
// Ensures a function runs only once after a delay, ignoring rapid repeated calls.
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
// --- END Debounce Utility Function ---

// Function to save the current reservations array to the browser's local storage
// ** NOTE: This function is now OUTDATED and should be removed or refactored later. **
function saveReservations() {
    localStorage.setItem('qreserve_reservations', JSON.stringify(reservations));
    console.log('Reservations saved to local storage:', reservations);
}

// Function to save the current promotions array to Local Storage
function savePromotions() {
    localStorage.setItem('qreserve_promotions', JSON.stringify(promotions));
    console.log('Promotions saved to local storage:', promotions);
}



// Function to retrieve promotions
function getPromotions() {
    return promotions;
}

// --- Global Role Management Functions ---
// Function to get the current role from Local Storage (Default is 'public')
function getCurrentRole() {
    const user = getLoggedInUser();
    // CRITICAL FIX: Check if the user object exists AND if the role property exists
    // We trim and lowercase it defensively, but ensure it's not null/undefined first.
    if (user && user.role && typeof user.role === 'string') {
        return user.role.toLowerCase().trim();
    }
    
    return 'public'; // Default to public if not logged in or role is missing
}

// Function to set the user role
function setRole(role) {
    localStorage.setItem('qreserve_user_role', role);
}

// Function to handle logout
function logout() {
    // --- CRITICAL FIXES: Remove OLD keys and add the NEW key ---
    
    // 1. Remove the NEW master authentication object
    localStorage.removeItem('loggedInUser'); 
    
    // 2. Remove the OLD, now deprecated keys (just in case they were used elsewhere)
    localStorage.removeItem('qreserve_user_role');
    localStorage.removeItem('qreserve_logged_user_email'); 
    
    // --- Clear session storage for reservations (Keep this) ---
    sessionStorage.removeItem('selectedServiceId');
    sessionStorage.removeItem('selectedServiceName');
    sessionStorage.removeItem('selectedServicePrice');

    alert('Logged out successfully!');
    window.location.href = 'index.html'; // Redirect to home page
}

// --- NEW AUTHENTICATION FUNCTIONS (DFD 1.0) ---

// --- NEW API-BASED REGISTRATION FUNCTION ---
async function registerUser(event) {
    event.preventDefault();

    const firstName = document.getElementById('registerFirstName').value.trim();
    // Your DB has 'middle_name', not 'middleInitial', so we pass it as middle_name
    const middle_name = document.getElementById('registerMiddleInitial').value.trim() || ''; 
    const lastName = document.getElementById('registerLastName').value.trim();
    const phone = document.getElementById('registerContactNumber').value.trim(); // Your DB uses 'phone'
    const email = document.getElementById('registerEmail').value.toLowerCase().trim();
    const password = document.getElementById('registerPassword').value;

    const userData = { first_name: firstName, middle_name, last_name: lastName, email, phone, password };

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(`Registration Failed: ${data.message}`);
            return;
        }

        // SUCCESSFUL REGISTRATION: Log the user in immediately (optional but convenient)
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));

        alert(`Registration successful! Welcome, ${firstName}. Redirecting to profile...`);
        window.location.href = 'profile.html';

    } catch (error) {
        console.error('Network or server connection error during registration:', error);
        alert('An error occurred during registration. Please check the server connection.');
    }
}



// --- Function to handle the login process (UPDATED IDs) ---
async function loginUser(event) {
    event.preventDefault(); // Stop the default form submission

    // 🚨 FIX APPLIED: Using IDs from your login.html
    const emailInput = document.getElementById('loginEmail'); 
    const passwordInput = document.getElementById('loginPassword');
    
    const email = emailInput ? emailInput.value : '';
    const password = passwordInput ? passwordInput.value : '';

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }), 
        });

        const data = await response.json();

        if (!response.ok) {
            alert(`Login Failed: ${data.message}`);
            return;
        }

        // --- SUCCESSFUL LOGIN ---

        // 1. Store the user object in localStorage (includes the critical 'role')
        localStorage.setItem('loggedInUser', JSON.stringify(data.user));

        // 2. Redirect based on the user's role (M1/A1 Logic)
        if (data.user.role === 'Admin' || data.user.role === 'Manager') {
            alert(`Welcome back, ${data.user.role}! Redirecting to Admin Dashboard.`);
            // Redirects to the Admin Dashboard page you specified
            window.location.href = 'admin-dashboard.html'; 
        } else {
            alert('Login successful! Redirecting to profile.');
            // Standard Customer login
            window.location.href = 'profile.html';
        }

    } catch (error) {
        console.error('Network or server connection error:', error);
        alert('An error occurred during login. Please check the server connection.');
    }
}


// --- END NEW AUTHENTICATION FUNCTIONS ---


// --- DFD 2.0 Manage Profile Functions ---

/**
 * Retrieves the currently logged-in user object from local storage.
 * This object is placed by the API-based login/register functions.
 * @returns {object|null} The user object or null if not found.
 */
function getLoggedInUser() {
    const userJson = localStorage.getItem('loggedInUser');
    if (!userJson) {
        return null;
    }
    // Parse the stored JSON object, which includes role, email, etc.
    return JSON.parse(userJson);
}

/**
 * Renders the logged-in user's personal details on profile.html.
 */
function renderProfileDetails() {
    const user = getLoggedInUser();

    if (!user) {
        // ... (existing redirect logic to login.html)
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
    // 💡 FIX 1: Use first_name and last_name from the API object
    const fullName = `${user.first_name} ${user.last_name}`;
    document.getElementById('profile-name').textContent = fullName;
    
    document.getElementById('profile-email').textContent = user.email;

    // 💡 FIX 2: Use 'phone' from the API object
    document.getElementById('profile-contact').textContent = user.phone || 'N/A';
    
    // Assuming the user object has a 'role' property (e.g., 'Customer')
    const roleName = user.role || 'Customer'; // Provide 'Customer' as a fallback
    
    const rawRole = user.role; 

    if (rawRole) {
        // Capitalize the first letter (e.g., 'customer' -> 'Customer')
        const formattedRole = rawRole.charAt(0).toUpperCase() + rawRole.slice(1);
        document.getElementById('profile-role').textContent = formattedRole;
    } else {
        // Fallback if somehow the role is missing (shouldn't happen now)
        document.getElementById('profile-role').textContent = 'Role Not Found';
    }
}


/**
 * Renders the logged-in user's reservation history by fetching data from the API.
 * CRITICAL: Requires a GET endpoint (e.g., /api/reservations/user/:email) on the backend.
 */
async function renderUserReservations() {
    const user = getLoggedInUser();
    const list = document.getElementById('user-reservations-list');

    if (!list || !user) {
        return; // Exit if not on the profile page or if user is not logged in
    }

    // Display a loading message while waiting for the API call
    list.innerHTML = '<tr><td colspan="5" style="text-align: center;">Loading reservation history...</td></tr>';
    
    // CRITICAL: Construct the API URL using the logged-in user's email
    const userEmail = user.email;
    const apiUrl = `http://localhost:3000/api/reservations/user/${encodeURIComponent(userEmail)}`;

    try {
        const response = await fetch(apiUrl); // Fetch data from the new GET API

        if (!response.ok) {
            throw new Error(`Failed to fetch reservations: Server responded with status ${response.status}`);
        }

        const userReservations = await response.json(); // Get the JSON array
        list.innerHTML = ''; // Clear the 'Loading' message

        if (userReservations.length === 0) {
            list.innerHTML = '<tr><td colspan="5" style="text-align: center;">You have no reservations on record.</td></tr>';
            return;
        }

        // Render the fetched data
        userReservations.reverse().forEach(res => { // Reverse to show newest first
            const row = document.createElement('tr');
            
            let statusClass = 'status-pending';
            if (res.status === 'confirmed') {
                statusClass = 'status-confirmed';
            } else if (res.status === 'completed') {
                statusClass = 'status-completed';
            } else if (res.status === 'cancelled') {
                statusClass = 'status-cancelled';
            }

            row.innerHTML = `
                <td>${res._id.substring(0, 8) || 'N/A'}</td> 
                <td>${res.serviceType}</td>
                <td>${new Date(res.check_in).toLocaleDateString()}</td>
                <td>₱${res.finalTotal.toFixed(2)}</td>
                <td><span class="${statusClass}">${res.status.toUpperCase()}</span></td>
            `;
            list.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching user reservations:', error);
        list.innerHTML = '<tr><td colspan="5" style="color: red; text-align: center;">Error loading reservations. Please check your Node.js API console.</td></tr>';
    }
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


// script.js - Updated function to fetch users from the API and render the table
async function renderUsersList() {
    const userTableBody = document.getElementById('users-table-body');
    if (!userTableBody) return;

    userTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Fetching users from API...</td></tr>';
    
    try {
        const response = await fetch('http://localhost:3000/api/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}. Could not fetch user list.`);
        }
        
        const users = await response.json(); 
        
        // This is a temporary structure because the list only contains role_id
        // We will need a way to map role_id to role name later, but for now, 
        // this confirms data fetching works.
        const roleMapping = {
            // Add your role IDs here later (e.g., '655a...' : 'Admin')
        };
        
        userTableBody.innerHTML = ''; // Clear the loading message

        users.forEach(user => {
            const row = userTableBody.insertRow();
            
            // Display User Data
            row.insertCell().textContent = user._id; // Display the MongoDB ID temporarily
            row.insertCell().textContent = user.first_name + ' ' + user.last_name;
            row.insertCell().textContent = user.email;
            row.insertCell().textContent = user.phone || 'N/A';
            
            // For now, display the role_id directly from the database
            row.insertCell().textContent = user.role_id; 

            // Add Actions Cell
            const actionsCell = row.insertCell();
            actionsCell.innerHTML = `
                <button class="button-small button-secondary" onclick="changeUserRole('${user._id}', 'Admin')">Promote</button>
                <button class="button-small button-danger" onclick="deleteUser('${user._id}')">Delete</button>
            `;
        });

    } catch (error) {
        console.error("Error loading user list:", error);
        userTableBody.innerHTML = `<tr><td colspan="6" style="color: red; text-align: center;">Error loading users: ${error.message}</td></tr>`;
    }
}

// script.js - Function to change a user's role via API
async function changeUserRole(userId, newRoleName) {
    if (!confirm(`Are you sure you want to change this user's role to ${newRoleName}? This action is immediate.`)) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // Future: Add Authorization header here
            },
            body: JSON.stringify({ newRoleName })
        });

        if (!response.ok) {
            // Read error message from server if available
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update user role.');
        }

        const result = await response.json();
        alert(result.message);
        
        // CRITICAL: Refresh the user list table to show the new role
        renderUsersList(); 

    } catch (error) {
        console.error('Failed to change role:', error);
        alert(`Error: Could not change user role. ${error.message}`);
    }
}

// script.js - Function to delete a user via API
async function deleteUser(userId) {
    if (!confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                // Future: Add Authorization header here
            }
        });

        if (!response.ok) {
            // Attempt to read the error message from the server response
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to delete user.');
        }

        const result = await response.json();
        alert(result.message);
        
        // CRITICAL: Refresh the user list table to reflect the change
        renderUsersList(); 

    } catch (error) {
        console.error('Failed to delete user:', error);
        alert(`Error: Could not delete user. ${error.message}`);
    }
}

/**
 * Fetches all reservations with 'Paid' status and renders them on the Admin Dashboard.
 * NOTE: This requires a new backend API route /api/reservations/pending
 */
async function renderAdminReservations() {
    const list = document.getElementById('admin-reservations-list');

    // Important: We should also check the user role here to prevent public access.
    const userRole = getCurrentRole();
    if (userRole !== 'admin' && userRole !== 'manager') {
        if (list) {
            list.innerHTML = '<tr><td colspan="7" style="text-align: center; color: red;">ACCESS DENIED: Insufficient permissions.</td></tr>';
        }
        return;
    }

    if (!list) return;

    list.innerHTML = '<tr><td colspan="7" style="text-align: center;">Loading pending reservations...</td></tr>';
    
    // CRITICAL: New API endpoint to fetch all PENDING reservations
    const apiUrl = 'http://localhost:3000/api/reservations/pending'; 

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch admin reservations: Status ${response.status}`);
        }

        const reservations = await response.json();
        list.innerHTML = ''; // Clear loading message

        if (reservations.length === 0) {
            list.innerHTML = '<tr><td colspan="7" style="text-align: center;">No new paid reservations currently pending review.</td></tr>';
            return;
        }

        // Render the fetched data
        reservations.forEach(res => {
            const row = document.createElement('tr');
            
            // Highlight rows based on payment reference number availability
            const refNumberDisplay = res.gcashReferenceNumber ? res.gcashReferenceNumber : 'MISSING';
            const rowClass = res.gcashReferenceNumber ? '' : 'bg-red-100'; // Highlight if reference is missing

            row.innerHTML = `
                <tr class="${rowClass}">
                    <td>${res._id.substring(0, 8)}...</td> <td>${res.email}</td>
                    <td>${res.serviceType}</td>
                    <td>${new Date(res.check_in).toLocaleDateString()}</td>
                    <td>₱${res.finalTotal.toFixed(2)}</td>
                    <td>${refNumberDisplay}</td>
                    <td>
                        <button 
                            class="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded text-sm"
                            onclick="confirmReservation('${res._id}')"
                            >Confirm</button>
                        <button 
                            class="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded text-sm ml-1"
                            onclick="cancelReservation('${res._id}')"
                            >Cancel</button>
                    </td>
                </tr>
            `;
            list.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching admin reservations:', error);
        list.innerHTML = '<tr><td colspan="7" style="color: red; text-align: center;">Error: Could not connect to Admin API.</td></tr>';
    }
}

/**
 * Placeholder function for confirming a reservation status (Pending -> Confirmed).
 * We will fully implement the API call here in the next step.
 * @param {string} reservationId - The ID (_id) of the reservation to confirm.
 */
function confirmReservation(reservationId) {
    // We will implement the PUT API call here next!
    console.log('Attempting to confirm reservation:', reservationId);
    alert(`Confirmation feature coming soon for reservation ID: ${reservationId}.`);
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
        { text: 'Check-in Demo', href: 'checkin-demo.html' }
    ],
    admin: [
        { text: 'Reserve Now', href: 'services-list.html'},
        { text: 'Admin Dashboard', href: 'admin-dashboard.html' },
        { text: 'Promotions', href: 'promotions.html' }
    ]
};
window.changeUserRole = changeUserRole;

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

// --- NEW SERVICE SELECTION FUNCTIONS (For service-list.html) ---

let currentSelectedServiceId = null;

/**
 * Updates the existing Booking Summary Sidebar on service-list.html
 * to reflect the selected service.
 * @param {object} service - The selected service object.
 */
function updateBookingSummaryDisplay(service) {
    const sidebar = document.getElementById('booking-summary-sidebar');
    const roomDisplay = document.getElementById('summary-room');
    const priceDisplay = document.getElementById('summary-price');
    const proceedButton = document.getElementById('sidebar-proceed-button');

    if (!sidebar || !roomDisplay || !priceDisplay || !proceedButton) return;

    // 1. Update the Selected Room Name
    roomDisplay.textContent = service.name;

    // 2. Update the Total Price
    priceDisplay.textContent = `P${service.price.toFixed(2)}`;

    // 3. Update the Proceed Button (Enable it and set the action)
    proceedButton.classList.remove('disabled');
    proceedButton.href = '#'; // Remove temporary placeholder link
    proceedButton.onclick = () => {
        selectServiceAndRedirect(service); // Use the existing redirect function
        return false; // Prevent default link behavior
    };
    proceedButton.textContent = 'Continue Booking';

    // NOTE: Since the sidebar is sticky, we don't need to manually set display: block,
    // but the original logic can be modified to make it visible if it were initially hidden.
    // For now, we assume the sidebar is always visible, just with placeholder content.
}


/**
 * Renders the list of service cards onto the service-list.html page.
 */
function renderServiceCards() {
    const container = document.getElementById('service-cards-container');
    if (!container) return; // Only run on service-list.html

    container.innerHTML = ''; // Clear existing content

    // We use the globally defined resortServices
    resortServices.forEach(service => {
        const card = document.createElement('div');
        card.classList.add('service-card');
        card.setAttribute('data-service-id', service.id);

        card.innerHTML = `
            <img src="${service.image}" alt="${service.name}">
            <div class="card-content">
                <p class="price">P${service.price.toFixed(2)}</p>
                <h3>${service.name}</h3>
                <p>${service.description.substring(0, 70)}...</p>
            </div>
        `;

        // Attach the click event listener to show the modal
        card.addEventListener('click', () => {
            showServiceModal(service.id);
        });

        container.appendChild(card);
    });
}

/**
 * Shows the modal popup with service details.
 * @param {string} serviceId - The ID of the service to display.
 */
function showServiceModal(serviceId) {
    const service = resortServices.find(s => s.id === serviceId);
    const modal = document.getElementById('serviceModal');
    if (!service || !modal) return;

    currentSelectedServiceId = serviceId; // Save the ID globally

    // CRITICAL NEW STEP: Update the floating booking summary
    updateBookingSummaryDisplay(service);

    // Populate Modal Details
    document.getElementById('modal-name').textContent = service.name;
    document.getElementById('modal-price').textContent = `P${service.price.toFixed(2)}`;
    document.getElementById('modal-description').textContent = service.description;

    // Update the "Proceed" button link
    const proceedButton = document.getElementById('modal-proceed-button');
    proceedButton.onclick = () => {
        selectServiceAndRedirect(service); // Pass the entire service object
    };

    // Show Modal
    modal.style.display = 'block';
}

/**
 * Saves the selected service to session storage and redirects to the reservation form.
 * @param {object} service - The selected service object.
 */
function selectServiceAndRedirect(service) {
    // Save the selected service details to sessionStorage
    sessionStorage.setItem('selectedServiceId', service.id);
    sessionStorage.setItem('selectedServiceName', service.name);
    sessionStorage.setItem('selectedServicePrice', service.price);

    // Redirect to the reservation page
    window.location.href = 'reserve.html';
}

// Close the modal when the close button or background is clicked (for service-list.html)
const modal = document.getElementById('serviceModal');
const closeButton = document.querySelector('.close-button');
const summaryContainer = document.getElementById('floating-booking-summary'); // Added for cleanup

if (modal && closeButton) {
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function renderServiceSelectionSummary() {
    // Look up the service details and display them on reserve.html
    const serviceName = sessionStorage.getItem('selectedServiceName');
    const servicePrice = sessionStorage.getItem('selectedServicePrice');
    
    // Check if the HTML elements exist before setting content
    const serviceDisplay = document.getElementById('selectedServiceDisplay');
    const basePriceDisplay = document.getElementById('basePriceDisplay');

    if (serviceDisplay) {
        serviceDisplay.textContent = serviceName || '(No Service Selected)';
    }
    // Initialize price displays to the base price
    if (basePriceDisplay) {
        basePriceDisplay.textContent = parseFloat(servicePrice || 0).toFixed(2);
    }
    
    // Also initialize the final total to the base price
    const finalTotalDisplay = document.getElementById('finalTotalDisplay');
    if (finalTotalDisplay) {
        finalTotalDisplay.textContent = parseFloat(servicePrice || 0).toFixed(2);
    }
    // Set discount to 0.00 on load
    const discountDisplay = document.getElementById('discountDisplay');
    if (discountDisplay) {
        discountDisplay.textContent = '0.00';
    }

    // Call calculateFinalPrice to immediately set up the price fields
    if(servicePrice) {
        calculateFinalPrice(parseFloat(servicePrice));
    }
}
// --- END NEW SERVICE SELECTION FUNCTIONS ---


// --- NEW PROMOTION CALCULATION FUNCTION ---

async function createPromoCode(event) {
    event.preventDefault(); // Stop the form from submitting traditionally

    // ✅ IDs MATCHING admin-dashboard.html
    const code = document.getElementById('promoCodeInput').value.trim();
    const discountPercentage = parseFloat(document.getElementById('discountPercentageInput').value);
    const expirationDate = document.getElementById('expirationDateInput').value;
    const minPurchaseAmount = parseFloat(document.getElementById('minPurchaseAmountInput').value) || 0;
    const usageLimit = parseInt(document.getElementById('usageLimitInput').value) || 50;

    const promoData = {
        code,
        // Convert the input percentage (e.g., 15) to a decimal (0.15) for your Mongoose schema
        discountPercentage: discountPercentage / 100, 
        expirationDate,
        minPurchaseAmount,
        usageLimit,
    };
    
    // Simple validation before sending to server
    if (!code || isNaN(discountPercentage) || !expirationDate) {
        alert('Please fill in all required fields (Code, Discount, Expiration Date).');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/promocodes/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(promoData),
        });

        const data = await response.json();
        
        if (!response.ok) {
            alert(`Creation Failed: ${data.message || 'Unknown server error.'}`);
            return;
        }

        // Success
        alert(`Promo code ${data.code.code} successfully created!`);
        document.getElementById('createPromoCodeForm').reset(); // Reset form using the correct ID
        
        // Ensure this function exists in script.js to refresh the table
        if (typeof renderPromoCodeTable === 'function') {
            renderPromoCodeTable(); 
        }

    } catch (error) {
        console.error('Network or server connection error during promo code creation:', error);
        alert('Network error. Could not connect to server. Check if your Node.js server is running.');
    }
}

// --- 2. FUNCTION TO FETCH AND RENDER PROMO CODES ---

/**
 * Fetches all promo codes from the API and renders them into the admin dashboard table.
 */
async function renderPromoCodeTable() {
    const tableBody = document.getElementById('promoCodeTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '<tr><td colspan="6" class="text-center">Loading promo codes...</td></tr>';

    try {
        const response = await fetch('http://localhost:3000/api/promocodes/all'); // Call the GET route
        if (!response.ok) {
            throw new Error('Server error fetching promo codes.');
        }

        const codes = await response.json();
        tableBody.innerHTML = ''; // Clear loading message

        if (codes.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="6" class="text-center">No promo codes found.</td></tr>';
            return;
        }

        codes.forEach(code => {
            const now = new Date();
            const expiration = new Date(code.expirationDate);
            const isExpired = expiration < now;
            const isFullyUsed = code.timesUsed >= code.usageLimit;

            let statusText = 'Active';
            let statusClass = 'text-success'; // Green

            if (isExpired) {
                statusText = 'Expired';
                statusClass = 'text-danger'; // Red
            } else if (isFullyUsed) {
                statusText = 'Used Up';
                statusClass = 'text-warning'; // Yellow/Orange
            }

            const row = tableBody.insertRow();
            row.innerHTML = `
                <td><strong>${code.code}</strong></td>
                <td>${(code.discountPercentage * 100).toFixed(0)}% OFF</td>
                <td>${expiration.toLocaleDateString()}</td>
                <td>₱${code.minPurchaseAmount.toFixed(2)}</td>
                <td>${code.timesUsed} / ${code.usageLimit}</td>
                <td class="${statusClass}"><strong>${statusText}</strong></td>
            `;
        });

    } catch (error) {
        console.error('Network Error during fetching codes:', error);
        tableBody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Network Error: Cannot load data. (Is Node.js running?)</td></tr>';
    }
}

/**
 * Fetches a single promo code from the API and checks its validity.
 * @param {string} code - The promo code string to check.
 * @returns {object|null} The valid promo object or null if invalid/not found.
 */
async function getValidPromoCode(code) {
    if (!code || code.length < 3) {
        document.getElementById('promoCodeMessage').textContent = '';
        document.getElementById('promoCodeMessage').style.color = 'inherit'; // Reset color too
        return null; 
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/promocodes/${encodeURIComponent(code)}`);
        
        if (!response.ok) {
            // This captures 404 Not Found or other server errors (e.g., code expired/used up)
            // The backend should send a helpful message via the JSON response.
            const errorData = await response.json();
            console.warn("Promo Code Check Failed:", errorData.message);
            // Update the UI message if available (assuming an ID of 'promoCodeMessage' exists on reserve.html)
            document.getElementById('promoCodeMessage').textContent = `Invalid: ${errorData.message}`;
            document.getElementById('promoCodeMessage').style.color = 'red';
            return null;
        }

        const promoCode = await response.json();
        
        // Success: Clear any error message and show success
        document.getElementById('promoCodeMessage').textContent = 
            `Code Applied! You receive ${(promoCode.discountPercentage * 100).toFixed(0)}% OFF.`;
        document.getElementById('promoCodeMessage').style.color = 'green';
        
        return promoCode;

    } catch (error) {
        console.error('Network error during promo code lookup:', error);
        document.getElementById('promoCodeMessage').textContent = 'Network Error. Could not verify code.';
        document.getElementById('promoCodeMessage').style.color = 'red';
        return null;
    }
}

// Function to update the final total based on applied promo code
async function calculateFinalPrice(basePrice) {
    const promoCodeInput = document.getElementById('promoCodeInput');
    const finalTotalDisplay = document.getElementById('finalTotalDisplay');
    const discountDisplay = document.getElementById('discountDisplay');

    let finalTotal = basePrice;
    let discountValue = 0;
    let appliedPromo = null;

    if (promoCodeInput && promoCodeInput.value) {
        // 1. Check the code's validity using the new API function
        const promoCodeObject = await getValidPromoCode(promoCodeInput.value.trim());

        if (promoCodeObject) {
            // 2. Check Min Purchase Amount
            if (basePrice < promoCodeObject.minPurchaseAmount) {
                const required = promoCodeObject.minPurchaseAmount.toFixed(2);
                document.getElementById('promoCodeMessage').textContent = 
                    `Invalid: Minimum purchase of ₱${required} required.`;
                document.getElementById('promoCodeMessage').style.color = 'orange';
                // Code is valid but not applicable, treat as no discount
            } else {
                // 3. Apply the discount
                discountValue = basePrice * promoCodeObject.discountPercentage;
                finalTotal = basePrice - discountValue;
                appliedPromo = promoCodeObject; // Store the valid object
            }
        }
    } else {
        // If the promo input is empty, clear any message
        document.getElementById('promoCodeMessage').textContent = '';
        document.getElementById('promoCodeMessage').style.color = 'inherit';
    }

    // 4. Update the UI
    if (discountDisplay) {
        discountDisplay.textContent = `- ₱${discountValue.toFixed(2)}`;
    }
    if (finalTotalDisplay) {
        finalTotalDisplay.textContent = `₱${finalTotal.toFixed(2)}`;
    }

    // 5. CRITICAL: Save the results to sessionStorage for use in submitReservation
    sessionStorage.setItem('finalTotal', finalTotal.toFixed(2));
    sessionStorage.setItem('discountValue', discountValue.toFixed(2));
    // Save the applied promo code (or null) to persist it for the API call
    sessionStorage.setItem('appliedPromoCode', appliedPromo ? JSON.stringify(appliedPromo) : null);
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
// Ensure this runs when the promotions.html loa

// --- DFD 10.0 Reservation Submission Logic (UPDATED for Payment Split) ---

/**
 * Handles the submission of the reservation form (on reserve.html).
 * This function no longer calls the API directly. It stores the reservation 
 * details in Session Storage and redirects the user to payment.html.
 */
async function submitReservation(event) {
    event.preventDefault(); // Stop the form from submitting normally
    
    // 1. Get Logged-in User and Selected Service Data
    const user = getLoggedInUser();
    if (!user) {
        alert('You must be logged in to make a reservation.');
        window.location.href = 'login.html';
        return;
    }

    const finalServiceId = sessionStorage.getItem('selectedServiceId');
    const finalServiceName = sessionStorage.getItem('selectedServiceName');
    const finalBasePrice = parseFloat(sessionStorage.getItem('selectedServicePrice')) || 0;

    if (!finalServiceId || isNaN(finalBasePrice)) {
        alert('Service information is missing. Please select a service again.');
        window.location.href = 'services-list.html';
        return;
    }
    
    // 2. Gather form inputs
    const checkInDateInput = document.getElementById('checkin');
    const checkOutDateInput = document.getElementById('checkout');
    const numberOfGuestsInput = document.getElementById('guests');
    const promoCodeInput = document.getElementById('promoCodeInput');

    // Convert input values to Date objects for comparison
    const checkInDate = new Date(checkInDateInput.value);
    const checkOutDate = new Date(checkOutDateInput.value);
    const now = new Date();

    // Reset time for comparison, only comparing the date part
    now.setHours(0, 0, 0, 0); 
    checkInDate.setHours(0, 0, 0, 0); 
    
    // Check 1: Is Check-in in the past?
    if (checkInDate.getTime() < now.getTime()) {
        alert("The check-in date cannot be in the past. Please select a future date.");
        checkInDateInput.focus(); // Focus on the invalid field
        return; // Stop the function
    }

    // Check 2: Is Check-out before Check-in?
    if (checkOutDate.getTime() <= checkInDate.getTime()) {
        alert("The check-out date must be after the check-in date.");
        checkOutDateInput.focus(); // Focus on the invalid field
        return; // Stop the function
    }

    // 3. Simple Client-Side Validation
    if (!checkInDateInput.value || !checkOutDateInput.value || !numberOfGuestsInput.value) {
        alert('Please fill out all required fields: Check-in, Check-out, and Number of Guests.');
        return;
    }
    
    // --- 4. CRITICAL UPDATE: Calculate Final Price Asynchronously ---
    
    // 4A. Call the ASYNC pricing function to ensure it runs the API check 
    await calculateFinalPrice(finalBasePrice);

    // 4B. Retrieve the final, calculated values from Session Storage
    const finalTotal = parseFloat(sessionStorage.getItem('finalTotal'));
    const discountValue = parseFloat(sessionStorage.getItem('discountValue'));
    const appliedPromoCodeJson = sessionStorage.getItem('appliedPromoCode');
    const promoCodeUsed = 
        appliedPromoCodeJson && appliedPromoCodeJson !== 'null' 
        ? JSON.parse(appliedPromoCodeJson).code 
        : null;

    if (isNaN(finalTotal)) {
        alert('Could not calculate final price. Please try again.');
        return;
    }

    // 5. Prepare the complete reservation object (State)
    const reservationData = {
        // --- CRITICAL FIXES: Use the names the Mongoose Schema requires ---
        email: user.email, // Use 'email' as the canonical name
        full_name: `${user.first_name} ${user.last_name}`, // COMBINE FIRST AND LAST NAME
        phone: user.phone || 'N/A', // Use 'phone' instead of 'contactNumber'
        serviceType: finalServiceName, // The service name acts as the serviceType
        // -----------------------------------------------------------------
        
        serviceId: finalServiceId,
        check_in: checkInDateInput.value,
        check_out: checkOutDateInput.value,
        guests: parseInt(numberOfGuestsInput.value),
        
        basePrice: finalBasePrice,
        finalTotal: finalTotal,
        discountValue: discountValue,
        promoCodeUsed: promoCodeUsed, 
    };

    // 6. Store the complete state in Session Storage
    sessionStorage.setItem('tempReservationData', JSON.stringify(reservationData));

    // 7. Success: Redirect to the payment page
    alert('Reservation details saved. Redirecting to payment...');
    window.location.href = 'payment.html'; 
}

// --- END DFD 10.0 Reservation Submission Logic ---

// --- DFD 17.0 Payment Processing Functions (GCash) ---

/**
 * Loads the temporary reservation data and displays a summary on the payment.html page.
 * Includes a safety check to ensure data exists before displaying.
 */
function displayPaymentSummary() {
    // 1. Retrieve the NECESSARY data keys
    const finalTotal = sessionStorage.getItem('finalTotal');
    const serviceName = sessionStorage.getItem('selectedServiceName');
    const reservationDataJSON = sessionStorage.getItem('tempReservationData'); // <-- CRITICAL: Get the full data object!
    
    // Attempt to parse the full data object
    let reservationData = null;
    if (reservationDataJSON) {
        try {
            reservationData = JSON.parse(reservationDataJSON);
        } catch (e) {
            console.error('Error parsing tempReservationData:', e);
        }
    }

    // Refined Check: If we ARE on the payment page AND CRITICAL data is missing, redirect.
    const onPaymentPage = window.location.pathname.includes('payment.html');
    if (onPaymentPage && (!finalTotal || !serviceName || !reservationData)) {
        alert('Missing reservation details. Returning to reservation page.');
        window.location.href = 'reserve.html';
        return;
    } else if (!onPaymentPage) {
        // If we're not on the payment page, just exit cleanly.
        return;
    }

    // 2. Locate Display Elements (Ensure your HTML IDs match these names)
    const summaryServiceName = document.getElementById('serviceNameDisplay');
    const summaryCustomerName = document.getElementById('summaryCustomerName'); // <-- Must be present in payment.html
    const summaryFinalTotal = document.getElementById('paymentAmount');
    const formattedPrice = `₱${parseFloat(finalTotal).toFixed(2)}`;

    // 3. Display the data
    
    if (summaryServiceName) {
        summaryServiceName.textContent = serviceName;
    }
    
    // CRITICAL FIX: Concatenate firstName and lastName
    if (summaryCustomerName && reservationData && reservationData.firstName && reservationData.lastName) {
        // Combine the separate names for display
        summaryCustomerName.textContent = `${reservationData.firstName} ${reservationData.lastName}`;
    } else if (summaryCustomerName) {
        // Fallback if names are missing but data is present
        summaryCustomerName.textContent = 'Customer Data Missing';
    }

    if (summaryFinalTotal) {
        summaryFinalTotal.textContent = formattedPrice;
    }
    
    // NOTE: You can remove the 'paymentAmount' and 'paymentAmountSmall' 
    // variables/logic unless you are using those specific IDs in your payment.html.
    // I've standardized on the IDs used in your previous HTML review (e.g., summaryFinalTotal).
}


/**
 * Handles the submission of the reservation details along with GCash payment data.
 * This runs on the submission of the payment form on payment.html and calls the API.
 */
async function processGCashPayment(event) {
    event.preventDefault();

    // 1. Retrieve Data from Session Storage and Form
    const storedReservationDataString = sessionStorage.getItem('tempReservationData'); // STRING
    const finalTotalString = sessionStorage.getItem('finalTotal');
    const appliedPromoCode = sessionStorage.getItem('appliedPromoCode'); // JSON string or null

    // Get GCash Reference Number from the form input
    const gcashReferenceNumber = document.getElementById('gcashReferenceNumber').value.trim();

    // --- 1. VALIDATION CHECK BLOCK ---
    if (!storedReservationDataString || !finalTotalString || !gcashReferenceNumber || gcashReferenceNumber.length < 10) {
        alert('Missing critical data. Please ensure all fields are correctly filled and reservation data is present.');
        if (!storedReservationDataString) {
             window.location.href = 'reserve.html'; // Redirect if core data is missing
        }
        return;
    }
    // --------------------------------------------------

    // Parse the core reservation data once
    let coreReservationData;
    try {
        coreReservationData = JSON.parse(storedReservationDataString);
    } catch (e) {
        console.error('Failed to parse reservation data:', e);
        alert('Internal error processing reservation data. Please try again.');
        return;
    }

    // 2. Build the Final Payload (Must include ALL required fields from the Mongoose Schema)
    const finalPayload = {
        // **CRITICAL FIX:** Include all fields from the stored data
        ...coreReservationData, 

        // Overwrite or ensure payment-specific fields are correct
        finalTotal: parseFloat(finalTotalString),
        paymentMethod: 'GCash',
        gcashReferenceNumber,
        
        // Include promo code data if available
        appliedPromoCode: appliedPromoCode || null 
        
        // Note: The fields the server requested (full_name, email, phone, etc.) 
        // MUST BE present inside the 'coreReservationData' object 
        // that was originally saved to 'tempReservationData'.
    };

    // 3. Send the complete data to the API to finalize the reservation
    try {
        const response = await fetch('http://localhost:3000/api/reservations/finalize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalPayload),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(`Reservation Failed: ${data.message || 'An error occurred during finalization.'}`);
            console.error('Server error details:', data); // Log server details
            return;
        }

        // 4. Success! Clear temp storage and redirect to confirmation page
        sessionStorage.removeItem('tempReservationData');
        sessionStorage.removeItem('finalTotal');
        sessionStorage.removeItem('appliedPromoCode'); // Clear this one too
        
        // Clean up other service-related items
        sessionStorage.removeItem('selectedServiceId');
        sessionStorage.removeItem('selectedServiceName');
        sessionStorage.removeItem('selectedServicePrice');
        
        alert('Payment confirmed! Your reservation is now pending and will be reviewed shortly.');
        
        // Assuming your backend returns the new reservation ID in data.reservationId
        window.location.href = 'confirmation.html?id=' + data.reservationId; 

    } catch (error) {
        console.error('Network or server connection error during payment finalization:', error);
        alert('A network error occurred. Please try submitting the payment again.');
    }
}
// --- END DFD 17.0 Payment Processing Functions ---

// --- DOMContentLoaded Listener for dynamic logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Call functions that run on all pages
    renderNavigation();

    // Logic specific to service-list.html
    const serviceListContainer = document.getElementById('service-cards-container');
    if (serviceListContainer) {
        renderServiceCards();
    }

    // Logic specific to profile.html
    if (window.location.pathname.includes('profile.html')) {
        renderProfileDetails();
        renderUserReservations();
    }

    // 3. Admin Dashboard only (CRITICAL)
    if (document.getElementById('users-table-body')) { // Checking for the element you just added
        renderUsersList(); // <--- Is this call present?
    }

    if (window.location.pathname.includes('admin-dashboard.html')) {
        console.log('Admin Dashboard detected. Starting data fetches...');
        
        // 1. Fetch PENDING RESERVATIONS (The one we're debugging)
        if (typeof renderAdminReservations === 'function') {
            renderAdminReservations();
        }

        // 2. Fetch USER LIST (The one you saw running)
        if (typeof renderUsersList === 'function') {
            renderUsersList();
        }
        
        // 3. Fetch PROMO CODES (The one you saw running)
        if (typeof renderPromoCodeTable === 'function') {
            renderPromoCodeTable();
        }
    }

    // Logic specific to promotions.html
    if (window.location.pathname.includes('promotions.html')) {
        renderPublicPromotions();
    }

    // Logic specific to login.html
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }

    // Logic specific to register.html
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }


    const createForm = document.getElementById('createPromoCodeForm');
    const promoCodesTab = document.getElementById('nav-promocodes-tab');

    if (createForm) {
        // 1. Listener for creating a new promo code (Working)
        createForm.addEventListener('submit', createPromoCode);
    }

    // 2. Initial Page Load (Recommended)
    // Call the render function right away to load the table content when the page opens.
    // This is necessary if the promo codes section is visible immediately.
    if (document.getElementById('promoCodeTableBody')) {
        renderPromoCodeTable(); 
    }

    // 3. Listener for the tab click (Fix: Use the correct function name)
    if (promoCodesTab) {
        // If the Admin Dashboard uses tabs, reload the data every time the tab is clicked.
        promoCodesTab.addEventListener('click', renderPromoCodeTable);
    }
    
    // --- Reservation Page Logic (reserve.html) ---
if (window.location.pathname.includes('reserve.html')) {

    // 1. CRITICAL: DEFINE THE BASE PRICE VARIABLE HERE!
    const finalBasePrice = parseFloat(sessionStorage.getItem('selectedServicePrice'));
    const finalServiceId = sessionStorage.getItem('selectedServiceId');
    const finalServiceName = sessionStorage.getItem('selectedServiceName');
    const form = document.getElementById('reservationForm'); // Get the form element

    // 2. CHECK FOR MISSING DATA (The logic from the old block, now using the defined variable)
    if (!finalServiceId || isNaN(finalBasePrice)) {
        alert('Please select a service before reserving.');
        // Use a short delay before redirecting to allow the alert to be seen
        setTimeout(() => {
            window.location.href = 'services-list.html';
        }, 50);
        return; // Stop execution if data is missing
    }

    // 3. DISPLAY SERVICE SUMMARY (Logic from the old block and the new function call)
    renderServiceSelectionSummary(); // This function should handle base price display

    // 4. ATTACH LISTENERS (Including the debounce logic)
    if (form) {
        // Attach the main form submission listener
        form.addEventListener('submit', submitReservation);

        // --- Debouncing and Promo Code Setup (The one we fixed earlier) ---

        // Create the debounced version
        const debouncedCalculatePrice = debounce(() => {
            calculateFinalPrice(finalBasePrice);
        }, 500); // Wait 0.5 seconds

        // Attach the debounced function to the input field
        document.getElementById('promoCodeInput')?.addEventListener('input', debouncedCalculatePrice);

        // Initial price calculation on load (since renderServiceSelectionSummary might call it, too, this ensures it runs)
        calculateFinalPrice(finalBasePrice); 
    }
}

    // --- Payment Page Logic (payment.html) ---
    if (window.location.pathname.includes('payment.html')) {
        // 1. Display the summary details
        displayPaymentSummary(); 
        
        // 2. Attach the listener for the GCash payment form
        const gcashForm = document.getElementById('gcashPaymentForm');
        if (gcashForm) {
            // Assuming your payment form has the ID 'gcashPaymentForm' 
            // and you have the function 'processGCashPayment' defined.
            gcashForm.addEventListener('submit', processGCashPayment); 
        }
    }

});
// --- END DOMContentLoaded Listener ---