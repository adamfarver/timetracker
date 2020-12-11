import moment from 'moment'

export function dateSlice(date) {
	let newDate = new Date(date)
	newDate = moment(newDate, 'YYYY-MM-DDTHH:mm:ss.SSS')
		.utc()
		.format('YYYY-MM-DD')

	return newDate
}

export function usDateFormat(date) {
	let newDate = new Date(date)
	newDate = moment(newDate, 'YYYY-MM-DDTHH:mm:ss.SSS').utc().format('MMM DD')

	return newDate
}
