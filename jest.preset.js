const nxPreset = require('@nx/jest/preset').default;

module.exports = {
	...nxPreset,
	testEnvironment: 'jsdom',
	roots: ['<rootDir>'],
};
