const asyncHandler = require('express-async-handler')
const { getChartData } = require('../services/chart.service')

// Main Chart Data Route

// @desc Get Sprint chart Data
// @route GET /api/chart/:id
// @access Private

const showSprintData = asyncHandler(async (req, res, next) => {
	const { id } = req.params
	try {
		const chartData = await getChartData()
		res.status(200).json(chartData)
	} catch (error) {
		throw new Error('Issues with aggregations.')
	}
})
module.exports = { showSprintData }
