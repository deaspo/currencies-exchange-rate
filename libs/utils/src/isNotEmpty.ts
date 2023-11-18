import { isEmpty } from './isEmpty';

export const isNotEmpty = (input: unknown) => {
	return !isEmpty(input);
};
