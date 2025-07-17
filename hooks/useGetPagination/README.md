# useGetPagination

## Overview

`useGetPagination` is a custom React hook that retrieves pagination information for WordPress REST API data. For a give query it provides total counts and total pages information without fetching all the data.

## Features

- Works in both newer WordPress (6.5+) and older versions (5.8+)
- Automatically uses modern core selectors when available
- Falls back to direct REST API calls in older WordPress versions
- Provides consistent pagination information regardless of WordPress version
- Optimized to minimize data transfer when counting records

## Usage

```jsx
import { useGetPagination } from '@bostonuniversity/block-imports';

// Basic usage
const { pagination } = useGetPagination('postType', 'post', {
  search: 'example',
  per_page: 10
});

// Access pagination info
const { totalItems, totalPages } = pagination;
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `entity` | string | `'postType'` | The entity type to fetch (e.g., 'postType', 'taxonomy') |
| `kind` | string | `'post'` | The entity kind (e.g., 'post', 'page', 'category') |
| `query` | object | `{}` | Query parameters to filter results |

## Return Value

The hook returns an object with a `pagination` property containing:

```js
{
  pagination: {
    totalItems: number, // Total number of items matching the query
    totalPages: number, // Total number of pages based on per_page setting
    perPage: number     // Items per page (from query or default 10)
  }
}
```

## Implementation Details

This hook uses two different methods to retrieve pagination data, depending on the WordPress version:

1. **WordPress 6.5+**: Uses the modern `getEntityRecordsTotalItems` and `getEntityRecordsTotalPages` selectors from `@wordpress/core-data`

2. **WordPress <6.5**: Falls back to making a lightweight REST API request using `apiFetch` to extract pagination headers

The hook automatically detects which method to use, making it backward compatible while still leveraging the latest WordPress features when available.

## Examples

### Basic example with search query

```jsx
import { useGetPagination } from '@bostonuniversity/block-imports';
import { useState } from '@wordpress/element';

const PaginationInfo = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { pagination } = useGetPagination('postType', 'post', {
    search: searchTerm,
    per_page: 10
  });

  return (
    <div>
      <p>Total items: {pagination.totalItems}</p>
      <p>Total pages: {pagination.totalPages}</p>
    </div>
  );
};
```

### Using with a custom post type

```jsx
import { useGetPagination } from '@bostonuniversity/block-imports';

const EventsPagination = () => {
  const { pagination } = useGetPagination('postType', 'event', {
    per_page: 5,
    orderby: 'date',
    order: 'desc'
  });

  return (
    <div>
      <p>Found {pagination.totalItems} events ({pagination.totalPages} pages)</p>
    </div>
  );
};
```

### Combined with useRequestData

```jsx
import { useGetPagination } from '@bostonuniversity/block-imports';
import { useRequestData } from '@bostonuniversity/block-imports';
import { useState } from '@wordpress/element';
import { Pagination } from '@wordpress/components';

const PostList = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);

  // Get data for current page
  const [posts, isLoading] = useRequestData('postType', 'post', {
    per_page: perPage,
    page: page
  });

  // Get pagination info
  const { pagination } = useGetPagination('postType', 'post', {
    per_page: perPage
  });

  return (
    <div>
      {/* Display posts */}
      {posts && posts.map(post => (
        <div key={post.id}>{post.title.rendered}</div>
      ))}

      {/* Pagination controls */}
      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={pagination.totalPages}
          onChange={setPage}
        />
      )}
    </div>
  );
