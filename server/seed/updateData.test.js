import { updateSprintData, updateTimeData, updateAllData } from './updateData'

describe('Given Date => Get Correctly formatted Data', () => {
	test('Test for sprint data', () => {
		expect(updateSprintData('2021-04-06T00:00:00Z')).toStrictEqual({
			_id: '5fc7ab1418ed22c8f2a26139',
			sprint: 1,
			completed: false,
			userCreated: '5fa447d6578d6b1b5f71d103',
			userModified: '5fa447d6578d6b1b5f71d103',
			sprintType: 'code',
			active: false,
			project: '5fa5a497767ee509ef0b118c',
			dateStart: '2021-04-03T00:00:00.000Z',
			dateEnd: '2021-04-09T00:00:00.000Z',
			__v: 0,
		})
	})


})
