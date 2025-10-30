<?php
/**
 * Modifications to Core Endpoints for BU Block Imports Demo Plugin.
 *
 * @author Dakota Chichester <acketon@bu.edu>
 * @link   https://github.com/bu-ist/block-imports
 * @since  1.0.0
 */



add_action( 'rest_api_init', 'bu_block_imports_endpoint_meta_query_filters' );


/**
 * Register REST API meta query filters only for authenticated users with admin access
 */
function bu_block_imports_endpoint_meta_query_filters() {
	// Only apply the filter if the current user can access the admin
	if (current_user_can('edit_posts')) {
		// Apply to 'import-bob' post type
		add_filter( 'rest_import-bob_query', 'bu_block_imports_add_meta_query_to_rest_posts', 10, 2 );
		add_filter( 'rest_import-bob_query', 'bu_blocks_imports_add_has_last_name_filter', 10, 2 );
	}
}


/**
 * Add a query filter to the core endpoint for the import-bob post type
 * to only return posts with a specific value for the post meta key `bob_last_name`.
 *
 * Example URL:
 * http://localhost:8888/wp-json/wp/v2/import-bob?last_name=Smith
 *
 * Example Usage in useRequestData:
 * const { data, isLoading, isError } = useRequestData( 'import-bob', { last_name: 'Smith' } );
 *
 * @param array           $args    The WP_Query arguments.
 * @param WP_REST_Request $request The current request object.
 *
 * @return array Modified WP_Query arguments.
 */
function bu_blocks_imports_add_has_last_name_filter( $args, $request ) {
	// Check for the `last_name` parameter in the request
	$last_name = $request->get_param( 'last_name' );

	// Check that the value of `last_name` is a safe string
	$last_name = filter_var( $last_name, FILTER_SANITIZE_STRING );



	if ( ! empty( $last_name ) ) {
		// Add meta query to filter posts with specific 'bob_last_name' meta key
		$args['meta_query'][] = array(
			'key'     => 'bob_last_name',
			'value'   => $last_name,
			'compare' => '=',
		);
	}

	return $args;
}


/*
* Example of adding full Meta Query support to a custom post type REST API endpoint.
* Note: This is a quick AI generated example and probably needs far better
* sanitization and validation for production use.
* We also probably don't have a need to allow full meta querys and in many
* cases could use more targeted filters like the last name example above.
*
* Example url
* http://localhost:8888/wp-json/wp/v2/import-bob?meta_query[0][key]=bob_foo_field&meta_query[0][value]=bar&meta_query[0][compare]=LIKE
*
* Another example:
* http://localhost:8888/wp-json/wp/v2/projects?closed
*/
function bu_block_imports_add_meta_query_to_rest_posts( $args, $request ) {
	// Check for 'meta_query' parameter in the request
	$meta_query_param = $request->get_param( 'meta_query' );

	if ( ! empty( $meta_query_param ) && is_array( $meta_query_param ) ) {
		$sanitized_meta_query = array();

		// Check if relation is specified and valid
		if ( isset( $meta_query_param['relation'] ) ) {
			$relation = strtoupper( sanitize_text_field( $meta_query_param['relation'] ) );
			if ( in_array( $relation, array( 'AND', 'OR' ), true ) ) {
				$sanitized_meta_query['relation'] = $relation;
			}
			unset( $meta_query_param['relation'] );
		}

		// Process each clause in the meta_query
		foreach ( $meta_query_param as $key => $clause ) {
			// Skip if not array or already processed relation key
			if ( ! is_array( $clause ) || $key === 'relation' ) {
				continue;
			}

			$sanitized_clause = array();

			// Required key parameter
			if ( ! isset( $clause['key'] ) ) {
				continue;
			}
			$sanitized_clause['key'] = sanitize_text_field( $clause['key'] );

			// Optional value parameter
			if ( isset( $clause['value'] ) ) {
				if ( is_array( $clause['value'] ) ) {
					$sanitized_clause['value'] = array_map( 'sanitize_text_field', $clause['value'] );
				} else {
					$sanitized_clause['value'] = sanitize_text_field( $clause['value'] );
				}
			}

			// Optional compare parameter
			if ( isset( $clause['compare'] ) ) {
				$compare_operators = array( '=', '!=', '>', '>=', '<', '<=', 'LIKE', 'NOT LIKE', 'IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN', 'EXISTS', 'NOT EXISTS', 'REGEXP', 'NOT REGEXP', 'RLIKE' );
				$compare = strtoupper( sanitize_text_field( $clause['compare'] ) );
				if ( in_array( $compare, $compare_operators, true ) ) {
					$sanitized_clause['compare'] = $compare;
				}
			}

			// Optional type parameter
			if ( isset( $clause['type'] ) ) {
				$valid_types = array( 'NUMERIC', 'BINARY', 'CHAR', 'DATE', 'DATETIME', 'DECIMAL', 'SIGNED', 'TIME', 'UNSIGNED' );
				$type = strtoupper( sanitize_text_field( $clause['type'] ) );
				if ( in_array( $type, $valid_types, true ) ) {
					$sanitized_clause['type'] = $type;
				}
			}

			$sanitized_meta_query[] = $sanitized_clause;
		}

		if ( ! empty( $sanitized_meta_query ) ) {
			$args['meta_query'] = $sanitized_meta_query;
		}
	}

	return $args;
}

