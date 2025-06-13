/**
 * Component: Post Chooser
 *
 * Displays the ten most recently published posts,
 * and an option to search.
 */

// WordPress dependencies
import { useState, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl, Button, Spinner } from '@wordpress/components';

// Internal dependencies
import { useRequestData } from '../../hooks/useRequestData/index.mjs';

export const PostChooser = ( { onSelectPost } ) => {
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

	const renderPostResults = ( postsToRender ) => {
		if ( ! postsToRender || postsToRender.length === 0 ) {
			return <p>{ __( 'No posts found.' ) }</p>;
		}

		return postsToRender.map( ( post ) => (
			<div
				key={ post.id }
				className="bu-components-post-chooser-results-item-container"
				onClick={ () => onSelectPost( post ) }
			>
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
							<span className="bu-components-post-chooser-results-item-status">
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
			</div>
		) );
	};

	return (
		<div className="bu-components-post-chooser-modal">
			<div className="bu-components-search-controls">
				<div className="bu-components-post-chooser-search-bar">
					<div className="bu-components-post-chooser-search-field">
						<TextControl
							label={ __( 'Search Posts' ) }
							value={ searchTerm }
							onChange={ ( value ) => setSearchTerm( value ) }
							placeholder={ __( 'Enter search term' ) }
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
			<div className="bu-components-post-chooser-results">
				{ ( isLoading || isSearchLoading ) && <Spinner /> }
				{ searchTerm
					? renderPostResults( searchPosts )
					: renderPostResults( posts ) }
			</div>
		</div>
	);
};
