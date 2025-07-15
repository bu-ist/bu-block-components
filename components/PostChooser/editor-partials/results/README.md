# Results

## Overview

The `Results` component displays the list of posts returned from a search or query. It handles both the loading state and the display of post items.

## Features

- Displays search results or recently updated posts
- Shows a loading spinner with smooth animation
- Handles empty state with a "No posts found" message
- Renders each post using the `ResultsItem` component

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `posts` | Array | - | Array of post objects to display |
| `onSelectPost` | Function | Required | Function to call when a post is selected |
| `loading` | Boolean | false | Whether posts are currently being loaded |


## Implementation Details

- Uses `useEffect` to handle loading spinner animation
- Animates spinner visibility with CSS transitions for smooth appearance/disappearance
- Conditionally renders different content based on posts availability
- Handles array validation to prevent errors with malformed data
