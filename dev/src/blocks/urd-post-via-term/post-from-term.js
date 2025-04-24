import {
	LoadingSpinner,
	useRequestData
} from '@bostonuniversity/block-imports';


import {ThePost} from './the-post';

export const PostFromTerm = (props) => {
	const {
		slug
	} = props;
	const {termData, isResolvingData, hasResolvedData} = useRequestData(
		'taxonomy',
		'fish',
		{
			slug: slug
		}
	);

	return (
		<>
			{termData && isResolvingData && (
				<LoadingSpinner
					text="Loading"
					shadow={false}
					className="a-clever-classname"
				/>
			)}
			{termData && hasResolvedData && (

			)}
		</>
	);
};
