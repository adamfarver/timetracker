const fs = require('fs')
const { DateTime } = require('luxon')
const bcrypt = require('bcryptjs')

let data = fs.readFileSync('server/seed/seedData.json', 'ascii')
data = JSON.parse(data)
async function updateAllData(date) {
	let time = new Date(date)
	let utcTime = time.toISOString()
	const sprints = updateSprintData(utcTime)
	const times = updateTimeData(utcTime)
	const users = await hashPasswords()

	data.users = users
	data.sprints[0] = sprints
	data.times = times
	return data
}

function updateSprintData(date) {
	let now = DateTime.fromISO(date).toUTC().startOf('day')
	data.sprints[0].dateStart = now.minus({ days: 3 }).toISO()
	data.sprints[0].dateEnd = now.plus({ days: 3 }).toISO()
	const transformedData = data.sprints[0]
	return transformedData
}

function updateTimeData(date) {
	let now = DateTime.fromISO(date).minus({ days: 3 }).toUTC()
	let { times } = data
	times[0].createdAt = now.toISO()
	times[1].createdAt = now.plus({ days: 1 }).toISO()
	times[2].createdAt = now.plus({ days: 1 }).toISO()
	times[3].createdAt = now.plus({ days: 2 }).toISO()

	return times
}
// Must hash passwords before putting them in the DB
async function hashPasswords() {
	const { users } = data
	const salt = await bcrypt.genSalt(10)
	for (let i = 0; i < users.length; i++) {
		users[i].password = await bcrypt.hash(users[i].password, salt)
	}
	return users
}
module.exports = { updateAllData, updateSprintData, updateTimeData }
