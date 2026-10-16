<?php
/**
 * Headless Data Store & Default Seeder for Gurukripa Peeth College CMS
 */

defined( 'ABSPATH' ) || exit;

class Gurukapeeth_Data {

	public static function get_settings() {
		$defaults = array(
			'college_name'        => 'Gurukripa Peeth College',
			'college_hindi'       => 'गुरुकृपा पीठ महाविद्यालय',
			'college_subtitle'    => 'Post Graduate & Teacher Training College',
			'tagline'             => 'Nurturing Intellect, Cultivating Character, Empowering Society',
			'affiliating_univ'    => 'Govind Guru Tribal University (GGTU), Banswara',
			'ncte_code'           => 'WRC/APW05814/323363',
			'aishe_code'          => 'C-48902',
			'naac_grade'          => 'Accredited B+ (Cycle-1) / SSR in Progress',
			'phone_primary'       => '+91 2964 234567',
			'phone_secondary'     => '+91 94140 12345',
			'email_info'          => 'info@gurukripapeeth.in',
			'email_principal'     => 'principal@gurukripapeeth.in',
			'address'             => 'Gurukripa Peeth College, Pratapgarh Road, Dungarpur, Rajasthan - 314001, India',
			'marquee_announcement'=> 'Admissions Open 2026-27 for B.A., B.Sc., B.Ed., and Integrated B.A.-B.Ed. Programs — Apply Online Now!',
			'logo_url'            => '',
			'map_embed'           => '',
		);

		$saved = get_option( 'gurukapeeth_settings', array() );
		return wp_parse_args( $saved, $defaults );
	}

	public static function get_homepage() {
		$defaults = array(
			'hero_heading'    => 'Empowering Minds, Transforming Futures in Southern Rajasthan',
			'hero_subheading' => 'Affiliated with Govind Guru Tribal University (GGTU), Banswara & Recognized by NCTE',
			'stat_students'   => '2,400+',
			'stat_faculty'    => '48+',
			'stat_programs'   => '12+',
			'stat_pass_rate'  => '94%',
			'admission_badge' => 'Admissions Open 2026-27',
		);

		$saved = get_option( 'gurukapeeth_homepage', array() );
		return wp_parse_args( $saved, $defaults );
	}

	public static function get_notices() {
		$saved = get_option( 'gurukapeeth_notices', null );
		if ( is_array( $saved ) ) {
			return $saved;
		}

		return array(
			array(
				'id'         => 1,
				'title'      => 'Online Admission Form Submission Schedule 2026-27 for Undergraduate Programs',
				'category'   => 'Admissions',
				'date'       => '23 Sep 2026',
				'pdf_url'    => '#',
				'is_marquee' => true,
				'is_pinned'  => true,
			),
			array(
				'id'         => 2,
				'title'      => 'Submission of B.Ed. & Integrated B.A.-B.Ed. Examination Forms for Session 2025-26',
				'category'   => 'Examinations',
				'date'       => '22 Sep 2026',
				'pdf_url'    => '#',
				'is_marquee' => true,
				'is_pinned'  => false,
			),
			array(
				'id'         => 3,
				'title'      => 'IQAC Workshop on NEP 2020 Implementation & Outcome Based Education on 15th October',
				'category'   => 'IQAC',
				'date'       => '20 Sep 2026',
				'pdf_url'    => '#',
				'is_marquee' => false,
				'is_pinned'  => true,
			),
			array(
				'id'         => 4,
				'title'      => 'Chief Minister Higher Education Scholarship (Mukhyamantri Uchha Shiksha) Applications Open',
				'category'   => 'Scholarship',
				'date'       => '18 Sep 2026',
				'pdf_url'    => '#',
				'is_marquee' => false,
				'is_pinned'  => false,
			),
		);
	}

