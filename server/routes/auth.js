const express = require('express')
const router = express.Router()
const { authUser } = require('../controllers/authController')

// Auth Routes

// @desc Auth Users and set tokens
// @route GET /api/auth/login
// @access Public

router.post('/login', authUser)

module.exports = router
