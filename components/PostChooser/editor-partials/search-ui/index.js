import { TextControl, Button, Spinner, Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './editor.scss';

export const SearchUI = ( props ) => {
	const {
		onSearch,
		searchTerm,
		setSearchTerm,
		searchType,
		setSearchType,
		isLoading,
		label,
		placeholder,
	} = props;

	return (
		<div className="bu-components-post-chooser-search-ui">
			<div className="bu-components-post-chooser-search-controls">
				{
					// Add Search controls
				}
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