	public static function get_programs() {
		$saved = get_option( 'gurukapeeth_programs', null );
		if ( is_array( $saved ) ) {
			return $saved;
		}

		return array(
			array(
				'id'          => 1,
				'title'       => 'Bachelor of Arts (B.A.)',
				'stream'      => 'Humanities & Social Sciences',
				'duration'    => '3 Years (6 Semesters)',
				'intake'      => '160 Seats',
				'eligibility' => '10+2 Pass in any stream with minimum 45% marks',
				'description' => 'Comprehensive undergraduate curriculum offering specializations in Hindi Literature, Sanskrit, Political Science, History, and Geography under NEP guidelines.',
				'syllabus_url'=> '#',
			),
			array(
				'id'          => 2,
				'title'       => 'Bachelor of Science (B.Sc. - Bio & Maths)',
				'stream'      => 'Science & Technology',
				'duration'    => '3 Years (6 Semesters)',
				'intake'      => '120 Seats',
				'eligibility' => '10+2 with Science (PCM/PCB) with minimum 50% marks',
				'description' => 'Comprehensive theoretical and digital laboratory training in Physics, Chemistry, Mathematics, Botany, and Zoology.',
				'syllabus_url'=> '#',
			),
			array(
				'id'          => 3,
				'title'       => 'Bachelor of Education (B.Ed.)',
				'stream'      => 'Teacher Education (NCTE Recognized)',
				'duration'    => '2 Years (Annual Scheme)',
				'intake'      => '100 Seats',
				'eligibility' => 'Graduation with min 50% (45% for SC/ST/OBC) through State PTET exam',
				'description' => 'Premier teacher education degree focusing on pedagogical psychology, classroom communication, and extensive school internship.',
				'syllabus_url'=> '#',
			),
			array(
				'id'          => 4,
				'title'       => 'Integrated B.A.-B.Ed. (4-Year)',
				'stream'      => 'Composite Teacher Preparation',
				'duration'    => '4 Years (8 Semesters)',
				'intake'      => '50 Seats',
				'eligibility' => '10+2 Senior Secondary with minimum 50% marks through PTET',
				'description' => 'Four-year composite dual-degree program saving one academic year for students aspiring to secondary school teaching.',
				'syllabus_url'=> '#',
			),
			array(
				'id'          => 5,
				'title'       => 'Diploma in Elementary Education (D.El.Ed. / BSTC)',
				'stream'      => 'Primary Teacher Training',
				'duration'    => '2 Years',
				'intake'      => '50 Seats',
				'eligibility' => '10+2 through Pre D.El.Ed. (BSTC) entrance exam',
				'description' => 'Professional diploma training primary school educators in pedagogy, child development, and practical internship.',
				'syllabus_url'=> '#',
			),
		);
	}

