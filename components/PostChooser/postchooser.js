/**
 * Component: Post Chooser
 *
 * Displays the ten most recently published posts,
 * and an option to search.
 */

// Internal dependencies
import { PostChooserModal } from './editor-partials/modal/index.js';

// Import Editor Styles for this Component.
import './editor.scss';

export const PostChooser = ( props ) => {
	const {
		onSelectPost,
		modalLabel,
		modalTitle,
		postTypes,
		primaryPostType,
		searchPlaceholder,
		minCharacters = 3,
		onClose,
		entityKind,
		entityQuery,
	} = props;

	return (
		<PostChooserModal
			onSelectPost={ onSelectPost }
			label={ modalLabel }
			title={ modalTitle }
			postTypes={ postTypes }
			primaryPostType={ primaryPostType }
			placeholder={ searchPlaceholder }
			minCharacters={ minCharacters }
			onClose={ onClose }
			entityKind={ entityKind }
			entityQuery={ entityQuery }
		/>
	);
};
