/**
 * External dependencies
 */
const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

/**
 * WordPress dependencies
 */
const DependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin');

/**
 * Merge with default webpack config
 */
module.exports = {
    ...defaultConfig,
    entry: {
        ...defaultConfig.entry(),
        'custom-entities': './src/custom-entities.js',
    },
    plugins: [
        ...defaultConfig.plugins.filter(
            (plugin) =>
                plugin.constructor.name !== 'DependencyExtractionWebpackPlugin'
        ),
        new DependencyExtractionWebpackPlugin({
            injectPolyfill: true,
            combineAssets: false,
        }),
    ],
};
