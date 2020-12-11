const { useState } = require('react')
const { dateSlice, usDateFormat } = require('./humanDateFormatter')

describe('Date Formatting', () => {
	test('Properly converts ISO Date String to Format YYYY-MM-DD', () => {
		expect(dateSlice('1970-01-01T00:00:00.001Z')).toBe('1970-01-01')
	})

	test('Reformats to US (MMM-DD)', () => {
		expect(usDateFormat('1970-01-01T00:00:00.001Z')).toBe('Jan 01')
	})
})
