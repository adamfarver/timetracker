const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../../models/User')
const { authUser } = require('../controllers/authController')

// Auth Routes

// @desc Auth Users and set tokens
// @route GET /api/auth
// @access Public

router.post('/login', authUser)

module.exports = router
