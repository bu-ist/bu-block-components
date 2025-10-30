# Changelog

## Unreleased

- useRequestData & useGetPagination
  - Fixed parameter names in `useRequestData` and `useGetPagination` hooks to match WordPress core `getEntityRecords` function parameters (`kind`, `name`, `query`)
  - Fixed bug in `useGetPagination` where `getEntitiesByKind()` was incorrectly using the wrong parameter
  - Updated documentation to reflect consistent parameter naming across hooks
- PostChooser Component
  - Fixed pagination error that could occur when quickly clicking between pages by resetting current page to `1` faster with useEffect tied to `searchTerm`
  - Fixed an issue with null values being passed to REST API endpoints by switching the useRequestData calls to use `undefined` when the query isn't ready/set/etc. The console was showing calls to `some-endpoint/null` and throwing a 404 or error. `undefined` seems to be better.

## Unreleased [0.3.1]

- Added `useDebouncedInput` hook for handling debounced input fields
- Fixed PostChooserModal search functionality to use proper debouncing
- Fixed search field input lag by using immediate value for UI and debounced value for API calls
- Improved performance for search functionality by reducing API calls

## Unreleased [0.3.0]

- Dev folder with wp-env and testing block plugin

## Unreleased [0.2.0]

- First round of components/hooks/utils

## [0.1.5]

- Bugfixes - you can do easy imports and compile in other repos using `npm install`

## [0.1.4]

- Changes block-imports reference by @jdub233 in #10
- Simplifies data fetching with useRequestData by @jdub233 in #15
- useRequestData hook with examples by @hirozed in #14
- Add Help Wrapper Component and finalize prototype by @acketon in #18

## [0.1.3]

- remove incomplete code from npm package

## [0.1.2]

- Initial npm release.

## [0.1.1]

- Initial structure based on github notes

## [0.1.0]

- Prototype components
