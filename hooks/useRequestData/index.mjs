/**
 * External dependencies
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import isObject from 'lodash/isObject.js';

/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Hook for retrieving data from the WordPress REST API.
 *
 * @param {string} kind             The entity kind to retrieve. Defaults to postType.
 * @param {string} name             The entity name to retrieve. Defaults to post.
 * @param {object | number} [query] Optional. Query to pass to the getEntityRecords request. Defaults to an empty object. If a number is passed, it is used as the ID of the entity to retrieve via getEntityRecord.
 * @returns {Array} The data returned from the request.
 */
export const useRequestData = (kind='postType', name='post', query = {} ) => {
	const whichGER = isObject(query) ? 'getEntityRecords' : 'getEntityRecord';
	const { invalidateResolution } = useDispatch('core/data');
	const { data, isLoading } = useSelect(
		(select) => {
			return {
				data: select(coreStore)[whichGER](kind, name, query),
				isLoading: select('core/data').isResolving(coreStore, whichGER, [
					kind,
					name,
					query,
				]),
			};
		},
		[kind, name, query],
	);

	const invalidateResolver = () => {
		invalidateResolution(coreStore, whichGER, [kind, name, query]);
	};

	return [data, isLoading, invalidateResolver];
};
