# registerCustomEntities

A utility for registering custom REST API endpoints as entities in the WordPress data store system. This makes the entities available through the core data selectors and dispatch functions.

## Understanding Custom Entities for WordPress Developers

### The WordPress REST API and Block Editor Connection

As a WordPress developer, you're likely familiar with registering custom REST API endpoints using `register_rest_route()` in PHP:

```php
register_rest_route( 'my-namespace/v1', '/my-endpoint', array(
    'methods'  => 'GET',
    'callback' => 'my_endpoint_callback',
    // ...
) );
```

This creates an endpoint that's accessible at `/wp-json/my-namespace/v1/my-endpoint`. However, there's a gap between making these endpoints available and being able to use them easily in the block editor.

### The Entity System: WordPress Core's Data Management Layer

The WordPress block editor uses an internal system called "entities" to interact with data. Core entities include posts, pages, users, etc. - the things WordPress already knows how to CRUD through the REST API. The entity system maps JavaScript functions to REST API endpoints.

For example, when you call:

```javascript
wp.data.select('core').getEntityRecord('postType', 'post', 123);
```

Behind the scenes, WordPress knows to fetch from `/wp-json/wp/v2/posts/123`.

### The Problem: Custom Endpoints Aren't Auto-Registered

If you've registered a custom endpoint in PHP, the block editor doesn't automatically know about it. There's no built-in way to call:

```javascript
// This won't work automatically for custom endpoints
wp.data.select('core').getEntityRecord('my-namespace/v1', 'my-endpoint', 123);
```

### The Solution: Register Your Endpoints as Entities

This is where `registerCustomEntities` comes in. It bridges the gap by telling the WordPress data system about your custom endpoints, effectively saying: "When someone asks for data from 'my-namespace/v1', 'my-endpoint', here's the REST API URL to use."

It's like creating a mapping between your JavaScript data needs and your PHP-registered REST API endpoints.

## Usage

```javascript
import { registerCustomEntities } from '@bu/block-imports';

// Define custom entities configuration
const customEntities = [
    {
        // Required properties
        name: 'my-custom-entity',       // Entity name - used in selectors
        kind: 'my-namespace/v1',        // Entity kind - namespace
        baseURL: '/my-namespace/v1/my-endpoint', // REST API endpoint path for collection

        // For single entity retrieval (getEntityRecord)
        route: '/my-namespace/v1/my-endpoint/(?P<id>[\\d]+)',
        idType: 'id',                  // Type of identifier used in the route pattern

        // Optional properties
        plural: 'my-custom-entities',   // Plural form for dynamic selector naming
        label: 'My Custom Entity',      // Human-readable label
    },
    // Add more entity configurations as needed
];

// Register the entities
const unsubscribe = registerCustomEntities(customEntities);

// If you want to cancel the subscription at some point:
// unsubscribe();
```

## Entity Configuration Options

| Property | Required | Type | Description |
|----------|----------|------|-------------|
| name | Yes | String | The entity name used in selectors (e.g., `getEntityRecord('my-namespace/v1', 'my-custom-entity', id)`) |
| kind | Yes | String | The entity kind, typically your namespace with version |
| baseURL | Yes | String | The REST API endpoint path for collection |
| route | No | String | The REST API route pattern for single entity retrieval (e.g., `/my-namespace/v1/my-endpoint/(?P<id>[\\d]+)`) |
| idType | No | String | Type of identifier used in the route pattern. Default is 'id'. Can be 'id', 'slug', or a custom value matching your route parameter |
| plural | No | String | Plural form of the name, used for dynamic selector naming |
| label | No | String | Human-readable label for the entity |

## Why You Need This: From PHP to JavaScript

### The Traditional WordPress Way

In traditional WordPress PHP development, you might fetch data like this:

```php
// PHP: Get a custom post type
$posts = get_posts(['post_type' => 'my_custom_type']);

// PHP: Call your own custom endpoint function directly
$data = my_custom_data_function();
```

