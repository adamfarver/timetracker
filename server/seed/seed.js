const mongoose = require('mongoose')
const { mongoserver } = require('../../config')

const Project = require('../../models/Project')
const User = require('../../models/User')
const Task = require('../../models/Task')
const Role = require('../../models/Role')
const Sprint = require('../../models/Sprint')
const Time = require('../../models/Time')

// create instance for client

async function seed(data) {
	await mongoose
		.connect(mongoserver, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(async () => {
			await Project.insertMany(data.projects)
			await User.insertMany(data.users)
			await Task.insertMany(data.tasks)
			await Role.insertMany(data.roles)
			await Sprint.insertMany(data.sprints)
			await Time.insertMany(data.times)
			const now = new Date()
			console.log('DB has been reset: \n' + now.toLocaleTimeString())
		})
}

exports.seed = seed
