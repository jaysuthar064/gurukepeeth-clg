<?php
/**
 * Plugin Name: Gurukripa Peeth College Manager (Headless CMS)
 * Plugin URI:  https://gurukripapeeth.in
 * Description: Dedicated Higher Education CMS & Management Dashboard for Gurukripa Peeth. Provides a 100% dynamic, unified admin dashboard with zero Gutenberg / default WP post editor screens, direct WordPress Media library integration, open CORS engine, and real-time REST API synchronization to the React frontend.
 * Version:     2.1.2
 * Author:      Gurukripa Peeth Dev Team
 * Author URI:  https://gurukripapeeth.in
 * Text Domain: gurukapeeth-manager
 */

defined( 'ABSPATH' ) || exit;

define( 'GURUKAPEETH_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'GURUKAPEETH_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'GURUKAPEETH_VERSION', '2.1.2' );

// 1. Load Data Architecture & REST API
require_once GURUKAPEETH_PLUGIN_DIR . 'includes/class-gurukapeeth-data.php';
require_once GURUKAPEETH_PLUGIN_DIR . 'includes/cpt-registry.php';
require_once GURUKAPEETH_PLUGIN_DIR . 'includes/rest-api.php';
require_once GURUKAPEETH_PLUGIN_DIR . 'includes/admin-dashboard.php';

// 2. Seed Default Data on activation or first load
register_activation_hook( __FILE__, array( 'Gurukapeeth_Data', 'seed_all_defaults' ) );

add_action( 'init', function() {
	if ( ! get_option( 'gurukapeeth_cms_v2_initialized' ) ) {
		Gurukapeeth_Data::seed_all_defaults( false );
		update_option( 'gurukapeeth_cms_v2_initialized', '1' );
	}
} );

// 3. Register Top-Level Menu & Submenus (All load our custom unified dashboard, NO default WP post screens)
add_action( 'admin_menu', 'gurukapeeth_register_headless_menus' );

function gurukapeeth_register_headless_menus() {
	add_menu_page(
		'College Manager',
		'College Manager',
		'edit_posts',
		'gurukapeeth-manager',
		'gurukapeeth_render_unified_cms',
		'dashicons-bank',
		3
	);

	$tabs = array(
		'settings'     => 'Institutional Profile',
		'homepage'     => 'Hero & Homepage',
		'notices'      => 'Notices & Circulars',
		'programs'     => 'Academic Programs',
		'faculty'      => 'Faculty & Staff',
		'admissions'   => 'Admissions & Cutoffs',
		'applications' => '🎓 Candidate Applications',
		'naac'         => 'NAAC 7 Criteria (SSR)',
		'iqac'         => 'IQAC Cell & AQAR',
		'leadership'   => 'Leadership Desks',
		'disclosures'  => 'Statutory Disclosures',
		'examhub'      => 'Syllabi & Exam Hub',
		'inquiries'    => 'Inquiries & Leads',
		'grievances'   => 'Grievances',
	);

	foreach ( $tabs as $slug => $label ) {
		add_submenu_page(
			'gurukapeeth-manager',
			$label,
			$label,
			'edit_posts',
			'gurukapeeth-manager&tab=' . $slug,
			'gurukapeeth_render_unified_cms'
		);
	}
}

// 4. Enqueue Admin Assets with Media Uploader
add_action( 'admin_enqueue_scripts', function( $hook ) {
	if ( strpos( $hook, 'gurukapeeth-manager' ) === false ) {
		return;
	}

	// Native WP Media library for image & PDF uploads
	wp_enqueue_media();

	$css_ver = GURUKAPEETH_VERSION . '.' . ( file_exists( GURUKAPEETH_PLUGIN_DIR . 'assets/admin.css' ) ? filemtime( GURUKAPEETH_PLUGIN_DIR . 'assets/admin.css' ) : time() );
	$js_ver  = GURUKAPEETH_VERSION . '.' . ( file_exists( GURUKAPEETH_PLUGIN_DIR . 'assets/admin.js' ) ? filemtime( GURUKAPEETH_PLUGIN_DIR . 'assets/admin.js' ) : time() );

	wp_enqueue_style(
		'gurukapeeth-admin-style',
		GURUKAPEETH_PLUGIN_URL . 'assets/admin.css',
		array(),
		$css_ver
	);

	wp_enqueue_script(
		'gurukapeeth-admin-script',
		GURUKAPEETH_PLUGIN_URL . 'assets/admin.js',
		array( 'jquery' ),
		$js_ver,
		true
	);

	$settings = Gurukapeeth_Data::get_settings();
	$react_url = ! empty( $settings['frontend_url'] ) ? esc_url( $settings['frontend_url'] ) : 'https://gurukepeeth-clg.vercel.app';

	wp_localize_script( 'gurukapeeth-admin-script', 'gurukapeethAdminData', array(
		'ajaxUrl'  => admin_url( 'admin-ajax.php' ),
		'nonce'    => wp_create_nonce( 'gurukapeeth_admin_nonce' ),
		'restUrl'  => rest_url( 'gurukapeeth/v1/' ),
		'reactUrl' => $react_url,
	) );
} );

