/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import {
	useRequestData,
	LoadingSpinner,
	// eslint-disable-next-line import/no-unresolved
} from '@bostonuniversity/block-imports';

/**
 * Styles
 */
import './editor.scss';

/**
 * Edit component for the Custom Entity Demo block.
 * Demonstrates using custom entity with useRequestData hook.
 *
 * @param {Object} props Block props.
 * @return {JSX.Element} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { postId } = attributes;

	// Method 1: Using standard WP entity approach
	// Note: For custom post types, we should ensure they're registered with REST API support
	// For this demo, we'll use the custom endpoint for both examples
	const [ regularPosts, regularPostsLoading ] = useRequestData(
		'postType',
		'import-bob',
		{ per_page: 5 }
	);

	// Method 2: Using our custom entity
	// Parameters follow (kind, name, query) order
	// For custom entities: kind is the namespace, name is the entity
	const [ customPosts, customPostsLoading, invalidateRequest ] =
		useRequestData( 'bu-custom/v1', 'import-bob-custom', { per_page: 5 } );

	// Method 3: Using custom entity with meta filtering
	// Demonstrates filtering posts where bob_last_name = Smith
	const [ smithPosts, smithPostsLoading ] = useRequestData(
		'bu-custom/v1',
		'import-bob-custom',
		{
			per_page: 5,
			meta_key: 'bob_last_name',
			meta_value: 'Smith',
		}
	);

	// Method 4: Using custom entity with meta exists check
	// Demonstrates finding all posts that have the bob_last_name meta key
	const [ postsWithLastName, postsWithLastNameLoading ] = useRequestData(
		'bu-custom/v1',
		'import-bob-custom',
		{
			per_page: 5,
			meta_key: 'bob_last_name',
			meta_exists: true,
		}
	);

	// Get selected post if a post ID is set
	// Use the custom entity for single post retrieval too
	const [ selectedPost, selectedPostLoading ] = useRequestData(
		'postType',
		'import-bob',
		postId ? parseInt( postId ) : undefined
	);

	// Build options for the select control
	const postOptions = [
		{ label: __( '-- Select a post --', 'imports-dev' ), value: '' },
	];

	if ( customPosts && customPosts.length ) {
		customPosts.forEach( ( post ) => {
			postOptions.push( {
				label: post.title.rendered || `Post #${ post.id }`,
				value: post.id.toString(),
			} );
		} );
	}

	const handleSelectChange = ( value ) => {
		setAttributes( { postId: value } );
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title={ __( 'Post Selection', 'imports-dev' ) }>
					<PanelRow>
						<SelectControl
							label={ __( 'Select Post', 'imports-dev' ) }
							value={ postId || '' }
							options={ postOptions }
							onChange={ handleSelectChange }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div className="custom-entity-demo">
				<h2>{ __( 'Custom Entity Demo', 'imports-dev' ) }</h2>

				<h3>{ __( 'Method 1: Standard WP Entity', 'imports-dev' ) }</h3>
				{ regularPostsLoading ? (
					<LoadingSpinner text="Loading standard posts..." />
				) : (
					<div className="post-list">
						<h4>
							{ __(
								'Posts from standard WP entity',
								'imports-dev'
							) }
						</h4>
						{ regularPosts && regularPosts.length ? (
							<ul>
								{ regularPosts.map( ( post ) => (
									<li key={ post.id }>
										<strong>{ post.title.rendered }</strong>
									</li>
								) ) }
							</ul>
						) : (
							<p>{ __( 'No posts found.', 'imports-dev' ) }</p>
						) }
					</div>
				) }

				<h3>{ __( 'Method 2: Custom Entity', 'imports-dev' ) }</h3>
				{ customPostsLoading ? (
					<LoadingSpinner text="Loading custom entity posts..." />
				) : (
					<div className="post-list">
						<h4>
							{ __( 'Posts from custom entity', 'imports-dev' ) }
						</h4>
						{ customPosts && customPosts.length ? (
							<ul>
								{ customPosts.map( ( post ) => (
									<li key={ post.id }>
										<strong>{ post.title.rendered }</strong>
									</li>
								) ) }
							</ul>
						) : (
							<p>
								{ __(
									'No posts found from custom entity.',
									'imports-dev'
								) }
							</p>
						) }
						<button
							onClick={ invalidateRequest }
							className="components-button is-primary"
						>
							{ __( 'Refresh Data', 'imports-dev' ) }
						</button>
					</div>
				) }

				<h3>
					{ __(
						'Method 3: Custom Entity with Meta Value Query',
						'imports-dev'
					) }
				</h3>
				{ smithPostsLoading ? (
					<LoadingSpinner text="Loading filtered posts..." />
				) : (
					<div className="post-list">
						<h4>
							{ __(
								'Posts with last name "Smith"',
								'imports-dev'
							) }
						</h4>
						{ smithPosts && smithPosts.length ? (
							<ul>
								{ smithPosts.map( ( post ) => (
									<li key={ post.id }>
										<strong>{ post.title.rendered }</strong>
										<em> (has _bob_last_name = Smith)</em>
									</li>
								) ) }
							</ul>
						) : (
							<p>
								{ __(
									'No posts found with last name "Smith". You need to add some posts with _bob_last_name = Smith meta.',
									'imports-dev'
								) }
							</p>
						) }
					</div>
				) }

				<h3>
					{ __(
						'Method 4: Custom Entity with Meta Exists Check',
						'imports-dev'
					) }
				</h3>
				{ postsWithLastNameLoading ? (
					<LoadingSpinner text="Loading posts with meta key..." />
				) : (
					<div className="post-list">
						<h4>
							{ __(
								'Posts with any last name value',
								'imports-dev'
							) }
						</h4>
						{ postsWithLastName && postsWithLastName.length ? (
							<ul>
								{ postsWithLastName.map( ( post ) => {
									// Get the last name value from meta if available
									const lastName =
										post.meta &&
										post.meta._bob_last_name &&
										post.meta._bob_last_name[ 0 ]
											? post.meta._bob_last_name[ 0 ]
											: 'unknown';

									return (
										<li key={ post.id }>
											<strong>
												{ post.title.rendered }
											</strong>
											<em>
												{ ' ' }
												(has _bob_last_name ={ ' ' }
												{ lastName })
											</em>
										</li>
									);
								} ) }
							</ul>
						) : (
							<p>
								{ __(
									'No posts found with any last name value. You need to add some posts with _bob_last_name meta.',
									'imports-dev'
								) }
							</p>
						) }
					</div>
				) }

				{ postId && (
					<div className="selected-post">
						<h3>
							{ __( 'Selected Post Details', 'imports-dev' ) }
						</h3>
						{ selectedPostLoading && (
							<LoadingSpinner text="Loading post details..." />
						) }

						{ ! selectedPostLoading && ! selectedPost && (
							<p>{ __( 'Post not found.', 'imports-dev' ) }</p>
						) }

						{ ! selectedPostLoading && selectedPost && (
							<div className="post-details">
								<h4>{ selectedPost.title.rendered }</h4>
								<div
									dangerouslySetInnerHTML={ {
										__html: selectedPost.excerpt.rendered,
									} }
								/>
							</div>
						) }
					</div>
				) }
			</div>
		</div>
	);
}
