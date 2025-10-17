<?php
/**
 * Plugin Name:       Imports Dev Plugin
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       imports-dev
 *
 * @package ImportsDev
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_imports_dev_block_init() {
	register_block_type( __DIR__ . '/build/blocks/static-starter' );
	register_block_type( __DIR__ . '/build/blocks/use-request-data' );
	register_block_type( __DIR__ . '/build/blocks/urd-post-list' );
	register_block_type( __DIR__ . '/build/blocks/urd-post-via-term' );
	register_block_type( __DIR__ . '/build/blocks/urd-post-terms' );
	register_block_type( __DIR__ . '/build/blocks/urd-post-meta' );
	register_block_type( __DIR__ . '/build/blocks/post-chooser' );
}
add_action( 'init', 'create_block_imports_dev_block_init' );

/**
 * Test CPT
 */
function imports_dev_action_cpt() {
	$cpt_name   = __( 'Bob', 'imports-dev' );
	$cpt_plural = __( 'Bobs', 'imports-dev' );

	$labels = array(
		'name'                  => $cpt_name,
		'singular_name'         => $cpt_name,
		'menu_name'             => $cpt_name,
		'name_admin_bar'        => $cpt_name,
		'archives'              => $cpt_name . __( ' Archives', 'imports-dev' ),
		'attributes'            => $cpt_name . __( ' Attributes', 'imports-dev' ),
		'parent_item_colon'     => __( 'Parent', 'imports-dev' ) . $cpt_name . ':',
		'all_items'             => __( 'All ', 'imports-dev' ) . $cpt_name . __( ' Entries', 'imports-dev' ),
		'add_new_item'          => __( 'Add New ', 'imports-dev' ) . $cpt_name,
		'add_new'               => __( 'Add New', 'imports-dev' ),
		'new_item'              => __( 'New ', 'imports-dev' ) . $cpt_name,
		'edit_item'             => __( 'Edit ', 'imports-dev' ) . $cpt_name,
		'update_item'           => __( 'Update ', 'imports-dev' ) . $cpt_name,
		'view_item'             => __( 'View ', 'imports-dev' ) . $cpt_name,
		'view_items'            => __( 'View ', 'imports-dev' ) . $cpt_plural,
		'search_items'          => __( 'Search ', 'imports-dev' ) . $cpt_plural,
		'not_found'             => __( 'Not found', 'imports-dev' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'imports-dev' ),
		'featured_image'        => __( 'Featured Image', 'imports-dev' ),
		'set_featured_image'    => __( 'Set featured image', 'imports-dev' ),
		'remove_featured_image' => __( 'Remove featured image', 'imports-dev' ),
		'use_featured_image'    => __( 'Use as featured image', 'imports-dev' ),
		'insert_into_item'      => __( 'Insert into item', 'imports-dev' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'imports-dev' ),
		'items_list'            => $cpt_name . __( ' list', 'imports-dev' ),
		'items_list_navigation' => $cpt_name . __( ' list navigation', 'imports-dev' ),
		'filter_items_list'     => __( 'Filter items list', 'imports-dev' ),
	);

	$args = array(
		'label'               => $cpt_plural,
		'description'         => __( 'Pages for ', 'imports-dev' ) . $cpt_plural,
		'labels'              => $labels,
		'supports'            => array(
			'title',
			'editor',
			'excerpt',
			'thumbnail',
			'revisions',
			'custom-fields',
			'author',
		),
		'taxonomies'          => array(),
		'hierarchical'        => true,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 20,
		'menu_icon'           => 'dashicons-reddit',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
		'show_in_rest'        => true,
		'rewrite'             => true,
	);

	register_post_type( 'import-bob', $args );

	// Register meta fields for REST API
	register_post_meta('import-bob', 'bob_where_are_you', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));

	register_post_meta('import-bob', 'bob_text_meta', array(
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	));
}

add_action( 'init', 'imports_dev_action_cpt' );

/**
 * Data and call to register the taxonomy.
 *
 * @param array $tax Data for the taxonomy.
 */
function import_dev_build_taxonomy( $tax ) {

	$labels = array(
		'name'                       => $tax['plural'],
		'singular_name'              => $tax['singular'],
		'search_items'               => __( 'Search ', '[localization]' ) . $tax['plural'],
		'popular_items'              => __( 'Popular ', '[localization]' ) . $tax['plural'],
		'all_items'                  => __( 'All ', '[localization]' ) . $tax['plural'],
		'edit_item'                  => __( 'Edit ', '[localization]' ) . $tax['singular'],
		'update_item'                => __( 'Update ', '[localization]' ) . $tax['singular'],
		'add_new_item'               => __( 'Add New ', '[localization]' ) . $tax['singular'],
		'new_item_name'              => __( 'New ', '[localization]' ) . $tax['singular'] . ' Name',
		'separate_items_with_commas' => __( 'Separate ', '[localization]' ) . strtolower( $tax['singular'] ) . __( 's with commas', '[localization]' ),
		'add_or_remove_items'        => __( 'Add or remove ', '[localization]' ) . strtolower( $tax['plural'] ),
		'choose_from_most_used'      => __( 'Choose from the most used ', '[localization]' ) . strtolower( $tax['singular'] ),
		'not_found'                  => __( 'No ', '[localization]' ) . strtolower( $tax['singular'] ) . __( 's found.', '[localization]' ),
		'view_item'                  => __( 'View ', '[localization]' ) . $tax['singular'],
		'parent_item'                => __( 'Parent ', '[localization]' ) . $tax['singular'],
	);

	$args = array(
		'public'            => true,
		'show_ui'           => $tax['show_ui'],
		'hierarchical'      => $tax['hierarchical'],
		'show_admin_column' => $tax['show_admin_column'],
		'show_in_rest'      => true,
		'rewrite'           => array( 'hierarchical' => false ),
		'labels'            => $labels,
	);

	register_taxonomy( $tax['slug'], 'import-bob', $args );
}

/**
 * Calls import_dev_build_taxonomy for each tax needed.
 */
function import_dev_action_tax() {
	$taxes = array(
		array(
			'slug'              => 'fish',
			'singular'          => __( 'Fish', 'import-dev' ),
			'plural'            => __( 'Fish', 'import-dev' ),
			'hierarchical'      => true,
			'show_admin_column' => true,
			'show_ui'           => true,
			'localization'      => 'import-dev',
		),
	);

	foreach ( $taxes as $tax ) {
		import_dev_build_taxonomy( $tax );
	}
}

add_action( 'init', 'import_dev_action_tax' );
