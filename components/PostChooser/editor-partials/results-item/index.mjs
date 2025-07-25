import { Button, ExternalLink } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { dateI18n } from '@wordpress/date';

// Import CSS.
import './editor.scss';

export const ResultsItem = ( props ) => {
	const {
		post,
		onSelectPost,
		placeholder = false,
	} = props;


	return (
		<>
			<li className="bu-components-post-chooser-results-item" data-placeholder={ placeholder } key={ post?.id }>
				<div className="bu-components-post-chooser-results-item-container">
					<div className="bu-components-post-chooser-results-item-inner">
						<div className="bu-components-post-chooser-results-item-postdetails">
							<div className="bu-components-post-chooser-results-item-title">
								{ post?.title && (
									decodeEntities( post.title?.rendered )
								)}
								{post?.link &&  (
									<span className='bu-components-post-chooser-results-item-link'>
										<ExternalLink href={post.link}>View Post</ExternalLink>
									</span>
								)}
							</div>
							<div className="bu-components-post-chooser-results-item-metadata">
								{ post?.modified && (
									<span className="bu-components-post-chooser-results-item-modified">
										<>
											{ __( 'Modified: ' ) }
											{ dateI18n('F j, Y, g:i a', post.modified ) }
										</>
									</span>
								)}
								{ post?.status && (
									<span className="bu-components-post-chooser-results-item-status">
										{ __( 'Status: ' ) }
										{ post.status }
									</span>
								)}
							</div>
						</div>
						{/* <div className="bu-components-post-chooser-results-item-posttype">
							<span className="bu-components-post-chooser-results-item-type">
								{ post?.type }
							</span>
						</div> */}
					</div>
					<Button
						className="bu-components-post-chooser-item-select-button"
						onClick={ () => onSelectPost( post ) }
						disabled={ placeholder }
					>
						Select
					</Button>
				</div>
			</li>
		</>
	);
};
