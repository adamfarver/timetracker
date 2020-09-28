/**
 * @prettier
 */

const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types
module.exports = mongoose.model(
	'sprint',
	new mongoose.Schema(
		{
			sprint: { type: Number, required: false },
			completed: { type: Boolean, required: false },
			userCreated: { type: ObjectId, required: false },
			userModified: { type: ObjectId, required: false },
			sprintType: { type: String, required: false },
			active: { type: Boolean, required: false },
			projectManager: { type: ObjectId, required: false },
			dateStart: { type: Date, required: false },
			dateEnd: { type: Date, required: false },
			project: { type: ObjectId, required: false },
		},
		{ timestamps: { createdAt: 'created_at', modifiedAt: 'modified_at' } }
	)
)
