import {
	Currency,
	CurrencyInfo,
	useGetCurrencyByNameQuery,
} from '@currencyexchangerate/api';
import { useMemo } from 'react';
import { GetCountryCurrencyInfo } from './getCountryCurrencyInfo';

export const useCurrencyByName = (currencyCode: string) => {
	const query = useGetCurrencyByNameQuery(currencyCode);

	return useMemo(() => {
		const result: Currency | undefined = query.data;
		let currency: CurrencyInfo | undefined = undefined;

		if (result) {
			currency = GetCountryCurrencyInfo(result);
		}

		return { ...query, currencyInfo: currency };
	}, [query]);
};
