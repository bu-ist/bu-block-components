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
import { useState, useEffect } from '@wordpress/element';

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

	/**
	 * @typedef requestDataQueryParams
	 * @property {string} entity
	 * @property {string} tax
	 * @property {object | number} query
	 * */

	/** @type {requestDataQueryParams} */
	const defaultQueryParams = {
		entity: null,
		tax: null,
		query: null
	}

	// Term Query Params
	/** @type {useState<requestDataQueryParams>} */
	const [termQueryParams, setTermQueryParams] = useState(defaultQueryParams);

	// Post Query Params
	/** @type {useState<requestDataQueryParams>} */
	const [postQueryParams, setPostQueryParams] = useState(defaultQueryParams);

	// Update term query params when termSlug changes
	useEffect(() => {
		// Guard clause: reset state and exit if no termSlug
 		// This prevents stale taxonomy queries from executing
		if (!termSlug) {
			return setTermQueryParams(defaultQueryParams);
		}

		setTermQueryParams({
			entity: 'taxonomy',
			tax: 'fish',
			query: { slug: termSlug }
		});
	}, [termSlug]);

	// First query: Get term data
	const [ termData ] = useRequestData(
		termQueryParams.entity,
		termQueryParams.tax,
		termQueryParams.query
	);

	// Update post query params when term data changes
	useEffect(() => {
		// Guard clause: reset state if any required data is missing
 		// This ensures we don't continue querying posts with stale term IDs
		if (!termData || termData[0]?.id || !termSlug) {
			return setPostQueryParams(defaultQueryParams);	
		}

		setPostQueryParams({
			entity: 'postType',
			type: 'import-bob',
			query: { fish: termData[0].id }
		});
	}, [termSlug, termData]);

	// Second query: Get posts
	const [ posts ] = useRequestData(
		postQueryParams.entity,
		postQueryParams.type,
		postQueryParams.query
	);

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
			<div { ...useBlockProps() }>
				{posts && posts.map((post) => (
					<ThePost key={post.id} post={post} />
				))}
				{ ! termSlug && (
					<strong>Enter a Fish slug in the inspector controls</strong>
				) }
			</div>
		</>
	);
}
