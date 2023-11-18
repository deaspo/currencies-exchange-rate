import { isEmpty } from 'lodash';
import { useSearchParams } from 'react-router-dom';

export const useSearchURLParams = (
	searchParamName: string,
	defaultValue: string
): readonly [
	searchParamsState: string,
	setSearchParamsState: (newState: string) => void
] => {
	const [searchParams, setSearchParams] = useSearchParams();

	const acquiredSearchParam = searchParams.get(searchParamName);
	const searchParamsState = acquiredSearchParam ?? defaultValue;

	const setSearchParamsState = (newState: string) => {
		let next = Object.assign(
			{},
			[...searchParams.entries()].reduce(
				(o, [key, value]) => ({ ...o, [key]: value }),
				{}
			),
			{ [searchParamName]: newState }
		);
		if (isEmpty(newState)) {
			next = {};
		}
		setSearchParams(next);
	};
	return [searchParamsState, setSearchParamsState];
};
