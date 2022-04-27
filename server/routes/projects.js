const express = require('express')
const router = express.Router()
const {
  getAllProjects,
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController')
const { protect } = require("../middleware/authMiddleware.js")

// @desc Get all projects
// @route GET /api/project/:id
// @access Private
router.get('/', protect, getAllProjects)

// @desc Get Single project
// @route GET /api/project/:id
// @access Private
router.get('/:id', protect, getSingleProject)

// @desc Create Project
// @route POST /api/project/
// @access Private
router.post('/', protect, createProject)

// @desc Update Single Project
// @route PUT /api/project/:id
// @access Private
router.put('/:id', protect, updateProject)

// @desc Delete Specific Project
// @route DELETE /api/project/:id
// @access Private
router.delete('/:id', protect, deleteProject)

module.exports = router
