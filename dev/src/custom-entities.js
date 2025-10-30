/**
 * WordPress dependencies
 */
import { registerCustomEntities } from '../..';

/**
 * Register custom endpoints and entities
 *
 * This file provides a system for registering multiple custom entities
 * from REST API endpoints, making them available through the WordPress data store system.
 *
 * We're now using the registerCustomEntities utility from the block-imports package.
 */

/**
 * Configuration for custom entities
 *
 * This array defines all custom entities to be registered.
 * Add new entities here following the same structure.
 */
const customEntities = [
	{
		// Required properties
		name: 'import-bob', // Entity name - used in selectors
		kind: 'bu-custom/v1', // Entity kind - namespace
		baseURL: '/bu-custom/v1/import-bob', // REST API endpoint path
		route: '/bu-custom/v1/import-bob/(?P<id>[\\d]+)', // Single item route pattern (for getEntityRecord)

		// Optional properties
		plural: 'import-bobs', // Plural form for dynamic selector naming
		label: 'Import Bob Custom', // Human-readable label

		// Define the type of identifier used (id, slug, or custom)
		idType: 'id', // Identifies the parameter type in the single item endpoint
	},
	// Example of how to add additional entities:
	/*
    {
        name: 'another-custom-entity',
        kind: 'bu-custom/v1',
        baseURL: '/bu-custom/v1/another-endpoint',
        plural: 'another-custom-entities',
        label: 'Another Custom Entity',
    }
    */
];

/**
 * Register the custom entities using the utility from block-imports
 *
 * Benefits of using the utility:
 * 1. Simplified code - no need to implement registration logic in this file
 * 2. Consistent approach across projects
 * 3. Built-in duplicate detection and error handling
 * 4. WordPress 5.8 compatibility with both immediate registration and subscription
 */
const unsubscribe = registerCustomEntities( customEntities );

/**
 * The utility returns an unsubscribe function that can be used for cleanup
 * This is typically unnecessary for plugin initialization but shown here for completeness
 *
 * Example cleanup use case:
 * if (needToCleanup) {
 *   unsubscribe();
 * }
 */
