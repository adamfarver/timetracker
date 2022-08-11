const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const { jwt_key } = require('../../config.js')
const { jwtVerify } = require('../utils/jwt.utils')

const protect = asyncHandler(async (req, res, next) => {
	let token
	let decoded
	if (
		req.get('authorization') &&
		req.get('authorization').startsWith('Bearer')
	) {
		// Get token from header
		token = req.headers.authorization.split(' ')[1]
		// Verify Token
		if (token) {
			decoded = jwtVerify(token)
		}
		if (decoded) {
			req.user = await User.findById(decoded).select('-password')

			next()
		}

		res.status(401)
		throw new Error('Token Not Valid, Please Log In.')
	}

	if (!token) {
		res.status(401)
		res.json({ message: 'Not authorized, no token' })
		// throw new Error('Not authorized, no token')
	}
	return res
})

module.exports = { protect }
