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
 * Understanding Query Execution:
 * 
 * 1. Component Mounting
 *    - Component mounts with initial termSlug from props
 *    - All states initialize with null values
 *    - Both queries run but do nothing (null parameters)
 * 
 * 2. When termSlug Changes
 *    - Component re-renders (prop change)
 *    - First useEffect runs → updates termQueryParams
 *    - First query executes with new params
 * 
 * 3. When termData Returns
 *    - Second useEffect runs → updates postQueryParams
 *    - Second query executes with new params
 * 
 * Note: Queries will re-run whenever their parameters change!
 * - termQueryParams causes first query to re-run
 * - postQueryParams causes second query to re-run
 * 
 * @param {Object} props - The component props.
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
	// Effect runs on:
	// - Component mount
	// - Any change to termSlug
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

	// First query executes whenever termQueryParams changes
	// This includes:
	// - Initial render (with null params)
	// - After termQueryParams is updated by the effect above
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
	// Effect runs on:
	// - Component mount
	// - Any change to termSlug
	// - Any change to termData
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
			query: { fish: termData[0].id }  // Because the termData was searched by slug, we can assume it will return a single item.
		});
	}, [termSlug, termData]);

	// Second query executes whenever postQueryParams changes
	// This includes:
	// - Initial render (with null params)
	// - After postQueryParams is updated by the effect above
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
							help="Enter a fish taxonomy slug to display related posts"
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


/**
 * Educational Notes: Understanding React State and Query Patterns
 * -----------------------------------------------------------
 * 
 * This component demonstrates several important React patterns and concepts:
 * 
 * 1. Chained Data Dependencies
 *    The data flow follows this chain:
 *    termSlug → termQueryParams → termData → postQueryParams → posts
 *    
 *    Each step depends on the previous one being valid:
 *    - termQueryParams only updates when termSlug is valid
 *    - termData only fetches when termQueryParams are set
 *    - postQueryParams only updates when termData contains items
 *    - posts only fetch when postQueryParams are set
 * 
 * 2. Query Execution Timing
 *    Understanding when queries run is crucial:
 *    a) On initial mount:
 *       - Both queries run with null parameters (no API calls made)
 *    b) When termSlug changes:
 *       - Component re-renders
 *       - First useEffect runs → updates termQueryParams
 *       - First query executes with new params
 *    c) When termData returns:
 *       - Second useEffect runs → updates postQueryParams
 *       - Second query executes with new params
 * 
 * 3. State Reset Pattern
 *    The component demonstrates an important pattern for handling dependent states:
 *    - Each state must be explicitly reset when its dependencies become invalid
 *    - We use guard clauses (early returns) to handle invalid states first
 *    - This prevents stale data from persisting in the UI
 * 
 * 4. Query Parameter State Management
 *    Key points about managing query parameter state:
 *    - We use null (not undefined) to represent "no value" state
 *    - Each query's parameters are kept in their own state
 *    - Parameters only update when all dependencies are valid
 *    - Invalid conditions trigger parameter resets
 * 
 * 5. React Hooks Usage
 *    The component shows proper use of several React hooks:
 *    - useState: For managing query parameter states
 *    - useEffect: For updating states in response to changes
 *    - Custom hooks (useRequestData): For data fetching
 *    
 *    Note the dependency arrays in useEffect - they determine
 *    when the effects run and help maintain the data flow chain.
 */
