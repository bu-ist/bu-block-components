# useRequestDataWithPagination

## Overview

`useRequestDataWithPagination` is a custom hook that extends the functionality of `useRequestData` to handle paginated data requests. It provides a convenient way to fetch and navigate through data that spans multiple pages, reducing boilerplate code typically needed for pagination implementation.

## Usage

```jsx
// Import the hook
import { useRequestDataWithPagination } from '../hooks/useRequestDataWithPagination';

// Basic usage
const { records, isLoading, invalidateResolver, pagination } = useRequestDataWithPagination(
  'postType', // entity
  'post',     // kind
  {           // query parameters
    per_page: 10,
    page: 1,
    orderby: 'date',
    order: 'desc',
    status: 'publish'
  }
);

// Access pagination information
const { totalItems, totalPages } = pagination;
```

## Examples

### Fetching and displaying posts with pagination

```jsx
import { useState } from '@wordpress/element';
import { useRequestDataWithPagination } from '../hooks/useRequestDataWithPagination';
import { Button, Spinner, Pagination } from '@wordpress/components';

const PostList = () => {
  const [page, setPage] = useState(1);

  // Fetch posts with pagination
  const {
    records: posts,
    isLoading,
    pagination: { totalItems, totalPages }
  } = useRequestDataWithPagination('postType', 'post', {
    per_page: 5,
    page,
    orderby: 'date',
    order: 'desc',
    status: 'publish'
  });

  return (
    <div className="post-list">
      <h2>Posts ({totalItems} total)</h2>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ul>
            {posts?.map(post => (
              <li key={post.id}>
                <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
};
```

### Implementing a search feature with pagination

```jsx
import { useState } from '@wordpress/element';
import { TextControl, Button, Spinner } from '@wordpress/components';
import { useRequestDataWithPagination } from '../hooks/useRequestDataWithPagination';

const SearchPosts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch posts based on search term
  const {
    records: searchResults,
    isLoading,
    pagination: { totalItems, totalPages }
  } = useRequestDataWithPagination('postType', 'post', isSearching ? {
    search: searchTerm,
    per_page: 10,
    page,
    status: 'publish'
  } : {});

  const handleSearch = () => {
    setIsSearching(true);
    setPage(1);
  };

  return (
    <div className="search-posts">
      <div className="search-form">
        <TextControl
          label="Search posts"
          value={searchTerm}
          onChange={setSearchTerm}
        />
        <Button isPrimary onClick={handleSearch}>Search</Button>
      </div>

      {isSearching && (
        <div className="search-results">
          <h3>Results: {totalItems} posts found</h3>

          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <ul>
                {searchResults?.map(post => (
                  <li key={post.id}>
                    <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </li>
                ))}
              </ul>

              <div className="pagination-controls">
                <Button
                  isSecondary
                  disabled={page <= 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous Page
                </Button>
                <span>Page {page} of {totalPages}</span>
                <Button
                  isSecondary
                  disabled={page >= totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  Next Page
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
```

There are several examples within the `dev\src\blocks` folder demonstrating the capabilities of `useRequestDataWithPagination`:

- `/useRequestDataWithPagination/` - Shows how to fetch and display paginated data with basic navigation controls.
- `/urdwp-post-list/` - Implements a paginated post list for a specific post type with prev/next navigation.
- `/urdwp-filtered-results/` - Demonstrates how to combine filtering with pagination for more complex data presentation.
- `/urdwp-search-results/` - Shows how to implement paginated search results with the ability to change page size.
- `/urdwp-infinite-scroll/` - Implements an infinite scroll pattern using the pagination capabilities of the hook.

Each example highlights different aspects of the hook's flexibility, from simple pagination to more complex implementations involving filtering and specialized navigation patterns.
