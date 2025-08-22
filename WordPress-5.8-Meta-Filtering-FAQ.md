# WordPress 5.8 PostChooser Meta Filtering FAQ

## Problem Statement

**Question**: I have a PostChooser component that uses the `metaFilter` prop to reduce the list of posts to choose from. The issue is the REST API passes the meta keys/values within a 'meta' object. I need to update the modal/index.js to find the meta key within the meta object.

**Context**: WordPress 5.8 install with a PHP developer having some JavaScript experience looking to understand the solution for future troubleshooting.

---

## The Problem Explained

### What Changed in WordPress 5.8

In WordPress 5.8, the REST API changed how it returns post meta data. Instead of including meta fields as top-level properties in the post object, they're now nested within a `meta` object.

**Before WordPress 5.8:**

```javascript
{
  "id": 123,
  "title": {"rendered": "Post Title"},
  "custom_field_key": "custom_field_value"
}
```

**WordPress 5.8+:**

```javascript
{
  "id": 123,
  "title": {"rendered": "Post Title"},
  "meta": {
    "custom_field_key": "custom_field_value"
  }
}
```

### Why This Breaks Meta Filtering

Your PostChooser component was likely expecting meta fields to be available at the top level of the post object. This mismatch causes the `metaFilters` to not work properly because the code can't find the meta values where it's looking for them.

---

## The Solution

The issue is in how the component handles client-side filtering when using `metaFilters`. The code needs to be updated to look for meta values within the `meta` object that WordPress 5.8's REST API provides.

### Implementation

Add these helper functions to your `modal/index.js` file:

```javascript
/**
 * Helper function to safely get meta value from post object.
 * In WordPress 5.8+, meta fields are nested in a 'meta' object.
 * This function handles both nested and top-level meta field access.
 *
 * @param {Object} post - The post object from REST API
 * @param {string} metaKey - The meta key to retrieve
 * @returns {*} The meta value or undefined if not found
 */
const getPostMetaValue = (post, metaKey) => {
    if (!post) return undefined;

    // First check if meta exists in nested 'meta' object (WordPress 5.8+)
    if (post.meta && typeof post.meta === 'object' && post.meta.hasOwnProperty(metaKey)) {
        return post.meta[metaKey];
    }

    // Fallback to top-level property for backward compatibility
    if (post.hasOwnProperty(metaKey)) {
        return post[metaKey];
    }

    return undefined;
};

/**
 * Helper function to filter posts based on meta criteria.
 * Supports both simple meta_key/meta_value filtering and complex meta_query arrays.
 *
 * @param {Array} posts - Array of posts to filter
 * @param {Object} metaFilters - Meta filter criteria
 * @returns {Array} Filtered posts array
 */
const filterPostsByMeta = (posts, metaFilters) => {
    if (!posts || !Array.isArray(posts) || !metaFilters || Object.keys(metaFilters).length === 0) {
        return posts;
    }

    return posts.filter(post => {
        // Handle simple meta_key/meta_value filtering
        if (metaFilters.meta_key && metaFilters.meta_value !== undefined) {
            const metaValue = getPostMetaValue(post, metaFilters.meta_key);
            const compare = metaFilters.meta_compare || '=';

            if (!checkMetaCondition(metaValue, metaFilters.meta_value, compare)) {
                return false;
            }
        }

        // Handle complex meta_query filtering
        if (metaFilters.meta_query && Array.isArray(metaFilters.meta_query)) {
            const relation = metaFilters.meta_query.relation || 'AND';
            const results = metaFilters.meta_query.map(query => {
                if (!query.key || query.value === undefined) return true;

                const metaValue = getPostMetaValue(post, query.key);
                const compare = query.compare || '=';

                return checkMetaCondition(metaValue, query.value, compare, query.type);
            });

            if (relation === 'AND') {
                return results.every(result => result);
            } else if (relation === 'OR') {
                return results.some(result => result);
            }
        }

        return true;
    });
};

/**
 * Helper function to check meta condition based on compare operator.
 *
 * @param {*} metaValue - The actual meta value from the post
 * @param {*} compareValue - The value to compare against
 * @param {string} compare - The comparison operator
 * @param {string} type - The data type (NUMERIC, CHAR, etc.)
 * @returns {boolean} Whether the condition is met
 */
const checkMetaCondition = (metaValue, compareValue, compare = '=', type = 'CHAR') => {
    // Handle undefined/null meta values
    if (metaValue === undefined || metaValue === null) {
        return compare === 'NOT EXISTS';
    }

    // Convert values based on type
    if (type === 'NUMERIC') {
        metaValue = parseFloat(metaValue);
        compareValue = parseFloat(compareValue);
    } else {
        metaValue = String(metaValue);
        compareValue = String(compareValue);
    }

    switch (compare) {
        case '=':
            return metaValue === compareValue;
        case '!=':
            return metaValue !== compareValue;
        case '>':
            return metaValue > compareValue;
        case '>=':
            return metaValue >= compareValue;
        case '<':
            return metaValue < compareValue;
        case '<=':
            return metaValue <= compareValue;
        case 'LIKE':
            return String(metaValue).toLowerCase().includes(String(compareValue).toLowerCase());
        case 'NOT LIKE':
            return !String(metaValue).toLowerCase().includes(String(compareValue).toLowerCase());
        case 'EXISTS':
            return metaValue !== undefined && metaValue !== null;
        case 'NOT EXISTS':
            return metaValue === undefined || metaValue === null;
        default:
            return metaValue === compareValue;
    }
};
```

