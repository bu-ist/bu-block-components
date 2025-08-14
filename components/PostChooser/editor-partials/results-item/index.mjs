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
		placeholder = undefined,
	} = props;


	return (
		<>
			<li
				className="bu-components-post-chooser-results-item"
				data-placeholder={placeholder}
				key={post?.id}
			>
				<div className="bu-components-post-chooser-results-item-container">
					<h2 className="bu-components-post-chooser-results-item-title">
						{ post?.title && (
							decodeEntities( post.title?.rendered )
						)}
						{post?.link &&  (
							<span className='bu-components-post-chooser-results-item-link'>
								<ExternalLink href={post.link}>
									<span className='bu-components-post-chooser-results-item-link-text'>View Post</span>
								</ExternalLink>
							</span>
						)}
					</h2>

					<div className="bu-components-post-chooser-results-item-metadata">
						{ post?.modified && (
							<span className="bu-components-post-chooser-results-item-modified">
								<>
									<strong>{ __( 'Modified: ' ) }</strong>
									{ dateI18n('F j, Y, g:i a', post.modified ) }
								</>
							</span>
						)}
						{ post?.status && (
							<span className="bu-components-post-chooser-results-item-status">
								<strong>{ __( 'Status: ' ) }</strong>
								{ post.status }
							</span>
						)}
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
