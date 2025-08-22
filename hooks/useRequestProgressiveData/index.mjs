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
import { useState, useEffect, useCallback, useRef } from '@wordpress/element';

/**
 * Hook for progressively retrieving and filtering data from the WordPress REST API.
 *
 * This hook is designed for scenarios where client-side filtering (like meta filtering)
 * might need to fetch posts across multiple pages to find enough matching results.
 * It continues fetching pages until it has enough filtered results or hits safety limits.
 *
 * @param {string} entity           The entity to retrieve. Defaults to postType.
 * @param {string} kind             The entity kind to retrieve. Defaults to post.
 * @param {object} query            Query to pass to the geEntityRecords request.
 * @param {object} options          Additional options for progressive fetching.
 * @param {function} options.filter Optional client-side filter function to apply to results.
 * @param {number} options.targetResults Target number of filtered results to fetch (default: 10).
 * @param {number} options.maxPages Maximum pages to fetch to prevent infinite loops (default: 10).
 * @param {number} options.pageSize Number of items per page to fetch (default: 20).
 * @returns {Array} [filteredData, isLoading, pagination, invalidateResolver]
 */
export const useRequestProgressiveData = (
    entity = 'postType',
    kind = 'post',
    query = {},
    options = {}
) => {
    const {
        filter = null,
        targetResults = 10,
        maxPages = 10,
        pageSize = 20
    } = options;

    console.log('useRequestProgressiveData called:', { entity, kind, query, options });

    // Use refs to store stable values and prevent infinite loops
    const queryRef = useRef(JSON.stringify(query));
    const currentQueryString = JSON.stringify(query);
    
    // State for progressive fetching - use separate pieces of state to minimize updates
    const [currentPage, setCurrentPage] = useState(1);
    const [allFetchedData, setAllFetchedData] = useState([]);
    const [filteredData, setFilteredData] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    const [pagination, setPagination] = useState({
        totalItems: 0,
        totalPages: 0,
        hasMore: true
    });
    
    const [isProgressiveLoading, setIsProgressiveLoading] = useState(false);
    const processingRef = useRef(false);

    const { invalidateResolution } = useDispatch('core/data');

    // Build the current page query
    const currentPageQuery = query ? {
        ...query,
        per_page: pageSize,
        page: currentPage
    } : null;

    // Use the standard useSelect to fetch current page data
    const { currentPageData, isLoading, totalPages, totalItems } = useSelect(
        (select) => {
            if (!currentPageQuery) {
                return {
                    currentPageData: null,
                    isLoading: false,
                    totalPages: 0,
                    totalItems: 0
                };
            }

            try {
                const selectorName = isObject(currentPageQuery) ? 'getEntityRecords' : 'getEntityRecord';
                const coreSelect = select(coreStore);
                const dataSelect = select('core/data');
                
                if (!coreSelect || !dataSelect) {
                    return {
                        currentPageData: null,
                        isLoading: false,
                        totalPages: 0,
                        totalItems: 0
                    };
                }

                const data = coreSelect[selectorName](entity, kind, currentPageQuery);
                const loading = dataSelect.isResolving(coreStore, selectorName, [
                    entity,
                    kind,
                    currentPageQuery,
                ]);

                // Note: getEntitiesState is not available in WordPress 5.8, so we can't get total pages/items from headers
                // This is a limitation we'll have to work with
                return {
                    currentPageData: data,
                    isLoading: loading,
                    totalPages: 0, // Can't get this in WP 5.8
                    totalItems: 0  // Can't get this in WP 5.8
                };
            } catch (error) {
                console.error('Error in useRequestProgressiveData useSelect:', error);
                return {
                    currentPageData: null,
                    isLoading: false,
                    totalPages: 0,
                    totalItems: 0
                };
            }
        },
        [entity, kind, JSON.stringify(currentPageQuery)]
    );

    // Reset all state when query changes
    useEffect(() => {
        if (queryRef.current !== currentQueryString) {
            console.log('Query changed, resetting progressive state');
            queryRef.current = currentQueryString;
            setCurrentPage(1);
            setAllFetchedData([]);
            setFilteredData(null);
            setIsComplete(false);
            setPagination({
                totalItems: 0,
                totalPages: 0,
                hasMore: true
            });
            processingRef.current = false;
        }
    }, [currentQueryString]);

    // Process current page data when it becomes available
    useEffect(() => {
        if (!currentPageData || isLoading || isComplete || processingRef.current) {
            return;
        }

        processingRef.current = true;
        setIsProgressiveLoading(true);

        console.log(`Processing page ${currentPage}:`, {
            currentPageDataLength: Array.isArray(currentPageData) ? currentPageData.length : 'not array'
        });

        // Ensure currentPageData is an array and filter out null/undefined values
        let dataArray;
        if (Array.isArray(currentPageData)) {
            dataArray = currentPageData.filter(item => item != null);
        } else if (currentPageData != null) {
            dataArray = [currentPageData];
        } else {
            dataArray = [];
        }
        
        // Combine with previously fetched data
        const newAllData = [...allFetchedData, ...dataArray];
        setAllFetchedData(newAllData);

        // Apply client-side filter if provided
        let newFilteredData;
        try {
            newFilteredData = filter ? filter(newAllData) : newAllData;
        } catch (filterError) {
            console.error('Error applying filter in useRequestProgressiveData:', filterError);
            newFilteredData = newAllData; // Fallback to unfiltered data
        }

        setFilteredData(newFilteredData);

        console.log(`Filtering results: ${newAllData.length} -> ${newFilteredData.length}`);

        // Check if we have enough results or should continue
        const hasEnoughResults = newFilteredData.length >= targetResults;
        const hasMorePages = currentPage < maxPages && dataArray.length > 0; // Can't check totalPages in WP 5.8
        const shouldContinue = !hasEnoughResults && hasMorePages;

        console.log('Progressive fetch decision:', {
            hasEnoughResults,
            hasMorePages,
            shouldContinue,
            currentPage,
            maxPages,
            dataArrayLength: dataArray.length
        });

        setPagination({
            totalItems: newFilteredData.length,
            totalPages: Math.ceil(newFilteredData.length / Math.max(targetResults, 1)),
            hasMore: shouldContinue
        });

        if (shouldContinue) {
            console.log(`Fetching next page: ${currentPage + 1}`);
            // Use setTimeout to prevent immediate state update and potential infinite loop
            setTimeout(() => {
                setCurrentPage(prev => prev + 1);
                processingRef.current = false;
            }, 0);
        } else {
            console.log('Progressive fetching complete:', {
                reason: hasEnoughResults ? 'enough results' : !hasMorePages ? 'no more pages' : 'max pages reached',
                finalResults: newFilteredData.length
            });
            setIsComplete(true);
            processingRef.current = false;
        }

        setIsProgressiveLoading(false);
        
    }, [currentPageData, isLoading, currentPage, allFetchedData, isComplete, filter, targetResults, maxPages]);

    const invalidateResolver = useCallback(() => {
        console.log('Invalidating progressive data resolver');
        
        // Reset all state
        setCurrentPage(1);
        setAllFetchedData([]);
        setFilteredData(null);
        setIsComplete(false);
        setPagination({
            totalItems: 0,
            totalPages: 0,
            hasMore: true
        });
        processingRef.current = false;

        // Invalidate the current query
        if (currentPageQuery) {
            const selectorName = isObject(currentPageQuery) ? 'getEntityRecords' : 'getEntityRecord';
            invalidateResolution(coreStore, selectorName, [entity, kind, currentPageQuery]);
        }
    }, [entity, kind, currentPageQuery, invalidateResolution]);

    // Return the filtered data and loading state
    const finalLoading = isLoading || isProgressiveLoading || (!isComplete && currentPage === 1 && !filteredData);

    console.log('useRequestProgressiveData returning:', {
        dataLength: filteredData?.length,
        isLoading: finalLoading,
        pagination: pagination,
        currentPage: currentPage,
        isComplete: isComplete
    });

    return [
        filteredData,
        finalLoading,
        pagination,
        invalidateResolver
    ];
};