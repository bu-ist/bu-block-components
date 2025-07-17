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
import {useMemo} from '@wordpress/element';
import {useRequestData} from './useRequestData/index.mjs';

/**
 * Hook for retrieving data from multiple kinds of the same entity type.
 *
 * @param {string} entity           The entity to retrieve. Defaults to postType.
 * @param {string[]} kinds          Array of entity kinds to retrieve. Defaults to ['post'].
 * @param {object | number} [query] Optional. Query to pass to the getEntityRecords request. Defaults to an empty object.
 * @returns {Array} Array containing [data, isLoading, invalidateResolvers]
 */
export const useRequestComplexData = (entity='postType', kinds=['post'], query = {}) => {
    // Create an object to store results for each kind
    const results = useMemo(() => {
        return kinds.map(kind => {
            const [data, isLoading, invalidateResolver] = useRequestData(entity, kind, query);
            return { kind, data, isLoading, invalidateResolver };
        });
    }, [entity, kinds, query]);

    // Extract the data into an object where keys are the kinds
    const data = useMemo(() => {
        return results.reduce((acc, { kind, data }) => {
            acc[kind] = data;
            return acc;
        }, {});
    }, [results]);

    // Determine overall loading state - if any kind is loading, the whole thing is loading
    const isLoading = useMemo(() => {
        return results.some(result => result.isLoading);
    }, [results]);

    // Create a function to invalidate all resolvers
    const invalidateResolvers = () => {
        results.forEach(result => result.invalidateResolver());
    };

    return [data, isLoading, invalidateResolvers];
};
