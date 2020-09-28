const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
module.exports = mongoose.model(
	'project',
	new mongoose.Schema(
		{
			active: { type: Boolean, required: false },
			additionalInfo: { type: String, required: false },
			completed: { type: Boolean, required: false },
			ownerCompany: { type: String, required: false },
			ownerEmail: { type: String, required: false },
			ownerName: { type: String, required: false },
			ownerPhone: { type: String, required: false },
			projectManager: { type: String, required: false },
			projectName: { type: String, required: false },

			teamLead: { type: String, required: false },
			// userCreated: { type: ObjectId, required: false },
			// userModified: { type: ObjectId, required: false },
		},
		{ timestamps: { createdAt: 'created_at', modifiedAt: 'modified_at' } }
	)
)
