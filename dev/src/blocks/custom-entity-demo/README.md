# Custom Entity Demo Block

This block demonstrates how to use the `useRequestData` hook with both standard WordPress entities and custom entities.

## Features

- Fetches posts using the standard WordPress entity route (`wp/v2/posts`)
- Fetches import-bob posts using a custom entity route (`bu-custom/v1/import-bob`)
- Demonstrates filtering posts by meta values (`_bob_last_name = Smith`)
- Shows how to query for posts where a meta key exists (regardless of value)
- Allows selecting posts from either data source
- Demonstrates the structure for registering custom endpoints and entities

## Implementation Details

This block showcases four different approaches to fetching data:

1. **Standard WordPress Entity**: Uses the built-in WordPress REST API endpoint for posts
2. **Custom Entity**: Uses a custom endpoint registered in PHP and a custom entity registered in JavaScript
3. **Custom Entity with Meta Value Query**: Shows how to filter posts by specific meta field values
4. **Custom Entity with Meta Exists Query**: Shows how to find posts where a meta key exists (regardless of value)

### Files involved:

- `/includes/custom-endpoints.php`: Registers the custom REST API endpoint
- `/src/custom-entities.js`: Registers the custom entity with WordPress core-data store
- `/src/blocks/custom-entity-demo/`: The demo block implementation

## Usage

1. Add the block to a page or post
2. Select from either WordPress posts or import-bob posts
3. Click on a post to see its details

This implementation demonstrates how to extend the `useRequestData` hook for custom endpoints, following the parameter order of (kind, name, query).
