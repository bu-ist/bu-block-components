// External dependencies.
import classnames from 'classnames';

// WordPress dependencies.
import { useState } from '@wordpress/element';
import {
	Popover,
	Icon
} from '@wordpress/components';


// Import CSS.
import './editor.scss';


/**
 * Returns the class list for the component based on the current settings.
 *
 * @param {string} className  Additional classes assigned to the component.
 */
const getClasses = ( className, offset  ) => classnames(
	'bu-components-help-wrapper',
	{
		[ className ]: className,
		[ `has-offset-label` ]: offset,
	}
);

export const HelpWrapper = ( props ) => {
	const {
		text,
		title,
		className,
		offset,
		children
	} = props;

	// State to manage the visibility of the popover.
	// Initially, the popover is not visible.
	const [ popoverVisible, setPopoverVisible ] = useState( false );

	// Function to toggle the visibility of the popover.
	// This function is called when the icon is clicked.
	const toggleVisible = ( event ) => {
		// If the click is on the icon, toggle the popover visibility.
		if ( popoverVisible ) {
			// If the popover is already visible, hide it.
			setPopoverVisible( false );
		} else {
			// If the popover is not visible, show it.
			setPopoverVisible( true );
		}
	};

	return (
		<div className={ getClasses( className, offset ) }>
			<div className="bu-components-help-wrapper-container">
				{ ! popoverVisible && (
					<Icon
						onClick={ toggleVisible }
						icon="editor-help"
						size="20"
						className="bu-components-help-wrapper-icon"
					/>
				)}
				{ popoverVisible && (
					<>
						<Icon
							icon="dismiss"
							size="20"
							className="bu-components-help-wrapper-icon"
							onClick={ () => {
								setPopoverVisible( false );
							} }
						/>
						<Popover
							className="bu-components-help-wrapper-popover"
							noArrow={false}
							onFocusOutside={ () => {
								setPopoverVisible( false );
							} }
						>
							<div className="bu-components-help-wrapper-popover-content">
								{ title && (
									<h3 className="bu-components-help-wrapper-popover-title">
										{ title }
									</h3>
								)}
								{ text }
							</div>
						</Popover>
					</>
				)}
			</div>
			{ /* Render children inside the wrapper, if any.
				This is how the component can be used to wrap other elements.
				For example, you can use it to wrap other components, like this:
				<HelpWrapper><TextControl label="Title" /></HelpWrapper>
			*/ }
			{ children }
		</div>
	)
};
