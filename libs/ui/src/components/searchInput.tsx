interface SearchInputProps {
	searchedValue: string;
	handleInputChange: (searchValue: string) => void;
}

export const SearchInput = ({
	searchedValue,
	handleInputChange,
}: SearchInputProps) => {
	return (
		<input
			type="search"
			id="default-search"
			className="w-full px-4 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
			placeholder="Search currency"
			onChange={(event) => handleInputChange(event.target.value)}
			value={searchedValue}
		/>
	);
};
