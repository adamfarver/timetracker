//Models
const Project = require('../models/Project')
const Role = require('../models/Role')
const Sprint = require('../models/Sprint')
const Task = require('../models/Task')
const Time = require('../models/Time')
const User = require('../models/User')

const drop = async () => {
	await Project.deleteMany({})
	await Role.deleteMany({})
	await Sprint.deleteMany({})
	await Task.deleteMany({})
	await Time.deleteMany({})
	await User.deleteMany({})
}

module.exports = { drop }
