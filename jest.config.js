/* eslint-disable */
module.exports = {
	displayName: 'currencies-exchange-rate',
	preset: './jest.preset.js',
	coverageDirectory: './coverage/currencies-exchange-rate',
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
		'<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)',
	],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFiles: ['./jest.polyfills.js'],
};
