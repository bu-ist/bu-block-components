/**
 * A custom pagination component that can be used to build pagination
 * controls for data that spans multiple pages.
 */

// WordPress dependencies
import { useState, useEffect } from '@wordpress/element';
import { Button, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';

// Internal dependencies
import { PaginationIcons } from './icons.mjs';

// Import CSS.
import './editor.scss';

export const Pagination = ( props ) => {
	const {
		currentPage = 1, // Default to page 1 if not provided.
		totalPages = 1, // Default to 1 page if not provided.
		onChange = () => {}, // Default to an empty function if not provided.
		showPageNumbers = true,
		showFirstLastButtons = true,
		showPrevNextButtons = true,
		showJumpToPage = false,
		margin = { marginBlock: '1em', marginInline: 0 },
	} = props;

	// Track the current page in state.
	// This allows the component to re-render when the current page changes.
	const [ page, setPage ] = useState( currentPage );

	// Update the current page state when the currentPage prop changes.
	useEffect( () => {
		setPage( currentPage );
	}, [ currentPage ] );

	// Handle a change to the pagination component when user clicks on a button or changes the page number.
	// This function will update the page state and call the onChange callback with the new page number.
	// It is called when the user clicks on the "Previous", "Next", "First", "Last" buttons or changes the page number in the input field.
	const handleChange = ( newPage ) => {
		setPage( newPage );
		onChange( newPage );
	};



	return (
		<nav
			className="bu-components-pagination"
			// Use the margin prop to conditionally apply margin styles
			// marginBlock and marginInline are optional props
			// If they are not provided, they will not be applied.
			style={
				{
					...(margin.marginBlock ? { marginBlock: margin.marginBlock } : {}),
					...(margin.marginInline ? { marginInline: margin.marginInline } : {}),
				}
			}
		>
			{ showPrevNextButtons && (
				<Button
					isSecondary
					disabled={ page <= 1 }
					onClick={ () => handleChange( page - 1 ) }

				>
					<>
						<Icon icon={ PaginationIcons.previous.icon } />
						{ __( 'Previous' ) }
					</>
				</Button>
			)}

			{ ( showFirstLastButtons || showPageNumbers || showJumpToPage ) && (
				<div className='bu-components-pagination-info'>
					{ showFirstLastButtons && (
						<div className='bu-components-pagination-first'>
							<Button
								isSecondary
								disabled={ page <= 1 }
								onClick={ () => handleChange( 1 ) }
								label='First Page'
							>
								{ <Icon icon={ PaginationIcons.first.icon } /> }
							</Button>
						</div>
					)}
					{ showPageNumbers && (
						<div className='bu-components-pagination-of'>
							{ __( 'Page' ) }
							{ ' ' }
							{ showJumpToPage ? (
								<span className='bu-components-pagination-jump-to'>
									<TextControl
										value={ page }
										onChange={ ( value ) => handleChange( value ) }
										type='number'
										min={ 1 }
										max={ totalPages }
										label={ __( 'Jump to page' ) }
										hideLabelFromVision={ true }
									/>
								</span>
							) :
								<strong>{ page }</strong>
							}
							{' '}
							{ __( 'of' ) }
							{' '}
							<strong>{ totalPages }</strong>
						</div>
					)}
					{ showJumpToPage && ! showPageNumbers && (
						<span className='bu-components-pagination-jump-to'>
							<TextControl
								value={ page }
								onChange={ ( value ) => handleChange( value ) }
								type='number'
								min={ 1 }
								max={ totalPages }
								label={ __( 'Jump to page' ) }
								hideLabelFromVision={ true }
							/>
						</span>
					) }
					{ showFirstLastButtons && (
						<div className='bu-components-pagination-last'>
							<Button
								isSecondary
								disabled={ page >= totalPages }
								onClick={ () => handleChange( totalPages ) }
								label='Last Page'
							>
								{ <Icon icon={ PaginationIcons.last.icon } /> }
							</Button>
						</div>
					)}
				</div>
			)}
			{ showPrevNextButtons && (
				<Button
					isSecondary
					disabled={ page >= totalPages }
					onClick={ () => handleChange( page + 1 ) }

				>
					<>
						{ __( 'Next' ) }
						<Icon icon={ PaginationIcons.next.icon } />
					</>
				</Button>
			)}
		</nav>
	);
};
