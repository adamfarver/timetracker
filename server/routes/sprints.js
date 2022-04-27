const express = require('express')
const router = express.Router()
const {
	getAllSprints,
	getSingleSprint,
	createSprint,
	updateSprint,
	deleteSprint,
} = require('../controllers/sprintsController')
const {protect} = require("../middleware/authMiddleware.js")

// @desc Get all sprints
// @route GET /api/sprint/:id
// @access Private
router.get('/',protect,  getAllSprints)

// @desc Get Single sprint
// @route GET /api/sprint/:id
// @access Private
router.get('/:id', protect, getSingleSprint)

// @desc Create sprint
// @route POST /api/sprint/
// @access Private
router.post('/', protect, createSprint)

// @desc Update Single sprint
// @route PUT /api/sprint/:id
// @access Private
router.put('/:id', protect, updateSprint)

// @desc Delete Specific sprint
// @route DELETE /api/sprint/:id
// @access Private
router.delete('/:id', protect, deleteSprint)

module.exports = router
