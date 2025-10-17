# Results

## Overview

The `Results` component displays the list of posts returned from a search or query. It handles loading states, empty results, and the presentation of post items.

## Features

- Displays search results or recently updated posts
- Handles empty state with informative messages
- Renders each post using the `ResultsItem` component
- Shows placeholder items during loading states
- Provides helpful guidance when no results are found

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `posts` | Array | - | Array of post objects to display |
| `onSelectPost` | Function | Required | Function to call when a post is selected |
| `loading` | Boolean | false | Whether posts are currently being loaded |
| `totalItems` | Number | - | Total number of items in search results, used for empty state messaging |
| `searchTerm` | String | - | Current search term value, used for conditional rendering |
| `searchType` | String | - | Current search type (recent, default, slug, ID), used for displaying contextual help messages |

## Implementation Details

- Uses the custom `data-loading` attribute to control loading state visibility
- Handles multiple conditional rendering scenarios:
  - When posts are loading
  - When posts are found
  - When no posts are found (with helpful guidance)
  - When posts array is empty or invalid
- Renders placeholder `ResultsItem` components during loading or empty states
- Performs proper array validation to prevent errors with malformed data
- Provides contextual help messages to guide users when searches return no results
- Displays different instructional content based on search type (slug, default, ID)

## CSS

The component uses CSS for:
- Styling the "No posts found" message
- Creating a proper layout for the result list.
