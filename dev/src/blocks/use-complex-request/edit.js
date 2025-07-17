/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';

import {
	useRequestComplexData,
	LoadingSpinner,
} from '@bostonuniversity/block-imports';

import { ThePost } from './thepost';

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
 * @return {JSX.Element} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const [ page, setPage ] = useState( 1 );
	const [ isLastPage, setIsLastPage ] = useState( false );
	const perPage = 15;
	const query = {
		per_page: perPage,
		page,
	};

	const imageID = '';

	const [ data, isLoading, invalidateRequest ] = useRequestComplexData(
		'postType',
		['post', 'page'],
		query
	);

	// Check if we're on the last page (fewer posts than per_page)
	useEffect( () => {
		if ( data && data.length < perPage && data.length > 0 ) {
			setIsLastPage( true );
		} else {
			setIsLastPage( false );
		}
	}, [ data ] );

	return (
		<>
			<div { ...useBlockProps() }>
				{ isLoading && (
					<>
						<LoadingSpinner
							text="Loading" // Default is undefined.
							shadow={ false } // Default is true.
							className="a-custom-classname-to-add"
						/>
					</>
				) }
				{ data && data.length > 0 ? (
					<>
						{ data.map( ( post ) => {
							return <ThePost post={ post } />;
						} ) }

						{ isLastPage ? (
							<div className="last-page-message">
								<p>You've reached the last page of posts.</p>
								{ page > 1 && (
									<button
										type="button"
										onClick={ () => {
											setPage( 1 );
											invalidateRequest();
										} }
									>
										Back to first page
									</button>
								) }
							</div>
						) : (
							<button
								type="button"
								onClick={ () => {
									setPage( page + 1 );
									invalidateRequest();
								} }
							>
								Refresh list
							</button>
						) }
					</>
				) : (
					<>
						{ ! isLoading && (
							<div className="no-posts">
								<p>No posts to display.</p>
								{ page > 1 && (
									<button
										type="button"
										onClick={ () => {
											setPage( 1 );
											invalidateRequest();
										} }
									>
										Back to first page
									</button>
								) }
							</div>
						) }
					</>
				) }
			</div>
		</>
	);
}
