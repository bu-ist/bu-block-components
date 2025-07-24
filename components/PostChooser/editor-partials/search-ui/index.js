import {
	TextControl,
	Button,
	Spinner,
	Modal,
	DropdownMenu,
	MenuItem,
	MenuGroup,
	RadioControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './editor.scss';

export const SearchUI = ( props ) => {
	const {
		onSearch,
		searchTerm,
		setSearchTerm,
		sortOrder,
		setSortOrder,
		searchType,
		setSearchType,
		isLoading,
		label,
		placeholder,
	} = props;

	return (
		<div className="bu-components-post-chooser-search-ui">
			<div className="bu-components-post-chooser-search-controls">
				<DropdownMenu icon="sort" label="Select a direction">
					{ ( { onClose } ) => (
						<>
							<MenuGroup>
								<MenuItem
									icon="calendar"
									disabled={
										sortOrder.orderby === 'date' &&
										sortOrder.order === 'asc'
											? true
											: false
									}
									onClick={ () => {
										setSortOrder( {
											orderby: 'date',
											order: 'asc',
										} );
										onSearch();
										onClose();
									} }
								>
									{ __( 'Date Ascending' ) }
								</MenuItem>
								<MenuItem
									icon="calendar"
									disabled={
										sortOrder.orderby === 'date' &&
										sortOrder.order === 'desc'
											? true
											: false
									}
									onClick={ () => {
										setSortOrder( {
											orderby: 'date',
											order: 'desc',
										} );
										onSearch();
										onClose();
									} }
								>
									{ __( 'Date Descending' ) }
								</MenuItem>
								<MenuItem
									icon="heading"
									disabled={
										sortOrder.orderby === 'title' &&
										sortOrder.order === 'asc'
											? true
											: false
									}
									onClick={ () => {
										setSortOrder( {
											orderby: 'title',
											order: 'asc',
										} );
										onSearch();
										onClose();
									} }
								>
									{ __( 'Title Ascending' ) }
								</MenuItem>
								<MenuItem
									icon="heading"
									disabled={
										sortOrder.orderby === 'title' &&
										sortOrder.order === 'desc'
											? true
											: false
									}
									onClick={ () => {
										setSortOrder( {
											orderby: 'title',
											order: 'desc',
										} );
										onSearch();
										onClose();
									} }
								>
									{ __( 'Title Descending' ) }
								</MenuItem>
							</MenuGroup>
						</>
					) }
				</DropdownMenu>
				<span>{ __( 'Sort by' ) }</span>
				<RadioControl
					label="Search By"
					help="How do you want to find things?"
					selected={ searchType }
					options={ [
						{ label: 'Standard Default Search', value: 'default' },
						{ label: 'Post Slug', value: 'slug' },
						{ label: 'Post id', value: 'id' },
					] }
					onChange={ ( value ) => setSearchType( value ) }
				/>
				<div className="bu-components-post-chooser-search-bar">
					<TextControl
						label={ label }
						value={ searchTerm }
						onChange={ ( value ) => setSearchTerm( value ) }
						placeholder={ placeholder }
						className="bu-components-post-chooser-search-field"
					/>
					<Button
						isPrimary
						className="bu-components-post-chooser-search-button"
						onClick={ onSearch }
						disabled={ ! searchTerm }
					>
						{ __( 'Search' ) }
					</Button>
				</div>
			</div>
		</div>
	);
};
