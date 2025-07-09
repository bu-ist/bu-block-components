/**
 * A custom pagination component that can be used to build pagination
 * controls for data that spans multiple pages.
 */

// WordPress dependencies
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';

// Internal dependencies
import { PaginationIcons } from './icons.mjs';

// Import CSS.
import './editor.scss';

export const Pagination = ( props ) => {
	const {
		currentPage,
		totalPages,
		onChange,
		showPageNumbers = true,
		showFirstLastButtons = true,
		showPrevNextButtons = true,
	} = props;

	const [ page, setPage ] = useState( currentPage );

	useEffect( () => {
		setPage( currentPage );
	}, [ currentPage ] );

	const handleChange = ( newPage ) => {
		setPage( newPage );
		onChange( newPage );
	};

	return (
		<nav className="bu-components-pagination">
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

			<div
				className='bu-components-pagination-info'
			>
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
						{ __( 'Page' ) } <strong>{ page }</strong> { __( 'of' ) } <strong>{ totalPages }</strong>
					</div>
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
