/**
 * WEBPACK CONFIG
 *
 * This file extends the default wp-scripts webpack config file found here
 *
 * @link https://webpack.js.org/concepts/ Webpack Docs
 * @link https://github.com/WordPress/gutenberg/blob/trunk/packages/scripts/config/webpack.config.js WordPress Webpack Config
 * @link https://developer.bu.edu/gutenberg/gutenberg-handbook/webpack-config-js/ BU Documentation
 *
 * Run `npm list webpack` to see current version.
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const { mergeWithRules } = require( 'webpack-merge' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

/**
 * Block Config for @wordpress/scripts & webpack
 *
 * Do not modify the entry points of this config as it uses the `getWebpackEntryPoints` function from wp-scripts that finds all blocks and block.json files and builds a list of entrypoints for webpack from that automagically.
 */
const blocksConfig = {
	entry: {
		// index: './index.js',
		// COMPONENTS
		// 'components/HelpWrapper': './components/HelpWrapper/index.js',
		// 'components/Image': './components/Image/index.mjs',
		// 'components/LoadingSpinner': './components/LoadingSpinner/index.mjs',
		// 'components/PostChooser': './components/PostChooser/index.mjs',
		// 'components/Pagination': './components/Pagination/index.mjs',
		// HOOKS
		// 'hooks/useMedia': './hooks/useMedia/index.mjs',
		// 'hooks/useRequestData': './hooks/useRequestData/index.mjs',
		// 'hooks/useGetPagination': './hooks/useGetPagination/index.mjs',
		// 'hooks/useDebouncedInput': './hooks/useDebouncedInput/index.mjs',
		// UTILS
		// 'utils/getImageData': './utils/getImageData/index.mjs',
	},
	plugins: [
		// Grab the defaultConfig's plugins array and filter it to remove what we don't need.
		...defaultConfig.plugins.filter(
			// Remove CopyWebpackPlugin from the ThemeConfig so we don't copy block.json & php files into our output folder for the theme's files.
			( plugin ) => ! ( plugin instanceof CopyWebpackPlugin )
		),
		new RemoveEmptyScriptsPlugin(), // Add new plugin that removes empty script files for CSS only entries
	],
};

/**
 * Now we use `webpack-merge` to combine our custom rules defined here with the base WordPress rules.
 * Export the new modified configuration for webpack and use the webpack-merge functions to merge our modified configuration in.
 * @link https://github.com/survivejs/webpack-merge?tab=readme-ov-file#mergewithrules
 */
module.exports = [
	mergeWithRules( {
		entry: 'replace',
		plugins: 'replace',
	} )( defaultConfig, blocksConfig ),
];
