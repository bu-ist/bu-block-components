import { Button } from '@wordpress/components';
import './editor.scss';

export const ResultsItem = ( props ) => {
	const { post, onSelectPost } = props;

	return (
		<li className="bu-components-post-chooser-results-item" key={ post.id }>
			<div className="bu-components-post-chooser-results-item-container">
				<div className="bu-components-post-chooser-results-item-inner">
					<div className="bu-components-post-chooser-results-item-postdetails">
						<div className="bu-components-post-chooser-results-item-title">
							{ post.title.rendered }
						</div>
						<div className="bu-components-post-chooser-results-item-metadata">
							<span className="bu-components-post-chooser-results-item-modified">
								{ new Date(
									post.modified
								).toLocaleDateString() }
							</span>
							<span className="bu-components-post-chooser-results-item-status">
								{ post.status }
							</span>
						</div>
					</div>
					<div className="bu-components-post-chooser-results-item-posttype">
						<span className="bu-components-post-chooser-results-item-type">
							{ post.type }
						</span>
					</div>
				</div>
				<Button
					className="bu-components-post-chooser-item-select-button"
					onClick={ () => onSelectPost( post ) }
				>
					Select
				</Button>
			</div>
		</li>
	);
};
