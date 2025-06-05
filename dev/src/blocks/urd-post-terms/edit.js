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
	const { postID } = attributes;

	// Query for post data
	const [ postData, postIsLoading ] = useRequestData(
		'postType',
		'import-bob',
		postID
	);

	// Query for fish terms if we have post data
	const [ fishTerms, termsIsLoading ] = useRequestData(
		postData ? 'taxonomy' : undefined,
		'fish',
		postData ? { post: postID } : undefined
	);

	console.log( 'fishTerms: ', fishTerms );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Post Settings">
					<PanelRow>
						<TextControl
							label="Post ID"
							value={ postID }
							onChange={ ( value ) =>
								setAttributes( { postID: value } )
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				{ (postIsLoading || termsIsLoading) && (
					<LoadingSpinner
						text="Loading"
						shadow={ false }
						className="terms-loading-spinner"
					/>
				) }

				{ fishTerms && fishTerms.length > 0 && (
					<div className="fish-terms">
						<h3>Fish Terms:</h3>
						<ul>
							{fishTerms.map((term) => (
								<li key={term.id}>
									{term.name}
								</li>
							))}
						</ul>
					</div>
				) }

				{ !postID && (
					<strong>Enter a post ID in the inspector controls</strong>
				) }

				{ postID && fishTerms && fishTerms.length === 0 && (
					<p>No fish terms found for this post.</p>
				) }
			</div>
		</>
	);
}
