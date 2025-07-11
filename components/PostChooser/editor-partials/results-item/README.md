# ResultsItem

## Overview

The `ResultsItem` component renders an individual post in the search results list. It displays post details and provides a selection button.

## Features

- Displays post title, modification date, and status
- Shows the post type in a badge format
- Provides a "Select" button for choosing the post
- Styled with hover effects for better user experience

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `post` | Object | Required | WordPress post object with title, modified date, status, and type |
| `onSelectPost` | Function | Required | Function to call when the post is selected |

## Usage

```jsx
import { ResultsItem } from '@components/PostChooser/editor-partials/results-item';

const MyPostItem = () => {
  const post = {
    id: 123,
    title: { rendered: 'Sample Post Title' },
    modified: '2023-07-15T10:30:45',
    status: 'publish',
    type: 'post'
  };

  const handleSelectPost = (selectedPost) => {
    console.log('Selected:', selectedPost.title.rendered);
  };

  return (
    <ResultsItem
      post={post}
      onSelectPost={handleSelectPost}
    />
  );
};
```

## Implementation Details

- Uses WordPress `Button` component for the select action
- Formats the modification date using JavaScript's `toLocaleDateString()`
- Renders HTML-encoded titles with proper escaping (`post.title.rendered`)
- Styled with CSS Grid for responsive layout
