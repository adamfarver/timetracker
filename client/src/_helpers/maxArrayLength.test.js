const maxArrayLength = require('./maxArrayLength')

let array = [
	'Han',
	'Luke',
	'Leia',
	'Chewbacca',
	'Darth Vader',
	'Yoda',
	'Jabba the Hut',
	'Lando',
]
describe('Array Manipulation', () => {
	test('Shorten array to max length', () => {
		expect(maxArrayLength(array, 5)).toHaveLength(5)
	})
	test('Elements in array are same', () => {
		expect(maxArrayLength(array, 2)).toEqual(['Han', 'Luke'])
	})
})
