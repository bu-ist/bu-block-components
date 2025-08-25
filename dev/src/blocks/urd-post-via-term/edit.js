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

import { useRequestData } from '@bostonuniversity/block-imports';

import { TextControl, PanelBody, PanelRow } from '@wordpress/components';

import { ThePost } from './the-post';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { post } from '@wordpress/icons';

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

	// Fetch any matching terms for the slug.
	// If there is no slug, send null (which is a safe guard value to prevent invalid requests).
	const [ termData, termIsLoading ] = useRequestData(
		'taxonomy',
		'fish',
		termSlug ? { slug: termSlug } : null
	);

	// Fetch posts for the first term that matches the slug.
	// If there are no terms, send null (which is a safe guard value to prevent invalid requests).
	const [ posts, postsIsLoading ] = useRequestData(
		'postType',
		'import-bob',
		termData?.[ 0 ]?.id ? { fish: termData[ 0 ].id } : null
	);

	// Calculate if any of the requests are loading.
	const isLoading = termIsLoading || postsIsLoading;

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
				{ posts &&
					posts.map( ( post ) => (
						<ThePost key={ post.id } post={ post } />
					) ) }
				{ ! termSlug && (
					<strong>Enter a Fish slug in the inspector controls</strong>
				) }
			</div>
		</>
	);
}
