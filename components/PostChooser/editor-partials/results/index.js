// WordPress dependencies
import { __ } from '@wordpress/i18n';

// Internal dependencies
import { ResultsItem } from '../results-item/index.mjs';

// Import CSS.
import './editor.scss';

// Import Assets.
import helpPostIdImage from './help-post-id.png';

export const Results = ( props ) => {
	const { posts, onSelectPost, loading, totalItems, searchTerm, searchType } = props;

	return (
		<div className="bu-components-post-chooser-results">
			{ ! posts && ! searchTerm && searchType !== 'recent' && (
				<div className="bu-components-post-chooser-before-search-message">
					{ searchType === 'slug' && (
						<>
							<h3>{ __( 'Search by Slug' ) }</h3>
							<p>{ __( 'Enter the post slug to find it quickly.' ) }</p>
						</>
					) }
					{ searchType === 'default' && (
						<>
							<h3>{ __( 'Search Post Content' ) }</h3>
							<p>{ __( 'Enter a search term to search the Title & Post Content. Note, post meta, taxonomies, and other metadata will not be searched.' ) }</p>
						</>
					) }
					{ searchType === 'id' && (
						<>
							<h3>{ __( `Find post by its ID` ) }</h3>
							<p>
								{ __('If looking for a specific post, enter the') } <strong>{ __('Post ID') }</strong> { __('in the search field.') }
							</p>
							<img className="bu-components-post-chooser-help-image" src={ helpPostIdImage } />
							<p>{ __( 'The post ID can be found in the URL of the post edit screen.' ) }</p>
						</>
					) }
				</div>
			) }
			{ searchTerm && ! loading && totalItems === 0 && (
				<div className="bu-components-post-chooser-no-results-message">
					<div className="bu-components-post-chooser-results-message">
						{ searchType === 'default' && (
							<>
								<h3>{ __( 'No Posts Found' ) }</h3>
								<h4>{ __( 'The search term:' ) } <code>{ searchTerm }</code> { __( 'did not match any posts.' ) }</h4>
								<p>
									{ __(
										'Your search term might be too specific. Try broadening your search.'
									) }
								</p>
								<p>
									{ __(
										'If you have a specific post in mind, try searching for its title. Alternatively, you can try entering the post ID or slug.'
									) }
								</p>
							</>
						) }
						{ searchType === 'slug' && (
							<>
								<h3>{ __( 'Post Slug Not Found' ) }</h3>
								<p>
									{ __(
										'Check that the slug is exactly the same as the slug of the post. A partial match will not work.'
									) }
								</p>

							</>
						) }
						{ searchType === 'id' && (
							<>
								<h3>{ __( 'Post ID Not Found' ) }</h3>
								<p>
									{ __(
										'Check that a numerical post ID has been entered and that the post type is correct.'
									) }
								</p>

							</>
						) }
					</div>
				</div>
			) }
			<ul className="bu-components-post-chooser-results-list" data-loading={ loading }>
				{ loading && (
					<>
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
						<ResultsItem placeholder={ true } />
					</>
				) }
				{ posts && Array.isArray( posts ) && posts.length > 0 && (
					<>
						{ posts.map( ( post ) => (
							<ResultsItem
								key={ post.id }
								post={ post }
								onSelectPost={ onSelectPost }
							/>
						) ) }
					</>
				) }
			</ul>
		</div>
	);
};
