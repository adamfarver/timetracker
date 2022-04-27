const express = require('express')
const router = express.Router()
const {
	getAllTimes,
	getSingleTime,
	createTime,
	updateTime,
	deleteTime,
} = require('../controllers/timesController')
const {protect} = require("../middleware/authMiddleware.js")

// @desc Get all times
// @route GET /api/time/:id
// @access Private
router.get('/', protect, getAllTimes)

// @desc Get Single time
// @route GET /api/time/:id
// @access Private
router.get('/:id', protect, getSingleTime)

// @desc Create time
// @route POST /api/time/
// @access Private
router.post('/', protect, createTime)

// @desc Update Single time
// @route PUT /api/time/:id
// @access Private
router.put('/:id', protect, updateTime)

// @desc Delete Specific time
// @route DELETE /api/time/:id
// @access Private
router.delete('/:id', protect, deleteTime)

module.exports = router
