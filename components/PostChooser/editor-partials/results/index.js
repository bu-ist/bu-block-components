// WordPress dependencies
import { __ } from '@wordpress/i18n';
import { useState, useCallback, useEffect } from '@wordpress/element';

// Internal dependencies
import { ResultsItem } from '../results-item/index.mjs';
import { LoadingSpinner } from '../../../LoadingSpinner/index.mjs';

// Import CSS.
import './editor.scss';

export const Results = ( props ) => {
	const { posts, onSelectPost, loading } = props;

	// State to manage loading state

	const [ spinnerVisible, setSpinnerVisible ] = useState( false );

	// Effect to handle animating the spinner
	useEffect( () => {
		if ( loading ) {
			setSpinnerVisible( true );
		} else {
			// Delay hiding to allow for fade-out animation
			const timer = setTimeout( () => {
				setSpinnerVisible( false );
			}, 300 );
			return () => clearTimeout( timer );
		}
	}, [ loading ] );

	return (
		<>
			<div
				className="bu-components-post-chooser-results-spinner"
				data-spinnervisible={ spinnerVisible }
			>
				<LoadingSpinner />
			</div>
			<ul className="bu-components-post-chooser-results">
				{ ! posts && (
					<li className="bu-components-post-chooser-results-item">
						{ __( 'No posts found.' ) }
					</li>
				) }
				{ posts && Array.isArray( posts ) && posts.length > 0 && (
					<>
						{ posts.map( ( post ) => (
							<ResultsItem
								key={ post.id }
								post={ post }
								onSelectPost={ onSelectPost }
							/>
						) ) }
					</>
				) }

				{ ! posts || posts.length === 0 && (
					<>
						{ ! loading && (
							<div className="bu-components-post-chooser-results-message">
								<h3>{ __( 'No posts found.' ) }</h3>
								<p>{ __( 'Your search term might be too specific. Try broadening your search.' ) }</p>
								<p>{ __( 'If you have a specific post in mind, try searching for its title. Alternatively, you can try entering the post ID or slug.' ) }</p>
							</div>
						)}
						<ResultsItem
							placeholder={ true }
						/>
						<ResultsItem
							placeholder={ true }
						/>
						<ResultsItem
							placeholder={ true }
						/>
						<ResultsItem
							placeholder={ true }
						/>
						<ResultsItem
							placeholder={ true }
						/>
					</>
				) }
			</ul>
		</>
	);
};
