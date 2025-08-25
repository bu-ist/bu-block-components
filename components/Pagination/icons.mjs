import { SVG, Path } from '@wordpress/primitives';
import { __ } from '@wordpress/i18n';

export const PaginationIcons = {
	previous: {
		icon: <SVG width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
 <Path d="m723.74 918.19 70.703-70.703-247.48-247.48 247.48-247.48-70.703-70.703-318.19 318.19z"/>
</SVG>,
		label: 'Previous Page',
	},
	next: {
		icon: <SVG width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
 <Path d="m476.26 918.19-70.703-70.703 247.48-247.48-247.48-247.48 70.703-70.703 318.19 318.19z"/>
</SVG>,
		label: 'Next Page',
	},
	first: {
		icon: <SVG width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
 <Path d="m873.74 918.19 70.703-70.703-247.48-247.48 247.48-247.48-70.703-70.703-318.19 318.19z"/>
 <Path d="m450 950h-100v-700h100z"/>
</SVG>,
		label: 'First Page',
	},
	last: {
		icon: <SVG width="1200pt" height="1200pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
 <Path d="m326.26 918.19-70.703-70.703 247.48-247.48-247.48-247.48 70.703-70.703 318.19 318.19z"/>
 <Path d="m750 250h100v700h-100z"/>
</SVG>,
		label: 'Last Page',
	},
};
