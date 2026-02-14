# Custom Entity Demo for useRequestData

We've successfully implemented a prototype that demonstrates using custom endpoints with the useRequestData hook in WordPress 5.8. The prototype includes:

## Files Created or Modified:

### 1. Custom Endpoint Registration (PHP)
- `/dev/includes/custom-endpoints.php`: Registers a custom REST API endpoint at `bu-custom/v1/import-bob`
- The endpoint mimics standard WordPress REST API responses for compatibility

### 2. Custom Entity Registration (JavaScript)
- `/dev/src/custom-entities.js`: Registers the custom entity with WordPress core-data store
- Uses `dispatch(coreStore).addEntities()` to define the entity with required properties

### 3. Demo Block Implementation
- `/dev/src/blocks/custom-entity-demo/`: A fully functional block demonstrating multiple approaches
- Shows standard WordPress entity usage vs custom entity usage
- Demonstrates filtering posts by meta values using custom query parameters
- Implements post selection, detail viewing, and data refreshing

### 4. Main Plugin Integration
- Updated `/dev/imports-dev.php` to register the demo block and load necessary dependencies

## How It Works

1. **PHP Side**: The custom endpoint registers a REST API route that follows WordPress conventions but with custom URL
2. **JS Side**: The custom entity is registered with core-data to make it compatible with useRequestData
3. **Block Side**: The demo block shows four implementations side-by-side:
   - Standard WordPress entity approach
   - Custom entity approach
   - Custom entity with meta value filtering (showing posts where `_bob_last_name = Smith`)
   - Custom entity with meta exists filtering (showing posts that have the `_bob_last_name` meta key)

## Usage

To see it working:
1. Build the development project (`cd dev && npm run start`)
2. Start the WordPress environment (`cd dev && npm run env-start`)
3. Add the "Custom Entity Demo" block to a page
4. The block will display posts from both the standard entity and custom entity

## Key Learning Points

1. useRequestData can use custom endpoints by:
   - Registering a custom REST API endpoint in PHP
   - Registering a corresponding custom entity in JavaScript using addEntities action
   - Using useRequestData(kind, name, query) with the custom entity

2. Entity structure requires:
   - kind: Namespace for the entity (e.g., 'bu-custom/v1')
   - name: Used in selectors (e.g., 'import-bob-custom')
   - baseURL: REST API endpoint path (e.g., '/bu-custom/v1/import-bob')

3. REST API response format matters:
   - Custom endpoints should return data in the same format as WordPress endpoints
   - Include standard fields like id, title, content, excerpt, etc.
   - Add pagination headers for compatibility with WordPress conventions
   - Support custom query parameters for advanced filtering:
     - `meta_key` and `meta_value` for filtering by specific meta values
     - `meta_key` and `meta_exists=true` for finding posts with a specific meta key

This prototype provides a complete working example that can be extended to other custom entities and endpoints as needed.
