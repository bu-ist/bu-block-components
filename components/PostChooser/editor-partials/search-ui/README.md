# SearchUI

## Overview

The `SearchUI` component provides a search input field with clear functionality and loading state indicator. It's the primary user interface for entering search queries in the PostChooser component.

## Features

- Search input field with customizable placeholder
- Clear button to reset search
- Loading state indicator
- Accessibility-compliant labeling
- Support for different search types
- Post type filtering when multiple post types are available

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `searchTerm` | String | `''` | Current search term value |
| `setSearchTerm` | Function | Required | Function to update search term state |
| `setSearchType` | Function | Required | Function to update search type state |
| `isLoading` | Boolean | `false` | Whether a search is currently in progress |
| `label` | String | `"Enter a search query"` | Label for the search field |
| `hideLabelFromVision` | Boolean | `true` | Whether to visually hide the label |
| `placeholder` | String | `"Enter a search term…"` | Placeholder text for the search input |
| `postTypes` | Array | `[{ label: 'Posts', value: 'post' }, { label: 'Pages', value: 'page' }]` | Array of post types with label/value pairs |

## Component Interaction

The SearchUI component is designed to work closely with its parent component (typically PostChooserModal):

1. It manages the search input field and updates the parent's `searchTerm` state
2. When the clear button is clicked, it resets the search term to an empty string and sets search type to 'recent'
3. It displays a loading indicator when search operations are in progress
4. It provides the user interface for entering search queries, while search type selection is handled by the ResultsControls component
5. When multiple post types are available, it provides a dropdown to filter by post type

## Implementation Details

- Uses WordPress `BaseControl` for proper accessibility structure
- Dynamically shows/hides the clear button based on search term presence
- Switches between search icon and loading spinner based on loading state
- Properly handles state updates through parent component callbacks
- Maintains focus management for improved user experience
- Conditionally renders post type filtering dropdown based on the number of available post types

