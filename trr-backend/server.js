// Load environment variables from .env file
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose
const bcrypt = require('bcrypt'); // <-- NEW: Required for password comparison
const app = express();
const PORT = process.env.PORT || 3000; // Use port from environment or default to 3000
//const reservationRoutes = require('./routes/reservationRoutes'); // Import the router
// --- MIDDLEWARE ---

// Add CORS middleware before your routes or body parsers
app.use(cors()); // <--- ADD THIS LINE (2)


// Allows your Node.js server to parse JSON data from incoming requests (like reservation data)
app.use(express.json()); 



// --- DATABASE CONNECTION ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB is connected successfully!');

    // Start the server ONLY if the DB connection succeeds
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed:', error.message);
    // Exit process with failure code
    process.exit(1);
  }
};

// Execute the connection function
connectDB();

// Import the Reservation Model
const Reservation = require('./models/Reservation');
const Account = require('./models/Account'); // <-- NEW: Your Account model
const Role = require('./models/Role');     // <-- NEW: Your Role model
const reservationRoutes = require('./routes/reservationRoutes');
const promoCodeRoutes = require('./routes/promoCodeRoutes');
const blockedDateRoutes = require('./routes/blockedDateRoutes');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const path = require('path');
// Note the '..' path to go up one directory from trr-backend to new website
app.use(express.static(path.join(__dirname, '..'))); // <--- CORRECTED PATH!
require('./models/BlockedDate');
app.use('/api/auth', authRoutes);

// USE THE NEW PROMO CODE ROUTE
app.use('/api/promocodes', promoCodeRoutes);
app.use('/api/blocked-dates', blockedDateRoutes);

// Service management (all routes now use MongoDB database)
app.use('/api/services', serviceRoutes);

app.use('/api/reservations', reservationRoutes);

// --- ROUTES (API Endpoints) ---

// Basic test route (still works on /)
app.get('/', (req, res) => {
  res.send('Tito Renz Resort API is running!');
});

// POST /api/auth/login: Handles user login and role verification
app.post('/api/auth/login', async (req, res) => {
    // We expect 'email' and 'password' from the frontend login form
    const { email, password } = req.body;

    try {
        // 1. Find the user account by email, ensuring the stored password field is selected
        const account = await Account.findOne({ email }).select('+password');

        if (!account) {
            return res.status(401).json({ message: 'Authentication failed. Invalid credentials.' });
        }

        // 2. Compare the submitted password with the stored HASH
        const isMatch = await bcrypt.compare(password, account.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Authentication failed. Invalid credentials.' });
        }

        // 3. Look up the role name using the role_id (Foreign Key)
        const role = await Role.findById(account.role_id);
        const roleName = role ? role.role_name : 'Customer';

        // 4. Successful login: Return user info including their role
        // NOTE: In a production app, you would generate a JWT token here.
        res.json({ 
            message: 'Login successful', 
            user: {
                id: account._id,
                email: account.email,
                role: roleName,
                // 👇 Add the missing fields:
                first_name: account.first_name,
                last_name: account.last_name,
                phone: account.phone 
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});

// POST /api/auth/register: Handles new user registration (Customer Role)
app.post('/api/auth/register', async (req, res) => {
    // Collect all fields from the registration form
    const { first_name, middle_name, last_name, email, phone, password } = req.body;

    try {
        // 1. Check if the user already exists
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(409).json({ message: 'Registration failed. Email already in use.' });
        }

        // 2. Find the default Customer Role ID
        const customerRole = await Role.findOne({ role_name: 'Customer' });
        const roleName = customerRole.role_name; // 'Customer'

        if (!customerRole) {
             // This happens if you skipped Step 1 in the previous response
             return res.status(500).json({ message: 'Server configuration error: Customer role not found.' });
        }

        // 3. Create the new Account document
        const newUser = new Account({
            first_name,
            middle_name,
            last_name,
            email,
            phone,
            password, // Password will be automatically HASHED by the pre-save hook in Account.js
            role_id: customerRole._id, // Assign the default Customer role
        });

        // 4. Save the new account to the database
        await newUser.save();

        // 5. Success!
        // ✅ Corrected Registration Response (in server.js)
        res.status(201).json({ 
            message: 'User registered successfully', 
            user: {
                id: newUser._id,
                email: newUser.email,
                // 👇 FIX: Use the string name, not the undefined property 'newUser.role'
                role: roleName, 
                // 👇 The rest uses the saved newUser object fields:
                last_name: newUser.last_name,
                phone: newUser.phone 
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error during registration.', error: error.message });
    }
});

// GET /api/reservations/user/:email: Fetches all reservations for a specific user
app.get('/api/reservations/user/:email', async (req, res) => {
    try {
        // 1. Get the email parameter from the URL
        const userEmail = req.params.email;

        // 2. Find all reservations in MongoDB matching the user's email
        // We use .find() to get an array of reservations
        const userReservations = await Reservation.find({ email: userEmail })
            .sort({ reservationDate: -1 }); // Sort by newest first

        // 3. Send the array back to the client
        res.status(200).json(userReservations);

    } catch (error) {
        console.error('Failed to fetch user reservations:', error.message);
        res.status(500).json({
            message: 'Server error while fetching reservation history.',
            error: error.message
        });
    }
});

// server.js - New GET route for fetching all accounts
app.get('/api/users', async (req, res) => {
    // 💡 Security Note: In a real-world app, you would add middleware here
    // to verify the user making this request is authenticated and has an 'Admin' or 'Manager' role.

    try {
        // Find ALL users, but explicitly exclude the sensitive 'password' field.
        // We also want to select the role_id, which we will use to find the role name on the frontend
        const users = await Account.find().select('-password'); 
        
        res.status(200).json(users);
        
    } catch (error) {
        console.error('Failed to fetch user list:', error.message);
        res.status(500).json({ message: 'Server error fetching user data.' });
    }
});

// server.js - PUT route to update a user's role
app.put('/api/users/:id/role', async (req, res) => {
    const userId = req.params.id;
    // We expect the new role name (e.g., 'Admin', 'Customer') in the request body
    const { newRoleName } = req.body; 

    // Note: Future security check for 'Admin' role goes here.

    try {
        // 1. Find the new role's ID based on the name provided
        const role = await Role.findOne({ role_name: newRoleName });
        if (!role) {
            return res.status(404).json({ message: 'Target role not found.' });
        }

        // 2. Update the user's role_id in the Account collection
        const updatedUser = await Account.findByIdAndUpdate(
            userId,
            { role_id: role._id },
            { new: true, select: '-password' } // Return the updated document, excluding password
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 3. Success response
        res.json({ 
            message: `User ${updatedUser.email} role updated to ${newRoleName}.`, 
            user: updatedUser 
        });

    } catch (error) {
        console.error('Error changing user role:', error.message);
        res.status(500).json({ message: 'Server error during role update.' });
    }
});

// server.js - New DELETE route to remove a user account
app.delete('/api/users/:id', async (req, res) => {
    const userId = req.params.id;
    
    // 💡 Security: Admin role check should go here.

    try {
        // 1. Find and remove the user by ID
        const deletedUser = await Account.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // 2. Success response
        res.json({ 
            message: `User with ID ${userId} successfully deleted.`,
            user: deletedUser
        });

    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ message: 'Server error during user deletion.' });
    }
});


// --- NEW VIEW ROUTES ---
// The files are located in the parent directory (..)
app.get('/reserve.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'reserve.html'));
});

app.get('/payment.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'payment.html'));
});

app.get('/confirmation.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'confirmation.html'));
});
// -----------------------



// We will add your PayMongo integration and other GET routes later...