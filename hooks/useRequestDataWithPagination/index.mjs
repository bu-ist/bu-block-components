/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

// Internal dependencies
import { useRequestData } from '../useRequestData/index.mjs';

/**
 * Hook for retrieving data from the WordPress REST API.
 *
 * @param {string} entity           The entity to retrieve. Defaults to postType.
 * @param {string} kind             The entity kind to retrieve. Defaults to post.
 * @param {object | number} [query] Optional. Query to pass to the getEntityRecords request. Defaults to an empty object. If a number is passed, it is used as the ID of the entity to retrieve via getEntityRecord.
 * @return {Object}            	    Object with records and pagination info
 */
/**
 * Custom hook to fetch entity records with pagination information.
 *
 * This hook extends the functionality of useRequestData by also fetching
 * pagination metadata from the WordPress REST API, such as total items and total pages.
 *
 * @param {string} entity - The entity type to fetch (e.g., 'postType', 'taxonomy'). Default: 'postType'.
 * @param {string} kind - The kind of entity to fetch (e.g., 'post', 'page', 'category'). Default: 'post'.
 * @param {Object|number} query - Query parameters for fetching records or a specific record ID. Default: {}.
 * @returns {Object} Object containing:
 *   - records: The fetched entity records
 *   - isLoading: Boolean indicating if data is being loaded
 *   - invalidateResolver: Function to invalidate the current data and trigger a refetch
 *   - pagination: Object containing pagination information:
 *     - totalItems: Total number of items matching the query
 *     - totalPages: Total number of pages available for the query
 *
 * @example
 * // Fetch posts with pagination
 * const { records, isLoading, pagination } = useRequestDataWithPagination('postType', 'post', { per_page: 10, page: 2 });
 *
 * // Access pagination info
 * console.log(`Showing page 2 of ${pagination.totalPages} (${pagination.totalItems} total items)`);
 */
export const useRequestDataWithPagination = (entity='postType', kind='post', query = {} ) => {
	// State to hold pagination information
	// This will hold total items and total pages.
	const [pagination, setPagination] = useState({
		totalItems: 0,
		totalPages: 0,
		perPage: query.per_page || 10, // Default to 10 items per page if not specified
	});

	// Use the existing useRequestData hook to fetch records
	// This will return the records and loading state.
	// The query can be an object or a number (for single record).
	// If a number is passed, it will use getEntityRecord instead of getEntityRecords
	// to fetch a single record.
	// If an object is passed, it will use getEntityRecords to fetch multiple records.
	const [ records, isLoading, invalidateResolver ] = useRequestData(entity, kind, query);

	/**
	 * Fetches the entity configuration for the specified entity and kind.
	 * This allows us to construct the API endpoint for fetching pagination information.
	 *
	 * @effect
	 * @dependency {string} entity
	 * @dependency {string} kind
	 * @returns {Object} The entity configuration object, or undefined if not found.
	 */
	const entityConfig = useSelect(
		(select) => {
			// Use getEntitiesByKind to get the entity config.
			const entities = select(coreStore).getEntitiesByKind(entity);
			return entities?.find( e => e.name === kind );
		},
		[entity, kind]
	);

	/**
	 * Fetches pagination information from the WordPress REST API.
	 *
	 * This effect runs whenever records, entity, kind, query, or entityConfig changes.
	 * It makes a direct API request to the same endpoint that getEntityRecords uses,
	 * but with a minimal per_page setting to reduce data transfer.
	 *
	 * The effect extracts total items and total pages from the response headers
	 * (X-WP-Total and X-WP-TotalPages) and updates the pagination state.
	 *
	 * ToDo: In future WordPress versions (6.4+), this might be replaceable with
	 * the getEntityRecordsTotalItems and getEntityRecordsTotalPages selectors.
	 *
	 * @effect
	 * @dependency {Array} [records, entity, kind, JSON.stringify(query), entityConfig, pagination]
	 */
	useEffect(() => {
		if ( entityConfig ) {
			// Construct the same API path that getEntityRecords uses.
			const path = addQueryArgs( entityConfig.baseURL, {
				...entityConfig.baseURLParams,
				...query,
				// Request the same number of records per page as specified in the query,
				// or default to 10 if not specified.
				per_page: pagination.perPage,
				page: 1, // Only request the first page to get total items and pages.
			});

			// Make a direct fetch to the REST API.
			apiFetch( {
				path,
				parse: false
			}).then( response => {
				// Extract pagination info from the response headers.
				const totalItemsHeader = response.headers.get('X-WP-Total');
				const totalPagesHeader = response.headers.get('X-WP-TotalPages');

				const totalItems = totalItemsHeader !== null ? parseInt(totalItemsHeader, 10) : 0;
				const totalPages = totalPagesHeader !== null ? parseInt(totalPagesHeader, 10) : 0;

				// Update the pagination state.
				setPagination({
					totalItems,
					totalPages,
				});
			}).catch( error => {
				console.error('Error fetching pagination data:', error);
				// Handle error appropriately, e.g., set pagination to zero.
				setPagination({
					totalItems: 0,
					totalPages: 0,
				});
			});
		}
	}, [records, entity, kind, JSON.stringify(query), entityConfig, pagination]);

	// Return the records, loading state, and pagination information
	return {
		records,
		isLoading,
		invalidateResolver,
		pagination
	};
};
