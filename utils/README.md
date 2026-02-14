# Utilities

Reusable JavaScript utility functions that are not tied to React components or hooks.

## Available Utilities

### registerCustomEntities

A utility for registering custom REST API endpoints as WordPress data entities, making them available through the core data selectors and entity system. This enables seamless integration of custom REST API endpoints with the WordPress data layer.

**Key Benefits:**
- Access your custom API data through WordPress's entity selectors
- Automatic caching and data refresh
- Built-in loading states and error handling
- Standardized data access patterns across all data sources

```javascript
import { registerCustomEntities } from '@bu/block-imports';

const customEntities = [
    {
        name: 'my-custom-entity',       // Used in selectors
        kind: 'my-namespace/v1',        // Namespace/grouping
        baseURL: '/my-namespace/v1/my-endpoint', // Collection endpoint
        route: '/my-namespace/v1/my-endpoint/(?P<id>[\\d]+)', // Single item pattern
        plural: 'my-custom-entities',   // Optional: plural form
        label: 'My Custom Entity',      // Optional: human-readable name
        idType: 'id',                  // Optional: parameter name in route
    }
];

registerCustomEntities(customEntities);

// Usage: Access your data with standard WordPress selectors
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const data = useSelect(select =>
  select(coreStore).getEntityRecords('my-namespace/v1', 'my-custom-entity')
);
```

For comprehensive documentation including implementation details, configuration options, and advanced usage examples, see [registerCustomEntities README](./registerCustomEntities/README.md).
