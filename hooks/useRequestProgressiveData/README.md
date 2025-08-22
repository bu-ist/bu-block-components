# useRequestProgressiveData

## Overview

`useRequestProgressiveData` is a specialized React hook that extends the functionality of `useRequestData` by implementing progressive fetching. This hook is designed for scenarios where client-side filtering (such as meta field filtering) might need to fetch posts across multiple pages to find enough matching results.

## Why Use This Hook?

When using client-side filtering with WordPress 5.8's REST API, you might encounter situations where:

- Only a few posts out of hundreds match your filter criteria
- Those matching posts are scattered across multiple pages
- Standard pagination would miss many matching results
- You need to ensure users can see all available matching content

This hook solves these problems by automatically fetching additional pages until it has enough filtered results.

## Features

- **Progressive Fetching**: Automatically fetches additional pages until target results are met
- **Client-Side Filtering**: Apply custom filter functions to results as they're fetched
- **Safety Limits**: Prevents infinite fetching with configurable maximum pages
- **Flexible Configuration**: Customizable page size, target results, and filter functions
- **Performance Optimized**: Only fetches additional pages when needed
- **Compatible with WordPress Data**: Works seamlessly with WordPress core data stores

## Usage

### Basic Usage

```javascript
import { useRequestProgressiveData } from '@bostonuniversity/block-imports';

// Simple usage without filtering (acts like useRequestData)
const [posts, isLoading, pagination, invalidateResolver] = useRequestProgressiveData(
  'postType',
  'post',
  { status: 'publish', orderby: 'date' }
);
```

### With Client-Side Filtering

```javascript
import { useRequestProgressiveData } from '@bostonuniversity/block-imports';

// Filter function for meta fields
const metaFilter = (posts) => {
  return posts.filter(post => {
    const metaValue = post.meta?.featured_post || post.featured_post;
    return metaValue === 'yes';
  });
};

const [filteredPosts, isLoading, pagination, invalidateResolver] = useRequestProgressiveData(
  'postType',
  'post',
  { status: 'publish', orderby: 'date' },
  {
    filter: metaFilter,
    targetResults: 10,
    maxPages: 20,
    pageSize: 50
  }
);
```

### Integration with PostChooser

```javascript
// In your PostChooser component
const metaFilters = { featured_post: 'yes' };

const filterFunction = (posts) => {
  return filterPostsByMeta(posts, metaFilters);
};

const [posts, loading, pagination] = useRequestProgressiveData(
  'postType',
  selectedPostType,
  baseQuery,
  {
    filter: filterFunction,
    targetResults: 10,
    maxPages: 15,
    pageSize: 30
  }
);
```

## Parameters

### Hook Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `entity` | string | `'postType'` | The entity type to fetch (e.g., 'postType', 'taxonomy') |
| `kind` | string | `'post'` | The entity kind (e.g., 'post', 'page', 'product') |
| `query` | object | `{}` | Query parameters for the REST API request |
| `options` | object | `{}` | Progressive fetching options (see below) |

### Options Object

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `filter` | function | `null` | Client-side filter function to apply to results |
| `targetResults` | number | `10` | Target number of filtered results to achieve |
| `maxPages` | number | `10` | Maximum pages to fetch (prevents infinite loops) |
| `pageSize` | number | `20` | Number of items to fetch per page |

### Filter Function

The filter function receives an array of posts and should return the filtered array:

```javascript
const filterFunction = (posts) => {
  // Your filtering logic here
  return posts.filter(post => {
    // Return true to keep the post, false to filter it out
    return someCondition;
  });
};
```

## Return Value

The hook returns an array with four elements:

1. **`filteredData`** (Array|null): The filtered results from progressive fetching
2. **`isLoading`** (Boolean): Whether the hook is currently fetching data
3. **`pagination`** (Object): Pagination information for the filtered results
4. **`invalidateResolver`** (Function): Function to invalidate and refresh the data

### Pagination Object

```javascript
{
  totalItems: 25,        // Total number of filtered items found
  totalPages: 3,         // Number of pages based on targetResults
  hasMore: false         // Whether more pages could potentially be fetched
}
```

## Examples

### WordPress 5.8 Meta Filtering

