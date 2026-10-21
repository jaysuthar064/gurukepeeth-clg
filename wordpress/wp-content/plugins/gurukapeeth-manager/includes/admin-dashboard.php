<?php
/**
 * Headless Visual CMS Dashboard for Gurukripa Peeth College
 * 100% Dynamic UI - Zero WordPress Gutenberg / Post Editor Redirection
 */

defined( 'ABSPATH' ) || exit;

function gurukapeeth_render_unified_cms() {
	$settings   = Gurukapeeth_Data::get_settings();
	$homepage   = Gurukapeeth_Data::get_homepage();
	$notices    = Gurukapeeth_Data::get_notices();
	$programs   = Gurukapeeth_Data::get_programs();
	$faculty    = Gurukapeeth_Data::get_faculty();
	$admissions = Gurukapeeth_Data::get_admissions();
	$naac       = Gurukapeeth_Data::get_naac();
	$iqac       = Gurukapeeth_Data::get_iqac();
	$leadership  = Gurukapeeth_Data::get_leadership();
	$inquiries   = Gurukapeeth_Data::get_inquiries();
	$disclosures = Gurukapeeth_Data::get_disclosures();
	$examhub     = Gurukapeeth_Data::get_examhub();
	$grievances  = Gurukapeeth_Data::get_grievances();

	$current_tab = isset( $_GET['tab'] ) ? sanitize_key( $_GET['tab'] ) : 'settings';
	?>
	<div class="wrap gurukapeeth-cms-wrap" id="gurukapeeth-cms-app">
		<!-- Toast Notification -->
		<div id="gurukapeeth-toast" class="gurukapeeth-toast"></div>

		<!-- Top Header Bar -->
		<header class="gurukapeeth-topbar">
			<div class="gurukapeeth-brand">
				<span class="dashicons dashicons-bank brand-icon"></span>
				<div>
					<h1 class="brand-title">Gurukripa Peeth Headless CMS</h1>
					<p class="brand-subtitle">Autonomous College Content Manager & Decoupled React API Engine</p>
				</div>
			</div>

			<div class="gurukapeeth-topbar-actions">
				<a href="http://localhost:5173" target="_blank" class="button btn-preview">
					<span class="dashicons dashicons-external"></span> View Frontend (localhost:5173)
				</a>
				<button type="button" class="button btn-restore" id="btn-restore-defaults">
					<span class="dashicons dashicons-backup"></span> Restore Sample Data
				</button>
				<button type="button" class="button button-primary btn-save-sync" id="btn-save-sync-all">
					<span class="dashicons dashicons-cloud-saved"></span> Save & Sync to Frontend
				</button>
			</div>
		</header>

		<!-- Main Module Tabs Navigation -->
		<nav class="gurukapeeth-nav-tabs">
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'settings' ) ? 'active' : ''; ?>" data-target="tab-settings">
				Institutional Profile
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'homepage' ) ? 'active' : ''; ?>" data-target="tab-homepage">
				Hero & Homepage
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'notices' ) ? 'active' : ''; ?>" data-target="tab-notices">
				Notices & Circulars (<?php echo count( $notices ); ?>)
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'programs' ) ? 'active' : ''; ?>" data-target="tab-programs">
				Academic Programs (<?php echo count( $programs ); ?>)
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'faculty' ) ? 'active' : ''; ?>" data-target="tab-faculty">
				Faculty & Staff (<?php echo count( $faculty ); ?>)
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'admissions' ) ? 'active' : ''; ?>" data-target="tab-admissions">
				Admissions & Cutoffs (<?php echo count( $admissions ); ?>)
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'naac' ) ? 'active' : ''; ?>" data-target="tab-naac">
				NAAC 7 Criteria (<?php echo count( $naac ); ?>)
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'iqac' ) ? 'active' : ''; ?>" data-target="tab-iqac">
				IQAC Cell Reports (<?php echo count( $iqac ); ?>)
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'leadership' ) ? 'active' : ''; ?>" data-target="tab-leadership">
				Leadership Desks
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'disclosures' ) ? 'active' : ''; ?>" data-target="tab-disclosures">
				Disclosures (<?php echo count( $disclosures ); ?>)
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'examhub' ) ? 'active' : ''; ?>" data-target="tab-examhub">
				Exam Hub
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'inquiries' ) ? 'active' : ''; ?>" data-target="tab-inquiries">
				Inquiries (<?php echo count( $inquiries ); ?>)
			</button>
			<button type="button" class="tab-btn <?php echo ( $current_tab === 'grievances' ) ? 'active' : ''; ?>" data-target="tab-grievances">
				Grievances (<?php echo count( $grievances ); ?>)
			</button>
		</nav>

		<!-- Workspace Body -->
		<div class="gurukapeeth-workspace">
			
			<!-- TAB 1: Institutional Settings -->
			<div class="tab-pane <?php echo ( $current_tab === 'settings' ) ? 'active' : ''; ?>" id="tab-settings">
				<div class="panel-card">
					<div class="panel-header">
						<h2>Institutional Profile & Accreditation Codes</h2>
						<span class="api-tag">Syncs with: <code>/wp-json/gurukapeeth/v1/settings</code></span>
					</div>
					<div class="form-grid-2">
						<div class="form-group">
							<label>College Full Name (English):</label>
							<input type="text" id="set_college_name" value="<?php echo esc_attr( $settings['college_name'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>College Name (Hindi):</label>
							<input type="text" id="set_college_hindi" value="<?php echo esc_attr( $settings['college_hindi'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Category / Subtitle:</label>
							<input type="text" id="set_college_subtitle" value="<?php echo esc_attr( $settings['college_subtitle'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Motto / Tagline:</label>
							<input type="text" id="set_tagline" value="<?php echo esc_attr( $settings['tagline'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Affiliating University:</label>
							<input type="text" id="set_affiliating_univ" value="<?php echo esc_attr( $settings['affiliating_univ'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>AISHE Code:</label>
							<input type="text" id="set_aishe_code" value="<?php echo esc_attr( $settings['aishe_code'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>NAAC Accreditation Status:</label>
							<input type="text" id="set_naac_grade" value="<?php echo esc_attr( $settings['naac_grade'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Primary Phone / Helpline:</label>
							<input type="text" id="set_phone_primary" value="<?php echo esc_attr( $settings['phone_primary'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Admission Helpline:</label>
							<input type="text" id="set_phone_secondary" value="<?php echo esc_attr( $settings['phone_secondary'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>General Email:</label>
							<input type="email" id="set_email_info" value="<?php echo esc_attr( $settings['email_info'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Principal Office Email:</label>
							<input type="email" id="set_email_principal" value="<?php echo esc_attr( $settings['email_principal'] ); ?>" class="input-text" />
						</div>
						<div class="form-group span-2">
							<label>Campus Postal Address:</label>
							<textarea id="set_address" rows="2" class="input-textarea"><?php echo esc_textarea( $settings['address'] ); ?></textarea>
						</div>
						<div class="form-group span-2">
							<label>Top Marquee Announcement (Always visible ticker):</label>
							<input type="text" id="set_marquee_announcement" value="<?php echo esc_attr( $settings['marquee_announcement'] ); ?>" class="input-text font-bold" />
						</div>
					</div>
				</div>
			</div>

			<!-- TAB 2: Hero & Homepage -->
			<div class="tab-pane <?php echo ( $current_tab === 'homepage' ) ? 'active' : ''; ?>" id="tab-homepage">
				<div class="panel-card">
					<div class="panel-header">
						<h2>Zone 2 Hero Banner & Zone 6 Impact Statistics</h2>
						<span class="api-tag">Syncs with: <code>/wp-json/gurukapeeth/v1/homepage</code></span>
					</div>
					<div class="form-grid-2">
						<div class="form-group span-2">
							<label>Hero Headline:</label>
							<input type="text" id="hp_hero_heading" value="<?php echo esc_attr( $homepage['hero_heading'] ); ?>" class="input-text" />
						</div>
						<div class="form-group span-2">
							<label>Hero Subheading:</label>
							<input type="text" id="hp_hero_subheading" value="<?php echo esc_attr( $homepage['hero_subheading'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Hero Admission Badge:</label>
							<input type="text" id="hp_admission_badge" value="<?php echo esc_attr( $homepage['admission_badge'] ?? 'Admissions Open 2026-27' ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Stat 1: Enrolled Students Count:</label>
							<input type="text" id="hp_stat_students" value="<?php echo esc_attr( $homepage['stat_students'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Stat 2: Qualified Faculty Count:</label>
							<input type="text" id="hp_stat_faculty" value="<?php echo esc_attr( $homepage['stat_faculty'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Stat 3: Degree Programs Offered:</label>
							<input type="text" id="hp_stat_programs" value="<?php echo esc_attr( $homepage['stat_programs'] ); ?>" class="input-text" />
						</div>
						<div class="form-group">
							<label>Stat 4: Examination Pass Rate:</label>
							<input type="text" id="hp_stat_pass_rate" value="<?php echo esc_attr( $homepage['stat_pass_rate'] ); ?>" class="input-text" />
						</div>
					</div>
				</div>
			</div>

			<!-- TAB 3: Notices & Circulars -->
			<div class="tab-pane <?php echo ( $current_tab === 'notices' ) ? 'active' : ''; ?>" id="tab-notices">
				<div class="panel-card">
					<div class="panel-header">
						<div>
							<h2>Notices, Orders & Circulars Manager</h2>
							<p class="panel-sub">Manage student notices, examination circulars, and marquee headlines with instant frontend reflection.</p>
						</div>
						<button type="button" class="button button-primary btn-add-item" id="btn-add-notice">
							+ Add New Notice
						</button>
					</div>

					<table class="cms-table" id="table-notices">
						<thead>
							<tr>
								<th style="width: 45%;">Notice Title</th>
								<th>Category</th>
								<th>Date</th>
								<th style="text-align: center;">In Marquee?</th>
								<th>PDF Document</th>
								<th style="text-align: right;">Actions</th>
							</tr>
						</thead>
						<tbody id="tbody-notices">
							<!-- Rendered by JavaScript -->
						</tbody>
					</table>
				</div>
			</div>

			<!-- TAB 4: Academic Programs -->
			<div class="tab-pane <?php echo ( $current_tab === 'programs' ) ? 'active' : ''; ?>" id="tab-programs">
				<div class="panel-card">
					<div class="panel-header">
						<div>
							<h2>Academic Programs & Degrees</h2>
							<p class="panel-sub">Undergraduate degree courses in Arts &amp; Science (B.A. &amp; B.Sc.) affiliated with GGTU Banswara.</p>
						</div>
						<button type="button" class="button button-primary btn-add-item" id="btn-add-program">
							+ Add New Program
						</button>
					</div>

					<table class="cms-table" id="table-programs">
						<thead>
							<tr>
								<th style="width: 30%;">Degree / Program Name</th>
								<th>Stream</th>
								<th>Duration</th>
								<th>Intake</th>
								<th>Eligibility</th>
								<th style="text-align: right;">Actions</th>
							</tr>
						</thead>
						<tbody id="tbody-programs">
							<!-- Rendered by JavaScript -->
						</tbody>
					</table>
				</div>
			</div>

			<!-- TAB 5: Faculty & Staff -->
			<div class="tab-pane <?php echo ( $current_tab === 'faculty' ) ? 'active' : ''; ?>" id="tab-faculty">
				<div class="panel-card">
					<div class="panel-header">
						<div>
							<h2>Faculty & Staff Directory</h2>
							<p class="panel-sub">Meet the academic professors, associate faculty, and teacher training mentors.</p>
						</div>
						<button type="button" class="button button-primary btn-add-item" id="btn-add-faculty">
							+ Add Faculty Member
						</button>
					</div>

					<table class="cms-table" id="table-faculty">
						<thead>
							<tr>
								<th>Faculty Name</th>
								<th>Designation</th>
								<th>Department</th>
								<th>Qualifications</th>
								<th>Experience</th>
								<th>Email</th>
								<th style="text-align: right;">Actions</th>
							</tr>
						</thead>
						<tbody id="tbody-faculty">
							<!-- Rendered by JavaScript -->
						</tbody>
					</table>
				</div>
			</div>

			<!-- TAB 6: Admissions & Cutoffs -->
			<div class="tab-pane <?php echo ( $current_tab === 'admissions' ) ? 'active' : ''; ?>" id="tab-admissions">
				<div class="panel-card">
					<div class="panel-header">
						<div>
							<h2>Admissions & Merit Lists</h2>
							<p class="panel-sub">Session-wise provisional, waiting, and final cutoff lists for undergraduate admissions.</p>
						</div>
						<button type="button" class="button button-primary btn-add-item" id="btn-add-admission">
							+ Add Merit List
						</button>
					</div>

					<table class="cms-table" id="table-admissions">
						<thead>
							<tr>
								<th>Session</th>
								<th>Stream / Course</th>
								<th>List Type</th>
								<th>Date</th>
								<th>Cutoff Marks</th>
								<th>PDF Link</th>
								<th style="text-align: right;">Actions</th>
							</tr>
						</thead>
						<tbody id="tbody-admissions">
							<!-- Rendered by JavaScript -->
						</tbody>
					</table>
				</div>
			</div>

			<!-- TAB 7: NAAC 7 Criteria Portal -->
			<div class="tab-pane <?php echo ( $current_tab === 'naac' ) ? 'active' : ''; ?>" id="tab-naac">
				<div class="panel-card">
					<div class="panel-header">
						<div>
							<h2>NAAC Self Study Report (SSR) — 7 Criteria Evidence</h2>
							<p class="panel-sub">Statutory documentation categorized by Criteria 1 through 7 and metric numbers.</p>
						</div>
						<button type="button" class="button button-primary btn-add-item" id="btn-add-naac">
							+ Upload / Add NAAC Document
						</button>
					</div>

					<table class="cms-table" id="table-naac">
						<thead>
							<tr>
								<th>Criterion</th>
								<th>Metric No.</th>
								<th style="width: 45%;">Document Description</th>
								<th>Session</th>
								<th>Document PDF</th>
								<th style="text-align: right;">Actions</th>
							</tr>
						</thead>
						<tbody id="tbody-naac">
							<!-- Rendered by JavaScript -->
						</tbody>
					</table>
				</div>
			</div>

			<!-- TAB 8: IQAC Cell Reports -->
			<div class="tab-pane <?php echo ( $current_tab === 'iqac' ) ? 'active' : ''; ?>" id="tab-iqac">
				<div class="panel-card">
					<div class="panel-header">
						<div>
							<h2>IQAC Annual Quality Assurance (AQAR) & Meeting Minutes</h2>
							<p class="panel-sub">Mandatory IQAC compliance records, annual AQAR submissions, and action taken reports.</p>
						</div>
						<button type="button" class="button button-primary btn-add-item" id="btn-add-iqac">
							+ Add IQAC Record
						</button>
					</div>

					<table class="cms-table" id="table-iqac">
						<thead>
							<tr>
								<th>Record Type</th>
								<th style="width: 40%;">Title / Agenda</th>
								<th>Session</th>
								<th>Status / ATR</th>
								<th>PDF Document</th>
								<th style="text-align: right;">Actions</th>
							</tr>
						</thead>
						<tbody id="tbody-iqac">
							<!-- Rendered by JavaScript -->
						</tbody>
					</table>
				</div>
			</div>

			<!-- TAB 9: Leadership Desks -->
			<div class="tab-pane <?php echo ( $current_tab === 'leadership' ) ? 'active' : ''; ?>" id="tab-leadership">
				<div class="panel-card">
					<div class="panel-header">
						<h2>Leadership Messages (Chairman, Secretary & Principal)</h2>
						<span class="api-tag">Syncs with: <code>/wp-json/gurukapeeth/v1/leadership</code></span>
					</div>

					<div class="leadership-cards-grid" id="container-leadership">
						<!-- Rendered by JavaScript -->
					</div>
				</div>
			</div>

			<!-- TAB 10: Inquiries & Leads -->
			<div class="tab-pane <?php echo ( $current_tab === 'inquiries' ) ? 'active' : ''; ?>" id="tab-inquiries">
				<div class="panel-card">
					<div class="panel-header">
						<div>
							<h2>Prospective Student Inquiries & Contact Messages</h2>
							<p class="panel-desc">Real-time inquiries and admission leads submitted by students and parents directly from the college website.</p>
						</div>
						<span class="api-tag">Total: <?php echo count( $inquiries ); ?> Received</span>
					</div>

					<?php if ( empty( $inquiries ) ) : ?>
						<div class="empty-state" style="text-align: center; padding: 40px; color: #64748b;">
							<span class="dashicons dashicons-email-alt" style="font-size: 40px; width: 40px; height: 40px; color: #94a3b8; display: block; margin: 0 auto 12px auto;"></span>
							<p>No inquiries received yet. When students submit the Admission or Contact forms on the website, they will appear here in real-time.</p>
						</div>
					<?php else : ?>
						<table class="cms-table" style="width: 100%; border-collapse: collapse;">
							<thead>
								<tr>
									<th style="padding: 10px; text-align: left;">Ref #</th>
									<th style="padding: 10px; text-align: left;">Date</th>
									<th style="padding: 10px; text-align: left;">Type</th>
									<th style="padding: 10px; text-align: left;">Student Name</th>
									<th style="padding: 10px; text-align: left;">Contact Info</th>
									<th style="padding: 10px; text-align: left;">Program / Subject</th>
									<th style="padding: 10px; text-align: left;">Message</th>
									<th style="padding: 10px; text-align: left;">Status</th>
									<th style="padding: 10px; text-align: left;">Action</th>
								</tr>
							</thead>
							<tbody>
								<?php foreach ( $inquiries as $inq ) : ?>
									<tr id="inq-row-<?php echo esc_attr( $inq['id'] ); ?>" style="border-bottom: 1px solid #e2e8f0;">
										<td style="padding: 10px;"><strong style="color: #b45309;"><?php echo esc_html( $inq['ref'] ?? 'N/A' ); ?></strong></td>
										<td style="padding: 10px;"><span style="font-size: 12px; color: #64748b;"><?php echo esc_html( $inq['date'] ); ?></span></td>
										<td style="padding: 10px;">
											<span style="background: <?php echo ( ( $inq['type'] ?? '' ) === 'Admission' ) ? '#fef3c7; color: #92400e;' : '#eff6ff; color: #1e40af;'; ?> padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">
												<?php echo esc_html( $inq['type'] ?? 'General' ); ?>
											</span>
										</td>
										<td style="padding: 10px;"><strong><?php echo esc_html( $inq['name'] ); ?></strong></td>
										<td style="padding: 10px;">
											<div style="font-size: 13px;">
												<a href="tel:<?php echo esc_attr( $inq['phone'] ); ?>"><?php echo esc_html( $inq['phone'] ); ?></a>
											</div>
											<?php if ( ! empty( $inq['email'] ) ) : ?>
												<div style="font-size: 12px; color: #64748b;">
													<a href="mailto:<?php echo esc_attr( $inq['email'] ); ?>"><?php echo esc_html( $inq['email'] ); ?></a>
												</div>
											<?php endif; ?>
										</td>
										<td style="padding: 10px;">
											<?php if ( ! empty( $inq['program'] ) ) : ?>
												<strong><?php echo esc_html( $inq['program'] ); ?></strong>
											<?php endif; ?>
											<?php if ( ! empty( $inq['percentage'] ) ) : ?>
												<div style="font-size: 11px; color: #059669;">Marks: <?php echo esc_html( $inq['percentage'] ); ?></div>
											<?php endif; ?>
											<?php if ( ! empty( $inq['subject'] ) ) : ?>
												<div style="font-size: 12px; color: #64748b;"><?php echo esc_html( $inq['subject'] ); ?></div>
											<?php endif; ?>
										</td>
										<td style="padding: 10px; max-width: 200px; font-size: 12px; color: #475569;">
											<?php echo esc_html( $inq['message'] ?: 'Direct Inquiry' ); ?>
										</td>
										<td style="padding: 10px;">
											<select class="inquiry-status-select" data-id="<?php echo esc_attr( $inq['id'] ); ?>" style="font-size: 12px; padding: 3px 6px; border-radius: 4px; border: 1px solid #cbd5e1;">
												<option value="New" <?php selected( $inq['status'] ?? 'New', 'New' ); ?>>🟡 New</option>
												<option value="Contacted" <?php selected( $inq['status'] ?? '', 'Contacted' ); ?>>Contacted</option>
												<option value="Enrolled" <?php selected( $inq['status'] ?? '', 'Enrolled' ); ?>>🟢 Enrolled</option>
												<option value="Closed" <?php selected( $inq['status'] ?? '', 'Closed' ); ?>>Closed</option>
											</select>
										</td>
										<td style="padding: 10px;">
											<button type="button" class="button button-small delete-inq-btn" data-id="<?php echo esc_attr( $inq['id'] ); ?>" style="color: #dc2626; border-color: #fca5a5;" title="Delete this inquiry">
												<span class="dashicons dashicons-trash" style="font-size: 14px; vertical-align: middle;"></span>
											</button>
										</td>
									</tr>
								<?php endforeach; ?>
							</tbody>
						</table>
					<?php endif; ?>
				</div>
			</div>

			<!-- TAB: Statutory Disclosures -->
			<div class="tab-pane <?php echo ( $current_tab === 'disclosures' ) ? 'active' : ''; ?>" id="tab-disclosures">
				<div class="panel-card">
					<div class="panel-header">
						<h2>Mandatory Statutory Disclosures (UGC / GGTU / Raj. Govt)</h2>
						<span class="api-tag">Syncs with: <code>/wp-json/gurukapeeth/v1/disclosures</code></span>
					</div>
					<p style="color: #64748b; margin-bottom: 16px;">Manage public disclosure documents. All documents are served on the <strong>/disclosures</strong> frontend page.</p>
					<?php if ( ! empty( $disclosures ) ) : ?>
					<table class="cms-data-table" style="width:100%; border-collapse:collapse;">
						<thead>
							<tr style="background: #0f172a; color: #fff;">
								<th style="padding: 10px;">ID</th>
								<th style="padding: 10px;">Category</th>
								<th style="padding: 10px;">Title</th>
								<th style="padding: 10px;">Issued</th>
								<th style="padding: 10px;">PDF</th>
							</tr>
						</thead>
						<tbody>
							<?php foreach ( $disclosures as $doc ) : ?>
							<tr style="border-bottom: 1px solid #e2e8f0;">
								<td style="padding: 10px;"><?php echo esc_html( $doc['id'] ); ?></td>
								<td style="padding: 10px;"><code><?php echo esc_html( $doc['category'] ); ?></code></td>
								<td style="padding: 10px; font-weight: 500;"><?php echo esc_html( $doc['title'] ); ?></td>
								<td style="padding: 10px; color: #64748b;"><?php echo esc_html( $doc['issued_date'] ); ?></td>
								<td style="padding: 10px;">
									<?php if ( $doc['pdf_url'] && $doc['pdf_url'] !== '#' ) : ?>
										<a href="<?php echo esc_url( $doc['pdf_url'] ); ?>" target="_blank">View</a>
									<?php else : ?>
										<span style="color: #94a3b8;">Not uploaded</span>
									<?php endif; ?>
								</td>
							</tr>
							<?php endforeach; ?>
						</tbody>
					</table>
					<?php else : ?>
						<p style="color: #94a3b8; text-align:center; padding: 30px;">No disclosure documents yet.</p>
					<?php endif; ?>
				</div>
			</div>

			<!-- TAB: Exam Hub -->
			<div class="tab-pane <?php echo ( $current_tab === 'examhub' ) ? 'active' : ''; ?>" id="tab-examhub">
				<div class="panel-card">
					<div class="panel-header">
						<h2>Syllabi, Exam Schedules & Scholarships</h2>
						<span class="api-tag">Syncs with: <code>/wp-json/gurukapeeth/v1/examhub</code></span>
					</div>
					<p style="color: #64748b; margin-bottom: 16px;">Manage syllabi PDFs, exam timetables, and scholarship info served on <strong>/exam-hub</strong>.</p>
					<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px;">
						<div style="background: #f0f9ff; border-radius: 8px; padding: 16px; text-align: center;">
							<strong style="font-size: 24px; color: #0f2b48;"><?php echo count( $examhub['syllabi'] ?? array() ); ?></strong>
							<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Syllabi Entries</div>
						</div>
						<div style="background: #fefce8; border-radius: 8px; padding: 16px; text-align: center;">
							<strong style="font-size: 24px; color: #78350f;"><?php echo count( $examhub['schedules'] ?? array() ); ?></strong>
							<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Exam Schedules</div>
						</div>
						<div style="background: #ecfdf5; border-radius: 8px; padding: 16px; text-align: center;">
							<strong style="font-size: 24px; color: #065f46;"><?php echo count( $examhub['scholarships'] ?? array() ); ?></strong>
							<div style="font-size: 12px; color: #64748b; margin-top: 4px;">Scholarships</div>
						</div>
					</div>
					<p style="color: #94a3b8; font-size: 13px;">To edit individual syllabi, schedules, or scholarships, use the JSON editor or direct options update. Data syncs to the React frontend via the REST API.</p>
				</div>
			</div>

			<!-- TAB: Grievances -->
			<div class="tab-pane <?php echo ( $current_tab === 'grievances' ) ? 'active' : ''; ?>" id="tab-grievances">
				<div class="panel-card">
					<div class="panel-header">
						<h2>Confidential Grievances & Complaints</h2>
						<span class="api-tag">Submitted via: <code>/wp-json/gurukapeeth/v1/grievance</code></span>
					</div>
					<?php if ( empty( $grievances ) ) : ?>
						<p style="color: #94a3b8; text-align: center; padding: 40px;">No grievances submitted yet.</p>
					<?php else : ?>
					<table class="cms-data-table" style="width:100%; border-collapse:collapse;">
						<thead>
							<tr style="background: #7f1d1d; color: #fff;">
								<th style="padding: 10px;">Ref #</th>
								<th style="padding: 10px;">Name</th>
								<th style="padding: 10px;">Category</th>
								<th style="padding: 10px;">Message</th>
								<th style="padding: 10px;">Date</th>
								<th style="padding: 10px;">Status</th>
							</tr>
						</thead>
						<tbody>
							<?php foreach ( $grievances as $grv ) : ?>
							<tr style="border-bottom: 1px solid #e2e8f0;">
								<td style="padding: 10px; font-weight: 600; color: #7f1d1d;"><?php echo esc_html( $grv['ref'] ); ?></td>
								<td style="padding: 10px;"><?php echo esc_html( $grv['name'] ); ?></td>
								<td style="padding: 10px;"><code><?php echo esc_html( $grv['category'] ); ?></code></td>
								<td style="padding: 10px; max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><?php echo esc_html( $grv['message'] ); ?></td>
								<td style="padding: 10px; color: #64748b; font-size: 13px;"><?php echo esc_html( $grv['date'] ); ?></td>
								<td style="padding: 10px;">
									<span style="padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 600; background: <?php echo $grv['status'] === 'Pending Review' ? '#fef3c7' : '#ecfdf5'; ?>; color: <?php echo $grv['status'] === 'Pending Review' ? '#92400e' : '#065f46'; ?>;">
										<?php echo esc_html( $grv['status'] ); ?>
									</span>
								</td>
							</tr>
							<?php endforeach; ?>
						</tbody>
					</table>
					<?php endif; ?>
				</div>
			</div>

		</div>

		<!-- Reusable Generic Item Edit Modal -->
		<div class="cms-modal-overlay" id="cms-modal" style="display: none;">
			<div class="cms-modal-box">
				<div class="cms-modal-header">
					<h3 id="modal-title">Edit Item</h3>
					<button type="button" class="modal-close-btn" id="modal-close">&times;</button>
				</div>
				<div class="cms-modal-body" id="modal-form-content">
					<!-- Injected dynamically based on item type -->
				</div>
				<div class="cms-modal-footer">
					<button type="button" class="button" id="modal-cancel-btn">Cancel</button>
					<button type="button" class="button button-primary" id="modal-save-btn">Apply Changes</button>
				</div>
			</div>
		</div>

	</div>

	<!-- Pass Initial Data directly to JavaScript -->
	<script>
		window.gurukapeethInitialState = {
			notices:      <?php echo wp_json_encode( $notices ); ?>,
			programs:     <?php echo wp_json_encode( $programs ); ?>,
			faculty:      <?php echo wp_json_encode( $faculty ); ?>,
			admissions:   <?php echo wp_json_encode( $admissions ); ?>,
			naac:         <?php echo wp_json_encode( $naac ); ?>,
			iqac:         <?php echo wp_json_encode( $iqac ); ?>,
			leadership:   <?php echo wp_json_encode( $leadership ); ?>,
			disclosures:  <?php echo wp_json_encode( $disclosures ); ?>,
			examhub:      <?php echo wp_json_encode( $examhub ); ?>
		};
	</script>
	<?php
}
