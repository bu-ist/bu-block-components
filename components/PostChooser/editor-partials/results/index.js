import './editor.scss';
import { ResultsItem } from '../results-item/index.js';
import { __ } from '@wordpress/i18n';

export const Results = ( props ) => {
	const { posts, onSelectPost } = props;

	return (
		<>
			<ul className="bu-components-post-chooser-results">
				{ ! posts && (
					<li className="bu-components-post-chooser-results-item">
						{ __( 'No posts found.' ) }
					</li>
				) }
				{ posts && (
					<>
						{ posts.map( ( post ) => (
							<ResultsItem
								key={ post.id }
								post={ post }
								onSelectPost={ onSelectPost }
							/>
						) ) }
					</>
				) }
			</ul>
		</>
	);
};
