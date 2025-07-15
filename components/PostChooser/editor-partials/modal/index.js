import { useState, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl, Button, Spinner, Modal,
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
	Flex,
	FlexItem,
	FlexBlock,
} from '@wordpress/components';

// Internal dependencies
import { useRequestData } from '../../../../hooks/useRequestData/index.mjs';
import { Results } from '../results/index.js';
import { SearchUI } from '../search-ui/index.js';
import { ResultsControls } from '../results-controls/index.mjs';

import './editor.scss';
import { useEffect } from 'react';

export const PostChooserModal = ( props ) => {
	const {
		onClose,
		label,
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
	const [ searchType, setSearchType ] = useState( 'recent' );

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
	const [searchPosts, isSearchLoading, searchInValidateResolver ] = useRequestData(
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
	}, [ searchTerm, searchPosts ] );


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
		} else {
			return [];
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
					sortOrder={ sortOrder }
					setSortOrder={ setSortOrder }
					isLoading={ isLoading || isSearchLoading }
					label={ label }
					placeholder={ placeholder }
					searchType={ searchType }
					setSearchType={ setSearchType }
				/>
				<ResultsControls
					searchTerm={ searchTerm }
					onSearch={ handleSearch }
					searchType={ searchType }
					setSearchType={ setSearchType }
					sortOrder={ sortOrder }
					setSortOrder={ setSortOrder }
				/>
				<div className="bu-components-post-chooser-results-container">
					<Results
						posts={ handleResultsSearch() }
						onSelectPost={ onSelectPost }
						loading={ isLoading || isSearchLoading }
					/>
				</div>
			</div>
		</Modal>
	);
};
