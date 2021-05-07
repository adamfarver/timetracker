const { DateTime } = require('luxon')

/**
 *@desc Creates a sparse array that starts with time and ends with zero.
 *
 * @param {number} time
 * @param {number} length
 * @return {array} Array of numbers and nulls
 * @author Adam Farver <adamfarver@gmail.com>
 */
function makeSparseArrays(time, length) {
	let sparseArray = [time]
	sparseArray[length - 1] = 0
	return sparseArray
}
/**
 *@desc Given a start and end date, this will return an array with the day numbers between.
 *
 * @param {string} dateStart - Sprint Start Date
 * @param {string} dateEnd - Sprint End Date
 * @return {array} Array of day numbers
 * @author Adam Farver <adamfarver@gmail.com>
 */
function makeDayArrays({ dateStart, dateEnd }) {
	if (typeof dateStart === 'object') {
		dateStart = dateStart.toISOString()
	}
	if (typeof dateEnd === 'object') {
		dateEnd = dateEnd.toISOString()
	}
	// iterator Variable
	let currentDay = 0
	// Storage for array
	let dayArray = []
	// set value at start of the day for the given start date
	dateStart = DateTime.fromISO(dateStart).startOf('day')
	// Set Value at end of the given end date
	dateEnd = DateTime.fromISO(dateEnd).endOf('day')
	// Get the Difference between start and end dates
	let diff = dateEnd.diff(dateStart, 'days')
	// while the currentday value is less tnan the total difference of the dates given, push the date number on to the day array. Must be a string because values will be used as labels for the chartjs feature
	while (currentDay < diff.get('days')) {
		currentDay++
		dayArray.push(String(dateStart.plus({ days: currentDay }).get('day')))
	}
	return dayArray
}

module.exports = { makeSparseArrays, makeDayArrays }
