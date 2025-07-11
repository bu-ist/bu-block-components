# SearchUI

## Overview

The `SearchUI` component provides a search input field with clear functionality and loading state indicator. It's the primary user interface for entering search queries in the PostChooser component.

## Features

- Search input field with customizable placeholder
- Clear button to reset search
- Loading state indicator
- Accessibility-compliant labeling

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSearch` | Function | Required | Function to call when search is performed |
| `searchTerm` | String | Required | Current search term value |
| `setSearchTerm` | Function | Required | Function to update search term state |
| `searchType` | String | Required | Current search type (recent, content, slug, ID) |
| `setSearchType` | Function | Required | Function to update search type state |
| `isLoading` | Boolean | false | Whether a search is currently in progress |
| `label` | String | "Enter a search query" | Label for the search field |
| `hideLabelFromVision` | Boolean | true | Whether to visually hide the label |
| `placeholder` | String | - | Placeholder text for the search input |

## Usage

```jsx
import { SearchUI } from '@components/PostChooser/editor-partials/search-ui';
import { useState } from '@wordpress/element';

const MySearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('recent');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    // Perform search...
    setTimeout(() => setIsLoading(false), 1000); // Simulate search
  };

  return (
    <SearchUI
      onSearch={handleSearch}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      searchType={searchType}
      setSearchType={setSearchType}
      isLoading={isLoading}
      placeholder="Search posts..."
    />
  );
};
```

## Implementation Details

- Uses WordPress `BaseControl` for proper accessibility structure
- Dynamically shows/hides the clear button based on search term presence
- Switches between search icon and loading spinner based on loading state