// 5. AJAX Handler: Save & Sync All CMS Data
add_action( 'wp_ajax_gurukapeeth_save_all_cms_data', 'gurukapeeth_ajax_save_all_cms_data' );

function gurukapeeth_ajax_save_all_cms_data() {
	check_ajax_referer( 'gurukapeeth_admin_nonce', 'nonce' );

	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_send_json_error( array( 'message' => 'Unauthorized user.' ) );
	}

	if ( isset( $_POST['settings'] ) ) {
		$settings = json_decode( wp_unslash( $_POST['settings'] ), true );
		if ( is_array( $settings ) ) {
			update_option( 'gurukapeeth_settings', $settings );
		}
	}

	if ( isset( $_POST['homepage'] ) ) {
		$homepage = json_decode( wp_unslash( $_POST['homepage'] ), true );
		if ( is_array( $homepage ) ) {
			update_option( 'gurukapeeth_homepage', $homepage );
		}
	}

	if ( isset( $_POST['notices'] ) ) {
		$notices = json_decode( wp_unslash( $_POST['notices'] ), true );
		if ( is_array( $notices ) ) {
			update_option( 'gurukapeeth_notices', $notices );
		}
	}

	if ( isset( $_POST['programs'] ) ) {
		$programs = json_decode( wp_unslash( $_POST['programs'] ), true );
		if ( is_array( $programs ) ) {
			update_option( 'gurukapeeth_programs', $programs );
		}
	}

	if ( isset( $_POST['faculty'] ) ) {
		$faculty = json_decode( wp_unslash( $_POST['faculty'] ), true );
		if ( is_array( $faculty ) ) {
			update_option( 'gurukapeeth_faculty', $faculty );
		}
	}

	if ( isset( $_POST['admissions'] ) ) {
		$admissions = json_decode( wp_unslash( $_POST['admissions'] ), true );
		if ( is_array( $admissions ) ) {
			update_option( 'gurukapeeth_admissions', $admissions );
		}
	}

	if ( isset( $_POST['naac'] ) ) {
		$naac = json_decode( wp_unslash( $_POST['naac'] ), true );
		if ( is_array( $naac ) ) {
			update_option( 'gurukapeeth_naac', $naac );
		}
	}

	if ( isset( $_POST['iqac'] ) ) {
		$iqac = json_decode( wp_unslash( $_POST['iqac'] ), true );
		if ( is_array( $iqac ) ) {
			update_option( 'gurukapeeth_iqac', $iqac );
		}
	}

	if ( isset( $_POST['leadership'] ) ) {
		$leadership = json_decode( wp_unslash( $_POST['leadership'] ), true );
		if ( is_array( $leadership ) ) {
			update_option( 'gurukapeeth_leadership', $leadership );
		}
	}

	if ( isset( $_POST['disclosures'] ) ) {
		$disclosures = json_decode( wp_unslash( $_POST['disclosures'] ), true );
		if ( is_array( $disclosures ) ) {
			update_option( 'gurukapeeth_disclosures', $disclosures );
		}
	}

	if ( isset( $_POST['examhub'] ) ) {
		$examhub = json_decode( wp_unslash( $_POST['examhub'] ), true );
		if ( is_array( $examhub ) ) {
			update_option( 'gurukapeeth_examhub', $examhub );
		}
	}

	wp_send_json_success( array(
		'message'   => 'All college data saved and synced to React frontend!',
		'updatedAt' => current_time( 'mysql' ),
	) );
}

// 6. AJAX Handler: Restore Sample Defaults
add_action( 'wp_ajax_gurukapeeth_restore_sample_data', 'gurukapeeth_ajax_restore_sample_data' );

