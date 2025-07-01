/**
 * A loading spinner to be used to indicate some activity is occuring.
 */

// External dependencies.
import classnames from 'classnames';

import { useState } from '@wordpress/element';
// import { useSelect } from '@wordpress/data';
// import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
// 	const media = useSelect(
//   select => {
//     const media = select(coreStore).getMedia(mediaId, { context: 'view' }); // undefined
//     return media;
//   },
//   [mediaId]
// )

// if (!media) return <div>Loading... {mediaId}</div>;

// return <div>...</div>;
import {
	MediaPlaceholder,
	InspectorControls,
	MediaUploadCheck,
	MediaUpload,
} from '@wordpress/block-editor';

import {
	Button,
	IconButton,
	FocalPointPicker,
	PanelBody,
	PanelRow,
	Placeholder,
} from '@wordpress/components';

import { more } from '@wordpress/icons';

import { __ } from '@wordpress/i18n';

// BU dependencies.
import { useMedia, getImageData, LoadingSpinner } from '../../index.js';

// Import CSS.
import './editor.scss';

/**
 * Returns the class list for the component based on the current settings.
 *
 * @param {string} className Additional classes assigned to the component.
 */
const getClasses = ( className ) =>
	classnames( 'bu-components-image', {
		[ className ]: className,
	} );

/**
 * Export component.
 *
 * @param {string} className Additional classes assigned to the component.
 * @param {string} mediaObj  todo.
 * @param {string} size      todo.
 * @param {string} density   todo.
 *
 * @param          props
 * @return {Element} Element to render, in this case an DIV.
 */
