# Custom Entity Demo

This demo shows how to use the `registerCustomEntities` utility from the BU Block Imports library to register custom REST API endpoints as WordPress data entities.

## How It Works

### 1. Register Custom Entities

In `dev/src/custom-entities.js`, we use the utility to register custom entities:

```javascript
// For the demo environment, we import directly from the parent directory
import { registerCustomEntities } from '../..';

// When using in a real project, you'd import from the package:
// import { registerCustomEntities } from '@bu/block-imports';

// Define entity configuration
const customEntities = [
    {
        name: 'import-bob-custom',
        kind: 'bu-custom/v1',
        baseURL: '/bu-custom/v1/import-bob',
        plural: 'import-bob-customs',
        label: 'Import Bob Custom',
    }
];

// Register entities
const unsubscribe = registerCustomEntities(customEntities);
```

### 2. Use in Block Components

In `dev/src/blocks/custom-entity-demo/edit.js`, we can access the registered entity with `useRequestData`:

```javascript
const [customPosts, customPostsLoading, invalidateRequest] = useRequestData(
    'bu-custom/v1',
    'import-bob-custom',
    { per_page: 5 }
);
```

## Benefits

- **Simplified Registration**: The utility handles all the complexity of entity registration
- **WordPress 5.8 Compatible**: Works with older WordPress versions
- **Prevents Duplicates**: Checks if entities are already registered
- **Cleanup Function**: Returns an unsubscribe function if needed for cleanup

## Entity Configuration Options

Each entity in the configuration array requires these properties:

- `name`: Entity name used in selectors (e.g., `'import-bob-custom'`)
- `kind`: Entity namespace (e.g., `'bu-custom/v1'`)
- `baseURL`: REST API endpoint path (e.g., `'/bu-custom/v1/import-bob'`)

Optional properties:
- `plural`: Plural form for dynamic selector naming
- `label`: Human-readable label for the entity
