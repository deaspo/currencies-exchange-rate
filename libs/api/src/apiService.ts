import { currencyApi } from './currencyApi';

export const app = currencyApi.enhanceEndpoints({
	addTagTypes: ['currency', 'institution'],
	endpoints: {
		getCurrencies: {
			providesTags: ['currency'],
		},
		getCurrencyByName: {
			providesTags: ['currency'],
		},
		getInstitution: {
			providesTags: ['institution'],
		},
	},
});
