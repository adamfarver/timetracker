const fs = require('fs')
const moment = require('moment')

let data = fs.readFileSync('server/seed/seedData.json', 'ascii')
data = JSON.parse(data)
function updateAllData(date) {
	let time = new Date(date)
	let utcTime = time.toISOString()
	const sprints = updateSprintData(utcTime)
	const times = updateTimeData(utcTime)
	data.sprints[0] = sprints
	data.times = times
	return data
}

function updateSprintData(date) {
	let now = moment(date).utc()
	data.sprints[0].dateStart = now.subtract(3, 'days').format()
	data.sprints[0].dateEnd = now.add(7, 'days').format()
	const transformedData = data.sprints[0]
	return transformedData
}

function updateTimeData(date) {
	let now = moment(date).utc()
	let { times } = data
	const sprintStartDate = now.subtract(4, 'days')
	const newTimes = times.map((time) => {
		time.createdAt = sprintStartDate.add(1, 'days').format()
		return time
	})

	return times
}

module.exports = { updateAllData, updateSprintData, updateTimeData }
