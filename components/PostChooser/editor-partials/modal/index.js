import { useState, useCallback, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';

// Internal dependencies
import { Results } from '../results/index.js';
import { SearchUI } from '../search-ui/index.js';
import { ResultsControls } from '../results-controls/index.mjs';
import { LoadingOverlay, LoadingSpinner } from '../loading-overlay/index.js';

// Import from Block Imports Package.
import { Pagination } from '../../../../components/Pagination/index.mjs';
import { useGetPagination } from '../../../../hooks/useGetPagination/index.mjs';
import { useRequestData } from '../../../../hooks/useRequestData/index.mjs';
import { useRequestProgressiveData } from '../../../../hooks/useRequestProgressiveData/index.mjs';
import { useDebouncedInput } from '../../../../hooks/useDebouncedInput/index.mjs';

// Import CSS
import './editor.scss';

/**
	* Helper function to safely get meta value from post object.
	* In WordPress 5.8+, meta fields are nested in a 'meta' object.
	* This function handles both nested and top-level meta field access.
	*
	* @param {Object} post - The post object from REST API
	* @param {string} metaKey - The meta key to retrieve
	* @returns {*} The meta value or undefined if not found
	*/
const getPostMetaValue = (post, metaKey) => {
	if (!post) {
		console.log(`getPostMetaValue: post is null/undefined`);
		return undefined;
	}
	
	console.log(`getPostMetaValue: Looking for "${metaKey}" in post ${post.id}`);
	console.log(`Post meta object:`, post.meta);
	
	// First check if meta exists in nested 'meta' object (WordPress 5.8+)
	if (post.meta && typeof post.meta === 'object' && post.meta.hasOwnProperty(metaKey)) {
		const value = post.meta[metaKey];
		console.log(`Found "${metaKey}" in meta object: "${value}"`);
		return value;
	}
	
	// Fallback to top-level property for backward compatibility
	if (post.hasOwnProperty(metaKey)) {
		const value = post[metaKey];
		console.log(`Found "${metaKey}" at top level: "${value}"`);
		return value;
	}
	
	console.log(`Meta key "${metaKey}" not found in post ${post.id}`);
	return undefined;
};

/**
	* Helper function to filter posts based on meta criteria.
	* Supports both simple meta_key/meta_value filtering and complex meta_query arrays.
	*
	* @param {Array} posts - Array of posts to filter
	* @param {Object} metaFilters - Meta filter criteria
	* @returns {Array} Filtered posts array
	*/
const filterPostsByMeta = (posts, metaFilters) => {
	console.log('filterPostsByMeta called with:', { posts: posts?.length, metaFilters });
	
	if (!posts || !Array.isArray(posts) || !metaFilters || Object.keys(metaFilters).length === 0) {
		console.log('Returning original posts - no filtering needed');
		return posts;
	}
	
	// Handle direct meta field filtering (from your example: bob_where_are_you: 'here')
	const directMetaFilters = Object.entries(metaFilters).filter(([key, value]) =>
		!['meta_key', 'meta_value', 'meta_compare', 'meta_query'].includes(key)
	);
	
	console.log('Direct meta filters found:', directMetaFilters);
	
	const filteredPosts = posts.filter(post => {
		console.log('Checking post:', post.id, 'Meta data:', post.meta);
		
		// Handle direct meta field filtering (bob_where_are_you: 'here')
		for (const [metaKey, expectedValue] of directMetaFilters) {
			const metaValue = getPostMetaValue(post, metaKey);
			console.log(`Checking ${metaKey}: expected="${expectedValue}", actual="${metaValue}"`);
			
			if (!checkMetaCondition(metaValue, expectedValue, '=')) {
				console.log(`Post ${post.id} filtered out: ${metaKey} doesn't match`);
				return false;
			}
		}
		
		// Handle simple meta_key/meta_value filtering
		if (metaFilters.meta_key && metaFilters.meta_value !== undefined) {
			const metaValue = getPostMetaValue(post, metaFilters.meta_key);
			const compare = metaFilters.meta_compare || '=';
			console.log(`Simple meta filtering: ${metaFilters.meta_key} = ${metaValue}`);
			
			if (!checkMetaCondition(metaValue, metaFilters.meta_value, compare)) {
				console.log(`Post ${post.id} filtered out by simple meta filter`);
				return false;
			}
		}
		
		// Handle complex meta_query filtering
		if (metaFilters.meta_query && Array.isArray(metaFilters.meta_query)) {
			const relation = metaFilters.meta_query.relation || 'AND';
			const results = metaFilters.meta_query.map(query => {
				if (!query.key || query.value === undefined) return true;
				
				const metaValue = getPostMetaValue(post, query.key);
				const compare = query.compare || '=';
				
				return checkMetaCondition(metaValue, query.value, compare, query.type);
			});
			
			if (relation === 'AND') {
				const passed = results.every(result => result);
				if (!passed) {
					console.log(`Post ${post.id} filtered out by meta_query (AND)`);
					return false;
				}
			} else if (relation === 'OR') {
				const passed = results.some(result => result);
				if (!passed) {
					console.log(`Post ${post.id} filtered out by meta_query (OR)`);
					return false;
				}
			}
		}
		
		console.log(`Post ${post.id} passed all meta filters`);
		return true;
	});
	
	console.log(`Filtering complete: ${posts.length} -> ${filteredPosts.length} posts`);
	return filteredPosts;
};

/**
	* Helper function to check meta condition based on compare operator.
	*
	* @param {*} metaValue - The actual meta value from the post
	* @param {*} compareValue - The value to compare against
	* @param {string} compare - The comparison operator
	* @param {string} type - The data type (NUMERIC, CHAR, etc.)
	* @returns {boolean} Whether the condition is met
	*/
const checkMetaCondition = (metaValue, compareValue, compare = '=', type = 'CHAR') => {
	// Handle undefined/null meta values
	if (metaValue === undefined || metaValue === null) {
		return compare === 'NOT EXISTS';
	}
	
	// Convert values based on type
	if (type === 'NUMERIC') {
		metaValue = parseFloat(metaValue);
		compareValue = parseFloat(compareValue);
	} else {
		metaValue = String(metaValue);
		compareValue = String(compareValue);
	}
	
	switch (compare) {
		case '=':
			return metaValue === compareValue;
		case '!=':
			return metaValue !== compareValue;
		case '>':
			return metaValue > compareValue;
		case '>=':
			return metaValue >= compareValue;
		case '<':
			return metaValue < compareValue;
		case '<=':
			return metaValue <= compareValue;
		case 'LIKE':
			return String(metaValue).toLowerCase().includes(String(compareValue).toLowerCase());
		case 'NOT LIKE':
			return !String(metaValue).toLowerCase().includes(String(compareValue).toLowerCase());
		case 'EXISTS':
			return metaValue !== undefined && metaValue !== null;
		case 'NOT EXISTS':
			return metaValue === undefined || metaValue === null;
		default:
			return metaValue === compareValue;
	}
};


export const PostChooserModal = ( props ) => {
	const {
		onClose = () => {}, // Function to call when the modal is closed.
		label,
		onSelectPost = () => {}, // Function to call when a post is selected.
		postTypes = [
			{ label: __( 'Posts' ), value: 'post' },
			{ label: __( 'Pages' ), value: 'page' },
		], // Default post types to search.
		primaryPostType, // Optional: only needed to override the first postType in the array
		placeholder = __( 'Enter a search term…' ),
		title = __( 'Choose a Post' ),
		minCharacters = 3,
		metaFilters = {}, // Meta query filters (like meta_query in WP_Query)
		taxonomyFilters = {}, // Taxonomy filters (like tax_query in WP_Query)
	} = props;

	// Use the new useDebouncedInput hook to handle both immediate and debounced search terms
	// searchTerm - updates immediately with each keystroke for responsive UI
	// debouncedSearchTerm - only updates after delay (used for API calls to reduce requests)
	const [ searchTerm, setSearchTerm, searchTermThrottled ] = useDebouncedInput('', 300);

	const [ sortOrder, setSortOrder ] = useState( {
		orderby: 'date',
		order: 'desc',
	} );
	const [ searchType, setSearchType ] = useState( 'recent' );
	const [ selectedPostType, setSelectedPostType ] = useState(
		primaryPostType || (postTypes && postTypes.length > 0 ? postTypes[ 0 ].value : 'post')
	);

	// Handle search Pagination for each search type separately
	const [ searchCurrentPage, setSearchCurrentPage ] = useState( {
		recent: 1,
		default: 1,
		slug: 1,
		id: 1,
	} );

	// Store search results separately for each search type
	const [ searchResults, setSearchResults ] = useState( {
		recent: { posts: null, totalItems: 0, totalPages: 0 },
		default: { posts: null, totalItems: 0, totalPages: 0 },
		slug: { posts: null, totalItems: 0, totalPages: 0 },
		id: { posts: null, totalItems: 0, totalPages: 0 },
	} );

	// Note: Progressive fetching state removed - using simpler approach of fetching more posts initially

	// State to hold converted taxonomy filters (slug-to-ID conversion)
	const [ convertedTaxonomyFilters, setConvertedTaxonomyFilters ] = useState( {} );
	const [ isConvertingFilters, setIsConvertingFilters ] = useState( false );

	// Helper function to detect if a value is likely a slug (contains hyphens, no numbers)
	const isLikelySlug = ( value ) => {
		if ( typeof value !== 'string' ) return false;
		// Check if it contains hyphens and doesn't look like a numeric ID
		return value.includes( '-' ) && isNaN( parseInt( value ) );
	};

	// Helper function to check if taxonomyFilters need conversion
	const needsConversion = ( filters ) => {
		if ( ! filters || Object.keys( filters ).length === 0 ) return false;
		
		for ( const [ taxonomy, terms ] of Object.entries( filters ) ) {
			const termList = typeof terms === 'string' ? terms.split( ',' ).map( t => t.trim() ) : terms;
			if ( Array.isArray( termList ) && termList.some( term => isLikelySlug( term ) ) ) {
				return true;
			}
		}
		return false;
	};

	// Fetch term data for slug-to-ID conversion
	// Only fetch if we detect slugs in the taxonomyFilters
	const shouldFetchTerms = needsConversion( taxonomyFilters );
	const termQueries = shouldFetchTerms ? Object.entries( taxonomyFilters ).map( ( [ taxonomy, terms ] ) => {
		const termList = typeof terms === 'string' ? terms.split( ',' ).map( t => t.trim() ) : terms;
		return {
			taxonomy,
			terms: termList,
			query: { slug: termList.join( ',' ), per_page: 100 } // Fetch terms by slug
		};
	} ) : [];

	// Use useRequestData to fetch term data for each taxonomy that needs conversion
	const termResults = termQueries.map( ( { taxonomy, query } ) => {
		// Only use the hook if we actually need to fetch terms
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [ terms, loading ] = shouldFetchTerms ? useRequestData( 'taxonomy', taxonomy, query ) : [ null, false ];
		return { taxonomy, terms, loading };
	} );

	// Convert slugs to IDs when term data is available
	useEffect( () => {
		if ( ! shouldFetchTerms ) {
			setConvertedTaxonomyFilters( taxonomyFilters );
			setIsConvertingFilters( false );
			return;
		}

		setIsConvertingFilters( true );

		// Check if all term queries have finished loading
		const allLoaded = termResults.every( result => ! result.loading );
		
		if ( allLoaded ) {
			const converted = { ...taxonomyFilters };

			termResults.forEach( ( { taxonomy, terms } ) => {
				if ( terms && Array.isArray( terms ) ) {
					// Convert slug list to ID list
					const originalTerms = taxonomyFilters[ taxonomy ];
					const originalSlugList = typeof originalTerms === 'string' ? originalTerms.split( ',' ).map( t => t.trim() ) : originalTerms;
					
					const termIds = terms
						.filter( term => originalSlugList.includes( term.slug ) )
						.map( term => term.id );

					if ( termIds.length > 0 ) {
						converted[ taxonomy ] = termIds.join( ',' );
					}
				}
			} );

			setConvertedTaxonomyFilters( converted );
			setIsConvertingFilters( false );
		}
	}, [ termResults.length > 0 ? termResults.every( r => ! r.loading ) : false, shouldFetchTerms, JSON.stringify(taxonomyFilters) ] );

	// Determine if search term is numeric for ID search
	const isSearchTermNumeric = searchTermThrottled && !isNaN(searchTermThrottled) && !isNaN(parseFloat(searchTermThrottled));

	// Base query parameters
	// Note: Meta filters are handled by useRequestProgressiveData which automatically fetches
	// additional pages until enough filtered results are found
	const hasMetaFilters = metaFilters && Object.keys(metaFilters).length > 0;
	const baseQuery = {
		per_page: 10, // Standard page size - progressive fetching will handle getting more results when needed
		orderby: sortOrder.orderby,
		order: sortOrder.order,
		status: 'publish',
		// Apply taxonomy filters (like adding tax_query to WP_Query) - use converted filters with IDs
		...convertedTaxonomyFilters,
	};

	// Recent posts query (always active)
	const recentQuery = {
		...baseQuery,
		page: searchCurrentPage.recent,
		orderby: sortOrder.orderby,
		order: sortOrder.order,
	};

	console.log('PostChooserModal recentQuery', recentQuery);

	// Content search query (only when there's a search term)
	const contentQuery = searchTermThrottled ? {
		...baseQuery,
		search: searchTermThrottled,
		page: searchCurrentPage.default,
	} : null;

	// Slug search query (only when there's a search term) - exact slug match only
	const slugQuery = searchTermThrottled ? {
		...baseQuery,
		slug: searchTermThrottled,
		page: searchCurrentPage.slug,
	} : null;

	// ID search query (only when search term is numeric)
	const idQuery = isSearchTermNumeric ? {
		...baseQuery,
		include: [parseInt(searchTermThrottled)],
		page: searchCurrentPage.id,
	} : null;

	// Create meta filter function for progressive data fetching
	const metaFilterFunction = hasMetaFilters ? (posts) => filterPostsByMeta(posts, metaFilters) : null;

	// Use progressive data fetching for searches that need meta filtering
	// Use regular useRequestData for searches without meta filtering
	const [recentPosts, recentLoading, recentProgressivePagination, recentInvalidateResolver] = hasMetaFilters
		? useRequestProgressiveData(
			'postType',
			selectedPostType,
			recentQuery,
			{
				filter: metaFilterFunction,
				targetResults: 10,
				maxPages: 20,
				pageSize: 50
			}
		)
		: [
			...useRequestData('postType', selectedPostType, recentQuery),
			null // No progressive pagination
		];

	console.log('PostChooserModal recentPosts', recentPosts);

	const [contentPosts, contentLoading, contentProgressivePagination, contentInvalidateResolver] = hasMetaFilters && searchTermThrottled
		? useRequestProgressiveData(
			'postType',
			selectedPostType,
			contentQuery,
			{
				filter: metaFilterFunction,
				targetResults: 10,
				maxPages: 15,
				pageSize: 30
			}
		)
		: [
			...useRequestData('postType', selectedPostType, contentQuery),
			null // No progressive pagination
		];

	const [slugPosts, slugLoading, slugProgressivePagination, slugInvalidateResolver] = hasMetaFilters && searchTermThrottled
		? useRequestProgressiveData(
			'postType',
			selectedPostType,
			slugQuery,
			{
				filter: metaFilterFunction,
				targetResults: 10,
				maxPages: 10,
				pageSize: 25
			}
		)
		: [
			...useRequestData('postType', selectedPostType, slugQuery),
			null // No progressive pagination
		];

	const [idPosts, idLoading, idProgressivePagination, idInvalidateResolver] = hasMetaFilters && isSearchTermNumeric
		? useRequestProgressiveData(
			'postType',
			selectedPostType,
			idQuery,
			{
				filter: metaFilterFunction,
				targetResults: 5,
				maxPages: 5,
				pageSize: 20
			}
		)
		: [
			...useRequestData('postType', selectedPostType, idQuery),
			null // No progressive pagination
		];

	console.log('PostChooserModal idPosts', idPosts);

	// Get pagination for each search type
	const { pagination: recentPagination } = useGetPagination(
		'postType',
		selectedPostType,
		recentQuery
	);

	const { pagination: contentPagination } = useGetPagination(
		'postType',
		selectedPostType,
		contentQuery || {}
	);

	const { pagination: slugPagination } = useGetPagination(
		'postType',
		selectedPostType,
		slugQuery || {}
	);

	const { pagination: idPagination } = useGetPagination(
		'postType',
		selectedPostType,
		idQuery || {}
	);

	// Handle recent posts results - progressive fetching handles filtering automatically when meta filters are present
	useEffect(() => {
		setSearchResults(prevResults => ({
			...prevResults,
			recent: {
				posts: recentPosts,
				totalItems: hasMetaFilters && recentProgressivePagination
					? recentProgressivePagination.totalItems
					: (recentPagination.totalItems || 0),
				totalPages: hasMetaFilters && recentProgressivePagination
					? recentProgressivePagination.totalPages
					: (recentPagination.totalPages || 0),
			}
		}));
	}, [
		recentPosts,
		recentPagination.totalItems,
		recentPagination.totalPages,
		recentProgressivePagination?.totalItems,
		recentProgressivePagination?.totalPages,
		hasMetaFilters
	]);

	// Handle content search results - progressive fetching handles filtering automatically when meta filters are present
	useEffect(() => {
		if (searchTermThrottled && contentPosts) {
			setSearchResults(prevResults => ({
				...prevResults,
				default: {
					posts: contentPosts,
					totalItems: hasMetaFilters && contentProgressivePagination
						? contentProgressivePagination.totalItems
						: (contentPagination.totalItems || 0),
					totalPages: hasMetaFilters && contentProgressivePagination
						? contentProgressivePagination.totalPages
						: (contentPagination.totalPages || 0),
				}
			}));
		} else {
			setSearchResults(prevResults => ({
				...prevResults,
				default: { posts: null, totalItems: 0, totalPages: 0 }
			}));
		}
	}, [
		contentPosts,
		contentPagination.totalItems,
		contentPagination.totalPages,
		contentProgressivePagination?.totalItems,
		contentProgressivePagination?.totalPages,
		searchTermThrottled,
		hasMetaFilters
	]);

	// Handle slug search results - progressive fetching handles filtering automatically when meta filters are present
	useEffect(() => {
		if (searchTermThrottled && slugPosts) {
			setSearchResults(prevResults => ({
				...prevResults,
				slug: {
					posts: slugPosts,
					totalItems: hasMetaFilters && slugProgressivePagination
						? slugProgressivePagination.totalItems
						: (slugPosts ? slugPosts.length : 0),
					totalPages: hasMetaFilters && slugProgressivePagination
						? slugProgressivePagination.totalPages
						: (slugPosts ? Math.ceil(slugPosts.length / 10) : 0),
				}
			}));
		} else {
			setSearchResults(prevResults => ({
				...prevResults,
				slug: { posts: null, totalItems: 0, totalPages: 0 }
			}));
		}
	}, [
		slugPosts,
		slugPagination.totalItems,
		slugPagination.totalPages,
		slugProgressivePagination?.totalItems,
		slugProgressivePagination?.totalPages,
		searchTermThrottled,
		hasMetaFilters
	]);

	// Handle ID search results - progressive fetching handles filtering automatically when meta filters are present
	useEffect(() => {
		if (isSearchTermNumeric && idPosts) {
			setSearchResults(prevResults => ({
				...prevResults,
				id: {
					posts: idPosts,
					totalItems: hasMetaFilters && idProgressivePagination
						? idProgressivePagination.totalItems
						: (idPosts ? idPosts.length : 0),
					totalPages: hasMetaFilters && idProgressivePagination
						? idProgressivePagination.totalPages
						: (idPosts ? Math.ceil(idPosts.length / 10) : 0),
				}
			}));
		} else {
			setSearchResults(prevResults => ({
				...prevResults,
				id: { posts: null, totalItems: 0, totalPages: 0 }
			}));
		}
	}, [
		idPosts,
		idPagination.totalItems,
		idPagination.totalPages,
		idProgressivePagination?.totalItems,
		idProgressivePagination?.totalPages,
		isSearchTermNumeric,
		hasMetaFilters
	]);

	// Get current results based on selected search type
	const getCurrentResults = () => {
		return searchResults[searchType] || { posts: null, totalItems: 0, totalPages: 0 };
	};

	// Get current loading state based on selected search type
	const getCurrentLoadingState = () => {
		let searchLoading = false;
		switch (searchType) {
			case 'recent':
				searchLoading = recentLoading;
				break;
			case 'default':
				searchLoading = contentLoading;
				break;
			case 'slug':
				searchLoading = slugLoading;
				break;
			case 'id':
				searchLoading = idLoading;
				break;
			default:
				searchLoading = false;
		}
		// Include filter conversion loading state
		return searchLoading || isConvertingFilters;
	};

	// Get current page for selected search type
	const getCurrentPage = () => {
		return searchCurrentPage[searchType] || 1;
	};

	// Get current invalidate function based on selected search type
	const getCurrentInvalidateFunction = () => {
		switch (searchType) {
			case 'recent':
				return recentInvalidateResolver;
			case 'default':
				return contentInvalidateResolver;
			case 'slug':
				return slugInvalidateResolver;
			case 'id':
				return idInvalidateResolver;
			default:
				return () => {};
		}
	};

	const handleSearch = useCallback( () => {
		// Trigger search by invalidating all search results
		recentInvalidateResolver();
		if (searchTermThrottled) {
			contentInvalidateResolver();
			slugInvalidateResolver();
		}
		if (isSearchTermNumeric) {
			idInvalidateResolver();
		}
	}, [ recentInvalidateResolver, contentInvalidateResolver, slugInvalidateResolver, idInvalidateResolver, searchTermThrottled, isSearchTermNumeric ] );

	// Handle page change for current search type
	const handlePageChange = (newPage) => {
		setSearchCurrentPage(prev => ({
			...prev,
			[searchType]: newPage
		}));
		getCurrentInvalidateFunction()();
	};

	/**
	* When the search term changes or when we have search results,
	* automatically switch to the appropriate search type.
	*
	* Note: Don't enter `searchType` as a dependency in this effect.
	* Doing so will cause a rerender and the setting will be undone.
	*/
	useEffect( () => {
		if (searchTermThrottled && searchType === 'recent') {
			// Auto-switch to content search when user starts typing
			setSearchType('default');
		} else if (!searchTermThrottled && searchType !== 'recent') {
			// Auto-switch back to recent when search term is cleared
			setSearchType('recent');
		}
	}, [ searchTermThrottled ] );

	// Get current results and metadata
	const currentResults = getCurrentResults();
	const currentLoading = getCurrentLoadingState();
	const currentPage = getCurrentPage();
	const currentTotalPages = currentResults.totalPages || 0;


	return (
		<Modal
			title={ title }
			onRequestClose={ onClose }
			isOpen={ false }
			className="bu-components-post-chooser-modal"
		>
			<div className="bu-components-post-chooser-modal-container">
				<SearchUI
					searchTerm={ searchTerm }
					setSearchTerm={ setSearchTerm }
					isLoading={ currentLoading || false }
					label={ label }
					placeholder={ placeholder }
					setSearchType={ setSearchType }
					postTypes={ postTypes }
					primaryPostType={ primaryPostType }
					selectedPostType={ selectedPostType }
					setSelectedPostType={ setSelectedPostType }
				/>
				<ResultsControls
					searchTerm={ searchTermThrottled }
					searchType={ searchType }
					sortOrder={ sortOrder }
					setSortOrder={ setSortOrder }
					contentResultsCount={ searchResults.default.totalItems || 0 }
					slugResultsCount={ searchResults.slug.totalItems || 0 }
					idResultsCount={ searchResults.id.totalItems || 0 }
					onChange={ (newType) => {
						setSearchType(newType);
					}}
				/>
				<div className="bu-components-post-chooser-results-scrollable">
					<LoadingSpinner loading={ currentLoading } />
					<div className="bu-components-post-chooser-results-container">
						<LoadingOverlay loading={ currentLoading } />
						<Results
							posts={ currentResults.posts }
							onSelectPost={ onSelectPost }
							totalItems={ currentResults.totalItems }
							loading={ currentLoading }
							searchTerm={ searchTermThrottled }
							searchType={ searchType }
						/>
						{ currentTotalPages > 1 && currentResults.posts && (
							<Pagination
								className="bu-components-post-chooser-pagination"
								currentPage={ currentPage }
								totalPages={ currentTotalPages }
								onChange={ handlePageChange }
								showPageInfo={ false }
								showPageNumbers={ true }
								showFirstLastButtons={ false }
								prevLabel={ false }
								nextLabel={ false }
								showMaxPageNumbers={ 6 }
							/>
						) }
					</div>
				</div>
			</div>
		</Modal>
	);
};
