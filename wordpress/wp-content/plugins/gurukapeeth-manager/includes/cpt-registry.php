<?php
/**
 * Custom Post Types Registry - Headless Model
 * Standard WP post editing screens are disabled in favor of the Headless CMS Visual Dashboard.
 */

defined( 'ABSPATH' ) || exit;

// We do not need WP default post editing screens since all data is managed via the Headless CMS Dashboard.
// We register post types only for internal WP REST API schema compatibility if needed, with show_in_menu => false.
add_action( 'init', 'gurukapeeth_register_academic_cpts', 0 );

function gurukapeeth_register_academic_cpts() {
	$types = array(
		'faculty'       => 'Faculty & Staff',
		'program'       => 'Academic Programs',
		'admission'     => 'Admissions & Lists',
		'naac_document' => 'NAAC Portal',
		'iqac_report'   => 'IQAC Cell',
		'notice'        => 'Notices & Circulars',
		'event'         => 'Events & Camps',
		'gallery_album' => 'Campus Gallery',
		'testimonial'   => 'Testimonials',
		'alumni'        => 'Alumni Network',
		'leadership'    => 'Leadership Messages',
	);

	foreach ( $types as $slug => $label ) {
		register_post_type( $slug, array(
			'labels'       => array( 'name' => $label, 'singular_name' => $label ),
			'public'       => false,
			'show_ui'      => false,
			'show_in_menu' => false,
			'show_in_rest' => false,
		) );
	}
}
