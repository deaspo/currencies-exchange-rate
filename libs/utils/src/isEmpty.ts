/**
 * Checks if an input is empty. An input is considered empty if it is
 * null, undefined, an empty string, or an empty array.
 * Mostly when working with strings and string likes in context of form validation.
 * @param input The input to check.
 * @returns {boolean} True if the input is empty, false otherwise.
 */
export const isEmpty = (input: unknown): boolean => {
	return (
		input === '' ||
		(Array.isArray(input) && input.length === 0) ||
		input === null ||
		input === false ||
		input === undefined ||
		input === 'null'
	);
};
