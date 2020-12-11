const moment = require('moment')
function makeSparseArrays(time, length) {
	let sparseArray = [time]
	sparseArray[length - 1] = 0
	return sparseArray
}

function makeDayArrays(dateStart, dateEnd) {
	let currentDay = 1
	let daysInSprint
	let dayArray = []
	dateStart = moment(dateStart).utc()
	//Adding one day to account for end of the day instead of beginning.
	dateEnd = moment(dateEnd).add(1, 'd').utc()
	daysInSprint = dateEnd.diff(dateStart, 'd')
	// Using currentDay as a temp for the following while loop
	while (currentDay <= daysInSprint) {
		if (currentDay === 1) {
			dayArray.push(dateStart.format('D'))
		} else {
			dayArray.push(dateStart.add(1, 'd').format('D'))
		}

		currentDay++
	}
	return dayArray
}

module.exports = { makeSparseArrays, makeDayArrays }
