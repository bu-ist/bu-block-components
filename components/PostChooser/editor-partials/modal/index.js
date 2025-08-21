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
import { useDebouncedInput } from '../../../../hooks/useDebouncedInput/index.mjs';

// Import CSS
import './editor.scss';

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
	}, [ termResults.map( r => r.loading ).join( ',' ), shouldFetchTerms ] );

	// Determine if search term is numeric for ID search
	const isSearchTermNumeric = searchTermThrottled && !isNaN(searchTermThrottled) && !isNaN(parseFloat(searchTermThrottled));

	// Base query parameters
	const baseQuery = {
		per_page: 10,
		orderby: sortOrder.orderby,
		order: sortOrder.order,
		status: 'publish',
		// Apply meta filters (like adding meta_query to WP_Query)
		...metaFilters,
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

	// Use separate useRequestData hooks for each search type
	const [recentPosts, recentLoading, recentInvalidateResolver] = useRequestData(
		'postType',
		selectedPostType,
		recentQuery
	);

	console.log('PostChooserModal recentPosts', recentPosts);

	const [contentPosts, contentLoading, contentInvalidateResolver] = useRequestData(
		'postType',
		selectedPostType,
		contentQuery
	);

	const [slugPosts, slugLoading, slugInvalidateResolver] = useRequestData(
		'postType',
		selectedPostType,
		slugQuery
	);

	const [idPosts, idLoading, idInvalidateResolver] = useRequestData(
		'postType',
		selectedPostType,
		idQuery
	);

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

	// Update search results state when individual search results change
	useEffect(() => {
		setSearchResults(prevResults => ({
			...prevResults,
			recent: {
				posts: recentPosts,
				totalItems: recentPagination.totalItems || 0,
				totalPages: recentPagination.totalPages || 0,
			}
		}));
	}, [recentPosts, recentPagination]);

	useEffect(() => {
		if (searchTermThrottled) {
			setSearchResults(prevResults => ({
				...prevResults,
				default: {
					posts: contentPosts,
					totalItems: contentPagination.totalItems || 0,
					totalPages: contentPagination.totalPages || 0,
				}
			}));
		} else {
			setSearchResults(prevResults => ({
				...prevResults,
				default: { posts: null, totalItems: 0, totalPages: 0 }
			}));
		}
	}, [contentPosts, contentPagination, searchTermThrottled]);

	useEffect(() => {
		if (searchTermThrottled) {
			setSearchResults(prevResults => ({
				...prevResults,
				slug: {
					posts: slugPosts,
					totalItems: slugPagination.totalItems || 0,
					totalPages: slugPagination.totalPages || 0,
				}
			}));
		} else {
			setSearchResults(prevResults => ({
				...prevResults,
				slug: { posts: null, totalItems: 0, totalPages: 0 }
			}));
		}
	}, [slugPosts, slugPagination, searchTermThrottled]);

	useEffect(() => {
		if (isSearchTermNumeric) {
			setSearchResults(prevResults => ({
				...prevResults,
				id: {
					posts: idPosts,
					totalItems: idPagination.totalItems || 0,
					totalPages: idPagination.totalPages || 0,
				}
			}));
		} else {
			setSearchResults(prevResults => ({
				...prevResults,
				id: { posts: null, totalItems: 0, totalPages: 0 }
			}));
		}
	}, [idPosts, idPagination, isSearchTermNumeric]);

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
