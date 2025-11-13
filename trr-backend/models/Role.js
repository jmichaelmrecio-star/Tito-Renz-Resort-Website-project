const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
	role_name: {
		type: String,
		required: true,
		enum: ['Customer', 'Manager', 'Admin']
	},

	description: {
		type: String, 
		required: false
	}
});

module.exports = mongoose.model('Role', RoleSchema, 'role_tbl');