	public static function get_faculty() {
		$saved = get_option( 'gurukapeeth_faculty', null );
		if ( is_array( $saved ) && count( $saved ) >= 12 ) {
			return $saved;
		}

		return array(
			array(
				'id'             => 1,
				'seniority'      => 1,
				'name'           => 'Dr. Hari Shanker Maru',
				'designation'    => 'Principal',
				'post_category'  => 'PRINCIPAL',
				'subject'        => 'Hindi Literature',
				'department'     => 'Administration & Faculty of Arts',
				'qualification'  => 'Retd. Govt. Principal, Ph.D., M.A. (Hindi)',
				'experience'     => '28+ Years',
				'email'          => 'principal@gurukripapeeth.in',
				'specialization' => 'Hindi Literature & Institutional Governance',
				'photo_url'      => '',
			),
			array(
				'id'             => 2,
				'seniority'      => 2,
				'name'           => 'Mrs. Priyanka Pandya',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - BA',
				'subject'        => 'Political Science',
				'department'     => 'Faculty of Arts',
				'qualification'  => 'M.A., B.Ed., M.Lib.',
				'experience'     => '8+ Years',
				'email'          => 'priyanka.pandya@gurukripapeeth.in',
				'specialization' => 'Political Science & Library Information Systems',
				'photo_url'      => '',
			),
			array(
				'id'             => 3,
				'seniority'      => 3,
				'name'           => 'Mr. Rajesh Kumar Damor',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - BA',
				'subject'        => 'Sanskrit Literature',
				'department'     => 'Faculty of Arts',
				'qualification'  => 'M.A., B.Ed.',
				'experience'     => '8+ Years',
				'email'          => 'rajesh.damor@gurukripapeeth.in',
				'specialization' => 'Classical Sanskrit Literature & Vedic Grammar',
				'photo_url'      => '',
			),
			array(
				'id'             => 4,
				'seniority'      => 4,
				'name'           => 'Mr. Ashok Kumar Damor',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - BA',
				'subject'        => 'Geography',
				'department'     => 'Faculty of Arts',
				'qualification'  => 'M.A., B.Ed.',
				'experience'     => '8+ Years',
				'email'          => 'ashok.damor@gurukripapeeth.in',
				'specialization' => 'Physical Geography & Regional Cartography',
				'photo_url'      => '/images/faculty/ashok-kumar-damor.jpeg',
			),
			array(
				'id'             => 5,
				'seniority'      => 5,
				'name'           => 'Mr. Ramesh Chandra Pargi',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - BA',
				'subject'        => 'History',
				'department'     => 'Faculty of Arts',
				'qualification'  => 'B.A., B.Ed.',
				'experience'     => '7+ Years',
				'email'          => 'ramesh.pargi@gurukripapeeth.in',
				'specialization' => 'Indian History & Tribal Heritage Studies',
				'photo_url'      => '',
			),
			array(
				'id'             => 6,
				'seniority'      => 6,
				'name'           => 'Mrs. Priyanka Rathore',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - B.Sc',
				'subject'        => 'Zoology',
				'department'     => 'Faculty of Science',
				'qualification'  => 'M.Sc., B.Ed.',
				'experience'     => '7+ Years',
				'email'          => 'priyanka.rathore@gurukripapeeth.in',
				'specialization' => 'Cell Biology, Entomology & Animal Physiology',
				'photo_url'      => '/images/faculty/priyanka-rathore.jpeg',
			),
			array(
				'id'             => 7,
				'seniority'      => 7,
				'name'           => 'Ms. Laxmi Labana',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - BA',
				'subject'        => 'English Literature',
				'department'     => 'Faculty of Arts',
				'qualification'  => 'M.A., B.Ed.',
				'experience'     => '7+ Years',
				'email'          => 'laxmi.labana@gurukripapeeth.in',
				'specialization' => 'English Literature & Applied Linguistics',
				'photo_url'      => '',
			),
			array(
				'id'             => 8,
				'seniority'      => 8,
				'name'           => 'Mr. Mithun Kumar Damor',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - BA',
				'subject'        => 'Economics',
				'department'     => 'Faculty of Arts',
				'qualification'  => 'M.A., B.Ed.',
				'experience'     => '6+ Years',
				'email'          => 'mithun.damor@gurukripapeeth.in',
				'specialization' => 'Development Economics & Tribal Financial Studies',
				'photo_url'      => '/images/faculty/mithun-kumar-damor.jpeg',
			),
			array(
				'id'             => 9,
				'seniority'      => 9,
				'name'           => 'Mr. Bhura Lal Damor',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - BA',
				'subject'        => 'Political Science',
				'department'     => 'Faculty of Arts',
				'qualification'  => 'M.A., B.Ed.',
				'experience'     => '6+ Years',
				'email'          => 'bhuralal.damor@gurukripapeeth.in',
				'specialization' => 'Indian Political Thought & Constitutional Governance',
				'photo_url'      => '/images/faculty/bhuralal-damor.jpeg',
			),
			array(
				'id'             => 10,
				'seniority'      => 10,
				'name'           => 'Ms. Shilpa Kumari Labana',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - B.Sc',
				'subject'        => 'Botany',
				'department'     => 'Faculty of Science',
				'qualification'  => 'M.Sc., B.Ed.',
				'experience'     => '5+ Years',
				'email'          => 'shilpa.labana@gurukripapeeth.in',
				'specialization' => 'Plant Physiology, Cytology & Taxonomy',
				'photo_url'      => '/images/faculty/shilpa-labana.jpeg',
			),
			array(
				'id'             => 11,
				'seniority'      => 11,
				'name'           => 'Mr. Pratap Singh Damor',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - BA',
				'subject'        => 'Hindi Literature',
				'department'     => 'Faculty of Arts',
				'qualification'  => 'M.A., B.Ed.',
				'experience'     => '5+ Years',
				'email'          => 'pratap.damor@gurukripapeeth.in',
				'specialization' => 'Modern Hindi Literature & Folk Pedagogy',
				'photo_url'      => '/images/faculty/pratap-singh-damor.jpeg',
			),
			array(
				'id'             => 12,
				'seniority'      => 12,
				'name'           => 'Ms. Divya Kalal',
				'designation'    => 'Assistant Professor',
				'post_category'  => 'ASST. PROF. - B.Sc',
				'subject'        => 'Chemistry',
				'department'     => 'Faculty of Science',
				'qualification'  => 'M.Sc., B.Ed.',
				'experience'     => '5+ Years',
				'email'          => 'divya.kalal@gurukripapeeth.in',
				'specialization' => 'Inorganic Chemistry & Analytical Chemical Methods',
				'photo_url'      => '/images/faculty/divya-kalal.jpeg',
			),
		);
	}

