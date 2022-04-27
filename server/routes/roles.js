const express = require('express')
const router = express.Router()
const {
	getAllRoles,
	getSingleRole,
	createRole,
	updateRole,
	deleteRole,
} = require('../controllers/rolesController')
const {protect} = require("../middleware/authMiddleware.js")
// @desc Get all roles
// @route GET /api/role/:id
// @access Private
router.get('/',protect,  getAllRoles)

// @desc Get Single role
// @route GET /api/role/:id
// @access Private
router.get('/:id',protect, getSingleRole)

// @desc Create Role
// @route POST /api/role/
// @access Private
router.post('/', protect, createRole)

// @desc Update Single Role
// @route PUT /api/role/:id
// @access Private
router.put('/:id',protect,  updateRole)

// @desc Delete Specific Role
// @route DELETE /api/role/:id
// @access Private
router.delete('/:id', protect, deleteRole)

module.exports = router
