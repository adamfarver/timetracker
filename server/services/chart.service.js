// List all Charts
// List One Chart
// Create Chart
// Update Chart
// Delete Chart

const mongoose = require('mongoose')
const Task = require('../models/Task')
const Time = require('../models/Time')
const Sprint = require('../models/Sprint')
const { ObjectId } = mongoose.Types
const { makeDayArrays } = require('../_helpers/makeArrays')

async function getChartData(id) {
	let chartData = {
		labels: [],
		datasets: [
			{
				// Projected Stats
				label: 'Projected Stats',
				data: [50, , , , , , 0],
			},
			{
				// Actual Stats
				label: 'Actual Stats',
				data: [],
				lineColor: '#f00',
			},
		],
	}
	// Getting Total Expected time for tasks
	const projectTasksExpectedTime = Task.aggregate([
		// Get all project tasks
		{ $match: { sprint: ObjectId(`${id}`), active: true } },
		// Add all projected time
		{ $group: { _id: null, totalProjectedTime: { $sum: '$projectedTime' } } },
	])
	chartData.datasets[0].data[0] = projectTasksExpectedTime[0].totalProjectedTime

	// Getting Daily Totals of time spent on tasks
	const projectTasksActualTime = Time.aggregate([
		{ $match: { sprint: ObjectId(`${id}`) } },
		{
			$project: {
				_id: null,
				month: { $month: '$createdAt' },
				date: {
					$dayOfMonth: '$createdAt',
				},
				hours: '$timeUsed',
			},
		},
		{
			$group: {
				_id: { month: '$month', date: '$date' },
				hours: { $sum: '$hours' },
			},
		},
		{ $sort: { '_id.month': 1, '_id.date': 1 } },
	])

	let currentHours = chartData.datasets[0].data[0]
	chartData.datasets[1].data = projectTasksActualTime.map((time) => {
		currentHours = currentHours - time.hours
		return currentHours
	})

	// Getting Dates in sprint

	let startAndEndDates = Sprint.find({ _id: `${id}` })

	let { dateStart, dateEnd } = startAndEndDates[0]
	const daysArray = makeDayArrays({ dateStart, dateEnd })
	chartData.labels = daysArray

	return chartData
}

module.exports = {
	getChartData,
}