	public static function get_admissions() {
		$saved = get_option( 'gurukapeeth_admissions', null );
		if ( is_array( $saved ) ) {
			return $saved;
		}

		return array(
			array(
				'id'          => 1,
				'session'     => '2026-27',
				'stream'      => 'Faculty of Arts (B.A.)',
				'list_type'   => '1st Provisional Merit List',
				'date'        => '20 Sep 2026',
				'cutoff'      => '72.4%',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 2,
				'session'     => '2026-27',
				'stream'      => 'Faculty of Science (B.Sc.)',
				'list_type'   => '1st Provisional Merit List',
				'date'        => '21 Sep 2026',
				'cutoff'      => '78.2%',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 3,
				'session'     => '2025-26',
				'stream'      => 'B.Ed. 2-Year Program',
				'list_type'   => 'PTET Final Allotment List',
				'date'        => '15 Aug 2025',
				'cutoff'      => 'PTET Rank Basis',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 4,
				'session'     => '2025-26',
				'stream'      => 'Integrated B.A.-B.Ed.',
				'list_type'   => 'PTET 2nd Round Allotment',
				'date'        => '25 Aug 2025',
				'cutoff'      => 'PTET Rank Basis',
				'pdf_url'     => '#',
			),
		);
	}

	public static function get_naac() {
		$saved = get_option( 'gurukapeeth_naac', null );
		if ( is_array( $saved ) ) {
			return $saved;
		}

		return array(
			array(
				'id'          => 1,
				'criterion'   => 1,
				'metric_no'   => '1.1.1',
				'title'       => 'Curriculum delivery planning and academic calendar documentation',
				'session'     => '2025-26',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 2,
				'criterion'   => 1,
				'metric_no'   => '1.4.1',
				'title'       => 'Structured feedback mechanism for students, teachers and employers',
				'session'     => '2025-26',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 3,
				'criterion'   => 2,
				'metric_no'   => '2.1.2',
				'title'       => 'Seats filled against reserved categories (SC, ST, OBC, Divyangjan)',
				'session'     => '2025-26',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 4,
				'criterion'   => 2,
				'metric_no'   => '2.4.2',
				'title'       => 'Percentage of full-time teachers with Ph.D. / NET / SET qualifications',
				'session'     => '2025-26',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 5,
				'criterion'   => 3,
				'metric_no'   => '3.4.1',
				'title'       => 'Extension activities carried out in neighborhood community and NSS',
				'session'     => '2025-26',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 6,
				'criterion'   => 4,
				'metric_no'   => '4.1.1',
				'title'       => 'Adequate physical and academic infrastructure, laboratories, and ICT',
				'session'     => '2025-26',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 7,
				'criterion'   => 5,
				'metric_no'   => '5.1.1',
				'title'       => 'Government scholarship and fee concession benefits distribution',
				'session'     => '2025-26',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 8,
				'criterion'   => 6,
				'metric_no'   => '6.5.1',
				'title'       => 'Internal Quality Assurance Cell (IQAC) initiatives and quality audits',
				'session'     => '2025-26',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 9,
				'criterion'   => 7,
				'metric_no'   => '7.1.1',
				'title'       => 'Gender equity promotion and environmental sustainability initiatives',
				'session'     => '2025-26',
				'pdf_url'     => '#',
			),
		);
	}

	public static function get_iqac() {
		$saved = get_option( 'gurukapeeth_iqac', null );
		if ( is_array( $saved ) ) {
			return $saved;
		}

		return array(
			array(
				'id'          => 1,
				'type'        => 'AQAR Report',
				'title'       => 'Annual Quality Assurance Report (AQAR) 2024-25',
				'session'     => '2024-25',
				'status'      => 'Submitted to NAAC',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 2,
				'type'        => 'AQAR Report',
				'title'       => 'Annual Quality Assurance Report (AQAR) 2023-24',
				'session'     => '2023-24',
				'status'      => 'Accepted & Verified',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 3,
				'type'        => 'Meeting Minutes',
				'title'       => 'IQAC Meeting on NEP 2020 Course Structure & Evaluation Reforms',
				'session'     => '2025-26',
				'status'      => 'Action Taken Implemented',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 4,
				'type'        => 'Meeting Minutes',
				'title'       => 'Annual Academic Audit & Faculty Development Program (FDP)',
				'session'     => '2025-26',
				'status'      => 'FDP Conducted',
				'pdf_url'     => '#',
			),
		);
	}

