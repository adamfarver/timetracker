// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	verbose: true,
	collectCoverageFrom: [
		'server/**/*.js',
		'!server/seed/*.js',
		'!server/dataReset.js',
		'server.js',
	],
	testEnvironment: 'node',
}

module.exports = config
