# useDebouncedInput Hook

A hook for debouncing input field values.

Note:
This hook is recreated from the version in `@wordpress/compose` package in WordPress 6.6 and newer:
https://github.com/WordPress/gutenberg/blob/wp/6.6/packages/compose/src/hooks/use-debounced-input/index.ts

Once this Repo supports WP 6.6 this hook could be deprecated and instead use the core hook.

## Description

The `useDebouncedInput` hook is designed for handling input fields that need debounced values. It manages both the immediate input value (for UI responsiveness) and a debounced version that only updates after a specified delay (for operations like API requests).

This hook is particularly useful for search fields, filter inputs, or any scenario where you want to reduce the frequency of operations triggered by input changes.

## Usage

```jsx
import { useDebouncedInput } from 'block-imports/hooks/useDebouncedInput';

function SearchComponent() {
  // Returns three values:
  // - searchTerm (immediate value that updates on every keystroke)
  // - setSearchTerm (function to update the search term)
  // - debouncedSearchTerm (value that updates after the specified delay)
  const [searchTerm, setSearchTerm, debouncedSearchTerm] = useDebouncedInput('', 500);

  // Use debouncedSearchTerm for API calls or expensive operations
  useEffect(() => {
    if (debouncedSearchTerm.length >= 3) {
      performSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <p>Current input: {searchTerm}</p>
      <p>Debounced input: {debouncedSearchTerm}</p>
    </div>
  );
}
```

## Parameters

| Parameter     | Type   | Description                                     | Default  |
|--------------|--------|-------------------------------------------------|----------|
| defaultValue | string | The initial value for the input                  | `''`     |
| delay        | number | The debounce delay in milliseconds               | `500`    |

## Return Value

Array containing three elements:

1. `input` (string): The current input value that updates immediately
2. `setInput` (function): Function to update the input value
3. `debouncedInput` (string): The debounced value that updates after the delay

## Dependencies

- `@wordpress/element`: For React hooks (`useState`, `useEffect`)
- `@wordpress/compose`: For the `useDebounce` hook
