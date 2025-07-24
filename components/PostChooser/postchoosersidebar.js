/**
 * Component: Post Chooser Sidebar
 *
 * Sidebar component for edits to selected post.
 */

// WordPress dependencies.
import { __ } from '@wordpress/i18n';

import {
	Button,
	PanelBody,
	PanelRow,
	ExternalLink,
	Flex,
	FlexItem,
	FlexBlock,
} from '@wordpress/components';

import { InspectorControls } from '@wordpress/block-editor';
import { decodeEntities } from '@wordpress/html-entities';

// Import Editor Styles for this Component.
import './editor.scss';

export const PostChooserSidebar = function ( props ) {
	const {
		children, // Optional. Allows child elements to be passed into the component.
		postID, // The ID of the selected post.
		postTitle, // The title of the selected post.
		postURL, // The URL of the selected post.
		onRemovePost = () => {}, // Function to call when the post is removed.
		removePostButtonLabel = __( 'Remove' ), // Label for the remove post button.
		openButtonLabel = __( 'Select Post' ), // Label for the open post chooser button.
		changeButtonLabel = __( 'Change' ), // Label for the change post button.
		panelTitle = __( 'Selected Post' ), // Title for the sidebar panel.
		showPostLink = true, // Whether to show a link to the post.
		onOpenPostChooserModal = () => {}, // Function to call when the open modal button is pressed.
	} = props;

	return (
		<InspectorControls>
			<PanelBody
				title={ panelTitle }
				className="bu-components-post-chooser-sidebar-options"
			>
				{ postTitle && (
					<PanelRow>
						<div className="components-post-chooser-sidebar-posttitle">
							<span className="components-post-chooser-sidebar-posttitle-label">
								Title:
							</span>
							{ postURL && showPostLink && (
								<ExternalLink
									href={ postURL }
									className="components-post-chooser-sidebar-posttitle-link"
								>
									View Post
								</ExternalLink>
							) }
							<h2 className="components-post-chooser-sidebar-posttitle-heading">
								{ decodeEntities( postTitle ) }
							</h2>
						</div>
					</PanelRow>
				) }
				<PanelRow>
					<Flex wrap={ true }>
						<FlexItem>
							<Button
								isPrimary
								onClick={ () => onOpenPostChooserModal() }
							>
								{ postID ? changeButtonLabel : openButtonLabel }
							</Button>
						</FlexItem>
						{ postID && (
							<FlexBlock>
								<Button isLink onClick={ onRemovePost }>
									{ removePostButtonLabel }
								</Button>
							</FlexBlock>
						) }
					</Flex>
				</PanelRow>
				{ /*
				 * Optional. If children are passed, render them in the sidebar.
				 * This allows for additional controls or information to be displayed. This
				 * is useful for custom controls or displaying info related to the post.
				 * Example usage: <PostChooserSidebar>{ <CustomControl /> }</PostChooserSidebar>
				 */ }
				{ children && (
					<PanelRow>
						<div className="components-post-chooser-sidebar-children">
							{ children }
						</div>
					</PanelRow>
				) }
			</PanelBody>
		</InspectorControls>
	);
};
