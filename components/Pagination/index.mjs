/**
 * A custom pagination component that can be used to build pagination
 * controls for data that spans multiple pages.
 */

// External Dependencies

import classnames from 'classnames';


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
		className,
		currentPage = 1, // Default to page 1 if not provided.
		totalPages = 1, // Default to 1 page if not provided.
		onChange = () => {}, // Default to an empty function if not provided.
		showPageNumbers = false,
		showMaxPageNumbers = 5,
		showPageInfo = false,
		showFirstLastButtons = false,
		showPrevNextButtons = true,
		nextLabel = __( 'Next' ),
		prevLabel = __( 'Back' ),
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

	// Combine class names for the pagination container with any class passed to the component.
	const classes = classnames( 'bu-components-pagination', className );


	return (
		<nav
			className={classes}
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
			<div className="bu-components-pagination-container">
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
				{ showPrevNextButtons && (
					<Button
						isSecondary
						disabled={ page <= 1 }
						onClick={ () => handleChange( page - 1 ) }

					>
						<>
							<Icon icon={ PaginationIcons.previous.icon } />
							{ prevLabel && (
								<span className="bu-components-pagination-button-text">{ prevLabel }</span>
							)}
						</>
					</Button>
				)}
				{ showPageNumbers && (
					<div className='bu-components-pagination-numbers'>
						{(() => {
							// Logic for displaying max `showMaxPageNumbers` page numbers with ellipses
							const pageButtons = [];
							if (totalPages <= showMaxPageNumbers) {
								// Show all page numbers if total pages are less than or equal to `showMaxPageNumbers`
								for (let i = 1; i <= totalPages; i++) {
									pageButtons.push(
										<Button
											key={i}
											isLink
											disabled={i === page}
											onClick={() => handleChange(i)}
										>
											{i}
										</Button>
									);
								}
							} else {
								// Always show first page
								pageButtons.push(
									<Button
										key={1}
										isLink
										disabled={1 === page}
										onClick={() => handleChange(1)}
									>
										{1}
									</Button>
								);
								// Calculate how many pages to show before and after current page
								const pagesBeforeAndAfter = Math.floor((showMaxPageNumbers - 3) / 2); // -3 for first, last, current

								// Determine start and end of displayed numbers
								let start = Math.max(2, page - pagesBeforeAndAfter);
								let end = Math.min(start + (showMaxPageNumbers - 3), totalPages - 1);

								// Adjust start if end is maxed out
								if (end === totalPages - 1) {
									start = Math.max(2, totalPages - (showMaxPageNumbers - 2));
								} else {
									// If we still have room to show more pages before
									start = Math.max(2, page - Math.floor((showMaxPageNumbers - 3) / 2));
								}

								// Final bounds check
								start = Math.min(start, totalPages - 1);
								end = Math.max(end, Math.min(totalPages - 1, start));
								// Ensure end is not less than start
								if (end < start) {
									end = start;
								}

								// Show ellipsis if needed after first page
								if (start > 2) {
									pageButtons.push(<span key="ellipsis-1" className="bu-components-pagination-ellipsis">…</span>);
								}

								// Show the calculated range
								for (let i = start; i <= end; i++) {
									pageButtons.push(
										<Button
											key={i}
											isLink
											disabled={i === page}
											onClick={() => handleChange(i)}
										>
											{i}
										</Button>
									);
								}

								// Show ellipsis if needed before last page
								if (end < totalPages - 1) {
									pageButtons.push(<span key="ellipsis-2" className="bu-components-pagination-ellipsis">…</span>);
								}

								// Always show last page
								pageButtons.push(
									<Button
										key={totalPages}
										isLink
										disabled={totalPages === page}
										onClick={() => handleChange(totalPages)}
									>
										{totalPages}
									</Button>
								);
							}
							return pageButtons;
						})()}
					</div>
				)}
				{ ( showPageInfo || showJumpToPage ) && (
					<div className='bu-components-pagination-info'>
						{ showPageInfo && (
							<div className='bu-components-pagination-of'>
								<span className="bu-components-pagination-page-label-text">
									{ __( 'Page ' ) }
								</span>
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
						{ showJumpToPage && ! showPageInfo && (
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
							{ nextLabel && (
								<span className="bu-components-pagination-button-text">{ nextLabel }</span>
							) }
							<Icon icon={ PaginationIcons.next.icon } />
						</>
					</Button>
				)}
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
		</nav>
	);
};
