<?php
/**
 * Initial Institutional Data Seeder for Gurukripa Peeth
 */

defined( 'ABSPATH' ) || exit;

/**
 * Helper to fetch a post by title and post type using get_posts (WP_Query).
 * Replaces deprecated get_page_by_title() in WordPress 6.2+.
 */
function gurukapeeth_find_post_by_title( $title, $post_type ) {
	$posts = get_posts( array(
		'title'                  => $title,
		'post_type'              => $post_type,
		'post_status'            => 'any',
		'posts_per_page'         => 1,
		'no_found_rows'          => true,
		'update_post_term_cache' => false,
		'update_post_meta_cache' => false,
	) );

	return ! empty( $posts ) ? $posts[0] : null;
}

function gurukapeeth_seed_initial_data() {
	// 1. Seed Programs
	$programs = array(
		array(
			'title'       => 'Bachelor of Arts (B.A.)',
			'content'     => 'Three-year undergraduate program in Humanities and Social Sciences offering specializations in Hindi Literature, Sanskrit, Political Science, History, and Geography. Affiliated with GGTU Banswara under NEP curriculum.',
			'duration'    => '3 Years (6 Semesters)',
			'intake'      => '160 Seats',
			'eligibility' => '10+2 Pass in any stream with minimum 45% marks',
			'ncte'        => 'N/A',
		),
		array(
			'title'       => 'Bachelor of Science (B.Sc. - Biology)',
			'content'     => 'Three-year undergraduate program providing comprehensive theoretical and laboratory training in Chemistry, Botany, and Zoology with modern digital laboratories.',
			'duration'    => '3 Years (6 Semesters)',
			'intake'      => '70 Seats',
			'eligibility' => '10+2 with Science (PCB) with minimum 50% marks',
			'ncte'        => 'N/A',
		),
	);

	foreach ( $programs as $p ) {
		$existing = gurukapeeth_find_post_by_title( $p['title'], 'program' );
		if ( ! $existing ) {
			$post_id = wp_insert_post( array(
				'post_title'   => $p['title'],
				'post_content' => $p['content'],
				'post_type'    => 'program',
				'post_status'  => 'publish',
			) );
			if ( $post_id ) {
				update_post_meta( $post_id, 'duration', $p['duration'] );
				update_post_meta( $post_id, 'intake', $p['intake'] );
				update_post_meta( $post_id, 'eligibility', $p['eligibility'] );
				update_post_meta( $post_id, 'ncte_approved', $p['ncte'] );
			}
		}
	}

	// 2. Seed Faculty Members (Ordered by Seniority 1 to 12)
	$faculty = array(
		array(
			'name'           => 'Dr. Hari Shanker Maru',
			'designation'    => 'Principal',
			'qualification'  => 'Retd. Govt. Principal, Ph.D., M.A. (Hindi)',
			'experience'     => '28+ Years',
			'email'          => 'principal@gurukripapeeth.in',
			'specialization' => 'Hindi Literature & Institutional Governance',
		),
		array(
			'name'           => 'Mrs. Priyanka Pandya',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.A., B.Ed., M.Lib.',
			'experience'     => '8+ Years',
			'email'          => 'priyanka.pandya@gurukripapeeth.in',
			'specialization' => 'Political Science & Library Information Systems',
		),
		array(
			'name'           => 'Mr. Rajesh Kumar Damor',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.A., B.Ed.',
			'experience'     => '8+ Years',
			'email'          => 'rajesh.damor@gurukripapeeth.in',
			'specialization' => 'Classical Sanskrit Literature & Vedic Grammar',
		),
		array(
			'name'           => 'Mr. Ashok Kumar Damor',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.A., B.Ed.',
			'experience'     => '8+ Years',
			'email'          => 'ashok.damor@gurukripapeeth.in',
			'specialization' => 'Physical Geography & Regional Cartography',
		),
		array(
			'name'           => 'Mr. Ramesh Chandra Pargi',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'B.A., B.Ed.',
			'experience'     => '7+ Years',
			'email'          => 'ramesh.pargi@gurukripapeeth.in',
			'specialization' => 'Indian History & Tribal Heritage Studies',
		),
		array(
			'name'           => 'Mrs. Priyanka Rathore',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.Sc., B.Ed.',
			'experience'     => '7+ Years',
			'email'          => 'priyanka.rathore@gurukripapeeth.in',
			'specialization' => 'Cell Biology, Entomology & Animal Physiology',
		),
		array(
			'name'           => 'Ms. Laxmi Labana',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.A., B.Ed.',
			'experience'     => '7+ Years',
			'email'          => 'laxmi.labana@gurukripapeeth.in',
			'specialization' => 'English Literature & Applied Linguistics',
		),
		array(
			'name'           => 'Mr. Mithun Kumar Damor',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.A., B.Ed.',
			'experience'     => '6+ Years',
			'email'          => 'mithun.damor@gurukripapeeth.in',
			'specialization' => 'Development Economics & Tribal Financial Studies',
		),
		array(
			'name'           => 'Mr. Bhura Lal Damor',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.A., B.Ed.',
			'experience'     => '6+ Years',
			'email'          => 'bhuralal.damor@gurukripapeeth.in',
			'specialization' => 'Indian Political Thought & Constitutional Governance',
		),
		array(
			'name'           => 'Ms. Shilpa Kumari Labana',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.Sc., B.Ed.',
			'experience'     => '5+ Years',
			'email'          => 'shilpa.labana@gurukripapeeth.in',
			'specialization' => 'Plant Physiology, Cytology & Taxonomy',
		),
		array(
			'name'           => 'Mr. Pratap Singh Damor',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.A., B.Ed.',
			'experience'     => '5+ Years',
			'email'          => 'pratap.damor@gurukripapeeth.in',
			'specialization' => 'Modern Hindi Literature & Folk Pedagogy',
		),
		array(
			'name'           => 'Ms. Divya Kalal',
			'designation'    => 'Assistant Professor',
			'qualification'  => 'M.Sc., B.Ed.',
			'experience'     => '5+ Years',
			'email'          => 'divya.kalal@gurukripapeeth.in',
			'specialization' => 'Inorganic Chemistry & Analytical Chemical Methods',
		),
	);

	foreach ( $faculty as $f ) {
		$existing = gurukapeeth_find_post_by_title( $f['name'], 'faculty' );
		if ( ! $existing ) {
			$post_id = wp_insert_post( array(
				'post_title'   => $f['name'],
				'post_content' => "Dedicated faculty member at Gurukripa Peeth College specializing in {$f['specialization']}.",
				'post_type'    => 'faculty',
				'post_status'  => 'publish',
			) );
			if ( $post_id ) {
				update_post_meta( $post_id, 'designation', $f['designation'] );
				update_post_meta( $post_id, 'qualification', $f['qualification'] );
				update_post_meta( $post_id, 'experience', $f['experience'] );
				update_post_meta( $post_id, 'email', $f['email'] );
				update_post_meta( $post_id, 'specialization', $f['specialization'] );
			}
		}
	}

	// 3. Seed Notices
	$notices = array(
		array(
			'title'      => 'Online Admission Form Submission Schedule 2026-27 for Undergraduate Programs',
			'category'   => 'Admissions',
			'is_marquee' => 1,
			'is_pinned'  => 1,
		),
		array(
			'title'      => 'Submission of B.Ed. & Integrated B.A.-B.Ed. Examination Forms for Session 2025-26',
			'category'   => 'Examinations',
			'is_marquee' => 1,
			'is_pinned'  => 0,
		),
		array(
			'title'      => 'IQAC Workshop on NEP 2020 Implementation & Outcome Based Education on 15th October',
			'category'   => 'IQAC',
			'is_marquee' => 0,
			'is_pinned'  => 1,
		),
		array(
			'title'      => 'Chief Minister Higher Education Scholarship (Mukhyamantri Uchha Shiksha) Applications Open',
			'category'   => 'Scholarship',
			'is_marquee' => 0,
			'is_pinned'  => 0,
		),
	);

	foreach ( $notices as $n ) {
		$existing = gurukapeeth_find_post_by_title( $n['title'], 'notice' );
		if ( ! $existing ) {
			$post_id = wp_insert_post( array(
				'post_title'   => $n['title'],
				'post_content' => "Official notification issued by the Office of the Principal, Gurukripa Peeth College regarding {$n['title']}.",
				'post_type'    => 'notice',
				'post_status'  => 'publish',
			) );
			if ( $post_id ) {
				update_post_meta( $post_id, 'category', $n['category'] );
				update_post_meta( $post_id, 'is_marquee', $n['is_marquee'] );
				update_post_meta( $post_id, 'is_pinned', $n['is_pinned'] );
			}
		}
	}

	// 4. Seed Leadership Messages
	$leadership = array(
		array(
			'name'       => "Chairman & Director's Desk",
			'role_title' => 'Director / Chairman',
			'quals'      => 'Mr. Kalu Ram Labana',
			'content'    => 'Gurukripa Peeth College is committed to delivering quality higher education and teacher training to the youth of Southern Rajasthan. Our mission is to combine academic excellence, moral integrity, and regional development to shape empowered leaders for the nation.',
		),
		array(
			'name'       => "Secretary's Desk",
			'role_title' => 'Secretary',
			'quals'      => 'Mr. Vipin Kumar Labana',
			'content'    => 'We prioritize learner-centric infrastructure, transparent administration, and comprehensive student support. Gurukripa Peeth stands as a beacon of opportunity for tribal and rural scholars to achieve excellence in higher education and pedagogical careers.',
		),
		array(
			'name'       => "Principal's Desk",
			'role_title' => 'Principal & Head of Institution',
			'quals'      => 'Dr. Hari Shanker Maru, Ph.D., M.A. (Hindi)',
			'content'    => 'Welcome to Gurukripa Peeth College. Our academic framework integrates curricular rigor with ethical character building, experiential learning, and community engagement under GGTU and UGC standards.',
		),
	);

	foreach ( $leadership as $l ) {
		$existing = gurukapeeth_find_post_by_title( $l['name'], 'leadership' );
		if ( ! $existing ) {
			$post_id = wp_insert_post( array(
				'post_title'   => $l['name'],
				'post_content' => $l['content'],
				'post_type'    => 'leadership',
				'post_status'  => 'publish',
			) );
			if ( $post_id ) {
				update_post_meta( $post_id, 'role_title', $l['role_title'] );
				update_post_meta( $post_id, 'qualifications', $l['quals'] );
			}
		}
	}
}
