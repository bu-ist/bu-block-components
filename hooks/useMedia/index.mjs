/**
 * useMedia
 *
 * @param {string} mediaId The unique numerical identifier assigned to each image attachment in the media library.
 *
 * @return {Object} todo.
 */

// External dependencies.
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export function useMedia( id ) {
	return useSelect(
		( select ) => {
			const { getMedia, isResolving, hasFinishedResolution } =
				select( coreStore );

			const mediaParameters = [ id, { context: 'view' } ];

			return {
				mediaObj: getMedia( ...mediaParameters ),
				isResolvingMedia: isResolving( 'getMedia', mediaParameters ),
				hasResolvedMedia: hasFinishedResolution(
					'getMedia',
					mediaParameters
				),
			};
		},
		[ id ]
	);
}
