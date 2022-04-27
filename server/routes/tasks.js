const express = require('express')
const router = express.Router()
const {
	getAllTasks,
	getSingleTask,
	createTask,
	updateTask,
	deleteTask,
	getSingleTaskTimes,
	getAllProjectTasks,
	getAllClaimedProjectTasks,
} = require('../controllers/tasksController')
const {protect} =require("../middleware/authMiddleware.js")

// @desc Get all tasks
// @route GET /api/task/:id
// @access Private
router.get('/', protect, getAllTasks)

// @desc Get Single task
// @route GET /api/task/:id
// @access Private
router.get('/:id', protect, getSingleTask)

// @desc Create task
// @route POST /api/task/
// @access Private
router.post('/', protect, createTask)

// @desc Update Single task
// @route PUT /api/task/:id
// @access Private
router.put('/:id', protect, updateTask)

// @desc Delete Specific task
// @route DELETE /api/task/:id
// @access Private
router.delete('/:id', protect, deleteTask)

// @desc Get Single Task Times
// @route GET /api/task/:id/times
// @access Private

router.get('/', protect, getSingleTaskTimes)

// @desc Get AllProjectTasks
// @route GET /api/task/allprojecttasks/:id
// @access Private

router.get('/', protect, getAllProjectTasks)

// @desc Get all claimed project tasks
// @route GET /api/task/allclaimedprojecttasks/:id
// @access Private

router.get('/', protect, getAllClaimedProjectTasks)

module.exports = router
