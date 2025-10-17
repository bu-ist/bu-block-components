/**
 * Webpack Theme Customization file.
 *
 * Theme developers can make changes to the options, entry points, and paths listed in this file in order to modify the webpack config to load new assets from node packages or to add new stylesheets to be compiled by webpack.
 */

/**
 * SASS includePaths
 *
 * This array specifies the includePaths for Dart Sass to reference in order to find and load SASS partials from node_modules packages.
 * New paths can be added to this array in this file and will be added as paths that Dart Sass checks to find SASS partials for @import instances.
 */
const customIncludePaths = [
	'./node_modules/normalize-scss/sass',
	'./node_modules/mathsass/dist/',
	'./node_modules/@bostonuniversity',
];

/**
 * Theme Entry Points
 *
 * This object contains each of the theme related files that need to be compiled for this theme. This can be SASS or Javascript used in the theme.
 *
 * Format: 'name': 'path-to-file'
 *
 * The name can contain a path to control the output location of the file within the output directory.
 *
 * Example: 'css/admin/adminstyle': './css/admin.scss',
 * In this example the admin.scss file will be compiled as a file named `adminstyle.css` in the /build/css/admin folder path.
 */
const themeEntryPoints = {
	// Styles
	'css/normalize': './src/scss/normalize.scss', // Build a Normalize stylesheet.
	'css/theme': './src/scss/theme.scss', // A stylesheet for the theme.
	'css/admin': './src/scss/admin.scss', // A stylesheet for admin only styles.
	'css/editor-styles': './src/scss/editor-styles.scss', // A stylesheet for editor only styles.
	'css/block-editor': './src/scss/block-editor.scss', // A stylesheet for block editor only styles.
	'css/classic-editor': './src/scss/classic-editor.scss', // A stylesheet for block editor only styles.
	// Blocks
	'css/blocks/blocks-bundled': './src/blocks/blocks-bundled.scss', // All individual block styles bundled into one file.
	'css/blocks/blocks-common': './src/blocks/blocks-common.scss', // Styles common to all blocks.
	// Scripts
	'js/theme': './src/js/theme.js', // Front-end scripts.
	'js/admin': './src/js/admin.js', // Admin only scripts.
	'js/block-editor': './src/js/block-editor.js', // Block editor only scripts.
	'js/classic-editor': './src/js/classic-editor.js', // Block editor only scripts.
};

/**
 * Set SASS compiler to use the faster embedded version. Default is `sass`. `sass-embedded` appears to be faster on MacOS. This can be changed back to `sass` if it causes issues.
 */
const sassCompiler = 'sass-embedded';

/**
 * Set sassOptions.
 * @link https://sass-lang.com/documentation/js-api/interfaces/options/
 */
const customSassOptions = {
	includePaths: customIncludePaths, // Adding our custom include paths.
	// outputStyle: 'compressed', // Determines the output format of the final CSS style.
	quietDeps: true, // If this option is set to true, Sass won’t print warnings that are caused by dependencies.
	silenceDeprecations: [
		'legacy-js-api',
		'global-builtin',
		'import',
		'slash-div',
		'color-functions',
		'color-4-api',
	],
};

/**
 * The stats option lets you precisely control what bundle information gets displayed. This can be a nice middle ground if you don't want to use quiet or noInfo because you want some bundle information, but not all of it.
 *
 * It is defined as a const here so it can be used for both blocksConfig and themeConfig, but if you'd like to use a different setup for each, you can define them inside the individual config objects.
 *
 * @see https://webpack.js.org/configuration/stats/
 */
const statsConfig = {
	preset: 'errors-warnings', // Output everything.
	colors: true, // Use colors for better readability.
};

/**
 * Export these so webpack.config.js can consume it.
 */
module.exports = {
	themeEntryPoints,
	sassCompiler,
	statsConfig,
	customSassOptions,
};
