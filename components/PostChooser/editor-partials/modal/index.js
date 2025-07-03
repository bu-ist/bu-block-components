import { useState, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl, Button, Spinner, Modal } from '@wordpress/components';

// Internal dependencies
import { useRequestData } from '../../../../hooks/useRequestData/index.mjs';
import { Results } from '../results/index.js';
import { SearchUI } from '../search-ui/index.js';
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
	const [ searchType, setSearchType ] = useState( 'title' );

	// Initial query for recent posts
	const [ posts, isLoading, invalidateResolver ] = useRequestData(
		'postType',
		'post',
		{
			per_page: 10,
			orderby: 'date',
			order: 'desc',
			status: 'publish',
		}
	);

	// Search query
	// Todo: Add support for searching by more than one post type that
	// is passed in by the postTypes prop.
	const [ searchPosts, isSearchLoading ] = useRequestData(
		'postType',
		'post',
		searchTerm
			? {
					search: searchTerm,
					per_page: 10,
					orderby: searchType === 'title' ? 'title' : 'date',
					order: 'desc',
					status: 'publish',
			}
			: {}
	);

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
					searchType={ searchType }
					setSearchType={ setSearchType }
					isLoading={ isLoading || isSearchLoading }
					label={ label }
					placeholder={ placeholder }
				/>
				<div className="bu-components-post-chooser-results-container">
					{ ( isLoading || isSearchLoading ) && <Spinner /> }
					{ ! searchTerm && (
						<>
							<h2 className="bu-components-post-chooser-results-title">
								{ __( 'Recently Published' ) }
							</h2>
							<Results posts={ posts } onSelectPost={ onSelectPost } />
						</>
					) }
					{ searchTerm && (
						<>
							<h2 className="bu-components-post-chooser-results-title">
								{ __( 'Search Results' ) }
							</h2>
							<Results posts={ searchPosts } onSelectPost={ onSelectPost } />
						</>
					) }
				</div>
			</div>
		</Modal>
	);
};
