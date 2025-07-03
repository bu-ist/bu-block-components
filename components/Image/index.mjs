/**
 * A loading spinner to be used to indicate some activity is occuring.
 */

// External dependencies.
import classnames from 'classnames';

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
import { useMedia, LoadingSpinner } from '../../index.js';

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
 * @param  props
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

	// Is an image set already?
	const hasImage = mediaId ? true : false;

	// Fetch the media object based on the `mediaId`.
	const { mediaObj, isResolvingMedia, hasResolvedMedia } = useMedia( mediaId );

	/**
	 * If there is no image set, and the user can't edit the image show placeholder.
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/components/Placeholder/
	 * @todo allow user mod?
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

	// hasImage && canEditImage are both true, proceed...

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
	 * @todo this doesn't seem to update/useState?
	 */
	if ( ! mediaObj ) {
		return <p>mediaObj undefined for { mediaId }</p>;
	}

	return <div>nots... { mediaId }</div>;
};
// npx wp-scripts lint-js ./utils --fix
