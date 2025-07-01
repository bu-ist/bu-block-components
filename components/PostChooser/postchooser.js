/**
 * Component: Post Chooser
 *
 * Displays the ten most recently published posts,
 * and an option to search.
 */

// WordPress dependencies
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import {
	useState,
	useEffect
} from '@wordpress/element';

// Internal dependencies
import { PostChooserModal } from './editor-partials/modal/index.js';

// Import Editor Styles for this Component.
import './editor.scss';

export const PostChooser = ( props ) => {
	const {
		onSelectPost,
		label          = 'Enter a search query',
		buttonLabel = __( 'Select Post' ),
		postTypes      = [ 'posts', 'pages' ], // Default post types to search.
		placeholder    = '',
		minCharacters  = 3,
	} = props;

	/**
	 * Modal State Handlers.
	 *
	 * Manages the open/closed state of the Modal
	 * that contains the Post Chooser UI.
	 */
	const [
		isModalOpen,
		setIsModalOpen
	] = useState( false );

	return (
		<>
			<Button
				isPrimary
				className="bu-components-post-chooser-button"
				onClick={ () => {
					setIsModalOpen(true);
				} }
			>{ buttonLabel }</Button>
			{ isModalOpen && (
				<PostChooserModal
					onSelectPost={ onSelectPost }
					label={ label }
					postTypes={ postTypes }
					placeholder={ placeholder }
					minCharacters={ minCharacters }
					onClose={ () => setIsModalOpen( false ) }
				/>
			) }

		</>

	);
};
