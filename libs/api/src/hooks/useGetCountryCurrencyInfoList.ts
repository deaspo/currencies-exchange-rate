import { useMemo } from 'react';
import { GetCountryCurrencyInfo } from './getCountryCurrencyInfo';
import { useCurrencies } from './useCurrencies';

export const useGetCountryCurrencyInfoList = () => {
	const query = useCurrencies();

	const { currencies } = query;

	// Get the CurrencyInfo - with country, flag info
	const results = currencies.map(GetCountryCurrencyInfo);
	return useMemo(() => {
		return { ...query, currencyInfo: results };
	}, [query]);
};
