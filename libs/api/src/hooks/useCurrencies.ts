import { isEmpty } from '@currencyexchangerate/utils';
import { useMemo } from 'react';
import { Currency, useGetCurrenciesQuery } from '../index';

const filterValidCurrency = (cur: Currency): Boolean => {
	return !(isEmpty(cur.code) || isEmpty(cur.name));
};

export const useCurrencies = () => {
	const query = useGetCurrenciesQuery();

	return useMemo(() => {
		const currencies = (query.data ?? []).slice();

		// Filter any all unknown currency code
		const filteredCurrencies = currencies.filter(filterValidCurrency);

		return { ...query, currencies: filteredCurrencies };
	}, [query]);
};
