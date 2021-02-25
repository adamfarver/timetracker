//  The purpose of this file is to fix seedData.json so that the data will:

//  - Set each sprint start date to the current day.
//  - Set each sprint end date to the current day + 7 days
//  - Set completion date of task to some where in the 7 day window of the sprint.

const fs = require('fs')
const path = require('path')
const moment = require('moment')

const jsonData = JSON.parse(
	fs.readFileSync(path.resolve(__dirname + '/seed/seedData.json')).toString()
)

let { sprints, tasks } = jsonData

const newSprints = sprints.map((sprint) => {
	const now = moment()
	sprint.dateStart = now.format()
	sprint.dateEnd = now.add(6, 'd').format()
	return sprint
})

sprints = newSprints

const rng = (min, max) => {
	return Math.round(Math.random() * (max - min) + min)
}

const { dateStart, dateEnd } = sprints[0]

const newTasks = tasks.map((task) => {
	// Randomization and rounding functions

	if (task.completed) {
		console.log(`
		Project Task Name: ${task.taskName}
Time Used: ${task.actualUsedTime}`)
	}
})

// fs.writeFileSync(
// 	path.resolve(__dirname + '/seed/seedData.json'),
// 	JSON.stringify(jsonData)
// )
