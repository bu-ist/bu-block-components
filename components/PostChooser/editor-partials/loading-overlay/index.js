// WordPress Dependencies
import { useEffect, useState } from '@wordpress/element';

// Internal Dependencies
import { LoadingSpinner as BULoadingSpinner } from '../../../LoadingSpinner/index.mjs';

// Import Editor CSS.
import './editor.scss';

export const LoadingSpinner = ( props ) => {
	const { loading } = props;

	// Spinner visibility state for animation
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
		<div
			className="bu-components-post-chooser-results-spinner"
			data-spinnervisible={ spinnerVisible }
		>
			<BULoadingSpinner />
		</div>
	);
};

export const LoadingOverlay = ( props ) => {
	const { loading } = props;

	// Overlay visibility state for animation
	const [ overlayVisible, setOverlayVisible ] = useState( false );

	// Effect to handle animating the overlay
	useEffect( () => {
		if ( loading ) {
			setOverlayVisible( true );
		} else {
			// Delay hiding to allow for fade-out animation
			const timer = setTimeout( () => {
				setOverlayVisible( false );
			}, 300 );
			return () => clearTimeout( timer );
		}
	}, [ loading ] );

	return (
		<div
			className="bu-components-post-chooser-results-overlay"
			data-overlayvisible={ overlayVisible }
		></div>
	);
};