### The Block Editor Challenge

In the block editor (Gutenberg), components are built with React and need to fetch data asynchronously. WordPress created a data system to standardize this, but it only works with known entity types by default.

Consider these two scenarios:

1. **Built-in WordPress data:**
   ```javascript
   // This works automatically because WordPress knows about "post" entities
   const posts = useSelect(select => select('core').getEntityRecords('postType', 'post'));
   ```

2. **Your custom endpoint data:**
   ```javascript
   // Without registration, WordPress doesn't know how to fetch from your custom endpoint
   const myData = useSelect(select => select('core').getEntityRecords('my-namespace/v1', 'my-endpoint'));
   ```

### The Bridge: Entity Registration

`registerCustomEntities` solves this by registering your custom endpoints with WordPress's data system:

1. **You create an endpoint in PHP:**
   ```php
   register_rest_route('my-namespace/v1', '/my-endpoint', [...]);
   ```

2. **You register it as an entity in JavaScript:**
   ```javascript
   registerCustomEntities([{
     name: 'my-endpoint',
     kind: 'my-namespace/v1',
     baseURL: '/my-namespace/v1/my-endpoint'
   }]);
   ```

3. **Now you can use it with standard data methods:**
   ```javascript
   const myData = useSelect(select =>
     select('core').getEntityRecords('my-namespace/v1', 'my-endpoint')
   );
   ```

### Real-World Benefits

- **Standardization**: Use the same data fetching patterns for custom endpoints as core WordPress data
- **Caching**: WordPress entity system handles caching and batching of requests
- **Reactivity**: UI automatically updates when data changes through the entity system
- **Tools Integration**: Compatible with WordPress developer tools and state inspection
- **Less Code**: Avoid writing custom fetch code, state management, and loading indicators

## Technical Benefits

- **Configuration-Driven**: Define multiple entities in a single configuration array
- **Duplicate Detection**: Prevents re-registering entities that are already registered
- **WordPress 5.8 Compatible**: Uses both immediate registration and subscription to ensure entities are registered as soon as possible
- **Efficient Registration**: Registers all entities in a single call to `addEntities`

## Implementation Notes

The utility handles several edge cases:
- Empty arrays or non-array inputs
- Already registered entities (prevents duplicates)
- Core store availability checking
- Error handling during registration

## Example Usage with WordPress Data Store

After registration, you can use the WordPress data store to query your custom entity:

```javascript
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

function MyComponent({ entityId }) {
    const myEntity = useSelect(select =>
        select(coreStore).getEntityRecord('my-namespace/v1', 'my-custom-entity', entityId),
        [entityId]
    );

    // Use myEntity data...
}
```

### Using with the useRequestData Hook

If you're using BU Block Imports, the `useRequestData` hook makes this even easier:

```javascript
import { useRequestData } from '@bu/block-imports';

function MyComponent({ entityId }) {
    // For a collection of items
    const [items, isLoading] = useRequestData(
        'my-namespace/v1',
        'my-endpoint',
        { per_page: 10 }
    );

    // For a single item
    const [singleItem, isSingleLoading] = useRequestData(
        'my-namespace/v1',
        'my-endpoint',
        entityId // Automatically uses getEntityRecord when passed an ID
    );

    // ...rest of component
}
```

## Comparison with Direct API Calls

| Without Entity Registration | With Entity Registration |
|----------------------------|--------------------------|
| `const [data, setData] = useState(null);`<br>`useEffect(() => {`<br>`  apiFetch({ path: '/my-namespace/v1/my-endpoint' }).then(setData);`<br>`}, []);` | `const data = useSelect(select =>`<br>`  select(coreStore).getEntityRecords('my-namespace/v1', 'my-endpoint')`<br>`);` |
| Manual loading state | Automatic loading state |
| Manual error handling | Built-in error handling |
| No caching | Automatic caching |
| Need to track stale data | Automatic refresh management |