```javascript
// Helper function for WordPress 5.8 meta filtering
const createMetaFilter = (metaFilters) => {
  return (posts) => {
    return posts.filter(post => {
      // Handle WordPress 5.8+ nested meta structure
      for (const [key, value] of Object.entries(metaFilters)) {
        const metaValue = post.meta?.[key] || post[key];
        if (metaValue !== value) {
          return false;
        }
      }
      return true;
    });
  };
};

// Usage in component
const metaFilters = { featured_post: 'yes', event_type: 'conference' };

const [posts, loading] = useRequestProgressiveData(
  'postType',
  'event',
  { status: 'publish' },
  {
    filter: createMetaFilter(metaFilters),
    targetResults: 12,
    maxPages: 25
  }
);
```

### Complex Filtering with Multiple Conditions

```javascript
const complexFilter = (posts) => {
  return posts.filter(post => {
    // Meta field check
    const isFeature = post.meta?.featured === 'yes';
    
    // Date check
    const eventDate = new Date(post.meta?.event_date);
    const isFuture = eventDate > new Date();
    
    // Category check (if available)
    const hasCategory = post.categories?.includes(5);
    
    return isFeature && isFuture && hasCategory;
  });
};

const [events, loading] = useRequestProgressiveData(
  'postType',
  'event',
  { status: 'publish', orderby: 'date' },
  {
    filter: complexFilter,
    targetResults: 8,
    maxPages: 30,
    pageSize: 25
  }
);
```

### With Search Terms

```javascript
const [searchResults, loading] = useRequestProgressiveData(
  'postType',
  'post',
  {
    status: 'publish',
    search: 'wordpress',
    orderby: 'relevance'
  },
  {
    filter: (posts) => posts.filter(post => post.meta?.priority === 'high'),
    targetResults: 15,
    maxPages: 10
  }
);
```

## Performance Considerations

### When to Use

- **Use** when you need client-side filtering that might miss results due to pagination
- **Use** when you have sparse data (few matching items across many pages)
- **Use** for WordPress 5.8+ meta filtering where REST API support is limited

### When NOT to Use

- **Don't use** for simple queries without filtering (use `useRequestData` instead)
- **Don't use** when the REST API already supports your filtering needs
- **Don't use** for very large datasets without careful configuration

### Optimization Tips

1. **Set appropriate `maxPages`** to prevent excessive API calls
2. **Use larger `pageSize`** to reduce the number of requests
3. **Implement efficient filter functions** to minimize processing time
4. **Consider caching** for frequently used filter combinations

## Troubleshooting

### Common Issues

**Issue**: Hook never stops loading
**Solution**: Check your filter function and ensure `maxPages` is set appropriately

**Issue**: Not enough results returned
**Solution**: Increase `maxPages` or decrease `targetResults`

**Issue**: Too many API requests
**Solution**: Increase `pageSize` or decrease `maxPages`

### Debug Logging

The hook includes console logging to help with debugging:

```javascript
// Enable detailed logging in development
console.log('useRequestProgressiveData called:', { entity, kind, query, options });
```

### Testing Filter Functions

```javascript
// Test your filter function independently
const testPosts = [...]; // Your test data
const filteredResults = yourFilterFunction(testPosts);
console.log(`Filter test: ${testPosts.length} -> ${filteredResults.length}`);
```

## Integration with Existing Code

### Replacing useRequestData

```javascript
// Before (useRequestData)
const [posts, loading] = useRequestData('postType', 'post', query);

// After (useRequestProgressiveData with no filtering)
const [posts, loading] = useRequestProgressiveData('postType', 'post', query);

// After (useRequestProgressiveData with filtering)
const [posts, loading] = useRequestProgressiveData(
  'postType',
  'post',
  query,
  {
    filter: yourFilterFunction,
    targetResults: 10
  }
);
```

### PostChooser Integration

This hook is particularly useful in the PostChooser component for WordPress 5.8 meta filtering scenarios where you need to ensure users can find all matching posts regardless of which "page" they're on.

## Future Improvements

- **Parallel fetching**: Fetch multiple pages simultaneously for better performance
- **Smart caching**: Cache filter results to reduce duplicate processing
- **Adaptive page sizing**: Automatically adjust page size based on filter efficiency
- **Progress callbacks**: Provide progress information for long-running filters