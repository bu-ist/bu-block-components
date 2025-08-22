import {
	Button,
	Flex,
	FlexItem,
	FlexBlock,
	Icon,
	BaseControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import { LoadingSpinner } from '../../../../components/LoadingSpinner/index.mjs';

import './editor.scss';

export const SearchUI = ( props ) => {
	const {
		searchTerm,
		setSearchTerm,
		setSearchType,
		isLoading,
		label = __( 'Enter a search query' ),
		hideLabelFromVision = true,
		placeholder,
		postTypes,
		primaryPostType,
		selectedPostType = primaryPostType || 'post',
		setSelectedPostType = () => {},
	} = props;

	return (
		<div className="bu-components-post-chooser-search-ui">
			<div className="bu-components-post-chooser-search-controls">
				<Flex
					justify="space-between"
					align="start"
					className="bu-components-post-chooser-search-settings"
				>
					<FlexBlock>
						<div className="bu-components-post-chooser-search-bar">
							<BaseControl
								className="bu-components-post-chooser-search-field-base-control"
								label={ label }
								hideLabelFromVision={ hideLabelFromVision }
							>
								<div className="bu-components-post-chooser-search-field-container-inner">
									<div className="bu-components-post-chooser-search-field-icon-container">
										{ isLoading ? (
											<LoadingSpinner
												shadow={ false }
												className="bu-components-post-chooser-search-field-spinner"
											/>
										) : (
											<Icon
												icon="search"
												size={ 26 }
												className="bu-components-post-chooser-search-icon"
											/>
										) }
									</div>
									<input
										type="text"
										value={ searchTerm }
										onChange={ ( event ) =>
											setSearchTerm( event.target.value )
										}
										placeholder={ placeholder }
										className="bu-components-post-chooser-search-field"
										tabIndex="0" // Todo: this is not working to set the focus on the search field when the modal opens.
									/>

									{ searchTerm && (
										<div className="bu-components-post-chooser-search-field-icon-container">
											<Button
												label={ __( 'Clear search' ) }
												onClick={ () => {
													setSearchTerm( '' );
													setSearchType( 'recent' );
												} }
												icon="dismiss"
												size={ 26 }
												className="bu-components-post-chooser-search-clear-button"
											>
												<span className="bu-components-post-chooser-search-clear-button-label">
													{ __( 'Clear' ) }
												</span>
											</Button>
										</div>
									) }
								</div>
							</BaseControl>
						</div>
					</FlexBlock>
				</Flex>
				{ postTypes && postTypes.length > 1 && (
					<Flex
						className="bu-components-post-chooser-posttype-select"
						justify="space-between"
						align="center"
					>
						<FlexBlock>
							<SelectControl
								label={ __( 'Filter by Post Type' ) }
								value={ selectedPostType }
								onChange={ ( value ) =>
									setSelectedPostType( value )
								}
								options={ postTypes }
							/>
						</FlexBlock>
					</Flex>
				) }
			</div>
		</div>
	);
};
