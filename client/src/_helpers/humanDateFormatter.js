const { DateTime } = require('luxon')

function dateSlice(date) {
	return DateTime.fromISO(date).toUTC().toISODate()
}

function usDateFormat(date) {
	return DateTime.fromISO(date).toUTC().toFormat('LLL dd')
}
module.exports = { dateSlice, usDateFormat }
