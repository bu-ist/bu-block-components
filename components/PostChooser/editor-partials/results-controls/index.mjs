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
	IconPostChooserTextSearch,
	IconPostChooserRecentlyUpdated,
	IconPostChooserSlugSearch,
	IconPostChooserId
} from '../assets/icons.mjs';


import './editor.scss';

export const ResultsControls = ( props ) => {
	const {
		searchTerm,
		searchType,
		sortOrder,
		setSortOrder,
		contentResultsCount = 0, // Todo: Add support for content results count
		slugResultsCount = 0, // Todo: Add support for slug results count
		idResultsCount = 0, // Todo: Add support for ID results count
		onChange = () => {}, // Function to call when the search type or sort order changes.
	} = props;



	return (
		<div className="bu-components-post-chooser-results-controls">
			<Flex justify="space-between" align="center" >
				<FlexBlock className="bu-components-post-chooser-results-controls-type">
					<RadioGroup
						className='bu-components-post-chooser-search-type'
						label="Search Type"
						onChange={ onChange }
						checked={ searchType }
					>
						<Radio
							value="recent"
							icon={ IconPostChooserRecentlyUpdated }
							iconPosition="right"
							className={ searchType === 'recent' ? 'is-active' : '' }
						>
							<span className="bu-components-post-chooser-results-controls-type-label">

								<span className="bu-components-post-chooser-results-controls-type-label-short">
									{ __( 'Recent' ) }
								</span>
								<span className="bu-components-post-chooser-results-controls-type-label-long">
									{ __( 'ly Updated' ) }
								</span>
							</span>
						</Radio>
						<Radio
							value="default"
							icon={ IconPostChooserTextSearch }
							iconPosition="right"
							className={ searchType === 'default' ? 'is-active' : '' }
						>
							{ __( 'Content' ) }
							{ searchTerm && (
								<span className="bu-components-post-chooser-results-controls-type-count">{contentResultsCount}</span>
							)}
						</Radio>
						<Radio
							value="slug"
							icon={ IconPostChooserSlugSearch }
							iconPosition="right"
							className={ searchType === 'slug' ? 'is-active' : '' }
						>
							<span className="bu-components-post-chooser-results-controls-type-label-long">
								{ __( 'Post ' ) }
							</span>
							<span className="bu-components-post-chooser-results-controls-type-label-short">
								{ __( 'Slug' ) }
							</span>
							{ searchTerm && (
								<span className="bu-components-post-chooser-results-controls-type-count">{slugResultsCount}</span>
							)}
						</Radio>
						<Radio
							value="id"
							
							icon={ IconPostChooserId }
							iconPosition="right"
							className={ searchType === 'id' ? 'is-active' : '' }
						>
							<span className="bu-components-post-chooser-results-controls-type-label-long">
								{ __( 'Post ' ) }
							</span>
							<span className="bu-components-post-chooser-results-controls-type-label-short">
								{ __( 'ID' ) }
							</span>
							{ searchTerm && (
								<span className="bu-components-post-chooser-results-controls-type-count">{idResultsCount}</span>
							)}
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
								disabled={ searchTerm || searchType === 'recent' ? false : true }
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
