# Using `addEntities` Directly: Simple Example

This example shows how to use WordPress core's `addEntities` function directly to register a custom REST API endpoint as a data entity. This is the underlying mechanism that powers the `registerCustomEntities` utility.

## The Basics

At its core, registering a custom endpoint is as simple as:

```javascript
import { dispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

// Register a single entity
dispatch(coreStore).addEntities([
    {
        name: 'book',               // Entity name
        kind: 'library/v1',         // Namespace
        baseURL: '/library/v1/books', // Collection endpoint
        route: '/library/v1/books/(?P<id>[\\d]+)' // Single item pattern
    }
]);
```

That's it! This tells WordPress that there is an endpoint at `/wp-json/library/v1/books` that returns a collection of items, and `/wp-json/library/v1/books/123` returns a single item.

## Complete Example

Here's a more complete example showing how to register and then use the entity:

```javascript
/**
 * WordPress dependencies
 */
import { dispatch, select } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Register custom entity
 */
function registerBookEntity() {
    // Basic entity configuration
    const bookEntity = {
        name: 'book',
        kind: 'library/v1',
        baseURL: '/library/v1/books',
        route: '/library/v1/books/(?P<id>[\\d]+)',

        // Optional properties
        label: 'Book',          // Human-readable name
        plural: 'books',        // Plural form
        key: 'id'               // Record identifier property
    };

    // Register with core data store
    dispatch(coreStore).addEntities([bookEntity]);
}

// Call this during initialization
registerBookEntity();

/**
 * Use the registered entity in a component
 */
function BookList() {
    // Get all books
    const books = useSelect(select =>
        select(coreStore).getEntityRecords('library/v1', 'book')
    );

    // Get a specific book
    const singleBook = useSelect(select =>
        select(coreStore).getEntityRecord('library/v1', 'book', 123)
    );

    // Is the data still loading?
    const isLoading = useSelect(select =>
        select(coreStore).isResolving('getEntityRecords', ['library/v1', 'book'])
    );

    // Render your component using books, singleBook, and isLoading
    return (
        <div>
            {isLoading ? (
                <p>Loading books...</p>
            ) : (
                <ul>
                    {books?.map(book => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
```

## PHP Side: Required REST API Registration

For the entity registration to work, you need the corresponding PHP code to create the REST API endpoint:

```php
add_action('rest_api_init', function() {
    // Register collection endpoint
    register_rest_route('library/v1', '/books', [
        'methods'  => 'GET',
        'callback' => function() {
            return [
                ['id' => 1, 'title' => 'The Great Gatsby'],
                ['id' => 2, 'title' => 'Moby Dick'],
                // More books...
            ];
        },
        'permission_callback' => '__return_true',
    ]);

    // Register single item endpoint
    register_rest_route('library/v1', '/books/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => function($request) {
            $id = $request['id'];
            // Return a single book by ID
            return ['id' => $id, 'title' => 'Book #' . $id];
        },
        'permission_callback' => '__return_true',
    ]);
});
```

## How It Works

When you call `addEntities`:

1. WordPress registers your entity configuration in its data store
2. This creates a mapping between your REST API endpoints and WordPress data selectors
3. When you call selectors like `getEntityRecords`, WordPress knows how to fetch from your endpoint
4. The core data system handles caching, tracking loading states, and error management

## Why Use `registerCustomEntities` Instead?

Our `registerCustomEntities` utility adds several benefits over direct use:

1. **Duplicate detection**: Prevents registering the same entity multiple times
2. **WordPress 5.8+ compatibility**: Uses subscription to ensure entities register at the right time
3. **Batch registration**: Register multiple entities in a cleaner way

However, understanding this simple direct approach helps you see what's happening under the hood.
