import { apiBase as api } from '@currencyexchangerate/api';
import { isNotEmpty } from '@currencyexchangerate/utils';

interface FxProp {
	buy?: number;
	sell?: number;
}

export interface CurrencyInfo {
	country: string;
	countryCode: string;
	currency?: string;
	currencyCode: string;
	flagUrlPath?: string;
	exchangeRate: FxProp | null;
}

export interface Currency {
	code: string | null;
	name?: string;
	fx: FxProp | null;
}

export interface InstitutionInfo {
	name: string;
	baseCurrency: string;
}

const getCurrencyFromData = (res: any): Currency => {
	let curCode: string | null = null;
	let curName: string | undefined = undefined;
	let fx: FxProp | null = null;
	const { currency, nameI18N, exchangeRate, banknoteRate } = res;
	// Set the currency
	if (isNotEmpty(currency)) curCode = currency;
	if (isNotEmpty(currency)) curName = nameI18N;
	// Set the exchange rate
	// We can use two sources - exchange rate is the priority
	if (isNotEmpty(exchangeRate)) {
		const { buy, sell } = exchangeRate;
		fx = { buy, sell };
	} else if (isNotEmpty(banknoteRate)) {
		const { buy, sell } = banknoteRate;
		fx = { buy, sell };
	}
	// Return transformed response
	return {
		code: curCode,
		name: curName,
		fx: fx,
	};
};

export const currencyApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCurrencies: build.query<Currency[], void>({
			query: () => '/fx',
			transformResponse: (response: Array<any>) => {
				return response.map(getCurrencyFromData);
			},
			providesTags: (result) =>
				result
					? [
							{ type: 'Currency', id: 'LIST' },
							...result.map(({ name }) => ({
								type: 'Currency' as const,
								id: name,
							})),
					  ]
					: [{ type: 'Currency', id: 'LIST' }],
		}),
		getCurrencyByName: build.query<Currency, string>({
			query: (currencyName) => `/fx/?currency=${currencyName}`,
			transformResponse: (response: any, error) => {
				if (error) {
					return {
						code: null,
						name: undefined,
						fx: null,
					};
				}
				return getCurrencyFromData(response);
			},
			providesTags: (result, error, currencyName) => [
				{ type: 'Currency', currencyName: currencyName },
			],
		}),
		getInstitution: build.query<InstitutionInfo, void>({
			query: () => '/about',
			transformResponse: (response: any) => {
				const { institute, baseCurrency } = response[0];
				return {
					name: institute,
					baseCurrency: baseCurrency,
				};
			},
			providesTags: (result) => [
				{ type: 'Institution', institutionName: result?.name },
			],
		}),
	}),
});

export const {
	useGetCurrenciesQuery,
	useGetCurrencyByNameQuery,
	useGetInstitutionQuery,
} = currencyApi;
