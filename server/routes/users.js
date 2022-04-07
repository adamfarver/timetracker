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

// Read Single User
router.get('/:id', getSingleUser)

// Read All Users
router.get('/', getAllUsers)

// Create User
router.post('/', registerNewUser)

//Update User
router.put('/:id', updateUser)

//Delete User
router.delete('/:id', deleteUser)

module.exports = router
