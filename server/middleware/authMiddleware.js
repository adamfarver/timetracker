const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../../models/User')
const { jwt_key } = require('../../config.js')


const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.header("authorization") &&
    req.header("authorization").startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      console.log(token)
      // Verify token
      const decoded = jwt.verify(token, jwt_key)




      console.log(decoded)
      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Token Not Valid, Please Log In.')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
