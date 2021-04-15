import { makeSparseArrays, makeDayArrays } from './makeArrays'

const expectedTime = 400
const dateStart = '2020-12-07T00:00:00.000Z'
const dateEnd = '2020-12-11T00:00:00.000Z'

describe('Sparse Array Generator', () => {
	test('Sparse Arrays of specific length', () => {
		expect(makeSparseArrays(expectedTime, 5)).toHaveLength(5)
	})
	test('Sparse Arrays are the correct shape', () => {
		expect(makeSparseArrays(expectedTime, 5)).toStrictEqual([400, , , , 0])
	})
})

describe('Day Array Generator', () => {
	test('Make Day Array', () => {
		expect(makeDayArrays({ dateStart, dateEnd })).toStrictEqual([
			'7',
			'8',
			'9',
			'10',
			'11',
		])
	})
})
