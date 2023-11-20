import { useSearchURLParams } from '@currencyexchangerate/utils';
import React from 'react';

export const SearchBar = () => {
	const [searchedValue, setURLSearchParams] = useSearchURLParams(
		'currency',
		''
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const searchValue = e.target.value;
		setURLSearchParams(searchValue);
	};

	return (
		<section className="flex w-full sticky top-0 z-50">
			<div className="max-w-lg mx-auto w-full rounded-lg overflow-hidden lg:max-w-xl bg-gray-400">
				<div className="md:flex">
					<div className="w-full p-3">
						<div className="relative">
							<input
								data-testid="search-input-field"
								type="search"
								id="default-search"
								className="w-full px-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
								placeholder="Search currency"
								onChange={handleInputChange}
								value={searchedValue}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
