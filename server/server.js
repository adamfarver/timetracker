/**
 * @format
 */
// eslint-disable-next-line no-unused-vars
const http = require('http')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
let { port, mongoserver } = require('../config')
const projects = require('./routes/projects')
const users = require('./routes/users')
const tasks = require('./routes/tasks')
const roles = require('./routes/roles')
const sprints = require('./routes/sprints')
const times = require('./routes/times')
// Connect to MongoDB
async function dbConnect() {
	await mongoose.connect(mongoserver, {
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
setInterval(() => {
	if (!mongoose.connection.readyState) {
		console.log('No DB connected. Trying to reconnect now.')
		dbConnect()
	}
}, 10000)

const app = express()
port = port || 3001

// Middlewares
// TODO: DB Status Check Middleware
app.use(bodyParser.json())
app.use(cors())

app.use('/api/project', projects)
app.use('/api/user', users)
app.use('/api/task', tasks)
app.use('/api/role', roles)
app.use('/api/sprint', sprints)
app.use('/api/time', times)
app.listen(port, () => console.log(`Express server running on ${port}`))
