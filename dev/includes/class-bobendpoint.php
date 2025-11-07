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
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
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
			$response->set_data( $this->get_query_response( $request ) );
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
		// Example response data.
		$data = get_posts(
			array(
				'numberposts' => 15,
				'post_status' => 'publish',
				'meta_key'    => 'meta_endpoint_flag', //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
				'meta_value'  => 'yes', //phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_value
			)
		);

		return $data;
	}
}

BobEndpoint::get_instance();
