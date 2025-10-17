# Changelog

## Unreleased

- useRequestData & useGetPagination
  - Fixed parameter names in `useRequestData` and `useGetPagination` hooks to match WordPress core `getEntityRecords` function parameters (`kind`, `name`, `query`)
  - Fixed bug in `useGetPagination` where `getEntitiesByKind()` was incorrectly using the wrong parameter
  - Updated documentation to reflect consistent parameter naming across hooks
- PostChooser Component
  - Fixed pagination error that could occur when quickly clicking between pages by resetting current page to `1` faster with useEffect tied to `searchTerm`
  - Fixed an issue with null values being passed to REST API endpoints by switching the useRequestData calls to use `undefined` when the query isn't ready/set/etc. The console was showing calls to `some-endpoint/null` and throwing a 404 or error. `undefined` seems to be better.

## [0.3.1]

- Added `useDebouncedInput` hook for handling debounced input fields
- Fixed PostChooserModal search functionality to use proper debouncing
- Fixed search field input lag by using immediate value for UI and debounced value for API calls
- Improved performance for search functionality by reducing API calls

## [0.3.0]

- Dev folder with wp-env and testing block plugin

## [0.2.0]

- First round of components/hooks/utils

## [0.1.1]

- Initial structure based on github notes

## [0.1.0]

- Prototype components
