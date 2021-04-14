const fs = require('fs')
const { DateTime } = require('luxon')

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
	let now = DateTime.fromISO(date).toUTC().startOf('day')
	data.sprints[0].dateStart = now.minus({ days: 3 }).toISO()
	data.sprints[0].dateEnd = now.plus({ days: 4 }).toISO()
	const transformedData = data.sprints[0]
	return transformedData
}

function updateTimeData(date) {
	const rndNum = () => Math.round(Math.random() * 4)
	let now = DateTime.fromISO(date).toUTC().startOf('day')
	let { times } = data
	const sprintStartDate = now.minus({ days: 4 })
	const newTimes = times.map((time) => {
		time.createdAt = sprintStartDate.plus({ days: rndNum() }).toISO()
		return time
	})

	return newTimes
}

module.exports = { updateAllData, updateSprintData, updateTimeData }
