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

