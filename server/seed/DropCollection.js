const mongoose = require('mongoose')
const { localMongoServer } = require('../../config')

//Models
const Project = require('../../models/Project')
const Role = require('../../models/Role')
const Sprint = require('../../models/Sprint')
const Task = require('../../models/Task')
const Time = require('../../models/Time')
const User = require('../../models/User')

// mongoose.connect(localMongoServer, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// })

const drop = async () => {
	await Project.deleteMany({})
	await Role.deleteMany({})
	await Sprint.deleteMany({})
	await Task.deleteMany({})
	await Time.deleteMany({})
	await User.deleteMany({})
}

exports.drop = drop
