const express = require('express')
const router = express.Router()
const { showSprintData } = require('../controllers/chartsController')
const { protect } = require('../middleware/authMiddleware')

// @desc Get Sprint chart Data
// @route GET /api/chart/:id
// @access Private
router.get('/:id', protect, showSprintData)

module.exports = router