	public static function get_leadership() {
		$saved = get_option( 'gurukapeeth_leadership', null );
		if ( is_array( $saved ) ) {
			return $saved;
		}

		return array(
			array(
				'id'             => 1,
				'role_key'       => 'principal',
				'name'           => "Principal's Desk",
				'role_title'     => 'Principal & Head of Institution',
				'qualifications' => 'Dr. Rajesh Sharma, Ph.D., M.Ed.',
				'message'        => 'Welcome to Gurukripa Peeth College. Our focus is learner-centric education emphasizing experiential learning, digital literacy, and holistic personality development. We are dedicated to preparing educators and scholars with ethical fortitude.',
				'photo_url'      => '',
			),
			array(
				'id'             => 2,
				'role_key'       => 'director',
				'name'           => "Managing Director's Vision",
				'role_title'     => 'Managing Director',
				'qualifications' => 'M.B.A., B.Tech.',
				'message'        => 'At Gurukripa Peeth, our vision has always been to bring quality, values-driven higher education to the youth of Southern Rajasthan, empowering them for national distinction.',
				'photo_url'      => '',
			),
		);
	}

	public static function get_inquiries() {
		$saved = get_option( 'gurukapeeth_inquiries', array() );
		return is_array( $saved ) ? $saved : array();
	}

	public static function save_inquiry( $data ) {
		$inquiries = self::get_inquiries();
		$type_code = strtoupper( substr( $data['type'] ?? 'ADM', 0, 3 ) );
		$ref_num   = 'GPC-' . $type_code . '-' . date( 'Y' ) . '-' . rand( 1000, 9999 );
		
		$new_entry = array(
			'id'         => time() . '-' . rand( 100, 999 ),
			'ref'        => $ref_num,
			'type'       => sanitize_text_field( $data['type'] ?? 'Admission' ),
			'name'       => sanitize_text_field( $data['name'] ?? '' ),
			'phone'      => sanitize_text_field( $data['phone'] ?? '' ),
			'email'      => sanitize_email( $data['email'] ?? '' ),
			'program'    => sanitize_text_field( $data['program'] ?? '' ),
			'percentage' => sanitize_text_field( $data['percentage'] ?? '' ),
			'subject'    => sanitize_text_field( $data['subject'] ?? '' ),
			'message'    => sanitize_textarea_field( $data['message'] ?? '' ),
			'date'       => current_time( 'd M Y, h:i A' ),
			'timestamp'  => time(),
			'status'     => 'New',
		);

		array_unshift( $inquiries, $new_entry );
		if ( count( $inquiries ) > 200 ) {
			$inquiries = array_slice( $inquiries, 0, 200 );
		}
		update_option( 'gurukapeeth_inquiries', $inquiries );
		return $new_entry;
	}

	public static function update_inquiry_status( $id, $status ) {
		$inquiries = self::get_inquiries();
		foreach ( $inquiries as &$inq ) {
			if ( (string) $inq['id'] === (string) $id ) {
				$inq['status'] = sanitize_text_field( $status );
				break;
			}
		}
		update_option( 'gurukapeeth_inquiries', $inquiries );
		return true;
	}

	public static function delete_inquiry( $id ) {
		$inquiries = self::get_inquiries();
		$filtered  = array_filter( $inquiries, function( $inq ) use ( $id ) {
			return (string) $inq['id'] !== (string) $id;
		} );
		update_option( 'gurukapeeth_inquiries', array_values( $filtered ) );
		return true;
	}

	public static function seed_all_defaults( $force = false ) {
		if ( $force || get_option( 'gurukapeeth_settings' ) === false ) {
			update_option( 'gurukapeeth_settings', self::get_settings() );
		}
		if ( $force || get_option( 'gurukapeeth_homepage' ) === false ) {
			update_option( 'gurukapeeth_homepage', self::get_homepage() );
		}
		if ( $force || get_option( 'gurukapeeth_notices' ) === false ) {
			update_option( 'gurukapeeth_notices', self::get_notices() );
		}
		if ( $force || get_option( 'gurukapeeth_programs' ) === false ) {
			update_option( 'gurukapeeth_programs', self::get_programs() );
		}
		if ( $force || get_option( 'gurukapeeth_faculty' ) === false ) {
			update_option( 'gurukapeeth_faculty', self::get_faculty() );
		}
		if ( $force || get_option( 'gurukapeeth_admissions' ) === false ) {
			update_option( 'gurukapeeth_admissions', self::get_admissions() );
		}
		if ( $force || get_option( 'gurukapeeth_naac' ) === false ) {
			update_option( 'gurukapeeth_naac', self::get_naac() );
		}
		if ( $force || get_option( 'gurukapeeth_iqac' ) === false ) {
			update_option( 'gurukapeeth_iqac', self::get_iqac() );
		}
		if ( $force || get_option( 'gurukapeeth_leadership' ) === false ) {
			update_option( 'gurukapeeth_leadership', self::get_leadership() );
		}
		if ( $force || get_option( 'gurukapeeth_disclosures' ) === false ) {
			update_option( 'gurukapeeth_disclosures', self::get_disclosures() );
		}
		if ( $force || get_option( 'gurukapeeth_examhub' ) === false ) {
			update_option( 'gurukapeeth_examhub', self::get_examhub() );
		}
	}

