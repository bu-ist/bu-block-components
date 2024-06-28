// THIS IS PURELY AN EXAMPLE FILE!!!


import { useMedia } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes } = props;
    const { imageId } = attributes;

    const { media, hasResolvedMedia } = useMedia( imageId );

    if ( ! hasResolvedMedia ) {
        return <Spinner />
    }

    return (
        <img src={ media.source_url } alt={ media.alt_text } />
    );
}