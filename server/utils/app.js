let { mongoserver, localMongoServer, node_env } = require('../../config')
const createServer = require('./server')
const { dbConnect, reseedDb } = require('./dbConnect')
const CronJob = require('cron').CronJob

const port = process.env.port || 3001
node_env === 'production' ? dbConnect(mongoserver) : dbConnect(localMongoServer)
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
const app = createServer()

app.listen(port)
