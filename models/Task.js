/**
 * @prettier
 */

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
module.exports = mongoose.model(
	'task',
	new mongoose.Schema(
		{
			taskName: { type: String, required: false },
			dateCompleted: { type: Date, required: false },
			completed: { type: Boolean, required: false, default: false },
			userCreated: { type: ObjectId, required: false },
			userModified: { type: ObjectId, required: false },
			additionalInfo: { type: String, required: false },
			active: { type: Boolean, required: false, default: false },
			project: { type: ObjectId, required: false },
			sprint: { type: ObjectId, required: false },
			claimedBy: { type: ObjectId, required: false },
			projectedTime: { type: Number, required: false },
			actualUsedTime: { type: Number, required: true, default: 0 },
		},
		{ timestamps: { createdAt: 'created_at', modifiedAt: 'modified_at' } }
	)
)
