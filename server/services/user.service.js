const User = require('../models/User')

// List all Users
export const listAllUsers = async () => {
	// Why does this aggregation exist? Because roleName doesn't exist in the current collection, only objectId in role property. So, lookups are necessary.
	return await User.aggregate([
		{
			$lookup: {
				from: 'roles',
				foreignField: '_id',
				localField: 'role',
				as: 'role',
			},
		},
		{ $unwind: '$role' },
		{
			$project: {
				_id: 1,
				firstName: 1,
				lastName: 1,
				email: 1,
				role: { _id: 1, roleName: 1 },
			},
		},
	])
}

// List One User
export const listOneUser = async ({ id }) => {
	const user = await User.findById(id)
	return user
}
// Create User
// Update User
// Delete User
