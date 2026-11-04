<?php
/**
 * Headless REST API Endpoints for React Frontend
 */

defined( 'ABSPATH' ) || exit;

class Gurukapeeth_REST_API {

	public static function register_routes() {
		$ns = 'gurukapeeth/v1';

		register_rest_route( $ns, '/settings', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_settings' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/homepage', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_homepage' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/marquee', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_marquee' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/notices', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_notices' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/programs', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_programs' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/faculty', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_faculty' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/admissions', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_admissions' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/naac', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_naac' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/iqac', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_iqac' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/leadership', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_leadership' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/navigation', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_navigation' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/inquiry', array(
			'methods'             => 'POST',
			'callback'            => array( __CLASS__, 'submit_inquiry' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/inquiries', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_inquiries' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/disclosures', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_disclosures' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/examhub', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_examhub' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/grievance', array(
			'methods'             => 'POST',
			'callback'            => array( __CLASS__, 'submit_grievance' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/grievances', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_grievances' ),
			'permission_callback' => '__return_true',
		) );

		// Admission Portal & Razorpay Gateway Endpoints
		register_rest_route( $ns, '/admission/apply', array(
			'methods'             => 'POST',
			'callback'            => array( __CLASS__, 'submit_admission_application' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/admission/create-order', array(
			'methods'             => 'POST',
			'callback'            => array( __CLASS__, 'create_admission_order' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/admission/verify-payment', array(
			'methods'             => 'POST',
			'callback'            => array( __CLASS__, 'verify_admission_payment' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/admission/status/(?P<ref>[a-zA-Z0-9_-]+)', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_admission_status' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/admission/applications', array(
			'methods'             => 'GET',
			'callback'            => array( __CLASS__, 'get_admission_applications' ),
			'permission_callback' => '__return_true',
		) );

		register_rest_route( $ns, '/admission/update-status', array(
			'methods'             => 'POST',
			'callback'            => array( __CLASS__, 'update_admission_status' ),
			'permission_callback' => '__return_true',
		) );
	}

	public static function get_settings() {
		return rest_ensure_response( Gurukapeeth_Data::get_settings() );
	}

	public static function get_notices() {
		return rest_ensure_response( Gurukapeeth_Data::get_notices() );
	}

	public static function get_programs() {
		return rest_ensure_response( Gurukapeeth_Data::get_programs() );
	}

	public static function get_faculty() {
		return rest_ensure_response( Gurukapeeth_Data::get_faculty() );
	}

	public static function get_admissions() {
		return rest_ensure_response( Gurukapeeth_Data::get_admissions() );
	}

	public static function get_naac() {
		return rest_ensure_response( Gurukapeeth_Data::get_naac() );
	}

	public static function get_iqac() {
		return rest_ensure_response( Gurukapeeth_Data::get_iqac() );
	}

	public static function get_leadership() {
		return rest_ensure_response( Gurukapeeth_Data::get_leadership() );
	}

	public static function get_marquee() {
		$settings = Gurukapeeth_Data::get_settings();
		$all_notices = Gurukapeeth_Data::get_notices();
		$marquee_notices = array();

		foreach ( $all_notices as $n ) {
			if ( ! empty( $n['is_marquee'] ) ) {
				$marquee_notices[] = $n;
			}
		}

		return rest_ensure_response( array(
			'announcement' => $settings['marquee_announcement'] ?? '',
			'notices'      => $marquee_notices,
		) );
	}

	public static function get_homepage() {
		$settings   = Gurukapeeth_Data::get_settings();
		$homepage   = Gurukapeeth_Data::get_homepage();
		$notices    = Gurukapeeth_Data::get_notices();
		$programs   = Gurukapeeth_Data::get_programs();
		$leadership = Gurukapeeth_Data::get_leadership();

		return rest_ensure_response( array(
			'settings'   => $settings,
			'hero'       => array(
				'heading'    => $homepage['hero_heading'] ?? '',
				'subheading' => $homepage['hero_subheading'] ?? '',
				'badge'      => $homepage['admission_badge'] ?? 'Admissions Open 2026-27',
			),
			'statistics' => array(
				'students'  => $homepage['stat_students'] ?? '2,400+',
				'faculty'   => $homepage['stat_faculty'] ?? '48+',
				'programs'  => $homepage['stat_programs'] ?? '12+',
				'pass_rate' => $homepage['stat_pass_rate'] ?? '94%',
			),
			'notices'    => array_slice( $notices, 0, 5 ),
			'programs'   => array_slice( $programs, 0, 6 ),
			'leadership' => $leadership,
			'quick_links'=> array(
				array( 'title' => 'GGTU Student ERP Portal', 'url' => 'https://erp.ggtuexam.com/', 'icon' => 'globe' ),
				array( 'title' => 'GGTU Syllabi Portal', 'url' => 'https://www.ggtu.ac.in/Syllabus.php', 'icon' => 'book' ),
				array( 'title' => 'Raj. Scholarship Portal', 'url' => 'https://scholarship.rajasthan.gov.in/', 'icon' => 'award' ),
				array( 'title' => 'Rajasthan SSO', 'url' => 'https://sso.rajasthan.gov.in', 'icon' => 'lock' ),
				array( 'title' => 'National Digital Library', 'url' => 'https://ndl.gov.in', 'icon' => 'book' ),
				array( 'title' => 'HTE Rajasthan', 'url' => 'https://hte.rajasthan.gov.in', 'icon' => 'award' ),
			),
		) );
	}

	public static function get_navigation() {
		return rest_ensure_response( array(
			array( 'label' => 'Home', 'path' => '/' ),
			array(
				'label'    => 'About Us',
				'path'     => '/about',
				'children' => array(
					array( 'label' => 'Institutional Profile', 'path' => '/about' ),
					array( 'label' => 'Vision & Mission', 'path' => '/about' ),
					array( 'label' => "Principal's Desk", 'path' => '/about' ),
					array( 'label' => "Director's Vision", 'path' => '/about' ),
				),
			),
			array(
				'label'    => 'Academics',
				'path'     => '/academics',
				'children' => array(
					array( 'label' => 'All Academic Programs', 'path' => '/academics' ),
					array( 'label' => 'Faculty of Arts (B.A.)', 'path' => '/academics' ),
					array( 'label' => 'Faculty of Science (B.Sc.)', 'path' => '/academics' ),
					array( 'label' => 'Department of Education (B.Ed.)', 'path' => '/academics' ),
					array( 'label' => '4-Year Integrated B.A.-B.Ed.', 'path' => '/academics' ),
				),
			),
			array(
				'label'    => 'Admissions',
				'path'     => '/admissions',
				'children' => array(
					array( 'label' => 'Admission Guidelines 2026-27', 'path' => '/admissions' ),
					array( 'label' => 'Merit Lists & Cutoffs', 'path' => '/admissions' ),
					array( 'label' => 'Online Admission Inquiry', 'path' => '/admissions' ),
				),
			),
			array(
				'label'    => 'IQAC',
				'path'     => '/iqac',
				'children' => array(
					array( 'label' => 'IQAC Composition', 'path' => '/iqac' ),
					array( 'label' => 'AQAR Annual Quality Reports', 'path' => '/iqac' ),
					array( 'label' => 'Meeting Minutes & ATR', 'path' => '/iqac' ),
				),
			),
			array(
				'label'    => 'NAAC Portal',
				'path'     => '/naac',
				'children' => array(
					array( 'label' => 'NAAC Hub Overview', 'path' => '/naac' ),
					array( 'label' => 'Self Study Report (SSR)', 'path' => '/naac' ),
					array( 'label' => '7 Criteria Evidence', 'path' => '/naac' ),
				),
			),
			array( 'label' => 'Faculty & Staff', 'path' => '/faculty' ),
			array(
				'label'    => 'Student Corner',
				'path'     => '/student-corner',
				'children' => array(
					array( 'label' => 'NEP Syllabi Repository', 'path' => '/student-corner' ),
					array( 'label' => 'GGTU Student ERP Portal', 'path' => 'https://erp.ggtuexam.com/' ),
					array( 'label' => 'GGTU Exam Schedule & Results', 'path' => '/student-corner' ),
					array( 'label' => 'Government Scholarships', 'path' => '/student-corner' ),
				),
			),
			array(
				'label'    => 'Compliance',
				'path'     => '/disclosures',
				'children' => array(
					array( 'label' => 'Mandatory Disclosures', 'path' => '/disclosures' ),
					array( 'label' => 'University Affiliation Orders', 'path' => '/disclosures' ),
					array( 'label' => 'Raj. Govt Permanent NOC', 'path' => '/disclosures' ),
					array( 'label' => 'Anti-Ragging Policy', 'path' => '/disclosures' ),
					array( 'label' => 'Grievance Form', 'path' => '/disclosures' ),
				),
			),
			array( 'label' => 'Contact Us', 'path' => '/contact' ),
		) );
	}

	public static function submit_inquiry( WP_REST_Request $request ) {
		$params = $request->get_json_params();
		if ( empty( $params ) ) {
			$params = $request->get_params();
		}

		$name  = sanitize_text_field( $params['name'] ?? '' );
		$phone = sanitize_text_field( $params['phone'] ?? '' );

		if ( empty( $name ) || empty( $phone ) ) {
			return new WP_Error(
				'missing_required_fields',
				'Student Name and Contact Mobile Number are required.',
				array( 'status' => 400 )
			);
		}

		$saved = Gurukapeeth_Data::save_inquiry( $params );

		return rest_ensure_response( array(
			'success'          => true,
			'message'          => 'Your inquiry has been registered successfully. The college admission office will contact you shortly.',
			'reference_number' => $saved['ref'],
			'inquiry'          => $saved,
		) );
	}

	public static function get_inquiries() {
		return rest_ensure_response( Gurukapeeth_Data::get_inquiries() );
	}

	public static function get_disclosures() {
		$documents = Gurukapeeth_Data::get_disclosures();
		return rest_ensure_response( array( 'documents' => $documents ) );
	}

	public static function get_examhub() {
		return rest_ensure_response( Gurukapeeth_Data::get_examhub() );
	}

	public static function submit_grievance( WP_REST_Request $request ) {
		$params = $request->get_json_params();
		if ( empty( $params ) ) {
			$params = $request->get_params();
		}

		$name    = sanitize_text_field( $params['name'] ?? '' );
		$contact = sanitize_text_field( $params['contact'] ?? '' );
		$message = sanitize_textarea_field( $params['message'] ?? '' );

		if ( empty( $name ) || empty( $contact ) || empty( $message ) ) {
			return new WP_Error(
				'missing_required_fields',
				'Name, contact, and description are required.',
				array( 'status' => 400 )
			);
		}

		$saved = Gurukapeeth_Data::save_grievance( $params );

		return rest_ensure_response( array(
			'success'          => true,
			'message'          => 'Your grievance has been registered confidentially. The Grievance Redressal Committee will review it within 15 working days.',
			'reference_number' => $saved['ref'],
		) );
	}

	public static function get_grievances() {
		return rest_ensure_response( Gurukapeeth_Data::get_grievances() );
	}

	// ============================================================
	// ADMISSION PORTAL CALLBACKS
	// ============================================================

	public static function submit_admission_application( WP_REST_Request $request ) {
		$params = $request->get_json_params();
		if ( empty( $params ) ) {
			$params = $request->get_params();
		}

		$name        = sanitize_text_field( $params['name'] ?? '' );
		$phone       = sanitize_text_field( $params['phone'] ?? '' );
		$father_name = sanitize_text_field( $params['father_name'] ?? '' );

		if ( empty( $name ) || empty( $phone ) || empty( $father_name ) ) {
			return new WP_Error(
				'missing_required_fields',
				'Student Name, Father Name, and Contact Mobile Number are mandatory.',
				array( 'status' => 400 )
			);
		}

		$saved = Gurukapeeth_Data::save_application( $params );

		return rest_ensure_response( array(
			'success'          => true,
			'message'          => 'Application registered successfully. Proceeding to fee payment.',
			'reference_number' => $saved['ref'],
			'application_id'   => $saved['id'],
			'fee_amount'       => $saved['fee_amount'],
			'application'      => $saved,
		) );
	}

	public static function create_admission_order( WP_REST_Request $request ) {
		$params = $request->get_json_params();
		if ( empty( $params ) ) {
			$params = $request->get_params();
		}

		$ref_or_id = sanitize_text_field( $params['application_id'] ?? ( $params['ref'] ?? '' ) );
		if ( empty( $ref_or_id ) ) {
			return new WP_Error(
				'missing_application_id',
				'Application Reference or ID is required to generate payment order.',
				array( 'status' => 400 )
			);
		}

		$app = Gurukapeeth_Data::get_application_by_ref( $ref_or_id );
		if ( ! $app ) {
			return new WP_Error(
				'application_not_found',
				'No admission application found with given reference.',
				array( 'status' => 404 )
			);
		}

		$settings   = Gurukapeeth_Data::get_settings();
		$key_id     = trim( $settings['razorpay_key_id'] ?? '' );
		$key_secret = trim( $settings['razorpay_key_secret'] ?? '' );
		$amount     = floatval( $app['fee_amount'] );
		$amount_paise = round( $amount * 100 );

		$is_placeholder_key = (
			empty( $key_id ) ||
			empty( $key_secret ) ||
			stripos( $key_id, 'PLACEHOLDER' ) !== false ||
			stripos( $key_secret, 'PLACEHOLDER' ) !== false ||
			$key_id === 'rzp_test_5173GURUKRIPA'
		);

		$razorpay_order_id = '';
		$is_mock = false;

		// If real credentials, call Razorpay Orders API
		if ( ! $is_placeholder_key ) {
			$auth = base64_encode( $key_id . ':' . $key_secret );
			$response = wp_remote_post( 'https://api.razorpay.com/v1/orders', array(
				'headers' => array(
					'Authorization' => 'Basic ' . $auth,
					'Content-Type'  => 'application/json',
				),
				'body'    => wp_json_encode( array(
					'amount'   => $amount_paise,
					'currency' => 'INR',
					'receipt'  => substr( $app['ref'], 0, 40 ),
					'notes'    => array(
						'application_ref' => $app['ref'],
						'student_name'    => $app['name'],
						'program'         => $app['program'],
					),
				) ),
				'timeout' => 15,
			) );

			if ( ! is_wp_error( $response ) ) {
				$body = json_decode( wp_remote_retrieve_body( $response ), true );
				if ( ! empty( $body['id'] ) ) {
					$razorpay_order_id = $body['id'];
				}
			}
		}

		// Fallback / Sandbox order for development or test placeholders
		if ( empty( $razorpay_order_id ) ) {
			$razorpay_order_id = 'order_mock_' . substr( md5( uniqid( rand(), true ) ), 0, 14 );
			$is_mock = true;
		}

		return rest_ensure_response( array(
			'success'          => true,
			'order_id'         => $razorpay_order_id,
			'amount'           => $amount,
			'amount_paise'     => $amount_paise,
			'currency'         => 'INR',
			'key_id'           => $is_mock ? 'rzp_test_5173GURUKRIPA' : $key_id,
			'application_ref'  => $app['ref'],
			'application_id'   => $app['id'],
			'student_name'     => $app['name'],
			'student_email'    => $app['email'] ?: 'admission@gurukripapeeth.ac.in',
			'student_phone'    => $app['phone'],
			'program'          => $app['program'],
			'is_mock'          => $is_mock,
		) );
	}

	public static function verify_admission_payment( WP_REST_Request $request ) {
		$params = $request->get_json_params();
		if ( empty( $params ) ) {
			$params = $request->get_params();
		}

		$ref_or_id  = sanitize_text_field( $params['application_id'] ?? ( $params['ref'] ?? '' ) );
		$payment_id = sanitize_text_field( $params['razorpay_payment_id'] ?? '' );
		$order_id   = sanitize_text_field( $params['razorpay_order_id'] ?? '' );
		$signature  = sanitize_text_field( $params['razorpay_signature'] ?? '' );

		if ( empty( $ref_or_id ) || empty( $payment_id ) ) {
			return new WP_Error(
				'invalid_payment_payload',
				'Application Reference and Payment ID are required.',
				array( 'status' => 400 )
			);
		}

		$app = Gurukapeeth_Data::get_application_by_ref( $ref_or_id );
		if ( ! $app ) {
			return new WP_Error(
				'application_not_found',
				'Application not found.',
				array( 'status' => 404 )
			);
		}

		$settings   = Gurukapeeth_Data::get_settings();
		$key_secret = trim( $settings['razorpay_key_secret'] ?? '' );

		$is_mock = (
			strpos( $order_id, 'order_mock_' ) === 0 ||
			$signature === 'mock_signature' ||
			stripos( $key_secret, 'PLACEHOLDER' ) !== false ||
			empty( $key_secret )
		);

		// If live credentials and real signature provided, verify HMAC
		if ( ! $is_mock ) {
			$expected_signature = hash_hmac( 'sha256', $order_id . '|' . $payment_id, $key_secret );
			if ( ! hash_equals( $expected_signature, $signature ) ) {
				return new WP_Error(
					'payment_signature_verification_failed',
					'Payment signature verification failed. Please contact admission helpline.',
					array( 'status' => 400 )
				);
			}
		}

		// Update application record to Paid
		$updated = Gurukapeeth_Data::update_application_payment( $ref_or_id, $payment_id, $order_id, $signature, 'Razorpay' );

		return rest_ensure_response( array(
			'success'          => true,
			'message'          => 'Payment verified successfully. Admission registration confirmed!',
			'reference_number' => $updated['ref'],
			'payment_id'       => $payment_id,
			'application'      => $updated,
		) );
	}

	public static function get_admission_status( WP_REST_Request $request ) {
		$ref = sanitize_text_field( $request->get_param( 'ref' ) );
		$app = Gurukapeeth_Data::get_application_by_ref( $ref );

		if ( ! $app ) {
			return rest_ensure_response( array(
				'success' => false,
				'message' => 'No admission record found with reference: ' . esc_html( $ref ),
			) );
		}

		return rest_ensure_response( array(
			'success'     => true,
			'application' => $app,
		) );
	}

	public static function get_admission_applications() {
		return rest_ensure_response( array(
			'success'      => true,
			'applications' => Gurukapeeth_Data::get_applications(),
		) );
	}

	public static function update_admission_status( WP_REST_Request $request ) {
		$params = $request->get_json_params();
		if ( empty( $params ) ) {
			$params = $request->get_params();
		}

		$id     = sanitize_text_field( $params['id'] ?? '' );
		$status = sanitize_text_field( $params['status'] ?? '' );

		if ( empty( $id ) || empty( $status ) ) {
			return new WP_Error( 'missing_params', 'ID and Status required.', array( 'status' => 400 ) );
		}

		Gurukapeeth_Data::update_application_status( $id, $status );

		return rest_ensure_response( array(
			'success' => true,
			'message' => 'Status updated to ' . $status,
		) );
	}
}

add_action( 'rest_api_init', array( 'Gurukapeeth_REST_API', 'register_routes' ) );

// Enable Cross-Origin Resource Sharing (CORS) for external headless frontends (e.g. Vercel)
add_action( 'rest_api_init', function() {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function( $value ) {
		header( 'Access-Control-Allow-Origin: *' );
		header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE' );
		header( 'Access-Control-Allow-Credentials: true' );
		header( 'Access-Control-Allow-Headers: Authorization, X-WP-Nonce, Content-Type, Cache-Control, X-Requested-With' );
		return $value;
	} );
}, 15 );

