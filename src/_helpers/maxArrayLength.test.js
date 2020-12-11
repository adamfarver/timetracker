import maxArrayLength from './maxArrayLength'

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
})
