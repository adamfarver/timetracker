import fieldCleaner from './fieldCleaner'

describe('Field cleaning', () => {
	test('Remove blank fields from input to DB', () =>
		expect(fieldCleaner({ name: 'Adam', age: '' })).toStrictEqual({
			name: 'Adam',
		}))
})
