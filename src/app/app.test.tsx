import { renderWithProviders } from '@currencyexchangerate/api';
import { MemoryRouter } from 'react-router-dom';

import { App } from './app';

describe('App', () => {
	it('should render successfully', () => {
		const { baseElement } = renderWithProviders(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		expect(baseElement).toBeTruthy();
	});

	it('should have a greeting as the title', () => {
		const { getByText } = renderWithProviders(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		expect(getByText(/George FE Test/gi)).toBeTruthy();
	});
});