	// ============================================================
	// MANDATORY STATUTORY DISCLOSURES
	// ============================================================
	// STATUTORY DISCLOSURES DATA
	// ============================================================
	public static function get_disclosures() {
		$saved = get_option( 'gurukapeeth_disclosures', null );
		if ( is_array( $saved ) ) {
			return $saved;
		}

		return array(
			// 1. Rajasthan Government Permanent NOCs
			array(
				'id'          => 1,
				'category'    => 'govt_noc',
				'title'       => 'Rajasthan Govt. Permanent NOC — Faculty of Arts (B.A.)',
				'description' => 'Permanent No Objection Certificate (स्थायी अनापत्ति प्रमाण पत्र) granted by Commissionerate of College Education, Govt. of Rajasthan, Jaipur (Order: एफ4 (54)आकाशि/नि.सं./2014/1128) for B.A. Arts subjects.',
				'issued_date' => '05 Mar 2021',
				'pdf_url'     => '/documents/noc/rajasthan-govt-permanent-noc-ba-arts.pdf',
			),
			array(
				'id'          => 2,
				'category'    => 'govt_noc',
				'title'       => 'Rajasthan Govt. Permanent NOC — Faculty of Science (B.Sc. Biology)',
				'description' => 'Permanent No Objection Certificate (स्थायी अनापत्ति प्रमाण पत्र) granted by Commissionerate of College Education, Govt. of Rajasthan, Jaipur (Order: एफ4 (54)आकाशि/नि.सं./2014/20) for B.Sc. Biology Group (Chemistry, Zoology, Botany).',
				'issued_date' => '06 Aug 2021',
				'pdf_url'     => '/documents/noc/rajasthan-govt-permanent-noc-bsc-biology.pdf',
			),

			// 2. GGTU Affiliations across All Sessions
			array(
				'id'          => 3,
				'category'    => 'affiliation',
				'title'       => 'GGTU Affiliation Order — Session 2025-26',
				'description' => 'Provisional Affiliation Order from Govind Guru Tribal University, Banswara (Order No. F/GGTU/Affiliation/2025/1992) for B.A. (80 seats) and B.Sc. (70 seats).',
				'issued_date' => '11 Jul 2025',
				'pdf_url'     => '/documents/affiliation/ggtu-affiliation-2025-26.pdf',
			),
			array(
				'id'          => 4,
				'category'    => 'affiliation',
				'title'       => 'GGTU Affiliation Order — Session 2024-25',
				'description' => 'Provisional Affiliation Order from Govind Guru Tribal University, Banswara (Order No. F/GGTU/Affiliation/2024/731-39) for B.A. (80 seats) and B.Sc. (70 seats).',
				'issued_date' => '07 Dec 2024',
				'pdf_url'     => '/documents/affiliation/ggtu-affiliation-2024-25.pdf',
			),
			array(
				'id'          => 5,
				'category'    => 'affiliation',
				'title'       => 'GGTU Affiliation Order — Session 2022-23',
				'description' => 'Provisional Affiliation Order from Govind Guru Tribal University, Banswara (Order No. F.1/GGTU/Affiliation/BSW/2022/626) for B.A. and B.Sc. courses.',
				'issued_date' => '13 Sep 2022',
				'pdf_url'     => '/documents/affiliation/ggtu-affiliation-2022-23.pdf',
			),
			array(
				'id'          => 6,
				'category'    => 'affiliation',
				'title'       => 'GGTU Affiliation Order — Session 2021-22',
				'description' => 'Provisional Affiliation Order from Govind Guru Tribal University, Banswara (Order No. F/GGTU/Affi./2021/230-236) for B.A. and B.Sc. courses.',
				'issued_date' => '27 Nov 2021',
				'pdf_url'     => '/documents/affiliation/ggtu-affiliation-2021-22.pdf',
			),

			// 3. NCTE & Registration
			array(
				'id'          => 7,
				'category'    => 'ncte_order',
				'title'       => 'NCTE Recognition Order — B.Ed. Program (WRC/APW05814/323363)',
				'description' => 'Western Regional Committee recognition order for the 2-Year B.Ed. program with 100 seats intake.',
				'issued_date' => '22 Jun 2014',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 8,
				'category'    => 'registration',
				'title'       => 'College Registration Certificate — Rajasthan Society Registration Act',
				'description' => 'Registration under the Rajasthan Societies Registration Act, 1958 for Gurukripa Peeth Shiksha Samiti.',
				'issued_date' => '15 Mar 2012',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 9,
				'category'    => 'fire_safety',
				'title'       => 'Fire Safety & Prevention Certificate — Dungarpur Fire Department',
				'description' => 'Valid fire safety NOC issued by the Chief Fire Officer, Dungarpur District.',
				'issued_date' => '10 Jan 2026',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 10,
				'category'    => 'building_noc',
				'title'       => 'Building Safety Certificate & Structural Stability Report',
				'description' => 'Structural safety certificate issued by a Government-approved civil engineer for all campus buildings.',
				'issued_date' => '05 Feb 2026',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 11,
				'category'    => 'fee_structure',
				'title'       => 'Approved Fee Structure & Refund Policy — Session 2026-27',
				'description' => 'University-approved fee schedule for B.A., B.Sc., B.Ed., and Integrated B.A.-B.Ed. with government scholarship adjustments.',
				'issued_date' => '15 Jun 2026',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 12,
				'category'    => 'anti_ragging',
				'title'       => 'Anti-Ragging Committee Constitution & Policy — Session 2026-27',
				'description' => 'Annual committee constitution as per UGC Regulation 2009 with member details and helpline numbers.',
				'issued_date' => '01 Aug 2026',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 13,
				'category'    => 'icc',
				'title'       => 'Internal Complaints Committee (ICC) — As per Vishakha Guidelines',
				'description' => 'Constituted ICC for prevention of sexual harassment at workplace as mandated by UGC.',
				'issued_date' => '01 Aug 2026',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 14,
				'category'    => 'ugc_approval',
				'title'       => 'UGC 2(f) & 12(B) Application Status',
				'description' => 'Current status of application under Section 2(f) and 12(B) of the UGC Act, 1956.',
				'issued_date' => '2025-26',
				'pdf_url'     => '#',
			),
		);
	}

