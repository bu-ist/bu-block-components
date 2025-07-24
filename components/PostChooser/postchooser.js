/**
 * Component: Post Chooser
 *
 * Displays the ten most recently published posts,
 * and an option to search.
 */

// WordPress dependencies
import { __ } from '@wordpress/i18n';

// Internal dependencies
import { PostChooserModal } from './editor-partials/modal/index.js';

// Import Editor Styles for this Component.
import './editor.scss';

export const PostChooser = ( props ) => {
	const {
		onSelectPost,
		modalLabel,
		modalTitle,
		postTypes = [ 'posts', 'pages' ], // Default post types to search.
		searchPlaceholder,
		minCharacters = 3,
		onClose = () => {},
	} = props;

	return (
		<PostChooserModal
			onSelectPost={ onSelectPost }
			label={ modalLabel }
			title={ modalTitle }
			postTypes={ postTypes }
			placeholder={ searchPlaceholder }
			minCharacters={ minCharacters }
			onClose={ onClose }
		/>
	);
};
