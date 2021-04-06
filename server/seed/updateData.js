const fs = require('fs')
const moment = require('moment')

let data = fs.readFileSync('./seedData.json', 'ascii')

data = JSON.parse(data)

// Start updating the file here.
// Update the Sprint Start and End Data
;(function () {
	let now = moment()
	data.sprints[0].dateStart = now.subtract(4, 'days').format()
	data.sprints[0].dateEnd = now.add(7, 'days').format()
})()

// Update Completed dates

let taskUpdates = (function (data) {
	let now = moment()
	let completedTasks = data.tasks.filter((task) => {
		return task.completed
	})

	let uncompletedTasks = data.tasks.filter((task) => {
		return !task.completed
	})
	completedTasks = completedTasks.map((task) => {
		task.updatedAt = now.subtract(1, 'day').format()
		return task
	})
	let allTasks = completedTasks.concat(...uncompletedTasks)

	return allTasks
})(data)

data.tasks = taskUpdates
// Update In-Process Numbers

// Write out data
data = JSON.stringify(data)

try {
	fs.writeFileSync('./newSeedData.json', data)
	console.log('File Written.')
} catch (e) {
	console.log(e)
}

// Console Output

// console.log(taskUpdates)
