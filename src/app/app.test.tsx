import { act, screen, waitFor, getByTestId } from '@testing-library/react';
import { setupServer, SetupServer } from 'msw/node';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { DefaultBodyType, MockedRequest, rest, RestHandler } from 'msw';
import { VirtuosoMockContext } from 'react-virtuoso';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import {
	CurrencyInfo,
	GetCountryCurrencyInfo,
	renderWithProviders,
} from '../../libs/api/src';
import { App } from './app';

jest.mock('../../libs/api/src/hooks/getCountryCurrencyInfo', () => {
	const actualModules = jest.requireActual(
		'../../libs/api/src/hooks/getCountryCurrencyInfo'
	);
	return {
		__esModule: true,
		...actualModules,
		GetCountryCurrencyInfo: jest.fn(),
	};
});
jest.mock('react-router-dom', () => {
	const actualModules = jest.requireActual('react-router-dom');
	return {
		__esModule: true,
		...actualModules,
		useSearchParams: jest.fn(),
	};
});

describe('<App /> test', () => {
	const server: SetupServer = setupServer();
	let mockHandlers: RestHandler<MockedRequest<DefaultBodyType>>[] = [];

	const useSearchParamsMock = useSearchParams as jest.MockedFunction<() => any>;
	const GetCountryCurrencyInfoMock =
		GetCountryCurrencyInfo as jest.MockedFunction<(props: any) => CurrencyInfo>;

	beforeEach(() => {
		GetCountryCurrencyInfoMock.mockImplementation((props: any) => {
			const { code, name, fx } = props;
			return {
				country: 'Test Country',
				countryCode: 'TC',
				currency: name,
				currencyCode: code,
				flagUrlPath: 'flag/unknown.png',
				exchangeRate: fx,
			};
		});
		useSearchParamsMock.mockImplementation(
			jest.requireActual('react-router-dom').useSearchParams
		);
	});

	beforeAll(() => {
		// Enable the mocking in tests.
		server.listen({ onUnhandledRequest: 'error' });
	});

	afterEach(() => {
		// Reset any runtime handlers tests may use.
		server.resetHandlers();
		jest.clearAllMocks();
		jest.resetAllMocks();
	});

	afterAll(() => {
		// Clean up once the tests are done.
		server.close();
	});

	test('should have asearch input field', () => {
		// Setup server
		mockHandlers = [
			rest.get('http://localhost:4201/fx', (req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('http://localhost:4201/institutions', async (req, res, ctx) => {
				return res(
					ctx.json([
						{
							institute: 'Test Institute',
							baseCurrency: 'Test Base Currency',
						},
					])
				);
			}),
		];
		server.use(...mockHandlers);

		const { getByTestId } = renderWithProviders(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		expect(getByTestId('search-input-field')).not.toBeNull();
	});
	test('should have a search results container', async () => {
		// Setup server
		mockHandlers = [
			rest.get('http://localhost:4201/fx', (req, res, ctx) => {
				return res(ctx.json([]));
			}),
			rest.get('http://localhost:4201/institutions', async (req, res, ctx) => {
				return res(
					ctx.json([
						{
							institute: 'Test Institute',
							baseCurrency: 'Test Base Currency',
						},
					])
				);
			}),
		];
		server.use(...mockHandlers);

		const { getByTestId } = renderWithProviders(
			<MemoryRouter>
				<App />
			</MemoryRouter>
		);
		await waitFor(() => {
			expect(getByTestId('search-results-list')).not.toBeNull();
		});
	});
	test('should have search results for currencies', async () => {
		// Setup server
		mockHandlers = [
			rest.get('http://localhost:4201/fx', (req, res, ctx) => {
				return res(
					ctx.json([
						{
							currency: 'USD',
							nameI18N: 'Test Dollar',
							exchangeRate: {
								buy: 1.1,
								sell: 1.1,
							},
						},
						{
							currency: 'EUR',
							nameI18N: 'Test Euro',
							exchangeRate: {
								buy: 1.0,
								sell: 1.0,
							},
						},
					])
				);
			}),
			rest.get('http://localhost:4201/institutions', async (req, res, ctx) => {
				return res(
					ctx.json([
						{
							institute: 'Test Institute',
							baseCurrency: 'Test Base Currency',
						},
					])
				);
			}),
		];
		server.use(...mockHandlers);

		await act(async () => {
			renderWithProviders(
				<MemoryRouter>
					<VirtuosoMockContext.Provider
						value={{
							viewportHeight: 1080,
							itemHeight: 100,
						}}
					>
						<App />
					</VirtuosoMockContext.Provider>
				</MemoryRouter>
			);
		});

		await waitFor(() => {
			const searchResultElements = screen.getAllByTestId(
				'search-results-list-item'
			);
			expect(searchResultElements).not.toBeNull();

			expect(searchResultElements.length).toBeGreaterThanOrEqual(1);
		});
	});
	test.each([['dollar'], ['kes'], ['eur']])(
		'User can search for an existing currencies',
		async (currency) => {
			// Set up server
			mockHandlers = [
				rest.get('http://localhost:4201/fx', (req, res, ctx) => {
					return res(
						ctx.json([
							{
								currency: 'dollar',
								nameI18N: 'Test Dollar',
								exchangeRate: {
									buy: 1.1,
									sell: 1.1,
								},
							},
							{
								currency: 'EUR',
								nameI18N: 'Test Euro',
								exchangeRate: {
									buy: 1.0,
									sell: 1.0,
								},
							},
							{
								currency: 'KES',
								nameI18N: 'Test Kes',
								exchangeRate: {
									buy: 110.0,
									sell: 117.0,
								},
							},
						])
					);
				}),
				rest.get(
					'http://localhost:4201/institutions',
					async (req, res, ctx) => {
						return res(
							ctx.json([
								{
									institute: 'Test Institute',
									baseCurrency: 'Test Base Currency',
								},
							])
						);
					}
				),
			];
			server.use(...mockHandlers);

			act(() => {
				renderWithProviders(
					<MemoryRouter>
						<VirtuosoMockContext.Provider
							value={{
								viewportHeight: 1080,
								itemHeight: 100,
							}}
						>
							<App />
						</VirtuosoMockContext.Provider>
					</MemoryRouter>
				);
			});
			await waitFor(() => {
				expect(screen.getByTestId('search-input-field')).not.toBeNull();
			});

			const searchInputField = screen.getByTestId(
				'search-input-field'
			) as HTMLInputElement;
			// Simulate user interaction
			userEvent.click(searchInputField);
			await userEvent.type(searchInputField, currency);
			// @ts-ignore
			expect(searchInputField.value).toEqual(currency);

			const searchResultElements = screen.getByTestId(
				'search-results-list-item'
			);
			const currencyElement = getByTestId(searchResultElements, 'currency');

			// @ts-ignore
			expect(currencyElement.innerHTML.toLowerCase()).toMatch(
				currency.toLowerCase()
			);
		}
	);
	test('user search for non existent currency', async () => {
		const unknownCurrency = 'unknown';
		// Set up server
		mockHandlers = [
			rest.get('http://localhost:4201/fx', (req, res, ctx) => {
				return res(
					ctx.json([
						{
							currency: 'dollar',
							nameI18N: 'Test Dollar',
							exchangeRate: {
								buy: 1.1,
								sell: 1.1,
							},
						},
						{
							currency: 'EUR',
							nameI18N: 'Test Euro',
							exchangeRate: {
								buy: 1.0,
								sell: 1.0,
							},
						},
						{
							currency: 'KES',
							nameI18N: 'Test Kes',
							exchangeRate: {
								buy: 110.0,
								sell: 117.0,
							},
						},
					])
				);
			}),
			rest.get('http://localhost:4201/institutions', async (req, res, ctx) => {
				return res(
					ctx.json([
						{
							institute: 'Test Institute',
							baseCurrency: 'Test Base Currency',
						},
					])
				);
			}),
		];
		server.use(...mockHandlers);

		act(() => {
			renderWithProviders(
				<MemoryRouter>
					<VirtuosoMockContext.Provider
						value={{
							viewportHeight: 1080,
							itemHeight: 100,
						}}
					>
						<App />
					</VirtuosoMockContext.Provider>
				</MemoryRouter>
			);
		});
		await waitFor(() => {
			expect(screen.getByTestId('search-input-field')).not.toBeNull();
		});

		const searchInputField = screen.getByTestId(
			'search-input-field'
		) as HTMLInputElement;
		// Simulate user interaction
		userEvent.click(searchInputField);
		await userEvent.type(searchInputField, unknownCurrency);
		// Check the search results
		await waitFor(() => {
			expect(screen.queryByTestId('search-results-list-item')).toBeNull();
		});
	});
	test('url search params equal to the searched currency', async () => {
		// Mock useSearchParams
		let mockSearchParam = '';
		useSearchParamsMock.mockImplementation(() => {
			const [params, setParams] = useState(
				new URLSearchParams(mockSearchParam)
			);
			return [
				params,
				(newParams: string) => {
					mockSearchParam = newParams;
					setParams(new URLSearchParams(newParams));
				},
			];
		});

		const searchedCurrency = 'search value';
		// Set up server
		mockHandlers = [
			rest.get('http://localhost:4201/fx', (req, res, ctx) => {
				return res(
					ctx.json([
						{
							currency: 'dollar',
							nameI18N: 'Test Dollar',
							exchangeRate: {
								buy: 1.1,
								sell: 1.1,
							},
						},
						{
							currency: 'EUR',
							nameI18N: 'Test Euro',
							exchangeRate: {
								buy: 1.0,
								sell: 1.0,
							},
						},
						{
							currency: 'KES',
							nameI18N: 'Test Kes',
							exchangeRate: {
								buy: 110.0,
								sell: 117.0,
							},
						},
					])
				);
			}),
			rest.get('http://localhost:4201/institutions', async (req, res, ctx) => {
				return res(
					ctx.json([
						{
							institute: 'Test Institute',
							baseCurrency: 'Test Base Currency',
						},
					])
				);
			}),
		];
		server.use(...mockHandlers);

		act(() => {
			renderWithProviders(
				<MemoryRouter>
					<VirtuosoMockContext.Provider
						value={{
							viewportHeight: 1080,
							itemHeight: 100,
						}}
					>
						<App />
					</VirtuosoMockContext.Provider>
				</MemoryRouter>
			);
		});
		await waitFor(() => {
			expect(screen.getByTestId('search-input-field')).not.toBeNull();
		});

		const searchInputField = screen.getByTestId(
			'search-input-field'
		) as HTMLInputElement;
		// Simulate user interaction
		userEvent.click(searchInputField);
		await userEvent.type(searchInputField, searchedCurrency);
		// Check the URLSearch params
		expect(mockSearchParam).toEqual({
			currency: searchedCurrency,
		});
	});
});
