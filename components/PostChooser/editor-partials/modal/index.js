import { useState, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl, Button, Spinner, Modal } from '@wordpress/components';

// Internal dependencies
import { useRequestData } from '../../../../hooks/useRequestData/index.mjs';



export const PostChooserModal = ( props ) => {
	const {
		onClose,
		label = __( 'Enter a search query' ),
		onSelectPost,
		postTypes = [ 'posts', 'pages' ],
		placeholder = __( 'Enter a search term...' ),
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


	// Todo turn this into a component and move it to a separate file.
	// This function renders the post results based on the search term.
	// We also need to show the link to the post, more data about the post,
	// and add a specific "select" button to handle the onSelectPost action.
	// Data to add: publish date, last updated date, post type, post status
	const renderPostResults = ( postsToRender ) => {
		if ( ! postsToRender || postsToRender.length === 0 ) {
			return <p>{ __( 'No posts found.' ) }</p>;
		}

		return postsToRender.map( ( post ) => (
			<li className="bu-components-post-chooser-results-item" key={ post.id }>
				<div className="bu-components-post-chooser-results-item-container">
					<div className="bu-components-post-chooser-results-item-inner">
						<div className="bu-components-post-chooser-results-item-postdetails">
							<div className="bu-components-post-chooser-results-item-title">
								{ post.title.rendered }
							</div>
							<div className="bu-components-post-chooser-results-item-metadata">
								<span className="bu-components-post-chooser-results-item-modified">
									{ new Date(
										post.modified
									).toLocaleDateString() }
								</span>
							T	<span className="bu-components-post-chooser-results-item-status">
									{ post.status }
								</span>
							</div>
						</div>
						<div className="bu-components-post-chooser-results-item-posttype">
							<span className="bu-components-post-chooser-results-item-type">
								{ post.type }
							</span>
						</div>
					</div>
					<Button
							className="bu-components-post-chooser-item-select-button"
							onClick={ () => onSelectPost( post ) }
						>
							Select
						</Button>
				</div>
			</li>
		) );
	};


	return (
		<Modal
			title={ title }
			onRequestClose={ onClose }
			isOpen={ false }
			className="bu-components-post-chooser-modal"
		>
			<div className="bu-components-search-controls">
				<div className="bu-components-post-chooser-search-bar">
					<div className="bu-components-post-chooser-search-field">
						<TextControl
							label={ label }
							value={ searchTerm }
							onChange={ ( value ) => setSearchTerm( value ) }
							placeholder={ placeholder }
						/>
					</div>
					<div className="bu-components-post-chooser-search-button">
						<Button
							variant="primary"
							onClick={ handleSearch }
							disabled={ ! searchTerm }
						>
							{ __( 'Search' ) }
						</Button>
					</div>
				</div>
			</div>
			<ul className="bu-components-post-chooser-results">
				{ ( isLoading || isSearchLoading ) && <Spinner /> }
				{ searchTerm
					? renderPostResults( searchPosts )
					: renderPostResults( posts )
				}
			</ul>
		</Modal>
	)
};
