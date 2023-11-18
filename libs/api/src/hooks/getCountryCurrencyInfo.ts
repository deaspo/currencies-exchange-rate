//import { getName as getCountryName, getCode as getCountryName } from 'country-list';
import { getCountryCode } from 'countries-list';
import { code as getCountryInfoCode } from 'currency-codes';
import { Currency, CurrencyInfo } from '../currencyApi';

export const GetCountryCurrencyInfo = (
	currencyInfo: Currency
): CurrencyInfo => {
	const { code, name, fx } = currencyInfo;
	if (code === 'EUR') {
		return {
			country: 'Europe',
			countryCode: 'EU',
			currency: 'Euro',
			currencyCode: 'EUR',
			flagUrlPath: 'flags/eu.png',
			exchangeRate: {
				buy: 1.0,
				sell: 1.0,
			},
		};
	}

	const countryInfo = getCountryInfoCode(code ?? 'Unknown');

	// Currency, country name
	const currency = countryInfo?.currency;
	const country = countryInfo?.countries[0] ?? 'NA';

	// Get country code from name
	const countryCode = getCountryCode(country);

	const codeCountry = countryCode ? countryCode.toLowerCase() : 'unknown';

	// Construct the return value
	return {
		country: country,
		countryCode: codeCountry,
		currency: name ?? currency,
		currencyCode: code ?? 'NA',
		flagUrlPath: `flags/${codeCountry}.png`,
		exchangeRate: fx,
	};
};
