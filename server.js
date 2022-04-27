/**
 * @format
 */
// eslint-disable-next-line no-unused-vars
// Config
let { mongoserver, localMongoServer, node_env } = require('./config')
const CronJob = require('cron').CronJob
const fs = require('fs')
const path = require('path')

// DB Functions
const mongoose = require('mongoose')
const { seed } = require('./server/seed/seed')
const { drop } = require('./server/seed/DropCollection')
const { updateAllData } = require('./server/seed/updateData')

// Express Server Stuff
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// Routes
const projects = require('./server/routes/projects')
const users = require('./server/routes/users')
const tasks = require('./server/routes/tasks')
const roles = require('./server/routes/roles')
const sprints = require('./server/routes/sprints')
const times = require('./server/routes/times')
const charts = require('./server/routes/charts')
const auth = require('./server/routes/auth')
const { errorHandler } = require('./server/middleware/errorMiddleware')

console.log(node_env)
// Connect to MongoDB
async function dbConnect(uri) {
	try {
		const response = await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoIndex: false,
			connectTimeoutMS: 4000,
			useFindAndModify: false,
		})
	} catch (error) {
		console.log(error)
	}
}

node_env === 'production' ? dbConnect(mongoserver) : dbConnect(localMongoServer)
// Check if DB disconnected, if not reconnects.
setInterval(() => {
	if (!mongoose.connection.readyState) {
		console.log('No DB connected. Trying to reconnect now.')
		process.env.NODE_ENV === 'production'
			? dbConnect(mongoserver)
			: dbConnect(localMongoServer)
	}
}, 10000)

const app = express()
const port = process.env.PORT || 3001

// Connect to DB and clear collections
async function reseedDb() {
	if (mongoose.connection.readyState) {
		await drop('timetracker')
		const now = Date.now()
		const seedData = await updateAllData(now)
		await seed(seedData)
	}
}

// Do this first time.
reseedDb()

// Set up cronjob to reset/reseed DB.
const resetDB = new CronJob(
	'0 0 * * *',
	function () {
		reseedDb()
		return
	},
	null,
	true,
	'America/New_York'
)
resetDB.start()

// Express Middlewares
app.use(bodyParser.json())
app.use(cors())

// API Route Modules
app.use('/api/auth', auth)
app.use('/api/project', projects)
app.use('/api/user', users)
app.use('/api/task', tasks)
app.use('/api/role', roles)
app.use('/api/sprint', sprints)
app.use('/api/time', times)
app.use('/api/charts', charts)

// Serve Client files - Front-End
//if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'dist')))
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
		//  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	})
//}
app.use(errorHandler)

app.listen(port, () => console.log(`Express server running on ${port}`))
