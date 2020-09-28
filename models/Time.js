/**
 * @prettier
 */

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
module.exports = mongoose.model(
	'time',
	new mongoose.Schema(
		{
			taskId: { type: ObjectId, required: false },
			timeUsed: { type: Number, required: false },
			userId: { type: ObjectId, required: false },
		},
		{ timestamps: { createdAt: 'created_at', modifiedAt: 'modified_at' } }
	)
)
