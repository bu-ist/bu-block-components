/**
 * WordPress dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';

/**
 * Hook for debouncing input field values.
 *
 * Returns an array with:
 * - The current input value (updates immediately)
 * - Function to update the input value
 * - The debounced input value (updates after delay)
 *
 * @param {string} defaultValue - The default value for the input.
 * @param {number} delay - The debounce delay in milliseconds.
 * @return {[string, (value: string) => void, string]} Input values and setter.
 */
export function useDebouncedInput(defaultValue = '', delay = 500) {
	const [input, setInput] = useState(defaultValue);
	const [debouncedInput, setDebouncedInput] = useState(defaultValue);

	// Create a debounced version of setDebouncedInput
	const setDebouncedInputWithDelay = useDebounce(setDebouncedInput, delay);

	// Effect to update the debounced value when input changes
	useEffect(() => {
		setDebouncedInputWithDelay(input);
	}, [input, setDebouncedInputWithDelay]);

	return [input, setInput, debouncedInput];
}
