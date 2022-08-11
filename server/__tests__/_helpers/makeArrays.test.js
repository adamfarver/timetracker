import { makeSparseArrays, makeDayArrays } from '../../_helpers/makeArrays'

const expectedTime = 400
let dateStart = '2020-12-07T00:00:00.000Z'
let dateEnd = '2020-12-11T00:00:00.000Z'

describe('Sparse Array Generator', () => {
	test('Sparse Arrays of specific length', () => {
		expect(makeSparseArrays(expectedTime, 5)).toHaveLength(5)
	})
	test('Sparse Arrays are the correct shape', () => {
		expect(makeSparseArrays(expectedTime, 5)).toStrictEqual([400, , , , 0])
	})
	test('Test Undefined Params', () => {
		expect(makeSparseArrays()).toEqual([])
		expect(makeSparseArrays(5)).toEqual([])
		expect(makeSparseArrays(undefined, 5)).toEqual([])
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
	test('Object does not contain keys', () => {
		expect(makeDayArrays({})).toEqual([])
	})
	test('Date Objects as Params', () => {
		dateStart = new Date('2020-12-07T00:00:00.000Z')
		dateEnd = new Date('2020-12-11T00:00:00.000Z')
		expect(makeDayArrays({ dateStart, dateEnd })).toStrictEqual([
			'7',
			'8',
			'9',
			'10',
			'11',
		])
	})
})
