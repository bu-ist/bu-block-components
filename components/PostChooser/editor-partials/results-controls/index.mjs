import { __ } from '@wordpress/i18n';
import {
	Flex,
	FlexItem,
	FlexBlock,
	__experimentalRadio as Radio,
	__experimentalRadioGroup as RadioGroup,
	DropdownMenu,
	MenuItem,
	MenuGroup,
	Dropdown,
	Button,
	Icon,
	SelectControl
} from '@wordpress/components';

import { useState } from '@wordpress/element';

// Internal dependencies
import {
	IconSortMenu,
	IconSortTitleAscending,
	IconSortTitleDescending,
	IconSortDateAscending,
	IconSortDateDescending
} from '../assets/icons.mjs';


import './editor.scss';

export const ResultsControls = ( props ) => {
	const {
		searchTerm,
		onSearch,
		searchType,
		setSearchType,
		sortOrder,
		setSortOrder,
		contentResultsCount = 0, // Todo: Add support for content results count
		slugResultsCount = 0, // Todo: Add support for slug results count
		idResultsCount = 0, // Todo: Add support for ID results count
	} = props;


	return (
		<div className="bu-components-post-chooser-results-controls">
			<Flex justify="space-between" align="center" >
				<FlexBlock className="bu-components-post-chooser-results-controls-type">
					<RadioGroup
						className='bu-components-post-chooser-search-type'
						label="Search Type"
						onChange={ ( value ) => setSearchType( value ) }
						checked={ searchType }
					>
						<Radio
							value="recent"
							icon="calendar"
							iconPosition="right"
						>
							{ __( 'Recently Updated' ) }
						</Radio>
						<Radio
							value="default"
							disabled={ searchTerm ? false : true }
							icon="media-text"
							iconPosition="right"
						>
							{ __( 'Content' ) }
							<span className="bu-components-post-chooser-results-controls-type-count">{contentResultsCount}</span>
						</Radio>
						<Radio
							value="slug"
							disabled={ searchTerm ? false : true }
							icon="admin-links"
							iconPosition="right"
						>
							{ __( 'Post Slug' ) }
							<span className="bu-components-post-chooser-results-controls-type-count">{slugResultsCount}</span>
						</Radio>
						<Radio
							value="id"
							disabled={ searchTerm ? false : true }
							icon="admin-post"
							iconPosition="right"
						>
							{ __( 'Post ID' ) }
							<span className="bu-components-post-chooser-results-controls-type-count">{idResultsCount}</span>
						</Radio>
					</RadioGroup>
				</FlexBlock>
				<FlexItem className="bu-components-post-chooser-results-controls-sort">
					<Dropdown
						className="bu-components-post-chooser-results-controls-sort-dropdown"
						contentClassName="bu-components-post-chooser-results-controls-sort-dropdown-content"
						position="bottom right"
						popoverProps={ {
							className: 'bu-components-post-chooser-results-controls-sort-dropdown-popover',
							noArrow: false,
						} }

						renderToggle={ ( { isOpen, onToggle, onClose } ) => (
							<Button
								onClick={ () => {
									onToggle();
								} }
								aria-expanded={ isOpen }
								icon={ IconSortMenu }
								label="Sort By:"
								disabled={ searchTerm ? false : true }
							>
							</Button>
						) }

						renderContent={ ( { isOpen, onToggle, onClose } ) => (
							<div className="bu-components-post-chooser-results-controls-sort-dropdown-content-inner">
								<Icon
								 	className="bu-components-post-chooser-results-controls-sort-dropdown-close-icon"
									icon="dismiss"
									onClick={ onToggle }
								/>

								<SelectControl
									className="bu-components-post-chooser-results-controls-sort-by"
									label={ __( 'Sort By' ) }
									value={ sortOrder.orderby }
									onChange={ ( value ) => setSortOrder( { orderby: value, order: sortOrder.order } ) }
									options={ [
										{ label: __( 'Publish Date' ), value: 'date' },
										{ label: __( 'Title' ), value: 'title' }
									] }
								/>

								<RadioGroup
									className="bu-components-post-chooser-results-controls-sort-direction"
									label={ __( 'Sort By' ) }
									onChange={ ( value ) => {
										if ( value === 'asc' ) {
											setSortOrder( { order: 'asc', orderby: sortOrder.orderby } );
										} else if ( value === 'desc' ) {
											setSortOrder( { order: 'desc', orderby: sortOrder.orderby } );
										}
									} }
									checked={ sortOrder.order }
								>
									<Radio value="asc" ><Icon icon="arrow-up-alt" size={ 24 } /></Radio>
									<Radio value="desc" ><Icon icon="arrow-down-alt" size={ 24 } /></Radio>
								</RadioGroup>
							</div>
						) }
					/>
				</FlexItem>
			</Flex>
		</div>
	);
};
