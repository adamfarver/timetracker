const express = require('express')
const router = express.Router()
const {
  getAllSprints,
  getSingleSprint,
  getSprintNumber,
  createSprint,
  updateSprint,
  deleteSprint,
} = require('../controllers/sprintsController')
const { protect } = require("../middleware/authMiddleware.js")

// @desc Get all sprints
// @route GET /api/sprint/list/:id
// @access Private
router.get('/list/:id', protect, getAllSprints)

// @desc Get Single sprint
// @route GET /api/sprint/:id
// @access Private
router.get('/:id', protect, getSingleSprint)

// @desc Get Single sprint
// @route GET /api/sprint/number/:id
// @access Private
router.get('/number/:id', protect, getSprintNumber)

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
