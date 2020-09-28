/**
 * @prettier
 */

const mongoose = require('mongoose')

module.exports = mongoose.model(
	'role',
	new mongoose.Schema(
		{
			roleName: { type: String, required: false },
			create: { type: Boolean, required: false, default: false },
			read: { type: Boolean, required: false, default: false },
			update: { type: Boolean, required: false, default: false },
			removeData: { type: Boolean, required: false, default: false },
		},
		{ timestamps: { createdAt: 'created_at', modifiedAt: 'modified_at' } }
	)
)
