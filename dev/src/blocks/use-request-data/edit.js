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

import { HelpWrapper } from '../../../../components/HelpWrapper';

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

	let imageID = '';

	const [ data, isLoading, invalidateRequest ] = useRequestData(
		'postType',
		'import-bob',
		postID
	);

	if ( data ) {
		imageID = data.featured_media;
	}

	const { media, isResolvingMedia, hasResolvedMedia } = useMedia( imageID );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Post Settings">
					<PanelRow>
						<HelpWrapper
							offset="label"
							title="Post ID"
							text={
								<>
									<p>Enter the post ID of the post you want to retrieve data for.</p>
									<p>The Post ID can be found in the URL of the post, for example:</p>
									<p>https://example.com/wp-admin/post.php??post=123</p>
									<p>In this case, the post ID is <strong>123</strong>.</p>
									<p>
										<strong>Documentation is available:</strong> <a href="https://wpdocs.bu.edu">Read More</a>
									</p>
								</>
							}
						>
							<TextControl
								label="Post ID"
								value={ postID }
								onChange={ ( value ) =>
									setAttributes( { postID: value } )
								}
							/>
						</HelpWrapper>
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
						<h2>
							<strong>Title 3:</strong> { data.title.rendered }
						</h2>
						{ data?.excerpt?.raw && (
							<p className="excerpt-something">
								{ data.excerpt.raw }
							</p>
						) }
						{ imageID && isResolvingMedia && (
							<LoadingSpinner
								text="Loading" // Default is undefined.
								shadow={ false } // Default is true.
								className="a-custom-classname-to-add"
							/>
						) }
						{ imageID && hasResolvedMedia && (
							<>
								<p>Got image returned 3</p>
								<img src={ media.source_url } width="150" />
							</>
						) }
						<button type="button" onClick={ invalidateRequest }>
							Refresh list
						</button>
					</>
				) }

				{ ! postID && (
					<strong>Enter a post id in the inspector controls</strong>
				) }
			</p>
		</>
	);
}
