<?php
/**
 * Headless Data Store & Default Seeder for Gurukripa Peeth College CMS
 */

defined( 'ABSPATH' ) || exit;

class Gurukapeeth_Data {

	public static function get_settings() {
		$defaults = array(
			'college_name'        => 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH',
			'college_hindi'       => 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ',
			'trust_name'          => 'Shree Narayan Shiksha Seva Samiti Peeth',
			'trust_hindi'         => 'श्री नारायण शिक्षा सेवा समिति, पीठ',
			'trust_reg_no'        => '55/DUNGARPUR/2013-14',
			'college_subtitle'    => 'Undergraduate Degree College (Arts & Science)',
			'tagline'             => 'Nurturing Intellect, Cultivating Character, Empowering Society',
			'affiliating_univ'    => 'Govind Guru Tribal University (GGTU), Banswara',
			'aishe_code'          => 'C-48902',
			'naac_grade'          => 'Accredited B+ (Cycle-1) / SSR in Progress',
			'phone_primary'       => '+91 95874 33001',
			'phone_secondary'     => '+91 96105 87077',
			'email_info'          => 'gurukripa.peeth@gmail.com',
			'email_principal'     => 'gurukripa.peeth@gmail.com',
			'address'             => 'Gurukripa Peeth College, Peeth, Tehsil Simalwara, Dungarpur, Rajasthan - 314001, India',
			'marquee_announcement'=> 'Admissions Open 2026-27 for B.A. and B.Sc. Degree Programs — Apply Online Now!',
			'logo_url'            => '/images/college-logo.png',
			'map_embed'           => '',
		);

		$saved = get_option( 'gurukapeeth_settings', array() );
		$merged = wp_parse_args( $saved, $defaults );

		// Cleanse legacy college name, NCTE references, and ensure trust info
		$dirty = false;
		if ( empty( $merged['college_name'] ) || $merged['college_name'] === 'Gurukripa Peeth College' ) {
			$merged['college_name'] = 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH';
			$dirty = true;
		}
		if ( empty( $merged['college_hindi'] ) || $merged['college_hindi'] === 'गुरुकृपा पीठ महाविद्यालय' ) {
			$merged['college_hindi'] = 'गुरुकृपा शिक्षण संस्थान महाविद्यालय, पीठ';
			$dirty = true;
		}
		if ( empty( $merged['trust_name'] ) ) {
			$merged['trust_name'] = 'Shree Narayan Shiksha Seva Samiti Peeth';
			$dirty = true;
		}
		if ( empty( $merged['trust_hindi'] ) ) {
			$merged['trust_hindi'] = 'श्री नारायण शिक्षा सेवा समिति, पीठ';
			$dirty = true;
		}
		if ( empty( $merged['trust_reg_no'] ) ) {
			$merged['trust_reg_no'] = '55/DUNGARPUR/2013-14';
			$dirty = true;
		}
		if ( isset( $merged['ncte_code'] ) ) {
			unset( $merged['ncte_code'] );
			$dirty = true;
		}
		if ( ! empty( $merged['college_subtitle'] ) && ( stripos( $merged['college_subtitle'], 'teacher' ) !== false || stripos( $merged['college_subtitle'], 'ncte' ) !== false ) ) {
			$merged['college_subtitle'] = 'Undergraduate Degree College (Arts & Science)';
			$dirty = true;
		}
		if ( ! empty( $merged['marquee_announcement'] ) && ( stripos( $merged['marquee_announcement'], 'b.ed' ) !== false || stripos( $merged['marquee_announcement'], 'integrated' ) !== false || stripos( $merged['marquee_announcement'], 'ncte' ) !== false ) ) {
			$merged['marquee_announcement'] = 'Admissions Open 2026-27 for B.A. and B.Sc. Degree Programs — Apply Online Now!';
			$dirty = true;
		}
		if ( $dirty ) {
			update_option( 'gurukapeeth_settings', $merged );
		}

		return $merged;
	}

