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
import {
	useBlockProps,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import { decodeEntities } from '@wordpress/html-entities';

import { Button } from '@wordpress/components';

import { useState } from '@wordpress/element';

import {
	useMedia,
	LoadingSpinner,
	PostChooser,
	PostChooserSidebar,
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
 * @param  root0
 * @param  root0.attributes
 * @param  root0.setAttributes
 * @param  root0.isSelected
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes, isSelected } ) {
	const {
		title,
		excerpt,
		selectedPostID,
		selectedPostTitle,
		selectedPostURL,
		selectedPostIMG,
		selectedPostExcerpt,
		focalPoint,
	} = attributes;

	/**
	 * Post Chooser Modal State Handlers.
	 *
	 * Manages the open/closed state of the Modal
	 * that contains the Post Chooser UI.
	 */
	const [ isPostChooserModalOpen, setIsPostChooserModalOpen ] =
		useState( false );

	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};

	const onChangeExcerpt = ( newExcerpt ) => {
		setAttributes( { excerpt: newExcerpt } );
	};

	const calloutRemovePostHandler = ( e ) => {

		setAttributes( {
			selectedPostID: undefined,
			selectedPostTitle: undefined,
			selectedPostExcerpt: undefined,
			selectedPostURL: undefined,
			selectedPostIMG: undefined,
		} );
	};

	const calloutSelectedPostHandler = ( post ) => {

		setAttributes( {
			selectedPostID: post.id,
			selectedPostTitle: post.title.rendered,
			selectedPostExcerpt: post.excerpt.rendered,
			selectedPostURL: post.link,
			selectedPostIMG: post.featured_media,
		} );

		// Close the modal after selecting a post
		setIsPostChooserModalOpen( false );
	};

	function handleFocalPointChange( value ) {
		setAttributes( { focalPoint: value } );
	}

	const handleImageSelect = ( media ) => {
		setAttributes( {
			selectedPostIMG: media?.id,
		} );
	};

	const handleImageRemove = () => {
		setAttributes( {
			selectedPostIMG: undefined,
		} );
	};

	// Use the useMedia hook to get media data
	const { media, isResolvingMedia, hasResolvedMedia } =
		useMedia( selectedPostIMG );

	return (
		<div { ...useBlockProps() }>
			<PostChooserSidebar
				postID={ selectedPostID }
				postTitle={ selectedPostTitle }
				postURL={ selectedPostURL }
				onRemovePost={ calloutRemovePostHandler }
				openButtonLabel={ 'Select Post Foo' }
				changeButtonLabel={ 'Change Post Foo' }
				panelTitle={ __( 'Pick something…' ) }
				onOpenPostChooserModal={ () =>
					setIsPostChooserModalOpen( true )
				}
			></PostChooserSidebar>

			<div className="wp-block-plugin-slug-block-callout-postpicker--container">
				{ ! selectedPostID && (
					<>
						<p>
							Post picker block, no post selected.{ ' ' }
							<a
								href="#"
								onClick={ () =>
									setIsPostChooserModalOpen( true )
								}
							>
								Select Post
							</a>
						</p>

						{ isSelected && (
							<Button
								isPrimary
								onClick={ () =>
									setIsPostChooserModalOpen( true )
								}
							>
								{ __( 'Select Post' ) }
							</Button>
						) }
					</>
				) }

				{ isPostChooserModalOpen && (
					<PostChooser
						modalLabel={ __( 'Choose a post (postchooser block)' ) }
						searchPlaceholder={ __(
							'Pick something… (postchooser block)'
						) }
						onSelectPost={ calloutSelectedPostHandler }
						modalTitle={ __( 'Choose a post (postchooser block)' ) }
						onClose={ () => setIsPostChooserModalOpen( false ) }
						postTypes={ [
							{ label: __( 'Bob' ), value: 'import-bob' },
						] }
						taxonomyFilters={ {
							'fish': 'vero-velit-ea, dolor-sequi-incidunt'
						} }
					/>
				) }
				<div className="wp-block-plugin-slug-block-callout-postpicker--image">
					{ isResolvingMedia && <LoadingSpinner /> }
					{ hasResolvedMedia && media && (
						<>
							<img
								src={ media.source_url }
								alt={ media.alt_text || '' }
							/>
							<Button
								isDestructive
								onClick={ handleImageRemove }
								className="remove-image-button"
							>
								Remove Image
							</Button>
							{ ! media && isSelected && (
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ handleImageSelect }
										allowedTypes={ [ 'image' ] }
										value={ selectedPostIMG }
										render={ ( { open } ) => (
											<Button isPrimary onClick={ open }>
												Select Image
											</Button>
										) }
									/>
								</MediaUploadCheck>
							) }
						</>
					) }
				</div>
				<h2 className="wp-block-plugin-slug-block-callout-postpicker--title">
					<a href={ selectedPostURL }>
						{ decodeEntities( selectedPostTitle ) }
					</a>
				</h2>

				{ selectedPostExcerpt && (
					<div className="wp-block-plugin-slug-block-callout-postpicker--excerpt">
						<div
							dangerouslySetInnerHTML={ {
								__html: selectedPostExcerpt,
							} }
						/>
					</div>
				) }
			</div>
		</div>
	);
}
