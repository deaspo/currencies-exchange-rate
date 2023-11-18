import {
	CurrencyInfo,
	useGetCountryCurrencyInfoList,
} from '@currencyexchangerate/api';
import { ListItems } from '@currencyexchangerate/ui';
import { useSearchParams } from 'react-router-dom';
import { SearchResultsListItem } from '../searchResultsListItem';

export const SearchResultsList = () => {
	const { currencyInfo, error, isLoading, isFetching } =
		useGetCountryCurrencyInfoList();

	const [searchParam] = useSearchParams();
	const searchValue = searchParam.get('currency') ?? '';

	const filteredCurrencies = currencyInfo.filter((cur) =>
		cur.currency?.toLowerCase().includes(searchValue.toLowerCase())
	);

	const listRowItemRendered = (idx: number, currencyInfo: CurrencyInfo) => (
		<SearchResultsListItem key={idx} currencyInfo={currencyInfo} />
	);

	return (
		<section className="flex flex-col flex-grow h-full mb-24">
			<div className="w-full mx-auto items-start max-w-7xl flex flex-col text-gray-900 dark:text-gray-700">
				<ListItems
					itemsList={filteredCurrencies}
					listItemRowContent={listRowItemRendered}
				/>
			</div>
		</section>
	);
};
