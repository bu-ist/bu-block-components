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

	const [ data, isLoading, invalidateRequest ] = useRequestData(
		'postType',
		'import-bob',
		postID
	);

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
			<p { ...useBlockProps() }>
				{ isLoading && (
					<>
						<LoadingSpinner
							text="Loading" // Default is undefined.
							shadow={ false } // Default is true.
							className="a-custom-classname-to-add"
						/>
					</>
				) }

				{ data && (
					<>
						{ data.title && (
							<h2>
								<strong>{ data.title.rendered }</strong>
							</h2>
						) }
						<div className="post-meta">
							<strong>Meta:</strong>
							{ data.meta &&
							Object.keys( data.meta ).length > 0 ? (
								<ul>
									{ Object.entries( data.meta ).map(
										( [ key, value ] ) => (
											<li key={ key }>
												<strong>{ key }:</strong>{ ' ' }
												{ value }
											</li>
										)
									) }
								</ul>
							) : (
								<p>No meta data available</p>
							) }
						</div>
					</>
				) }

				{ ! postID && (
					<strong>Enter a post id in the inspector controls</strong>
				) }
			</p>
		</>
	);
}
