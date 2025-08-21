# PostChooserModal

## Overview

The `PostChooserModal` component serves as the main container for the post selection interface. It provides a modal dialog where users can search for and select posts from the WordPress database.

## Features

- Search interface for finding posts
- Support for different search types (recent, content, slug, ID)
- Sorting controls for search results
- Customizable post type support
- Pagination for search results
- Results count display

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onClose` | Function | Required | Function to call when the modal is closed |
| `onSelectPost` | Function | Required | Function to call when a post is selected |
| `label` | String | - | Label for the search field |
| `postTypes` | Array | - | Array of post types to include in search |
| `primaryPostType` | String | "post" | Default selected post type |
| `placeholder` | String | "Enter a search term…" | Placeholder text for the search field |
| `title` | String | "Choose a Post" | Title of the modal |
| `minCharacters` | Number | 3 | Minimum number of characters required for search |

## Internal State

The component maintains several pieces of state:
- `searchTerm` - Current search query (updates immediately with user input)
- `searchTermThrottled` - Debounced version of searchTerm (used for API calls)
- `sortOrder` - Object with `orderby` and `order` properties
- `searchType` - Type of search (recent, default, slug, ID)
- `selectedPostType` - Currently selected post type
- `searchCurrentPage` - Object with separate pagination states for each search type (recent, default, slug, ID)
- `searchResults` - Object storing separate results for each search type

## Pagination

The component uses the `useGetPagination` hook to fetch pagination information and displays a `Pagination` component when there are multiple pages of results.

## Debouncing Search Input

The component uses the `useDebouncedInput` hook to manage input debouncing:
1. `searchTerm` updates immediately to provide responsive user feedback in the search field
2. `searchTermThrottled` only updates after a brief delay (300ms), reducing API calls while typing
3. The search input uses the immediate `searchTerm` value for real-time UI updates
4. All API requests and results display use the debounced `searchTermThrottled` value for better performance

## Internal Components

The `PostChooserModal` coordinates the following sub-components:
- `SearchUI`: Provides the search input interface
- `ResultsControls`: Provides sorting and filtering options
- `Results`: Displays the search results
- `Pagination`: Handles page navigation for search results

## Implementation Notes

- Uses the `useRequestData` hook to fetch both recent posts and search results
- Automatically switches to search results view when results are available
- TODO: Future improvement to use Context API instead of prop drilling
- TODO: Add support for searching by multiple post types
