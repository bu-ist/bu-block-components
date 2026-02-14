<?php
/**
 * Custom REST API endpoints for BU Block Imports
 *
 * @category WordPress
 * @package  ImportsDev
 * @author   Dakota Chichester <acketon@bu.edu>
 * @link     https://github.com/bu-ist/block-imports
 * @since    1.0.0
 */

// Exit if accessed directly.
if (! defined( 'ABSPATH' )) {
    exit;
}

/**
 * Register custom REST API endpoints
 *
 * Our custom endpoint supports filtering by meta values:
 * - meta_key: The name of the meta key to filter by (e.g., '_bob_last_name')
 * - meta_value: The value to match (e.g., 'Smith')
 * - meta_exists: Set to 'true' to find posts where the meta_key exists (regardless of value)
 */
function bu_block_imports_register_custom_endpoints() {
    // Register custom endpoint for import-bob post type (collection)
    register_rest_route(
        'bu-custom/v1',
        '/import-bob',
        array(
            'methods'             => 'GET',
            'callback'            => 'bu_block_imports_get_import_bob_posts',
            'permission_callback' => function() {
                return current_user_can( 'edit_posts' );
            },
            'args'                => array(
                'per_page' => array(
                    'default'           => 10,
                    'sanitize_callback' => 'absint',
                ),
                'page' => array(
                    'default'           => 1,
                    'sanitize_callback' => 'absint',
                ),
                'search' => array(
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'include' => array(
                    'sanitize_callback' => 'bu_block_imports_sanitize_array',
                ),
                'exclude' => array(
                    'sanitize_callback' => 'bu_block_imports_sanitize_array',
                ),
                'orderby' => array(
                    'default'           => 'date',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'order' => array(
                    'default'           => 'desc',
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'meta_key' => array(
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'meta_value' => array(
                    'sanitize_callback' => 'sanitize_text_field',
                ),
                'meta_exists' => array(
                    'default'           => false,
                    'sanitize_callback' => function($param) {
                        return rest_sanitize_boolean($param);
                    },
                ),
            ),
        )
    );

    // Register endpoint for single post retrieval
    register_rest_route(
        'bu-custom/v1',
        '/import-bob/(?P<id>[\d]+)',
        array(
            'methods'             => 'GET',
            'callback'            => 'bu_block_imports_get_single_import_bob',
            'permission_callback' => function() {
                return current_user_can( 'edit_posts' );
            },
            'args' => array(
                'id' => array(
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    }
                ),
            ),
        )
    );
}
add_action( 'rest_api_init', 'bu_block_imports_register_custom_endpoints' );

/**
 * Callback for getting a single import-bob post
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response|WP_Error Response object or WP_Error.
 */
function bu_block_imports_get_single_import_bob( $request ) {
    $post_id = $request['id'];

    // Get the post
    $post = get_post( $post_id );

    // Check if post exists and is of the correct type
    if ( ! $post || $post->post_type !== 'import-bob' ) {
        return new WP_Error(
            'rest_post_not_found',
            __( 'Post not found or is not of the import-bob type.' ),
            array( 'status' => 404 )
        );
    }

    // Format the response
    $data = array(
        'id'           => $post->ID,
        'title'        => array(
            'rendered' => $post->post_title,
        ),
        'content'      => array(
            'rendered' => apply_filters( 'the_content', $post->post_content ),
        ),
        'excerpt'      => array(
            'rendered' => apply_filters( 'the_excerpt', $post->post_excerpt ),
        ),
        'slug'         => $post->post_name,
        'date'         => get_the_date( 'c', $post ),
        'status'       => $post->post_status,
    );

    // Add meta data if needed
    $meta_fields = get_post_meta( $post->ID );
    if ( $meta_fields ) {
        $data['meta'] = $meta_fields;
    }

    return rest_ensure_response( $data );
}

/**
 * Callback for the import-bob custom endpoint
 *
 * @param WP_REST_Request $request The request object.
 * @return WP_REST_Response|WP_Error Response object or WP_Error.
 */
function bu_block_imports_get_import_bob_posts( $request ) {
    // Process the custom endpoint request

    $args = array(
        'post_type'      => 'import-bob',
        'posts_per_page' => $request['per_page'],
        'paged'          => $request['page'],
        'post_status'    => 'publish',
        'orderby'        => $request['orderby'],
        'order'          => $request['order'],
    );

    // Add search parameter if provided
    if ( ! empty( $request['search'] ) ) {
        $args['s'] = $request['search'];
    }

    // Add include parameter if provided
    if ( ! empty( $request['include'] ) ) {
        $args['post__in'] = $request['include'];
    }

    // Add exclude parameter if provided
    if ( ! empty( $request['exclude'] ) ) {
        $args['post__not_in'] = $request['exclude'];
    }

    // Add meta filtering based on the parameters provided
    if ( ! empty( $request['meta_key'] ) ) {
        // Create meta query array if it doesn't exist yet
        if ( ! isset( $args['meta_query'] ) ) {
            $args['meta_query'] = array();
        }

        // Case 1: Check if meta key exists (regardless of value)
        if ( $request['meta_exists'] ) {
            $args['meta_query'][] = array(
                'key'     => $request['meta_key'],
                'compare' => 'EXISTS',
            );
        }
        // Case 2: Check for specific meta value
        elseif ( isset( $request['meta_value'] ) ) {
            $args['meta_query'][] = array(
                'key'     => $request['meta_key'],
                'value'   => $request['meta_value'],
                'compare' => '=',
            );
        }
    }

    // Get posts
    $query = new WP_Query( $args );
    $posts = array();

    // Format the response data
    foreach ( $query->posts as $post ) {
        $posts[] = array(
            'id'           => $post->ID,
            'title'        => array(
                'rendered' => $post->post_title,
                'raw'      => $post->post_title,
            ),
            'content'      => array(
                'rendered' => apply_filters( 'the_content', $post->post_content ),
                'raw'      => $post->post_content,
            ),
            'excerpt'      => array(
                'rendered' => apply_filters( 'the_excerpt', $post->post_excerpt ),
                'raw'      => $post->post_excerpt,
            ),
            'featured_media' => get_post_thumbnail_id( $post->ID ),
            'date'         => $post->post_date,
            'slug'         => $post->post_name,
            'status'       => $post->post_status,
            'type'         => $post->post_type,
            'link'         => get_permalink( $post->ID ),
            'meta'         => get_post_meta( $post->ID ),
        );
    }

    // Add pagination info to response headers
    $total_posts = $query->found_posts;
    $total_pages = ceil( $total_posts / $request['per_page'] );

    $response = rest_ensure_response( $posts );
    $response->header( 'X-WP-Total', $total_posts );
    $response->header( 'X-WP-TotalPages', $total_pages );

    return $response;
}

/**
 * Sanitize array values for REST API
 *
 * @param mixed $value The value to sanitize.
 * @return array Sanitized array.
 */
function bu_block_imports_sanitize_array( $value ) {
    if ( ! is_array( $value ) ) {
        $value = explode( ',', $value );
    }
    return array_map( 'absint', $value );
}
