import { useState, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Spinner, Modal } from '@wordpress/components';
import { useEffect } from 'react';

// Internal dependencies
import { Results } from '../results/index.js';
import { SearchUI } from '../search-ui/index.js';
import { ResultsControls } from '../results-controls/index.mjs';
import { Pagination } from '../../../../components/Pagination/index.mjs';
import { useGetPagination } from '../../../../hooks/useGetPagination/index.mjs';
import { useRequestData } from '../../../../hooks/useRequestData/index.mjs';

// Import CSS
import './editor.scss';

export const PostChooserModal = ( props ) => {
	const {
		onClose = () => {}, // Function to call when the modal is closed.
		label,
		onSelectPost = () => {}, // Function to call when a post is selected.
		postTypes= [
			{ label: __( 'Posts' ), value: 'post' },
			{ label: __( 'Pages' ), value: 'page' },
		], // Default post types to search.
		primaryPostType = 'post', // Default primary post type.
		placeholder = __( 'Enter a search term…' ),
		title = __( 'Choose a Post' ),
		minCharacters = 3,
	} = props;

	const [ searchTerm, setSearchTerm ] = useState( '' );
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

	// Determine if search term is numeric for ID search
	const isSearchTermNumeric = searchTerm && !isNaN(searchTerm) && !isNaN(parseFloat(searchTerm));

	// Base query parameters
	const baseQuery = {
		per_page: 10,
		orderby: sortOrder.orderby,
		order: sortOrder.order,
		status: 'publish',
	};

	// Recent posts query (always active)
	const recentQuery = {
		...baseQuery,
		page: searchCurrentPage.recent,
		orderby: sortOrder.orderby,
		order: sortOrder.order,
	};

	// Content search query (only when there's a search term)
	const contentQuery = searchTerm ? {
		...baseQuery,
		search: searchTerm,
		page: searchCurrentPage.default,
	} : null;

	// Slug search query (only when there's a search term) - exact slug match only
	const slugQuery = searchTerm ? {
		...baseQuery,
		slug: searchTerm,
		page: searchCurrentPage.slug,
	} : null;

	// ID search query (only when search term is numeric)
	const idQuery = isSearchTermNumeric ? {
		...baseQuery,
		include: [parseInt(searchTerm)],
		page: searchCurrentPage.id,
	} : null;

	// Use separate useRequestData hooks for each search type
	const [recentPosts, recentLoading, recentInvalidateResolver] = useRequestData(
		'postType',
		selectedPostType,
		recentQuery
	);

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
		if (searchTerm) {
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
	}, [contentPosts, contentPagination, searchTerm]);

	useEffect(() => {
		if (searchTerm) {
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
	}, [slugPosts, slugPagination, searchTerm]);

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
		switch (searchType) {
			case 'recent':
				return recentLoading;
			case 'default':
				return contentLoading;
			case 'slug':
				return slugLoading;
			case 'id':
				return idLoading;
			default:
				return false;
		}
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
		if (searchTerm) {
			contentInvalidateResolver();
			slugInvalidateResolver();
		}
		if (isSearchTermNumeric) {
			idInvalidateResolver();
		}
	}, [ recentInvalidateResolver, contentInvalidateResolver, slugInvalidateResolver, idInvalidateResolver, searchTerm, isSearchTermNumeric ] );

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
		*/
	useEffect( () => {
		if (searchTerm && searchType === 'recent') {
			// Auto-switch to content search when user starts typing
			setSearchType('default');
		} else if (!searchTerm && searchType !== 'recent') {
			// Auto-switch back to recent when search term is cleared
			setSearchType('recent');
		}
	}, [ searchTerm, searchType ] );

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
				{ /**
					* These sub-components are currently using a lot of props that are being passed down into them.
					* This should be improved in the future to reduce prop drilling.
					*
					* @todo: Refactor how these props are passed down to the sub-components by using a context provider.
					* This will avoid having to pass down so many props and make the code cleaner.
					*/ }
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
					searchTerm={ searchTerm }
					searchType={ searchType }
					setSearchType={ setSearchType }
					sortOrder={ sortOrder }
					setSortOrder={ setSortOrder }
					contentResultsCount={ searchResults.default.totalItems || 0 }
					slugResultsCount={ searchResults.slug.totalItems || 0 }
					idResultsCount={ searchResults.id.totalItems || 0 }
				/>
				<div className="bu-components-post-chooser-results-container">
					{ currentLoading && <Spinner /> }
					{ searchType === 'recent' && (
						<>
							<h2 className="bu-components-post-chooser-results-title">
								{ __( 'Recently Published' ) }
							</h2>
							<Results
								posts={ currentResults.posts }
								onSelectPost={ onSelectPost }
								loading={ currentLoading }
								totalItems={ currentResults.totalItems }
							/>
						</>
					) }
					{ searchType !== 'recent' && (
						<>
							<h2 className="bu-components-post-chooser-results-title">
								{ searchType === 'default' && __( 'Content Search Results' ) }
								{ searchType === 'slug' && __( 'Slug Search Results' ) }
								{ searchType === 'id' && __( 'ID Search Results' ) }
								<em>
									{ currentResults.totalItems > 0 && (
										<span className="bu-components-post-chooser-results-count">
											{ __( 'Found: ' ) +
												` ${ currentResults.totalItems } ${
													currentResults.totalItems > 1
														? __( 'items' )
														: __( 'item' )
												}` }
										</span>
									) }
								</em>
							</h2>
							<Results
								posts={ currentResults.posts }
								onSelectPost={ onSelectPost }
								totalItems={ currentResults.totalItems }
								loading={ currentLoading }
							/>
						</>
					) }
					{ currentTotalPages > 1 && currentResults.posts && (
						<Pagination
							currentPage={ currentPage }
							totalPages={ currentTotalPages }
							onChange={ handlePageChange }
						/>
					) }
				</div>
				{ searchType === 'default' && ! paginationLoading && (
					<>
						{ totalPages?.default > 1 && (
							<Pagination
								currentPage={ searchCurrentPage } // This should be managed by the hook or state
								totalPages={ totalPages?.default }
								onChange={ ( newPage ) => {
									// Handle page change logic here
									console.log( 'New page:', newPage );
									setSearchCurrentPage( newPage );
									searchInValidateResolver();
								} }
							/>
						) }
					</>
				)}
			</div>
		</Modal>
	);
};
