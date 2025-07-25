import { useState, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	Spinner,
	Modal,
} from '@wordpress/components';
import { useEffect } from 'react';

// Internal dependencies
import { useRequestData } from '../../../../hooks/useRequestData/index.mjs';
import { Results } from '../results/index.js';
import { SearchUI } from '../search-ui/index.js';
import { ResultsControls } from '../results-controls/index.mjs';
import { Pagination } from '../../../../components/Pagination/index.mjs';
import { useGetPagination } from '../../../../hooks/useGetPagination/index.mjs';

// Import CSS
import './editor.scss';

export const PostChooserModal = ( props ) => {
	const {
		onClose = () => {}, // Function to call when the modal is closed.
		label,
		onSelectPost = () => {}, // Function to call when a post is selected.
		postTypes,
		placeholder = __( 'Enter a search term…' ),
		title = __( 'Choose a Post' ),
	} = props;

	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ sortOrder, setSortOrder ] = useState( {
		orderby: 'date',
		order: 'desc',
	} );
	const [ searchType, setSearchType ] = useState( 'recent' );

	// Handle search Pagination.
	const [ searchCurrentPage, setSearchCurrentPage ] = useState( 1 );

	// State to manage Total Counts for Each Search Type.
	const [ totalCounts, setTotalCounts ] = useState( {
		recent: 0,
		default: 0,
		slug: 0,
		id: 0,
	} );

	// State to manage total pages for search results.
	const [ totalPages, setTotalPages ] = useState( {
		recent: 0,
		default: 0,
		slug: 0,
		id: 0,
	} );


	// Initial query for recent posts
	const [ posts, isLoading, invalidateResolver ] = useRequestData(
		'postType',
		'post',
		{
			per_page: 10,
			orderby: 'modified',
			order: 'desc',
			status: 'publish',
		}
	);

	// Search query
	// Todo: Add support for searching by more than one post type that
	// is passed in by the postTypes prop.
	const [
		searchPosts,
		isSearchLoading,
		searchInValidateResolver,
	 ] = useRequestData(
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
	const { pagination, isLoading: paginationLoading } = useGetPagination( 'postType',
		'post',
		searchTerm
			? {
					search: searchTerm,
					per_page: 10,
					orderby: sortOrder.orderby,
					order: sortOrder.order,
					status: 'publish'
			  }
			: {}
	);



	const handleSearch = useCallback( () => {
		// Trigger search by updating the query
		invalidateResolver();
	}, [ invalidateResolver ] );


	/**
	 * When the search term changes we want to check if the searchPosts array
	 * is empty or not. If it has results we want to set the searchType state to 'default'.
	 * This will flip the view for the user to show the search results.
	 */
	useEffect( () => {
		if ( searchType === 'recent' && searchTerm && searchPosts?.length > 0 ) {
			setSearchType( 'default' );
		}

		if ( searchType === 'default' && ! searchTerm ) {
			setSearchType( 'recent' );
		}

		// Update total counts for each search type.
		if ( searchTerm && ( pagination || posts.length ) ) {
			setTotalCounts( {
				recent: posts ? posts.length : 0, // Todo: This could change to a call to useGetPagination hook just for Recent posts?
				default: pagination?.totalItems ? pagination.totalItems : 0,
				slug: 0, // Placeholder for slug search results count.
				id: 0, // Placeholder for ID search results count.
			} );

			setTotalPages( {
				recent: 1, // Todo: do we want pagination for recent posts?
				default: pagination?.totalPages ? pagination.totalPages : 0,
				slug: 0, // Placeholder for slug search results pages.
				id: 0, // Placeholder for ID search results pages.
			} );
		}
	}, [ searchTerm, searchPosts, posts, pagination ] );

	// Handles passing the search results array to the Results component.
	// @todo: Add support for slug and ID search results arrays.
	const handleResultsSearch = () => {
		if ( searchType === 'recent' || ! searchTerm ) {
			// Return recently updated posts.
			return posts;
		} else if ( searchType === 'default' ) {
			// Return default text search results.
			return searchPosts;
		} else if ( searchType === 'slug' ) {
			// Return slug search results.
			// Note: This is a placeholder for slug search results array.
			return searchPosts;
		} else if ( searchType === 'id' ) {
			// Return ID search results.
			// Note: This is a placeholder for ID search results array.
			return searchPosts;
		}
	};


	return (
		<Modal
			title={ title }
			onRequestClose={ onClose }
			isOpen={ false }
			className="bu-components-post-chooser-modal"
		>
			<div className="bu-components-post-chooser-modal-container">
				{
					/**
					 * These sub-components are currently using a lot of props that are being passed down into them.
					 * This should be improved in the future to reduce prop drilling.
					 *
					 * @todo: Refactor how these props are passed down to the sub-components by using a context provider.
					 * This will avoid having to pass down so many props and make the code cleaner.
					 */
				}
				<SearchUI
					searchTerm={ searchTerm }
					setSearchTerm={ setSearchTerm }
					isLoading={ isLoading || isSearchLoading }
					label={ label }
					placeholder={ placeholder }
					setSearchType={ setSearchType }
				/>
				<ResultsControls
					searchTerm={ searchTerm }
					searchType={ searchType }
					setSearchType={ setSearchType }
					sortOrder={ sortOrder }
					setSortOrder={ setSortOrder }
					totalCounts={ totalCounts }
				/>
				<div className="bu-components-post-chooser-results-container">
					{ ( isLoading || isSearchLoading ) && <Spinner /> }
					<Results
						posts={ handleResultsSearch() }
						onSelectPost={ onSelectPost }
						totalItems={ totalCounts.default }
					/>
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
