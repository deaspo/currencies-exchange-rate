const nxPreset = require('@nx/jest/preset').default;
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.base.json');

module.exports = {
	...nxPreset,
	roots: ['<rootDir>'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(tsx?|js|html)$': ['babel-jest', { presets: ['@nrwl/react/babel'] }],
	},
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: process.cwd(),
	}),
};
