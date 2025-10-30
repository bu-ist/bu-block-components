# useRequestData

## Overview

`useRequestData` is a basically a wrapper around `getEntityRecords` (`getEntityRecord` if the query is not an array), with addtional processing that would be standard practice. This reduces the amount of redundant code within a theme.

## Usage

```jsx
import { useRequestData } from '@bostonuniversity/block-imports';

// Basic usage for fetching multiple items
const [posts, isLoading] = useRequestData('postType', 'post', {
  per_page: 5,
  search: 'example'
});

// Fetching a single item by ID
const [post, isLoading] = useRequestData('postType', 'post', 123);

// Custom entities
const [customData, isLoading, invalidateResolver] = useRequestData(
  'bu-custom/v1',
  'custom-entity-name',
  { per_page: 10 }
);

// Using the invalidateResolver
<button onClick={invalidateResolver}>Refresh Data</button>
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `kind` | string | `'postType'` | The entity kind to fetch (e.g., 'postType', 'taxonomy') |
| `name` | string | `'post'` | The entity name (e.g., 'post', 'page', 'category') |
| `query` | object or number | `{}` | Query parameters for filtering results or a specific ID for single entity retrieval |

## Return Value

The hook returns an array with the following elements:

```js
[
  data,             // The fetched data (array or single entity object)
  isLoading,        // Boolean indicating if the request is in progress
  invalidateResolver // Function to invalidate the resolver and refresh the data
]
```

## Examples

There are a number of examples within the `dev\src\blocks` folder, highliting the flexibility of `useRequestData`:

- `/useRequestData/` - Displays a post title, featured image, and excerpt based on a supplied post ID.
- `/urd-post-list/` - Display a list of posts within a specific post type. This example includes a method for pagination.
- `/urd-post-meta/` - Display the post's meta alongside the title.
- `/urd-post-terms/` - Display a post's terms within a specified taxonomy. This uses `useRequestData` in two separate queries - one to get the post, the second to provide the terms if the previous query was successful.
- `/urd-post-via-term/` - Display a list of posts based on a taxonomy term's slug. This one also requires `useRequestData` to do double work. This time, we need the term id, since we are asking for the slug. The REST API only allows a term id ad an input for the query. The term id can then be used to provide a list of posts.
