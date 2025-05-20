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
import { useSelect } from '@wordpress/data';

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
 * Demostrates multiple data fetches in a single useSelect call.
 * 
 * 
 * @param {Object} props - The component props.
 * @return {Element} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const { termSlug } = attributes;

	// Fetch any matching terms for the current termSlug with useSelect.
	const { termData, posts } = useSelect((select) => {
		const { getEntityRecords } = select('core');
		
		// Early return if no termSlug
		if (!termSlug) return { termData: null, posts: null };
		
		const terms = getEntityRecords('taxonomy', 'fish', { slug: termSlug });
		
		// Early return if terms not loaded yet
		if (!terms) return { termData: terms, posts: null };
		
		// If there is a term that matches the exact slug, it should be the first one, so get its ID.
		// This might not be true if there are multiple terms that start with the same string, so watch out.
		const termId = terms[0]?.id;

		// If there is a valid termID, get all the posts that are related to it.
		// Otherwise, set posts to null.
		const posts = termId ? getEntityRecords('postType', 'import-bob', { fish: termId }) : null;
		
		// Return any matched terms and posts.
		return {
			termData: terms, // We are not actually using the termData, but is is shown here to demonstrate how multiple values can be returned.
			posts,
		};
	}, [termSlug]);

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
