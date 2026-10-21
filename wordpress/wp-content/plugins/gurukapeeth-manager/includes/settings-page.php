<?php
/**
 * College Settings and Homepage Configurator Pages
 */

defined( 'ABSPATH' ) || exit;

function gurukapeeth_render_settings_page() {
	if ( isset( $_POST['gurukapeeth_save_settings'] ) && check_admin_referer( 'gurukapeeth_settings_nonce' ) ) {
		$settings = array(
			'college_name'        => sanitize_text_field( $_POST['college_name'] ?? '' ),
			'college_subtitle'    => sanitize_text_field( $_POST['college_subtitle'] ?? '' ),
			'tagline'             => sanitize_text_field( $_POST['tagline'] ?? '' ),
			'affiliating_univ'    => sanitize_text_field( $_POST['affiliating_univ'] ?? '' ),
			'aishe_code'          => sanitize_text_field( $_POST['aishe_code'] ?? '' ),
			'naac_grade'          => sanitize_text_field( $_POST['naac_grade'] ?? '' ),
			'phone_primary'       => sanitize_text_field( $_POST['phone_primary'] ?? '' ),
			'phone_secondary'     => sanitize_text_field( $_POST['phone_secondary'] ?? '' ),
			'email_info'          => sanitize_email( $_POST['email_info'] ?? '' ),
			'email_principal'     => sanitize_email( $_POST['email_principal'] ?? '' ),
			'address'             => sanitize_textarea_field( $_POST['address'] ?? '' ),
			'map_embed_url'       => esc_url_raw( $_POST['map_embed_url'] ?? '' ),
			'facebook_url'        => esc_url_raw( $_POST['facebook_url'] ?? '' ),
			'youtube_url'         => esc_url_raw( $_POST['youtube_url'] ?? '' ),
			'marquee_announcement'=> sanitize_text_field( $_POST['marquee_announcement'] ?? '' ),
		);

		update_option( 'gurukapeeth_settings', $settings );
		echo '<div class="notice notice-success is-dismissible"><p>College Settings successfully saved and synced to Headless REST API!</p></div>';
	}

	$s = get_option( 'gurukapeeth_settings', array() );
	?>
	<div class="wrap gurukapeeth-admin-wrap">
		<h1>College Institutional Settings</h1>
		<p class="subtitle">Global institution details consumed across all React frontend views and statutory disclosures.</p>

		<form method="post" action="">
			<?php wp_nonce_field( 'gurukapeeth_settings_nonce' ); ?>
			<div class="gurukapeeth-form-grid">
				<div class="form-section">
					<h3>Institutional Identity</h3>
					<div class="form-row">
						<label>College Full Name:</label>
						<input type="text" name="college_name" value="<?php echo esc_attr( $s['college_name'] ?? 'Gurukripa Peeth College' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>Subtitle / Category:</label>
						<input type="text" name="college_subtitle" value="<?php echo esc_attr( $s['college_subtitle'] ?? 'Undergraduate Degree College (Arts & Science)' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>Institutional Motto / Tagline:</label>
						<input type="text" name="tagline" value="<?php echo esc_attr( $s['tagline'] ?? 'Nurturing Intellect, Cultivating Character, Empowering Society' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>Affiliating University:</label>
						<input type="text" name="affiliating_univ" value="<?php echo esc_attr( $s['affiliating_univ'] ?? 'Govind Guru Tribal University (GGTU), Banswara' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>AISHE Code:</label>
						<input type="text" name="aishe_code" value="<?php echo esc_attr( $s['aishe_code'] ?? 'C-48902' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>NAAC Accreditation Status:</label>
						<input type="text" name="naac_grade" value="<?php echo esc_attr( $s['naac_grade'] ?? 'Accredited B+ (Cycle-1) / SSR in Progress' ); ?>" class="regular-text" />
					</div>
				</div>

				<div class="form-section">
					<h3>Official Contacts & Communications</h3>
					<div class="form-row">
						<label>Primary Phone / Helpline:</label>
						<input type="text" name="phone_primary" value="<?php echo esc_attr( $s['phone_primary'] ?? '+91 95874 33001' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>Admission Helpline:</label>
						<input type="text" name="phone_secondary" value="<?php echo esc_attr( $s['phone_secondary'] ?? '+91 96105 87077' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>General Inquiry Email:</label>
						<input type="email" name="email_info" value="<?php echo esc_attr( $s['email_info'] ?? 'gurukripa.peeth@gmail.com' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>Principal Office Email:</label>
						<input type="email" name="email_principal" value="<?php echo esc_attr( $s['email_principal'] ?? 'gurukripa.peeth@gmail.com' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>Campus Postal Address:</label>
						<textarea name="address" rows="3" class="large-text"><?php echo esc_textarea( $s['address'] ?? 'Gurukripa Peeth College, Peeth, Tehsil Simalwara, Dungarpur, Rajasthan - 314001, India' ); ?></textarea>
					</div>
					<div class="form-row">
						<label>Marquee Top Alert Ticker Text:</label>
						<input type="text" name="marquee_announcement" value="<?php echo esc_attr( $s['marquee_announcement'] ?? 'Admissions Open 2026-27 for B.A. and B.Sc. Degree Programs — Apply Online Now!' ); ?>" class="large-text" />
					</div>
				</div>
			</div>

			<p class="submit">
				<input type="submit" name="gurukapeeth_save_settings" class="button button-primary button-large" value="Save Institutional Settings" />
			</p>
		</form>
	</div>
	<?php
}

