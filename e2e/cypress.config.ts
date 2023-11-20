import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
	e2e: {
		...nxE2EPreset(__filename, { cypressDir: 'src', bundler: 'vite' }),
		supportFile: false, // tell cypress you don't have a support file
		baseUrl: 'http://localhost:4300/',
	},
	video: true,
	videoCompression: 32,
});