function gurukapeeth_ajax_restore_sample_data() {
	check_ajax_referer( 'gurukapeeth_admin_nonce', 'nonce' );

	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_send_json_error( array( 'message' => 'Unauthorized.' ) );
	}

	Gurukapeeth_Data::seed_all_defaults( true );

	wp_send_json_success( array( 'message' => 'Sample data restored successfully.' ) );
}

// 7. AJAX Handlers: Manage Inquiries
add_action( 'wp_ajax_gurukapeeth_update_inquiry_status', 'gurukapeeth_ajax_update_inquiry_status' );

function gurukapeeth_ajax_update_inquiry_status() {
	check_ajax_referer( 'gurukapeeth_admin_nonce', 'nonce' );

	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_send_json_error( array( 'message' => 'Unauthorized.' ) );
	}

	$id     = sanitize_text_field( $_POST['id'] ?? '' );
	$status = sanitize_text_field( $_POST['status'] ?? 'Contacted' );

	if ( empty( $id ) ) {
		wp_send_json_error( array( 'message' => 'Missing ID.' ) );
	}

	Gurukapeeth_Data::update_inquiry_status( $id, $status );
	wp_send_json_success( array( 'message' => 'Status updated to ' . $status ) );
}

add_action( 'wp_ajax_gurukapeeth_delete_inquiry', 'gurukapeeth_ajax_delete_inquiry' );

function gurukapeeth_ajax_delete_inquiry() {
	check_ajax_referer( 'gurukapeeth_admin_nonce', 'nonce' );

	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_send_json_error( array( 'message' => 'Unauthorized.' ) );
	}

	$id = sanitize_text_field( $_POST['id'] ?? '' );
	if ( empty( $id ) ) {
		wp_send_json_error( array( 'message' => 'Missing ID.' ) );
	}

	Gurukapeeth_Data::delete_inquiry( $id );
	wp_send_json_success( array( 'message' => 'Inquiry removed.' ) );
}

// 8. AJAX Handler: Manage Admission Applications
add_action( 'wp_ajax_gurukapeeth_update_application_status', 'gurukapeeth_ajax_update_application_status' );

function gurukapeeth_ajax_update_application_status() {
	check_ajax_referer( 'gurukapeeth_admin_nonce', 'nonce' );

	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_send_json_error( array( 'message' => 'Unauthorized.' ) );
	}

	$id     = sanitize_text_field( $_POST['id'] ?? '' );
	$status = sanitize_text_field( $_POST['status'] ?? 'Documents Verified' );

	if ( empty( $id ) ) {
		wp_send_json_error( array( 'message' => 'Missing Application ID.' ) );
	}

	Gurukapeeth_Data::update_application_status( $id, $status );
	wp_send_json_success( array( 'message' => 'Application status updated to ' . $status ) );
}

// 9. AJAX Handler: Delete Single Candidate Application (and free server disk space)
add_action( 'wp_ajax_gurukapeeth_delete_application', 'gurukapeeth_ajax_delete_application' );

function gurukapeeth_ajax_delete_application() {
	check_ajax_referer( 'gurukapeeth_admin_nonce', 'nonce' );

	if ( ! current_user_can( 'delete_posts' ) ) {
		wp_send_json_error( array( 'message' => 'Unauthorized user.' ) );
	}

	$id = sanitize_text_field( $_POST['id'] ?? '' );
	if ( empty( $id ) ) {
		wp_send_json_error( array( 'message' => 'Application ID or Ref is required.' ) );
	}

	$deleted = Gurukapeeth_Data::delete_application( $id, true );
	if ( $deleted ) {
		wp_send_json_success( array( 'message' => 'Candidate application and uploaded documents deleted successfully.' ) );
	} else {
		wp_send_json_error( array( 'message' => 'Application not found or could not be removed.' ) );
	}
}

// 10. AJAX Handler: Bulk Purge All Candidate Applications (free all upload space)
add_action( 'wp_ajax_gurukapeeth_delete_all_applications', 'gurukapeeth_ajax_delete_all_applications' );

function gurukapeeth_ajax_delete_all_applications() {
	check_ajax_referer( 'gurukapeeth_admin_nonce', 'nonce' );

	if ( ! current_user_can( 'delete_posts' ) ) {
		wp_send_json_error( array( 'message' => 'Unauthorized user.' ) );
	}

	Gurukapeeth_Data::delete_all_applications( true );
	wp_send_json_success( array( 'message' => 'All candidate applications and uploaded files have been purged successfully.' ) );
}