### Update UseEffect Hooks

Then update your useEffect hooks to apply client-side meta filtering:

```javascript
// Update search results state when individual search results change
// Apply client-side meta filtering since WordPress 5.8 REST API may not handle all meta query options
useEffect(() => {
    const filteredPosts = filterPostsByMeta(recentPosts, metaFilters);
    setSearchResults(prevResults => ({
        ...prevResults,
        recent: {
            posts: filteredPosts,
            totalItems: filteredPosts ? filteredPosts.length : (recentPagination.totalItems || 0),
            totalPages: filteredPosts ? Math.ceil(filteredPosts.length / (baseQuery.per_page || 10)) : (recentPagination.totalPages || 0),
        }
    }));
}, [recentPosts, recentPagination, metaFilters]);

// Apply similar patterns for other search types (content, slug, id)
```

---

## Why This Solution Works

### 1. Backward Compatibility

The `getPostMetaValue()` function checks both the nested `meta` object (WordPress 5.8+) and top-level properties (older versions), ensuring your code works across WordPress versions.

### 2. Client-Side Filtering

WordPress 5.8's REST API has limited support for complex meta queries compared to `WP_Query` in PHP. By doing client-side filtering, we:

- Ensure all meta query features work consistently
- Handle the nested meta object structure properly
- Maintain compatibility across WordPress versions

### 3. Full Meta Query Support

The solution supports both simple meta filtering and complex meta queries:

**Simple filtering:**

```javascript
metaFilters={{
  meta_key: 'featured_post',
  meta_value: 'yes'
}}
```

**Complex filtering:**

```javascript
metaFilters={{
  meta_query: [
    {
      key: 'price',
      value: 100,
      compare: '>=',
      type: 'NUMERIC'
    }
  ]
}}
```

---

## Future Troubleshooting Tips

### 1. Check the REST API Response

Use browser dev tools to inspect the actual post objects returned by the REST API to see how meta fields are structured.

### 2. Test with Different WordPress Versions

The meta structure may vary between versions, so the helper function checks both locations.

### 3. Verify Meta Field Registration

Ensure your custom meta fields are properly registered with `show_in_rest => true` to appear in REST API responses.

### 4. Debug Client-Side Filtering

Add `console.log` statements in the helper functions to see what meta values are being found and how filtering decisions are made.

### 5. PHP Equivalent

Your PostChooser filtering is equivalent to this PHP `WP_Query`:

```php
$args = array(
    'post_type' => 'post',
    'posts_per_page' => 10,
    'meta_query' => array(
        array(
            'key' => 'featured_post',
            'value' => 'yes',
            'compare' => '='
        )
    )
);

$posts = new WP_Query($args);
```

---

## Usage Examples

Your existing usage remains the same:

```javascript
<PostChooser
  metaFilters={{
    meta_key: 'featured_post',
    meta_value: 'yes'
  }}
/>
```

Or with complex queries:

```javascript
<PostChooser
  metaFilters={{
    meta_query: [
      {
        key: 'price',
        value: 100,
        compare: '>=',
        type: 'NUMERIC'
      }
    ]
  }}
/>
```

---

## Summary

This solution maintains backward compatibility while properly handling the WordPress 5.8 meta object structure, ensuring your `metaFilters` work correctly regardless of the WordPress version. The key insight is that WordPress 5.8 changed the REST API response structure, requiring client-side filtering to access nested meta values properly.
