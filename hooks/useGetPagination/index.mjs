/**
 * WordPress dependencies
 */
import { store as coreStore, getEntityRecords, getEntityRecordsTotalItems, getEntityRecordsTotalPages } from '@wordpress/core-data';
import { select, useSelect } from '@wordpress/data';
import { useState, useEffect, useMemo } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';


// Add a check for the existence of getEntityRecordsTotalItems and getEntityRecordsTotalPages
// These are only available in WordPress 6.5 and later.
// If they are not available, we will use apiFetch to get the pagination information.
const hasNewSelectors = typeof select(coreStore).getEntityRecordsTotalItems === 'function' && typeof select(coreStore).getEntityRecordsTotalPages === 'function';
if ( ! hasNewSelectors) {
	console.warn('getEntityRecordsTotalItems and getEntityRecordsTotalPages are not available in @wordpress/core-data for this Version of WordPress. Using apiFetch instead.');
}


/**
 * Hook for retrieving pagination information from the WordPress REST API.
 *
 * @param {string} kind           The entity kind to retrieve. Defaults to postType.
 * @param {string} name           The entity name to retrieve. Defaults to post.
 * @param {object | number} [query] Optional. Query to pass to the getEntityRecords request. Defaults to an empty object.
 * @returns {Object}                An object containing pagination information: { pagination: { totalItems: number, totalPages: number, perPage: number } }
 */
export const useGetPagination = (kind = 'postType', name = 'post', query = {} ) => {
	// Memoize the query object to ensure stable reference
	const memoizedQuery = useMemo(() => query, [JSON.stringify(query)]);

	// State to hold pagination information
	// This will hold total items and total pages.
	const [pagination, setPagination] = useState({
		totalItems: 0,
		totalPages: 0,
		perPage: memoizedQuery.per_page || 10, // Default to 10 items per page if not specified
	});



	/**
	 * Only runs in WordPress 6.5 and later.
	 * Uses the new getEntityRecordsTotalItems and getEntityRecordsTotalPages selectors
	 * to get the total items and total pages for the specified kind and name.
	 *
	 * Returns an object with totalItems, totalPages, and isLoading.
	 *
	 * If the new selectors are not available, this effect will return an object with
	 * totalItems and totalPages set to 0, and isLoading set to false.
	 */
	const { totalItems, totalPages, isLoading } = useSelect(
		(select) => {
			const coreSelect = select(coreStore);

			return {
				totalItems: hasNewSelectors ? coreSelect.getEntityRecordsTotalItems(kind, name, query) : 0,
				totalPages: hasNewSelectors ? coreSelect.getEntityRecordsTotalPages(kind, name, query) : 0,
				isLoading: hasNewSelectors ? select('core/data').isResolving(
					coreStore,
					'getEntityRecords', [
						kind,
						name,
						query,
					]) : false, // Return false if the new selectors are not available.
			};
		},
		[kind, name, query, hasNewSelectors],
	);

	/**
	 * Updates the pagination state with the total items and total pages
	 * if the new selectors are available and the data is loaded.
	 */
	useEffect(() => {
		if ( ! hasNewSelectors ) return; // If the new selectors are not available, skip this effect.

		if ( ! isLoading && totalItems && totalPages ) {
			// Update the pagination state with total items and pages.
			setPagination(prev => ({
				...prev,
				totalItems: totalItems,
				totalPages: totalPages,
			}));
		}
	}, [totalItems, totalPages, hasNewSelectors, isLoading]);


	/**
	 * Fetches the entity configuration for the specified kind and name.
	 * This allows us to construct the API endpoint for fetching pagination information via apiFetch.
	 *
	 * @effect
	 * @dependency {string} kind	The entity kind.
	 * @dependency {string} name 	The entity name.
	 * @returns {Object} The entity configuration object, or undefined if not found.
	 */
	const entityConfig = useSelect(
		(select) => {
			// Use getEntitiesByKind to get the entity config.
			const entities = select(coreStore).getEntitiesByKind(kind);
			return entities?.find( e => e.name === name );
		},
		[kind, name]
	);

	/**
	 * Fetches pagination information from the WordPress REST API.
	 *
	 * This effect runs whenever records, kind, name, query, or entityConfig changes. It returns
	 * the total items and total pages for the specified kind and name in the same format as
	 * the newer getEntityRecordsTotalItems and getEntityRecordsTotalPages selectors that we don't
	 * have access to yet in this version of WordPress.
	 *
	 * It will not run if the new getEntityRecordsTotalItems and getEntityRecordsTotalPages
	 * selectors are available (WordPress 6.5+).
	 *
	 * After we upgrade to WordPress 6.5 or later, this effect should be able to be removed.
	 *
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
	 * @dependency {Array} [records, kind, name, JSON.stringify(query), entityConfig, pagination]
	 */
	useEffect(() => {
		// Only run this effect if the new selectors are not available, such as before WordPress 6.5.
		if ( hasNewSelectors ) return;

		const loadPaginationData = async () => {
			// If entityConfig is not available, skip fetching pagination data.
			if ( ! entityConfig ) return;

			// Set default values for total items and pages.
			let totalItems = 0;
			let totalPages = 0;

			// Construct the same API path that getEntityRecords uses.
			const path = addQueryArgs( entityConfig.baseURL, {
				...entityConfig.baseURLParams,
				...query,
				// Request the same number of records per page as specified in the query,
				// or default to 10 if not specified.
				per_page: pagination.perPage,
				page: 1, // Only request the first page to get total items and pages.
			});

			try {
				// Make a direct fetch to the REST API.
				const response = await apiFetch( {
					path,
					parse: false
				} );

				// Extract pagination info from the response headers.
				const totalItemsHeader = response.headers.get('X-WP-Total');
				const totalPagesHeader = response.headers.get('X-WP-TotalPages');

				totalItems = totalItemsHeader !== null ? parseInt(totalItemsHeader, 10) : 0;
				totalPages = totalPagesHeader !== null ? parseInt(totalPagesHeader, 10) : 0;

			} catch ( error ) {
				console.error('Error fetching pagination data:', error);
				totalItems = 0;
				totalPages = 0;
			} finally {
				// Update the pagination state.
				setPagination(prev => ({
					...prev,
					totalItems: totalItems,
					totalPages: totalPages,
				}));

			}
		};
		// Call the function to load pagination data.
		// This will run whenever records, kind, name, query, or entityConfig changes
		loadPaginationData();


	}, [memoizedQuery, entityConfig ]);



	// Return the pagination information
	return {
		pagination
	};
};
