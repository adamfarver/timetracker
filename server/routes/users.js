const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../../models/User')
const {
	getAllUsers,
	getSingleUser,
	registerNewUser,
	updateUser,
	deleteUser,
} = require('../controllers/userController')

// User

// @desc List Single User
// @route GET /api/user/:id
// @access Private
router.get('/:id', getSingleUser)

// @desc List all Users
// @route GET /api/user
// @access Private
router.get('/', getAllUsers)

// @desc Register New User
// @route POST /api/user
// @access PUBLIC
router.post('/', registerNewUser)

// @desc Update User
// @route PUT /api/user/:id
// @access Private
router.put('/:id', updateUser)

// @desc Delete User
// @route Delete /api/user/:id
// @access Private
router.delete('/:id', deleteUser)

module.exports = router