	// ============================================================
	// SYLLABUS HUB & EXAM PORTAL DATA
	// ============================================================
	public static function get_examhub() {
		$saved = get_option( 'gurukapeeth_examhub', null );
		if ( is_array( $saved ) ) {
			return $saved;
		}

		return array(
			'syllabi' => array(
				array(
					'id' => 1, 'session' => '2026-27', 'program' => 'B.A.',
					'semester' => 'Semester I', 'title' => 'Hindi Literature — Gadya Sahitya',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 2, 'session' => '2026-27', 'program' => 'B.A.',
					'semester' => 'Semester I', 'title' => 'Political Science — Bharatiya Rajvyavastha',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 3, 'session' => '2026-27', 'program' => 'B.Sc.',
					'semester' => 'Semester I', 'title' => 'Physics — Mechanics & Wave Motion',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 4, 'session' => '2026-27', 'program' => 'B.Sc.',
					'semester' => 'Semester I', 'title' => 'Chemistry — Inorganic Chemistry',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 5, 'session' => '2026-27', 'program' => 'B.Ed.',
					'semester' => 'Year 1', 'title' => 'Education Psychology & Learner Development',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 6, 'session' => '2026-27', 'program' => 'B.Ed.',
					'semester' => 'Year 1', 'title' => 'Pedagogy of School Subjects — Part A',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 7, 'session' => '2025-26', 'program' => 'B.A.',
					'semester' => 'Semester III', 'title' => 'History — Medieval India',
					'nep_compliant' => false, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 8, 'session' => '2025-26', 'program' => 'Integrated B.A.-B.Ed.',
					'semester' => 'Semester I', 'title' => 'Foundation of Education',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
			),
			'schedules' => array(
				array(
					'id' => 1, 'session' => '2026-27', 'type' => 'NEP Portal',
					'title' => 'GGTU Student ERP Portal (Login, Exam Form, Results & Reval)',
					'program' => 'All UG & B.Ed. Programs', 'date' => 'Active Portal',
					'description' => 'Official GGTU NEP ERP Portal for student login, examination form submission, admit cards, semester results, and revaluation.',
					'url' => 'https://erp.ggtuexam.com/',
				),
				array(
					'id' => 2, 'session' => '2026-27', 'type' => 'Timetable',
					'title' => 'B.A. Semester I & III Exam Timetable',
					'program' => 'B.A.', 'date' => '15 Nov 2026',
					'description' => 'Theory examination schedule for all B.A. semesters.',
					'url' => 'https://erp.ggtuexam.com/',
				),
				array(
					'id' => 3, 'session' => '2026-27', 'type' => 'Timetable',
					'title' => 'B.Sc. Semester I & III Exam Timetable',
					'program' => 'B.Sc.', 'date' => '18 Nov 2026',
					'description' => 'Theory + practical examination schedule.',
					'url' => 'https://erp.ggtuexam.com/',
				),
				array(
					'id' => 4, 'session' => '2025-26', 'type' => 'Admit Card',
					'title' => 'B.Ed. Annual Examination Admit Cards',
					'program' => 'B.Ed.', 'date' => '20 Mar 2026',
					'description' => 'Download admit cards directly via GGTU Student ERP portal.',
					'url' => 'https://erp.ggtuexam.com/',
				),
				array(
					'id' => 5, 'session' => '2025-26', 'type' => 'Result',
					'title' => 'B.A. Semester IV Results Declared',
					'program' => 'B.A.', 'date' => '10 Aug 2026',
					'description' => 'Results and marksheets available on GGTU ERP examination portal.',
					'url' => 'https://erp.ggtuexam.com/',
				),
			),
			'scholarships' => array(
				array(
					'id' => 1, 'title' => 'Post-Matric Scholarship for SC/ST/OBC Students',
					'sponsor' => 'Govt. of Rajasthan', 'eligibility' => 'SC/ST/OBC category, Income ≤ ₹2.5 Lakh',
					'description' => 'Covers tuition fees, maintenance allowance, and book grants for students belonging to SC/ST/OBC categories pursuing higher education.',
					'last_date' => '31 Dec 2026', 'apply_url' => 'https://sso.rajasthan.gov.in',
				),
				array(
					'id' => 2, 'title' => 'Mukhyamantri Uchha Shiksha Chhatravrtti Yojana',
					'sponsor' => 'Govt. of Rajasthan', 'eligibility' => '12th ≥ 60%, Income ≤ ₹2.5 Lakh',
					'description' => 'Chief Minister Higher Education Scholarship providing ₹5,000 per annum to meritorious students from economically weaker families.',
					'last_date' => '15 Nov 2026', 'apply_url' => 'https://hte.rajasthan.gov.in',
				),
				array(
					'id' => 3, 'title' => 'Minority Scholarship (Pre & Post Matric)',
					'sponsor' => 'Ministry of Minority Affairs', 'eligibility' => 'Minority community, Income ≤ ₹2 Lakh',
					'description' => 'Central government scholarship for students of minority communities pursuing undergraduate and professional courses.',
					'last_date' => '31 Oct 2026', 'apply_url' => 'https://scholarships.gov.in',
				),
				array(
					'id' => 4, 'title' => 'Devnarayan Chhatravrtti Yojana',
					'sponsor' => 'Govt. of Rajasthan', 'eligibility' => 'Most Backward Classes, Income ≤ ₹2 Lakh',
					'description' => 'Special scholarship for girl students of most backward classes pursuing regular higher education in Rajasthan.',
					'last_date' => '30 Nov 2026', 'apply_url' => 'https://sso.rajasthan.gov.in',
				),
			),
		);
	}

	// ============================================================
	// GRIEVANCES
	// ============================================================
	public static function get_grievances() {
		$saved = get_option( 'gurukapeeth_grievances', array() );
		return is_array( $saved ) ? $saved : array();
	}

	public static function save_grievance( $data ) {
		$grievances = self::get_grievances();
		$ref_num = 'GPC-GRV-' . date( 'Y' ) . '-' . rand( 1000, 9999 );

		$new_entry = array(
			'id'        => time() . '-' . rand( 100, 999 ),
			'ref'       => $ref_num,
			'name'      => sanitize_text_field( $data['name'] ?? '' ),
			'contact'   => sanitize_text_field( $data['contact'] ?? '' ),
			'category'  => sanitize_text_field( $data['category'] ?? 'Other' ),
			'message'   => sanitize_textarea_field( $data['message'] ?? '' ),
			'date'      => current_time( 'd M Y, h:i A' ),
			'timestamp' => time(),
			'status'    => 'Pending Review',
		);

		array_unshift( $grievances, $new_entry );
		if ( count( $grievances ) > 100 ) {
			$grievances = array_slice( $grievances, 0, 100 );
		}
		update_option( 'gurukapeeth_grievances', $grievances );
		return $new_entry;
	}
}

