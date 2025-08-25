# ResultsControls

## Overview

The `ResultsControls` component provides filtering and sorting options for the post search results. It consists of two main sections: search type selection and sort controls.

## Features

- Search type selection (recent, content, slug, ID)
- Sorting controls with dropdown interface
- Support for sorting by date or title
- Support for ascending/descending sort order
- Dynamic count indicators for each search type

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchTerm` | String | Required | Current search term |
| `searchType` | String | Required | Current search type (recent, content, slug, ID) |
| `sortOrder` | Object | Required | Current sort configuration with `orderby` and `order` properties |
| `setSortOrder` | Function | Required | Function to update the sort configuration |
| `contentResultsCount` | Number | 0 | Count of content search results |
| `slugResultsCount` | Number | 0 | Count of slug search results |
| `idResultsCount` | Number | 0 | Count of ID search results |
| `onChange` | Function | `() => {}` | Function to call when the search type changes |


## Implementation Details

- Uses WordPress `RadioGroup` and `Radio` components for search type selection
  - This will be deprecated in future WP and replaced with ToggleControlGroup or similar.
- Uses WordPress `Dropdown` component for sort controls
- Sort Controls are automatically disabled when no search term is present