export const Image = ( props ) => {
	const {
		// https://developer.wordpress.org/block-editor/reference-guides/components/focal-point-picker/
		allowedTypes = [ 'audio' ],
		altSource = 'alt',
		canEditImage = true,
		canOverrideImage = true,
		className = undefined,
		debug = false,
		focalPoint = { x: 0.5, y: 0.5 },
		labels = { title: 'my title', instructions: 'my instructions' },
		// {}
		mediaId = undefined,
		onChangeFocalPoint = undefined,
		onRemove = undefined,
		onSelect = undefined,
		// srcset =
		size = 'thumbnail',
		tag = 'img',
		...rest
	} = props;

	// STATES
	// const [imageId, setImageId] = useState(mediaId);
	const [ imageFocalPoint, onChangeFocalPointState ] = useState( focalPoint );
	// console.log(imageId);
	// setImageId(76);

	// Is an image set already?
	const hasImage = mediaId ? true : false;

	const { sadfasdf } = useSelect( ( select ) => ( {
		image: select( 'core' ).getMedia( 381626 ),
	} ) );
	console.log( sadfasdf );

	/**
	 * Fetch the media object based on the `mediaId`.
	 *
	 * Returns Media object
	 */
	const { mediaObj, isResolvingMedia, hasResolvedMedia } =
		useMedia( mediaId );
	console.log( mediaObj );
	console.log( isResolvingMedia );
	console.log( hasResolvedMedia );

	// If Debug is set to true, output some helpful information to the console for block developers to utilize media object info in their block development.
	if ( debug ) {
		if ( isResolvingMedia ) {
			console.log( 'Image Media Fetch in Progress: ', isResolvingMedia );
		}
		if ( hasResolvedMedia ) {
			console.log( 'Image Media Fetched: ', mediaObj );
		}
	}

	/**
	 * If media is being fetched, just show the spinner.
	 *
	 * @see https://github.com/bu-ist/block-imports/tree/develop/components/LoadingSpinner
	 */
	if ( isResolvingMedia ) {
		return <LoadingSpinner text="Loading..." />;
	}

	/**
	 * If media is being fetched, just show the spinner.
	 *
	 * @see https://github.com/bu-ist/block-imports/tree/develop/components/LoadingSpinner
	 */
	if ( ! mediaObj ) {
		return <p>mediaObj undefined for { mediaId }</p>;
	}

	/**
	 * If there is no image set, and the user can't edit the image show placeholder.
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/components/Placeholder/
	 */
	if ( ! hasImage && ! canEditImage ) {
		return (
			<Placeholder
				className="bu-components-image-media-placeholder"
				icon={ more }
				label="Placeholder"
				withIllustration
			/>
		);
	}

	/**
	 * If there is no image set, and the user can edit the image, show Media Placeholder.
	 *
	 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/media-placeholder/README.md
	 */
	if ( ! hasImage && canEditImage ) {
		return (
			<MediaPlaceholder
				labels={ labels }
				onSelect={ onSelect }
				accept="image/*"
				multiple={ false }
				allowedTypes={ allowedTypes }
			/>
		);
	}

	/**
	 * Fetch the image object based on the `mediaObj`. Let's get everything we need to display a specific size.
	 * @todo breaks if size doesn't exist
	 * @todo useState?
	 * Returns Media object
	 */
	// console.log(mediaObj);
	// console.log(size);
	const imgObj = getImageData( mediaObj, size );
	if ( ! imgObj ) {
		return (
			<p>
				{ mediaObj } @ { size } does not seem to be an image, or the
				getImageData process failed... Sadness is all that I can
				provide.
			</p>
		);
	}

	const handleFocalPointPickerOnChange = ( focalPoint ) => {
		onChangeFocalPoint( focalPoint ); // Call user supplied function
		onChangeFocalPointState( focalPoint ); // Call state function
	};

	// If component has FocalPoint Handler Function show the focal picker.
	const displayFocalPointPicker = typeof onChangeFocalPoint === 'function';
	// console.log(typeof onChangeFocalPoint);

	// srcset
	const sources = [];
	if ( tag === 'picture' ) {
		const srcset = {
			sources: [
				{
					srcset: getImageData( mediaObj, 'medium' ).src,
					media: '(min-width: 600px)',
					type: imgObj.mime_type,
				},
				{
					srcset: getImageData( mediaObj, 'large' ).src,
					media: '(min-width: 300px)',
				},
			],
		};
		for ( let i = 0; i < srcset.sources.length; i++ ) {
			const source = srcset.sources[ i ];
			sources.push(
				<source
					srcSet={ source.srcset }
					media={ source.media }
					type={ source.type }
				/>
			);
		}
	}

	// alt
	// console.log(imgObj);
	let altText = '';
	// alt, caption, title, description
	if ( altSource === 'alt' ) {
		altText = imgObj.alt;
	} else if ( altSource === 'caption' ) {
		altText = imgObj.caption;
	} else if ( altSource === 'title' ) {
		altText = imgObj.title;
	} else if ( altSource === 'description' ) {
		altText = imgObj.description;
	} else {
		altText = altSource;
	}

	/**
	 *
	 * TODO
	 *
	 *
	 *
	  The component should support the following use cases:

	  Display Size/dimensions - should control the width/height the component is displayed in the editor

	  Placeholder image - We may want to support passing in a custom placeholder image to display until the selected image is fetched?

	  Future ideas: Control over setting Src set to allow for customization of images at different breakpoints?

	  fill out readme with all the notes...

	  √ className
	  √ mediaId
	  √ size
	  √ tag
	  √ altSource
	  √ onSelect - send a function; should make this more clear
	  √ onRemove - send a function; should make this more clear
	  √ focalPoint - send array
	  √ onChangeFocalPoint - send a function
	  labels - allow block developers to adjust the labels of the component UI
	  canEditImage - show picker???
	  √ canOverrideImage - show or hide edit button
	  X seems to work just once allowedTypes // https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md#allowedtypes
	  √ debug

	 */

	// @todo does this work?
	if ( displayFocalPointPicker ) {
		const focalPointStyle = {
			objectFit: 'cover',
			objectPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`,
		};

		rest.style = {
			...rest.style,
			...focalPointStyle,
		};
	}

	// https://github.com/WordPress/gutenberg/blob/trunk/packages/block-editor/src/components/media-upload/README.md
	return (
		<div>
			{ ( canOverrideImage || onRemove || displayFocalPointPicker ) && (
				<InspectorControls>
					<PanelBody title={ __( 'Image Settings' ) }>
						{ ( canOverrideImage || onRemove ) && (
							<>
								<h2>{ __( 'Selected Image' ) }</h2>
								<PanelRow>
									{ canOverrideImage && (
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ onSelect }
												value={ mediaId }
												allowedTypes={ allowedTypes }
												render={ ( { open } ) => (
													<IconButton
														className="bu-components-image-media-edit-button"
														onClick={ open }
														icon="edit"
														label={ __(
															'Edit Media'
														) }
														isDefault
														isLarge
													>
														{ __( 'Edit' ) }
													</IconButton>
												) }
											/>
										</MediaUploadCheck>
									) }
									{ onRemove && (
										<>
											<Button
												className="bu-components-image-media-remove-button"
												onClick={ onRemove }
												label={ 'Remove Media' }
												isLink
											>
												{ __( 'Remove Media' ) }
											</Button>
										</>
									) }
								</PanelRow>
							</>
						) }
						{ displayFocalPointPicker && (
							<PanelRow>
								{ /* https://developer.wordpress.org/block-editor/reference-guides/components/focal-point-picker/ */ }
								<FocalPointPicker
									className="bu-components-image-media-edit-focalpoint"
									label={ __( 'Focal Point Picker' ) }
									url={ imgObj.src }
									value={ imageFocalPoint }
									onChange={ handleFocalPointPickerOnChange }
								/>
							</PanelRow>
						) }
					</PanelBody>
				</InspectorControls>
			) }
			{ tag === 'picture' && (
				<>
					<h3>picture</h3>
					<picture className={ getClasses( className ) } { ...rest }>
						{ sources }
						<img src={ imgObj.src } alt={ altText } />
					</picture>
				</>
			) }
			{ tag === 'figure' && (
				<>
					<h3>figure</h3>
					<figure className={ getClasses( className ) } { ...rest }>
						<img src={ imgObj.src } alt={ altText } />
						<figcaption>{ altText }</figcaption>
					</figure>
				</>
			) }
			{ tag === 'img' && (
				<>
					<h3>img</h3>
					<img
						className={ getClasses( className ) }
						src={ imgObj.src }
						alt={ altText }
						{ ...rest }
					/>
				</>
			) }
		</div>
	);
};
// npx wp-scripts lint-js ./utils --fix
