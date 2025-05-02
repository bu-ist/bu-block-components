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
 * Demonstrates a React component with dependent data fetching using state management.
 * 
 * This component shows common patterns in React state management:
 * 1. Dependent states - where one state depends on another
 * 2. State reset patterns - how to handle invalid or empty states
 * 3. Data fetching with dependencies - chaining API calls
 * 
 * Data Flow:
 * termSlug (prop) → termQueryParams → termData → postQueryParams → posts
 *
 * @param  props
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { termSlug } = attributes;

	// First data fetch chain: Get taxonomy term data
	// --------------------------------------------
	
	// 1. Query parameters state for taxonomy term
	const [termQueryParams, setTermQueryParams] = useState({
		entity: null,
		tax: null,
		query: null
	});

	// Effect to update term query params when termSlug changes
	useEffect(() => {
		// Guard clause: reset state and exit if no termSlug
		if (!termSlug) {
			setTermQueryParams({
				entity: null,
				tax: null,
				query: null
			});
			return;
		}

		setTermQueryParams({
			entity: 'taxonomy',
			tax: 'fish',
			query: { slug: termSlug }
		});
	}, [termSlug]);

	// Execute the term query
	const [ termData, termIsLoading ] = useRequestData(
		termQueryParams.entity,
		termQueryParams.tax,
		termQueryParams.query
	);

	// Second data fetch chain: Get posts using term ID
	// --------------------------------------------
	
	// 2. Query parameters state for posts
	const [postQueryParams, setPostQueryParams] = useState({
		entity: null,
		type: null,
		query: null
	});

	// Effect to update post query params when term data changes
	useEffect(() => {
		// Guard clause: reset state if any required data is missing
		if (!termSlug || !termData || termData.length === 0) {
			setPostQueryParams({
				entity: null,
				type: null,
				query: null
			});
			return;
		}

		setPostQueryParams({
			entity: 'postType',
			type: 'import-bob',
			query: { fish: termData[0].id }
		});
	}, [termSlug, termData]);

	// Execute the posts query
	const [ posts, isLoading ] = useRequestData(
		postQueryParams.entity,
		postQueryParams.type,
		postQueryParams.query
	);

	// Render UI
	// --------------------------------------------
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