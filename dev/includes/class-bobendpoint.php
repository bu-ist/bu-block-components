<?php
/**
 * Custom Endpoint Demo
 *
 * This is an example of how to use a custom endopoint for a block.
 *
 * I'm basing this endpoint on BU Filtering's custom endpoint.
 * https://github.com/bu-ist/bu-filtering/blob/develop/includes/class-filterendpoint.php
 *
 * @package BlockImports
 */

namespace BlockImports\Dev\Includes\Endpoint;

use Exception;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

/**
 * Class to create a custom endpoint.
 */
class BobEndpoint {

	/**
	 * Class Instance.
	 *
	 * @var object
	 */
	private static $instance;

	/**
	 * Singleton method.
	 */
	public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}

		return static::$instance;
	}

	/**
	 * Construction Method.
	 * Set up variables and add hooks
	 */
	protected function __construct() {
		add_action( 'rest_api_init', array( $this, 'api_init' ) );
	}

	/**
	 * Clone Method.
	 */
	private function __clone() {
	}

	/**
	 * Wakeup Method.
	 */
	private function __wakeup() {
	}

	/**
	 * Action to create the custom endpoint.
	 */
	public function api_init() {
		register_rest_route(
			'block-imports/v1',
			'/bob-endpoint',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'holler' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/**
	 * Callback to retrieve data.
	 *
	 * @param WP_REST_Request $request The request from the endpiont.
	 *
	 * @return object Response.
	 */
	public function holler( WP_REST_Request $request ) {
		$response = new WP_REST_Response();

		try {
			$query_data = $this->get_query_response( $request );
			$response->set_data( $query_data['posts'] );

			// Set pagination headers for PostChooser compatibility.
			$response->header( 'X-WP-Total', $query_data['total'] );
			$response->header( 'X-WP-TotalPages', $query_data['total_pages'] );

		} catch ( Exception $e ) {
			$response = new WP_Error( get_class( $e ), $e->getMessage() );
		}

		return $response;
	}

	/**
	 * Method to get the query response.
	 *
	 * @param WP_REST_Request $request The request from the endpiont.
	 *
	 * @return array The response data.
	 */
	protected function get_query_response( WP_REST_Request $request ) {
		// Get parameters from request.
		$per_page = $request->get_param( 'per_page' ) ? $request->get_param( 'per_page' ) : 10;
		$page     = $request->get_param( 'page' ) ? $request->get_param( 'page' ) : 1;
		$search   = $request->get_param( 'search' );
		$orderby  = $request->get_param( 'orderby' ) ? $request->get_param( 'orderby' ) : 'date';
		$order    = $request->get_param( 'order' ) ? $request->get_param( 'order' ) : 'desc';

		// Base query args.
		$args = array(
			'posts_per_page' => min( $per_page, 100 ), // Limit to prevent performance issues.
			'paged'          => $page,
			'post_status'    => 'publish',
			'post_type'      => 'import-bob',
			'meta_key'       => 'meta_endpoint_flag', //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
			'meta_value'     => 'yes', //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
			'orderby'        => $orderby,
			'order'          => $order,
		);

		// Add search functionality.
		if ( ! empty( $search ) ) {
			$args['s'] = sanitize_text_field( $search );
		}

		// Execute the query.
		$query = new \WP_Query( $args );
		$posts = $query->posts;

		// Transform posts to include necessary fields for PostChooser.
		$formatted_posts = array();
		foreach ( $posts as $post ) {
			$formatted_post    = array(
				'id'           => $post->ID, // PostChooser expects 'id'.
				'ID'           => $post->ID, // Keep original for compatibility.
				'title'        => array(
					'rendered' => get_the_title( $post->ID ),
				),
				'excerpt'      => array(
					'rendered' => get_the_excerpt( $post->ID ),
				),
				'link'         => get_permalink( $post->ID ),
				'post_title'   => $post->post_title,
				'post_excerpt' => $post->post_excerpt,
				'guid'         => get_permalink( $post->ID ),
				'modified'     => $post->post_modified,
				'status'       => $post->post_status,
				'type'         => $post->post_type,
				'slug'         => $post->post_name,
			);
			$formatted_posts[] = $formatted_post;
		}

		// Calculate pagination.
		$total       = $query->found_posts;
		$total_pages = ceil( $total / $per_page );

		return array(
			'posts'       => $formatted_posts,
			'total'       => $total,
			'total_pages' => $total_pages,
		);
	}
}

BobEndpoint::get_instance();
