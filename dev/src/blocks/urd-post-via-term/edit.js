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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import {
	useRequestData,
	useMedia,
	LoadingSpinner,
} from '@bostonuniversity/block-imports';

import { TextControl, PanelBody, PanelRow } from '@wordpress/components';

import {PostFromTerm} from "./post-from-term";

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
 * @param  props
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { termSlug } = attributes;

	console.log('Atts:', attributes);
	console.log('termSlug:', termSlug);

	let imageID = '';
	let termID = '';

	const [ termData, termIsLoading, termInvalidateRequest ] = useRequestData(
		'taxonomy',
		'fish',
		{
			slug: termSlug
		}
	);

	if ( termData && termData.length > 0 ) {
		termID = termData[0].id;
	}

	const [ data, isLoading, invalidateRequest ] = useRequestData(
		'postType',
		'import-bob',
		{
			fish: termID
		}
	);

	if ( data ) {
		console.log( 'We Got Data:', data );
		console.log( 'Featured Image', data.featured_media );
		imageID = data.featured_media;
	}

	// const { media, isResolvingMedia, hasResolvedMedia } = useMedia( imageID );

	// console.log( isResolvingMedia );
	// console.log( hasResolvedMedia );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Post Settings">
					<PanelRow>
						<TextControl
							label="Term Slug"
							value={ termSlug }
							onChange={ ( value ) =>
								setAttributes( { termSlug: value } )
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>
				{/*{ isLoading && (*/}
				{/*	<>*/}
				{/*		<LoadingSpinner*/}
				{/*			text="Loading" // Default is undefined.*/}
				{/*			shadow={ false } // Default is true.*/}
				{/*			className="a-custom-classname-to-add"*/}
				{/*		/>*/}
				{/*	</>*/}
				{/*) }*/}

				<h2>Hi. We'll have more in a bit.</h2>
				{/*{ data && (*/}
				{/*	<>*/}
				{/*	</>*/}
				{/*) }*/}

				{ ! termSlug && (
					<strong>Enter a Fish slug in the inspector controls</strong>
				) }
			</p>
		</>
	);
}
