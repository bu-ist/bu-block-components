import { useState, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl, Button, Spinner, Modal } from '@wordpress/components';

// Internal dependencies
import { useRequestData } from '../../../../hooks/useRequestData/index.mjs';
import { Results } from '../results/index.js';
import { SearchUI } from '../search-ui/index.js';
import { Pagination } from '../../../../components/Pagination/index.mjs';
import { useGetPagination } from '../../../../hooks/useGetPagination/index.mjs';

// Import CSS
import './editor.scss';

export const PostChooserModal = ( props ) => {
	const {
		onClose,
		label = __( 'Enter a search query' ),
		onSelectPost,
		postTypes = [ 'posts', 'pages' ],
		placeholder = __( 'Enter a search term…' ),
		title = __( 'Choose a Post' ),
	} = props;

	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ sortOrder, setSortOrder ] = useState( {
		orderby: 'date',
		order: 'desc',
	} );
	const [ searchType, setSearchType ] = useState( 'default' );

	// Handle search Pagination.
	const [ searchCurrentPage, setSearchCurrentPage ] = useState( 1 );

	// Initial query for recent posts
	const [ posts, isLoading, invalidateResolver ] = useRequestData(
		'postType',
		'post',
		{
			per_page: 10,
			orderby: sortOrder.orderby,
			order: sortOrder.order,
			status: 'publish',
		}
	);

	// Search query
	// Todo: Add support for searching by more than one post type that
	// is passed in by the postTypes prop.
	const [ searchPosts, isSearchLoading, searchInValidateResolver ] =
		useRequestData(
			'postType',
			'post',
			searchTerm
				? {
						search: searchTerm,
						per_page: 10,
						orderby: sortOrder.orderby,
						order: sortOrder.order,
						status: 'publish',
						page: searchCurrentPage,
				  }
				: {}
		);

	// Get pagination information by using useGetPagination hook.
	// This hook will return the total items and total pages for the search results.
	const { pagination, isLoading: paginationLoading } = useGetPagination(
		'postType',
		'post',
		searchTerm
			? {
					search: searchTerm,
					per_page: 10,
					orderby: sortOrder.orderby,
					order: sortOrder.order,
					status: 'publish',
			  }
			: {}
	);

	console.log( 'useGetPagination:', pagination );

	// Access pagination information
	const { totalItems, totalPages } = pagination;

	const handleSearch = useCallback( () => {
		// Trigger search by updating the query
		invalidateResolver();
	}, [ invalidateResolver ] );

	return (
		<Modal
			title={ title }
			onRequestClose={ onClose }
			isOpen={ false }
			className="bu-components-post-chooser-modal"
		>
			<div className="bu-components-post-chooser-modal-container">
				<SearchUI
					onSearch={ handleSearch }
					searchTerm={ searchTerm }
					setSearchTerm={ setSearchTerm }
					sortOrder={ sortOrder }
					setSortOrder={ setSortOrder }
					isLoading={ isLoading || isSearchLoading }
					label={ label }
					placeholder={ placeholder }
					searchType={ searchType }
					setSearchType={ setSearchType }
				/>
				<div className="bu-components-post-chooser-results-container">
					{ ( isLoading || isSearchLoading ) && <Spinner /> }
					{ ! searchTerm && (
						<>
							<h2 className="bu-components-post-chooser-results-title">
								{ __( 'Recently Published' ) }
							</h2>
							<Results
								posts={ posts }
								onSelectPost={ onSelectPost }
							/>
						</>
					) }
					{ searchTerm && (
						<>
							<h2 className="bu-components-post-chooser-results-title">
								{ __( 'Search Results ' ) }
								<em>
									{ totalItems > 0 && (
										<span className="bu-components-post-chooser-results-count">
											{ __( 'Found: ' ) +
												` ${ totalItems } ${
													totalItems > 1
														? __( 'items' )
														: __( 'item' )
												}` }
										</span>
									) }
								</em>
							</h2>
							<Results
								posts={ searchPosts }
								onSelectPost={ onSelectPost }
							/>
						</>
					) }
					{ searchTerm && totalPages > 1 && searchPosts && (
						<Pagination
							currentPage={ searchCurrentPage } // This should be managed by the hook or state
							totalPages={ totalPages }
							onChange={ ( newPage ) => {
								// Handle page change logic here
								console.log( 'New page:', newPage );
								setSearchCurrentPage( newPage );
								searchInValidateResolver();
							} }
						/>
					) }
				</div>
			</div>
		</Modal>
	);
};