function gurukapeeth_render_homepage_page() {
	if ( isset( $_POST['gurukapeeth_save_hp'] ) && check_admin_referer( 'gurukapeeth_hp_nonce' ) ) {
		$hp_data = array(
			'hero_heading'      => sanitize_text_field( $_POST['hero_heading'] ?? '' ),
			'hero_subheading'   => sanitize_text_field( $_POST['hero_subheading'] ?? '' ),
			'stat_students'     => sanitize_text_field( $_POST['stat_students'] ?? '' ),
			'stat_faculty'      => sanitize_text_field( $_POST['stat_faculty'] ?? '' ),
			'stat_programs'     => sanitize_text_field( $_POST['stat_programs'] ?? '' ),
			'stat_placement'    => sanitize_text_field( $_POST['stat_placement'] ?? '' ),
			'initiative_title'  => sanitize_text_field( $_POST['initiative_title'] ?? '' ),
			'initiative_desc'   => sanitize_textarea_field( $_POST['initiative_desc'] ?? '' ),
		);

		update_option( 'gurukapeeth_homepage_data', $hp_data );
		echo '<div class="notice notice-success is-dismissible"><p>Homepage content successfully updated and synced!</p></div>';
	}

	$hp = get_option( 'gurukapeeth_homepage_data', array() );
	?>
	<div class="wrap gurukapeeth-admin-wrap">
		<h1>Homepage Section Builder</h1>
		<p class="subtitle">Customize key zones on the React homepage (Zone 2 Hero Banner, Zone 6 Impact Stats, Zone 10 Institutional Initiatives).</p>

		<form method="post" action="">
			<?php wp_nonce_field( 'gurukapeeth_hp_nonce' ); ?>
			<div class="gurukapeeth-form-grid">
				<div class="form-section">
					<h3>Zone 2: Hero Banner Text</h3>
					<div class="form-row">
						<label>Hero Headline:</label>
						<input type="text" name="hero_heading" value="<?php echo esc_attr( $hp['hero_heading'] ?? 'Empowering Minds, Transforming Futures in Southern Rajasthan' ); ?>" class="large-text" />
					</div>
					<div class="form-row">
						<label>Hero Subheading:</label>
						<input type="text" name="hero_subheading" value="<?php echo esc_attr( $hp['hero_subheading'] ?? 'Affiliated with Govind Guru Tribal University (GGTU), Banswara & Approved by Govt. of Rajasthan' ); ?>" class="large-text" />
					</div>
				</div>

				<div class="form-section">
					<h3>Zone 6: Impact Numbers & Statistics</h3>
					<div class="form-row">
						<label>Total Enrolled Students:</label>
						<input type="text" name="stat_students" value="<?php echo esc_attr( $hp['stat_students'] ?? '2,400+' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>Qualified Faculty Members:</label>
						<input type="text" name="stat_faculty" value="<?php echo esc_attr( $hp['stat_faculty'] ?? '48+' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>Degree Programs Offered:</label>
						<input type="text" name="stat_programs" value="<?php echo esc_attr( $hp['stat_programs'] ?? '12+' ); ?>" class="regular-text" />
					</div>
					<div class="form-row">
						<label>Success / Pass Rate:</label>
						<input type="text" name="stat_placement" value="<?php echo esc_attr( $hp['stat_placement'] ?? '94%' ); ?>" class="regular-text" />
					</div>
				</div>
			</div>

			<p class="submit">
				<input type="submit" name="gurukapeeth_save_hp" class="button button-primary button-large" value="Save Homepage Configurations" />
			</p>
		</form>
	</div>
	<?php
}
