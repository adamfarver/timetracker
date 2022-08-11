const jwt = require('jsonwebtoken')
const { jwt_key } = require('../../config.js')
const User = require('../models/User')

// sign jwt
const jwtSign = (id) => {
	return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: '3h' })
}
// Verify jwt
const jwtVerify = (token) => {
	try {
		const decoded = jwt.verify(token, jwt_key)
		return {
			valid: true,
			expired: false,
			decoded,
		}
	} catch (e) {
		console.error(e)
		return {
			valid: false,
			expired: e.message === 'jwt expired',
			decoded: null,
		}
	}
}

module.exports = { jwtVerify, jwtSign }