	public static function get_homepage() {
		$defaults = array(
			'hero_heading'    => 'Empowering Minds, Transforming Futures in Southern Rajasthan',
			'hero_subheading' => 'Affiliated with Govind Guru Tribal University (GGTU), Banswara & Approved by Govt. of Rajasthan',
			'stat_students'   => '2,400+',
			'stat_faculty'    => '48+',
			'stat_programs'   => '2',
			'stat_pass_rate'  => '94%',
			'admission_badge' => 'Admissions Open 2026-27',
		);

		$saved = get_option( 'gurukapeeth_homepage', array() );
		$merged = wp_parse_args( $saved, $defaults );

		// Cleanse legacy NCTE mentions from hero subheading
		if ( ! empty( $merged['hero_subheading'] ) && stripos( $merged['hero_subheading'], 'ncte' ) !== false ) {
			$merged['hero_subheading'] = 'Affiliated with Govind Guru Tribal University (GGTU), Banswara & Approved by Govt. of Rajasthan';
			update_option( 'gurukapeeth_homepage', $merged );
		}

		return $merged;
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
				'title'      => 'Submission of B.A. & B.Sc. Semester Examination Forms for Session 2026-27',
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
		if ( is_array( $saved ) && ! empty( $saved ) ) {
			$dirty = false;
			$filtered = array_values( array_filter( $saved, function( $p ) {
				$t = strtolower( is_array( $p ) ? ( $p['title'] ?? '' ) : '' );
				$s = strtolower( is_array( $p ) ? ( $p['stream'] ?? '' ) : '' );
				return ! str_contains( $t, 'b.ed' ) && ! str_contains( $t, 'd.el.ed' ) && ! str_contains( $t, 'bstc' ) && ! str_contains( $t, 'integrated' ) && ! str_contains( $s, 'teacher' );
			} ) );
			if ( count( $filtered ) !== count( $saved ) ) {
				$dirty = true;
			}
			foreach ( $filtered as &$p ) {
				if ( ( $p['id'] ?? 0 ) == 2 || stripos( $p['title'] ?? '', 'B.Sc' ) !== false ) {
					if ( stripos( $p['title'] ?? '', 'Maths' ) !== false || ( $p['intake'] ?? '' ) !== '140 Seats' || stripos( $p['description'] ?? '', 'Physics' ) !== false ) {
						$p['title'] = 'Bachelor of Science (B.Sc. - Biology / CBZ)';
						$p['stream'] = 'Faculty of Science (Bio Group)';
						$p['duration'] = '3 Years (6 Semesters)';
						$p['intake'] = '140 Seats';
						$p['eligibility'] = '10+2 with Science (PCB) with minimum 50% marks';
						$p['description'] = 'Comprehensive theoretical and practical laboratory training in Chemistry, Botany, and Zoology (CBZ).';
						$p['syllabus_url'] = '#';
						$dirty = true;
					}
				}
			}
			unset( $p );

			if ( ! empty( $filtered ) ) {
				if ( $dirty ) {
					update_option( 'gurukapeeth_programs', $filtered );
				}
				return $filtered;
			}
		}

		$defaults = array(
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
				'title'       => 'Bachelor of Science (B.Sc. - Biology / CBZ)',
				'stream'      => 'Faculty of Science (Bio Group)',
				'duration'    => '3 Years (6 Semesters)',
				'intake'      => '140 Seats',
				'eligibility' => '10+2 with Science (PCB) with minimum 50% marks',
				'description' => 'Comprehensive theoretical and practical laboratory training in Chemistry, Botany, and Zoology (CBZ).',
				'syllabus_url'=> '#',
			),
		);
		update_option( 'gurukapeeth_programs', $defaults );
		return $defaults;
	}

	public static function get_faculty() {
		$saved = get_option( 'gurukapeeth_faculty', null );
		if ( is_array( $saved ) && count( $saved ) >= 12 ) {
			$dirty = false;
			foreach ( $saved as &$fac ) {
				if ( isset( $fac['email'] ) ) {
					unset( $fac['email'] );
					$dirty = true;
				}
			}
			unset( $fac );
			if ( $dirty ) {
				update_option( 'gurukapeeth_faculty', $saved );
			}
			return $saved;
		}

		$defaults = array(
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
				'specialization' => 'Inorganic Chemistry & Analytical Chemical Methods',
				'photo_url'      => '/images/faculty/divya-kalal.jpeg',
			),
		);
		update_option( 'gurukapeeth_faculty', $defaults );
		return $defaults;
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
				'session'     => '2026-27',
				'stream'      => 'Faculty of Arts (B.A.)',
				'list_type'   => '2nd Waiting List',
				'date'        => '28 Sep 2026',
				'cutoff'      => '68.0%',
				'pdf_url'     => '#',
			),
			array(
				'id'          => 4,
				'session'     => '2026-27',
				'stream'      => 'Faculty of Science (B.Sc.)',
				'list_type'   => '2nd Waiting List',
				'date'        => '29 Sep 2026',
				'cutoff'      => '74.5%',
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
		if ( is_array( $saved ) && ! empty( $saved ) ) {
			$dirty = false;
			foreach ( $saved as &$item ) {
				if ( ! empty( $item['message'] ) ) {
					if ( stripos( $item['message'], 'teacher training' ) !== false ) {
						$item['message'] = 'Gurukripa Peeth College is committed to delivering quality higher education in Arts and Science to the youth of Southern Rajasthan. Our mission is to combine academic excellence, moral integrity, and regional development to shape empowered leaders for the nation.';
						$dirty = true;
					}
					if ( stripos( $item['message'], 'pedagogical' ) !== false ) {
						$item['message'] = 'We prioritize learner-centric infrastructure, transparent administration, and comprehensive student support. Gurukripa Peeth stands as a beacon of opportunity for tribal and rural scholars to achieve excellence in higher education and academic careers.';
						$dirty = true;
					}
					if ( stripos( $item['message'], 'NCTE' ) !== false ) {
						$item['message'] = 'Welcome to Gurukripa Peeth College. Our academic framework integrates curricular rigor with ethical character building, experiential learning, and community engagement under GGTU and UGC standards.';
						$dirty = true;
					}
				}
			}
			unset( $item );
			if ( $dirty ) {
				update_option( 'gurukapeeth_leadership', $saved );
			}
			return $saved;
		}

		$defaults = array(
			array(
				'id'             => 1,
				'role_key'       => 'director',
				'name'           => "Chairman & Director's Desk",
				'role_title'     => 'Director / Chairman',
				'qualifications' => 'Mr. Kalu Ram Labana',
				'message'        => 'Gurukripa Peeth College is committed to delivering quality higher education in Arts and Science to the youth of Southern Rajasthan. Our mission is to combine academic excellence, moral integrity, and regional development to shape empowered leaders for the nation.',
				'photo_url'      => '',
			),
			array(
				'id'             => 2,
				'role_key'       => 'secretary',
				'name'           => "Secretary's Desk",
				'role_title'     => 'Secretary',
				'qualifications' => 'Mr. Vipin Kumar Labana',
				'message'        => 'We prioritize learner-centric infrastructure, transparent administration, and comprehensive student support. Gurukripa Peeth stands as a beacon of opportunity for tribal and rural scholars to achieve excellence in higher education and academic careers.',
				'photo_url'      => '',
			),
			array(
				'id'             => 3,
				'role_key'       => 'principal',
				'name'           => "Principal's Desk",
				'role_title'     => 'Principal & Head of Institution',
				'qualifications' => 'Dr. Hari Shanker Maru, Ph.D., M.A. (Hindi)',
				'message'        => 'Welcome to Gurukripa Peeth College. Our academic framework integrates curricular rigor with ethical character building, experiential learning, and community engagement under GGTU and UGC standards.',
				'photo_url'      => '',
			),
		);
		update_option( 'gurukapeeth_leadership', $defaults );
		return $defaults;
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

			// 3. Society Registration & Campus Safety
			array(
				'id'          => 8,
				'category'    => 'registration',
				'title'       => 'Society Registration Certificate — Shree Narayan Shiksha Seva Samiti Peeth',
				'description' => 'Official Registration Certificate granted under Rajasthan Societies Registration Act, 1958 (Registration No: 55/DUNGARPUR/2013-14) by the Registrar of Societies, Dungarpur.',
				'issued_date' => '26 Jan 2024',
				'pdf_url'     => '/documents/society-registration-certificate.jpeg',
			),
			array(
				'id'          => 81,
				'category'    => 'registration',
				'title'       => 'Executive Committee Order (नवीन कार्यकारिणी 2023-24) — Office of Assistant Registrar, Dungarpur',
				'description' => 'Official certified list of 16 Executive Committee members (अध्यक्ष: श्री कालूराम लबाना, सचिव: श्री विपिन कुमार लबाना, कोषाध्यक्ष: श्रीमती लक्ष्मी लबाना) approved by Office of Assistant Registrar, Cooperative Societies, Dungarpur.',
				'issued_date' => '26 Jan 2024',
				'pdf_url'     => '/documents/society-executive-committee-2023-24.pdf',
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
				'description' => 'University-approved fee schedule for B.A. and B.Sc. with government scholarship adjustments.',
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
					'semester' => 'Semester I', 'title' => 'Botany — Diversity of Microbes & Cryptogams',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 4, 'session' => '2026-27', 'program' => 'B.Sc.',
					'semester' => 'Semester I', 'title' => 'Chemistry — Inorganic & Organic Foundations',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 5, 'session' => '2026-27', 'program' => 'B.Sc.',
					'semester' => 'Semester I', 'title' => 'Zoology — Animal Diversity & Cell Biology',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 6, 'session' => '2026-27', 'program' => 'B.A.',
					'semester' => 'Semester I', 'title' => 'Geography — Physical Geography',
					'nep_compliant' => true, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 7, 'session' => '2025-26', 'program' => 'B.A.',
					'semester' => 'Semester III', 'title' => 'History — Medieval India',
					'nep_compliant' => false, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
				array(
					'id' => 8, 'session' => '2025-26', 'program' => 'B.A.',
					'semester' => 'Semester III', 'title' => 'Sanskrit Literature — Natak & Vyakaran',
					'nep_compliant' => false, 'pdf_url' => 'https://www.ggtu.ac.in/Syllabus.php',
				),
			),
			'schedules' => array(
				array(
					'id' => 1, 'session' => '2026-27', 'type' => 'NEP Portal',
					'title' => 'GGTU Student ERP Portal (Login, Exam Form, Results & Reval)',
					'program' => 'All UG Programs (B.A. & B.Sc.)', 'date' => 'Active Portal',
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
					'title' => 'B.Sc. Semester Examination Admit Cards',
					'program' => 'B.Sc.', 'date' => '20 Mar 2026',
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

