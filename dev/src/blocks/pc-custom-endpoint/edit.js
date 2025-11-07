/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { decodeEntities } from '@wordpress/html-entities';

import {
	PostChooser,
	PostChooserSidebar,
	registerCustomEntities,
} from '@bostonuniversity/block-imports';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               - The component props.
 * @param {Object}   props.attributes    - The block attributes.
 * @param {Function} props.setAttributes - Function to update block attributes.
 * @param {boolean}  props.isSelected    - Whether the block is currently selected.
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		selectedPostID,
		selectedPostTitle,
		selectedPostExcerpt,
		selectedPostURL,
	} = attributes;

	useEffect( () => {
		// Register the custom bob endpoint as an entity
		const unsubscribe = registerCustomEntities( [
			{
				kind: 'root',
				name: 'block-imports/v1/bob-endpoint',
				baseURL: '/block-imports/v1/bob-endpoint',
			},
		] );

		// Cleanup subscription on unmount
		return () => {
			if ( typeof unsubscribe === 'function' ) {
				unsubscribe();
			}
		};
	}, [] );

	/**
	 * Post Chooser Modal State Handlers.
	 */
	const [ isPostChooserModalOpen, setIsPostChooserModalOpen ] =
		useState( false );

	const handleSelectPost = ( post ) => {
		setAttributes( {
			selectedPostID: post.ID, // Note: custom endpoint returns ID, not id
			selectedPostTitle: post.post_title,
			selectedPostExcerpt: post.post_excerpt,
			selectedPostURL: post.guid,
		} );
		setIsPostChooserModalOpen( false );
	};

	const handleRemovePost = () => {
		setAttributes( {
			selectedPostID: undefined,
			selectedPostTitle: undefined,
			selectedPostExcerpt: undefined,
			selectedPostURL: undefined,
		} );
	};

	// Custom entity query parameters for the bob endpoint
	const customEntityQuery = {
		// The endpoint already filters by meta_endpoint_flag = 'yes'
		// Add any additional parameters your endpoint might support
		numberposts: 10,
	};

	return (
		<div { ...useBlockProps() }>
			<PostChooserSidebar
				postID={ selectedPostID }
				postTitle={ selectedPostTitle }
				postURL={ selectedPostURL }
				onRemovePost={ handleRemovePost }
				openButtonLabel={ __( 'Select Bob Post' ) }
				changeButtonLabel={ __( 'Change Bob Post' ) }
				panelTitle={ __( 'Selected Bob Post' ) }
				onOpenPostChooserModal={ () =>
					setIsPostChooserModalOpen( true )
				}
			/>

			<div className="wp-block-pc-custom-endpoint-container">
				{ ! selectedPostID && (
					<>
						<p>
							{ __(
								'Custom endpoint post picker - no post selected.'
							) }{ ' ' }
							<Button
								variant="link"
								onClick={ () =>
									setIsPostChooserModalOpen( true )
								}
							>
								{ __( 'Select Bob Post' ) }
							</Button>
						</p>

						{ isSelected && (
							<Button
								isPrimary
								onClick={ () =>
									setIsPostChooserModalOpen( true )
								}
							>
								{ __( 'Select Bob Post' ) }
							</Button>
						) }
					</>
				) }

				{ selectedPostID && (
					<div className="selected-bob-post">
						<h2 className="selected-bob-post-title">
							<a href={ selectedPostURL }>
								{ selectedPostTitle
									? decodeEntities( selectedPostTitle )
									: __( 'Untitled' ) }
							</a>
						</h2>

						{ selectedPostExcerpt && (
							<div
								className="selected-bob-post-excerpt"
								dangerouslySetInnerHTML={ {
									__html: selectedPostExcerpt,
								} }
							/>
						) }
					</div>
				) }

				{ isPostChooserModalOpen && (
					<PostChooser
						modalLabel={ __(
							'Search Bob posts with custom endpoint'
						) }
						searchPlaceholder={ __( 'Search Bob posts…' ) }
						onSelectPost={ handleSelectPost }
						modalTitle={ __( 'Choose a Bob Post' ) }
						onClose={ () => setIsPostChooserModalOpen( false ) }
						// Use the custom entity kind and name
						entityKind="root"
						postTypes={ [
							{
								label: __( 'Bob Posts' ),
								value: 'block-imports/v1/bob-endpoint',
							},
						] }
						primaryPostType="block-imports/v1/bob-endpoint"
						// Pass custom query parameters to the endpoint
						entityQuery={ customEntityQuery }
					/>
				) }
			</div>
		</div>
	);
}
