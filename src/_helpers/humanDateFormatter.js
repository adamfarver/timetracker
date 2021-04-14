import { DateTime } from 'luxon'

export function dateSlice(date) {
	return DateTime.fromISO(date).toUTC().toISODate()
}

export function usDateFormat(date) {
	return DateTime.fromISO(date).toUTC().toFormat('LLL dd')
}
