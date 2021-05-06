const dotenv = require('dotenv')
dotenv.config({
	path: '.env',
})
module.exports = {
	endpoint: process.env.REACT_APP_API_URL,
	masterKey: process.env.API_KEY,
	port: process.env.REACT_APP_PORT,
	mongoserver: process.env.MONGO_URI,
	localMongoServer: process.env.LOCAL_MONGO_CONNECTION_STRING,
	node_env: process.env.NODE_ENV,
}
