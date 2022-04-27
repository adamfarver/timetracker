const express = require('express')
const router = express.Router()
const {
	getAllUsers,
	getSingleUser,
	registerNewUser,
	updateUser,
	deleteUser,
} = require('../controllers/userController')
const {protect} = require("../middleware/authMiddleware.js")

// @desc List Single User
// @route GET /api/user/:id
// @access Private
router.get('/:id', protect, getSingleUser)

// @desc List all Users
// @route GET /api/user
// @access Private
router.get('/', protect, getAllUsers)

// @desc Register New User
// @route POST /api/user
// @access PUBLIC
router.post('/', registerNewUser)

// @desc Update User
// @route PUT /api/user/:id
// @access Private
router.put('/:id', protect, updateUser)

// @desc Delete User
// @route Delete /api/user/:id
// @access Private
router.delete('/:id', protect, deleteUser)

module.exports = router
