// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	verbose: true,
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
	collectCoverageFrom: ['server/**/*.js', '!server/__tests__/*.js'],
	testEnvironment: 'node',
	forceExit: true,
	clearMocks: true,
	resetMocks: true,
	restoreMocks: true,
}

module.exports = config
