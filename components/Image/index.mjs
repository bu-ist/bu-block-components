/**
 * A loading spinner to be used to indicate some activity is occuring.
 */

// External dependencies.
import classnames from 'classnames';

import { useSelect } from '@wordpress/data';

import { store as coreStore } from '@wordpress/core-data';

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
import { useMedia } from '../../index.js';

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

	console.log( props );

	// Is an image set already?
	const hasImage = mediaId ? true : false;

	const media = useSelect(
		( select ) => {
			const mediaObj = select( coreStore ).getMedia( mediaId, {
				context: 'view',
			} ); // undefined
			return mediaObj;
		},
		[ mediaId ]
	);

	if ( ! media ) {
		return <div>Loading... { mediaId }</div>;
	}
	return <div>loadededee... { media }</div>;

	const { mediaObj, isResolvingMedia, hasResolvedMedia } =
		useMedia( mediaId );
	console.log( 'mediaObj is ' );
	console.log( mediaObj );

	// Get the media object.
	const { sadfasdf } = useSelect( ( select ) => ( {
		image: select( coreStore ).getMedia( [ 381626, { context: 'view' } ] ),
	} ) );
	console.log( 'useSelect is ' );
	console.log( sadfasdf );

	// JUST END IT ALREADY
	return <div>nargs</div>;
};
// npx wp-scripts lint-js ./utils --fix
