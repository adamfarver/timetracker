/**
 * @prettier
 */

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

module.exports = mongoose.model(
	'User',
	new mongoose.Schema(
		{
			firstName: { type: String, required: false },
			lastName: { type: String, required: false },
			email: { type: String, required: false },
			phone: { type: String, required: false },
			role: { type: ObjectId, required: false },
			password: { type: String, required: false },
		},
		{ timestamps: { createdAt: 'created_at', modifiedAt: 'modified_at' } }
	)
)
