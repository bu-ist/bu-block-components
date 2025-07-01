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
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

import { decodeEntities } from '@wordpress/html-entities';

import {
	Button,
	PanelBody,
	ToggleControl,
	TextControl,
	SelectControl,
	ExternalLink,
} from '@wordpress/components';

import {
	useRequestData,
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

	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};

	const onChangeExcerpt = ( newExcerpt ) => {
		setAttributes( { excerpt: newExcerpt } );
	};

	const calloutRemovePostHandler = ( e ) => {
		console.log( 'remove things in block' );

		setAttributes( {
			selectedPostID: undefined,
			selectedPostTitle: undefined,
			selectedPostExcerpt: undefined,
			selectedPostURL: undefined,
			selectedPostIMG: undefined,
		} );
	};

	const calloutSelectedPostHandler = ( post ) => {
		console.log( post );

		setAttributes( {
			selectedPostID: post.id,
			selectedPostTitle: post.title.rendered,
			selectedPostExcerpt: post.excerpt.rendered,
			selectedPostURL: post.link,
			selectedPostIMG: post.featured_media,
		} );
	};

	function handleFocalPointChange( value ) {
		setAttributes( { focalPoint: value } );
	}

	const handleImageSelect = ( media ) => {
		console.log( 'image Selected:', media );
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
			<div className="wp-block-plugin-slug-block-callout-postpicker--container">
				{ ! selectedPostID && <p>Post picker block, no post selected.</p> }
				{ ! selectedPostID && isSelected && (
					<PostChooser
						modalLabel={ __( 'Choose a post (postchooser block)' ) }
						buttonLabel="Choose your post if you dare..."
						searchPlaceholder={ __( 'Pick something... (postchooser block)' ) }
						onSelectPost={ calloutSelectedPostHandler }
						modalTitle={ __( 'Choose a post (postchooser block)' ) }
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
			<InspectorControls>
				<PostChooserSidebar
					postTitle={ selectedPostTitle }
					postID={ selectedPostID }
					postURL={ selectedPostURL }
					onRemovePost={ calloutRemovePostHandler }
				>
					<PostChooser
						onSelectPost={ calloutSelectedPostHandler }
						buttonLabel={
							selectedPostID ? 'Change' : 'Select Post'
						}
					/>
				</PostChooserSidebar>
			</InspectorControls>
		</div>
	);
}
