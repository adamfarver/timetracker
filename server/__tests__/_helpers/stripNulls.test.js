import { stripNulls } from '../../_helpers/stripNulls'

const testObj = {
	firstName: 'Steve',
	lastName: 'Jones',
	age: null,
	otherThing: true,
}

describe('Dealing with Nulls into the database', () => {
	test('Strip Nulls from Objects', () => {
		expect(stripNulls(testObj)).toEqual({
			firstName: 'Steve',
			lastName: 'Jones',
			otherThing: true,
		})
	})
})
