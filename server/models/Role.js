/**
 * @prettier
 */

const mongoose = require('mongoose')

module.exports = mongoose.model(
	'role',
	new mongoose.Schema(
		{
			roleName: { type: String, required: false },
			active: { type: Boolean },
			projectCreate: { type: Boolean },
			projectRead: { type: Boolean },
			projectUpdate: { type: Boolean },
			projectRemoveData: { type: Boolean },
			sprintCreate: { type: Boolean },
			sprintRead: { type: Boolean },
			sprintUpdate: { type: Boolean },
			sprintRemoveData: { type: Boolean },
			taskCreate: { type: Boolean },
			taskRead: { type: Boolean },
			taskUpdate: { type: Boolean },
			taskRemoveData: { type: Boolean },
			timeCreate: { type: Boolean },
			timeRead: { type: Boolean },
			timeUpdate: { type: Boolean },
			timeRemoveData: { type: Boolean },
			userCreate: { type: Boolean },
			userRead: { type: Boolean },
			userUpdate: { type: Boolean },
			userRemoveData: { type: Boolean },
			roleCreate: { type: Boolean },
			roleRead: { type: Boolean },
			roleUpdate: { type: Boolean },
			roleRemoveData: { type: Boolean },
		},
		{ timestamps: { createdAt: 'created_at', modifiedAt: 'modified_at' } }
	)
)
