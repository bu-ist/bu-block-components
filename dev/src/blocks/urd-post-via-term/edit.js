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
	LoadingSpinner,
} from '@bostonuniversity/block-imports';

import { TextControl, PanelBody, PanelRow } from '@wordpress/components';

import {ThePost} from './the-post';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import {post} from "@wordpress/icons";

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

	let termID = '';
	let termEntity = undefined;
	let termTax = undefined;
	let termQuery = undefined;
	let requestEntity = undefined;
	let postType = undefined;
	let postQuery = undefined;

	if ( termSlug ) {
		termEntity = 'taxonomy';
		termTax = 'fish';
		termQuery = {
			slug: termSlug
		};
	}

	const [ termData, termIsLoading, termInvalidateRequest ] = useRequestData(
		termEntity,
		termTax,
		termQuery
	);

	if (termSlug && termData && termData.length > 0) {
		console.log('Term Data: ', termData);
		termID = termData[0].id;
		requestEntity = 'postType';
		postQuery = {
			fish: termID
		}
		postType = 'import-bob';
	}

	const [ data, isLoading, invalidateRequest ] = useRequestData(
		requestEntity,
		postType,
		postQuery
	);

	console.log("posts:", data );

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
				{/*	{isLoading && (*/}
				{/*		<>*/}
				{/*			<LoadingSpinner*/}
				{/*				text="Loading" // Default is undefined.*/}
				{/*				shadow={false} // Default is true.*/}
				{/*				className="a-custom-classname-to-add"*/}
				{/*			/>*/}
				{/*		</>*/}
				{/*	)}*/}

				<h2>Hi. We'll have more in a bit.</h2>
				{data && data.length > 0 && (
					data.map((post) => {
						return (
							<ThePost post={post} />
						)
					})
				)}


				{ ! termSlug && (
					<strong>Enter a Fish slug in the inspector controls</strong>
				) }
			</p>
		</>
	);
}