const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../../models/User')
const { stripNulls } = require('../_helpers/stripNulls')

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '3h' })
}
// @desc List all Users
// @route GET /api/user
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
	let allUsers
	try {
		// Why does this aggregation exist? Because roleName doesn't exist in the current collection, only objectId in role property. So, lookups are necessary.
		allUsers = await User.aggregate([
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
	} catch (e) {
		res.status(500)
		throw new Error('Internal Server Error')
	}
	res.status(200).send(allUsers)
})

// @desc List Single User
// @route GET /api/user/:id
// @access Private

const getSingleUser = asyncHandler(async (req, res) => {
	const { id } = req.params
	let record
	try {
		record = await User.findById(id)
		delete record._doc.password
	} catch (error) {
		res.status(400)
		throw new Error('User Not found')
	}

	res.status(200).json(record)
})

// @desc Register New User
// @route POST /api/user
// @access PUBLIC

const registerNewUser = asyncHandler(async (req, res) => {
	const { firstName, lastName, email, password, phone } = req.body
	// Check that all fields are filled in
	if (!firstName || !lastName || !email || !password) {
		res.status(400)
		throw new Error('All Fields Required.')
	}
	// Test for user's email in DB
	const exists = await User.findOne({ email })
	if (exists) {
		res.status(409)
		throw new Error('User Already Exists')
	}

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)
	const newUser = new User({
		firstName,
		lastName,
		email,
		role: '5f83b76c9afb0523d2e7ac7a',
		password: hashedPassword,
	})
	try {
		const savedUser = await newUser.save()
		if (savedUser) {
			res.status(201).json({
				_id: savedUser.id,
				firstName: savedUser.firstName,
				lastName: savedUser.lastName,
				email: savedUser.email,
				token: generateToken(savedUser._id),
			})
		}
	} catch (e) {
		res.status(409)
		throw new Error('User Already Exists.')
	}
})

// @desc Update User
// @route PUT /api/user/:id
// @access Private

const updateUser = asyncHandler(async (req, res) => {
	const { id } = req.params
	const { body } = req
	const cleanedData = stripNulls(body)

	const salt = await bcrypt.genSalt(10)
	let hashedPassword

	if (cleanedData.password) {
		hashedPassword = await bcrypt.hash(cleanedData.password, salt)
		cleanedData.password = hashedPassword
	}
	try {
		const updatedUser = await User.findByIdAndUpdate(id, { $set: cleanedData })

		res.status(204).send('fine')
	} catch (e) {
		res.status(409)
		throw new Error('User Could Not Be Updated')
	}
})

// @desc Delete User
// @route Delete /api/user/:id
// @access Private

const deleteUser = asyncHandler(async (req, res, next) => {
	const { id } = req.params
	try {
		const record = await User.findOneAndDelete({ _id: id })
		if (!record) {
			throw new Error('User Not Found')
		}
		res.status(204).send()
	} catch (e) {
		res.status(409)
		throw new Error("User couldn't be deleted")
	}
})

module.exports = {
	getAllUsers,
	getSingleUser,
	registerNewUser,
	updateUser,
	deleteUser,
}
