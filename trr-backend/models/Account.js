const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AccountSchema = new mongoose.Schema({


	role_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Role',
		required: true
	},

	first_name: { type: String, required: true},
	middle_name: { type: String, required: false }, 
    last_name: { type: String, required: true },
    
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    
    password: { type: String, required: true, select: false },
    isActive: { type: Boolean, default: true }, // For deactivation without deletion
    created_at: { type: Date, default: Date.now }
});

// CRITICAL PRE-SAVE HOOK: HASH the password before saving to the database
AccountSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Account', AccountSchema, 'account_tbl');