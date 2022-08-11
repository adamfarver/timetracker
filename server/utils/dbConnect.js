let { mongoserver, localMongoServer, node_env } = require('../../config')
const CronJob = require('cron').CronJob
const fs = require('fs')
const path = require('path')

// DB Functions
const mongoose = require('mongoose')
const { seed } = require('../seed/seed')
const { drop } = require('../seed/DropCollection')
const { updateAllData } = require('../seed/updateData')

async function dbConnect(uri) {
	try {
		const response = await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoIndex: false,
			connectTimeoutMS: 4000,
			useFindAndModify: false,
		})
		console.log('DB Connected')
	} catch (error) {
		console.log(error)
	}
	// Check if DB disconnected, if not reconnects.
	setInterval(() => {
		if (!mongoose.connection.readyState) {
			console.log('No DB connected. Trying to reconnect now.')
			process.env.NODE_ENV === 'production'
				? dbConnect(mongoserver)
				: dbConnect(localMongoServer)
		}
	}, 10000)
}
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

// node_env === 'production' ? dbConnect(mongoserver) : dbConnect(localMongoServer)

module.exports = { dbConnect, reseedDb }
