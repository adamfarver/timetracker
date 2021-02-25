/**
 * @format
 */
// eslint-disable-next-line no-unused-vars
const http = require('http')
const CronJob = require('cron').CronJob

// DB Functions
const mongoose = require('mongoose')
const { seed } = require('./seed/seed')
const seedData = require('./seed/seedData.json')
const { drop } = require('./seed/DropCollection')

// Express Server Stuff
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Config
// Using let in this declaration because server port number can be changed if it is not available.
let { port, mongoserver, localMongoServer } = require('../config')

// Routes
const projects = require('./routes/projects')
const users = require('./routes/users')
const tasks = require('./routes/tasks')
const roles = require('./routes/roles')
const sprints = require('./routes/sprints')
const times = require('./routes/times')

// Connect to MongoDB
async function dbConnect() {
	await mongoose.connect(localMongoServer, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: false,
		connectTimeoutMS: 4000,
		useFindAndModify: false,
	})
	if (mongoose.connection.readyState) {
		console.log('DB Connected')
	}
}

dbConnect()

// Check if DB disconnected, if not reconnects.
setInterval(() => {
	if (!mongoose.connection.readyState) {
		console.log('No DB connected. Trying to reconnect now.')
		dbConnect()
	}
}, 10000)

const app = express()
port = port || 3001
// Connect to DB and clear collections
async function reseedDb(seedData) {
	await drop('timetracker')
	await seed(seedData)
}

// Do this first time.
reseedDb(seedData)

// Set up cronjob to reset/reseed DB.
// const resetDB = new CronJob(
// 	'*/15 * * * *',
// 	function () {
// 		reseedDb(seedData)
// 		return
// 	},
// 	null,
// 	true,
// 	'America/New_York'
// )
// resetDB.start()

// Express Middlewares
app.use(bodyParser.json())
app.use(cors())

// Route Modules
app.use('/api/project', projects)
app.use('/api/user', users)
app.use('/api/task', tasks)
app.use('/api/role', roles)
app.use('/api/sprint', sprints)
app.use('/api/time', times)

app.listen(port, () => console.log(`Express server running on ${port}`))
