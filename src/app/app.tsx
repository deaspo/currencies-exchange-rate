import { SearchBar, SearchResultsList } from '@currencyexchangerate/core';
import { PageFooter, PageHeader } from '@currencyexchangerate/ui';

export const App = () => {
	return (
		<main className="flex flex-col min-h-screen gap-4">
			<PageHeader />
			<SearchBar />
			<SearchResultsList />
			<PageFooter />
		</main>
	);
};
