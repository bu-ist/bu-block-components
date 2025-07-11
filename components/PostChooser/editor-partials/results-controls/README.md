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
| `onSearch` | Function | Required | Function to trigger a new search |
| `searchType` | String | Required | Current search type (recent, content, slug, ID) |
| `setSearchType` | Function | Required | Function to update the search type |
| `sortOrder` | Object | Required | Current sort configuration with `orderby` and `order` properties |
| `setSortOrder` | Function | Required | Function to update the sort configuration |
| `contentResultsCount` | Number | 0 | Count of content search results |
| `slugResultsCount` | Number | 0 | Count of slug search results |
| `idResultsCount` | Number | 0 | Count of ID search results |

## Usage

```jsx
import { ResultsControls } from '@components/PostChooser/editor-partials/results-controls';
import { useState } from '@wordpress/element';

const MyFilterComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('recent');
  const [sortOrder, setSortOrder] = useState({ orderby: 'date', order: 'desc' });

  const handleSearch = () => {
    // Perform search with updated parameters
    console.log('Searching with:', { searchType, sortOrder });
  };

  return (
    <ResultsControls
      searchTerm={searchTerm}
      onSearch={handleSearch}
      searchType={searchType}
      setSearchType={setSearchType}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      contentResultsCount={10}
      slugResultsCount={5}
      idResultsCount={2}
    />
  );
};
```

## Implementation Details

- Uses WordPress `RadioGroup` and `Radio` components for search type selection
- Uses WordPress `Dropdown` component for sort controls
- Controls are automatically disabled when no search term is present
- Includes commented-out alternative implementation using `DropdownMenu`
