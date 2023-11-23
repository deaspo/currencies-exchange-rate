import { CurrencyInfo } from '@currencyexchangerate/api';
import { CreateAvatar } from '@currencyexchangerate/ui';

interface IProps {
	currencyInfo: CurrencyInfo;
}

export const SearchResultsListItem = ({ currencyInfo }: IProps) => {
	const {
		currency,
		country,
		flagUrlPath,
		exchangeRate,
		countryCode,
		currencyCode,
	} = currencyInfo;

	return (
		<div
			data-testid="search-results-list-item"
			className="flex items-center shadow-md rounded-lg px-4 py-2 my-2 gap-5 bg-gray-100 w-full "
		>
			<div className="w-full flex gap-10 items-center">
				<CreateAvatar currency={currencyCode} />
				<div className="flex flex-col justify-center p-3">
					<span data-testid="currency" className="text-xl">
						{currency}
					</span>
					<div className="flex items-center w-full gap-2">
						<div>
							<span data-testid="country-code" className="text-xl">
								{country} - {countryCode}
							</span>
						</div>
						<div className="">
							<img
								data-testid="country-flag-img"
								className="h-4 w-4"
								src={flagUrlPath}
								alt="flag"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-end flex-col">
				<span className="text-sm font-semibold whitespace-nowrap">
					Exchange Rate
				</span>
				<span data-testid="exchange-rate" className="text base">
					{exchangeRate?.sell}
				</span>
			</div>
		</div>
	);
};
