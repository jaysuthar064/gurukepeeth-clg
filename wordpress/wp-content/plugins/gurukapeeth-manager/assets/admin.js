/**
 * Gurukripa Peeth Headless CMS Admin JavaScript Engine
 * Zero WordPress Default Post Editor - 100% Dynamic Visual Control
 */

(function($) {
	'use strict';

	$(document).ready(function() {
		// State data passed from PHP
		const state = window.gurukapeethInitialState || {
			notices: [],
			programs: [],
			faculty: [],
			admissions: [],
			naac: [],
			iqac: [],
			leadership: []
		};

		let currentModalType = null;
		let currentEditIndex = -1;

		function showToast(message, isError) {
			const toast = $('#gurukapeeth-toast');
			toast.html(message).css({
				'background': isError ? '#dc2626' : '#059669',
				'display': 'block'
			}).fadeIn(150);

			setTimeout(function() {
				toast.fadeOut(300);
			}, 4000);
		}

		// Tab Switching
		$('.tab-btn').on('click', function() {
			$('.tab-btn').removeClass('active');
			$('.tab-pane').removeClass('active');
			$(this).addClass('active');
			const targetId = $(this).data('target');
			$('#' + targetId).addClass('active');
		});

		// --- RENDER NOTICES TABLE ---
		function renderNotices() {
			const tbody = $('#tbody-notices');
			tbody.empty();

			if (!state.notices || state.notices.length === 0) {
				tbody.append('<tr><td colspan="6" style="text-align: center; color: #94a3b8; padding: 24px;">No notices published yet. Click "+ Add New Notice" to create one.</td></tr>');
				return;
			}

			state.notices.forEach((n, idx) => {
				const marqueeBadge = n.is_marquee 
					? '<span class="badge badge-gold">In Ticker</span>' 
					: '<span class="badge badge-gray">No</span>';

				const pdfLink = (n.pdf_url && n.pdf_url !== '#') 
					? `<a href="${n.pdf_url}" target="_blank" class="table-link"><span class="dashicons dashicons-pdf"></span> View PDF</a>` 
					: '<span style="color: #94a3b8; font-size: 12px;">No PDF</span>';

				const tr = `
					<tr>
						<td><strong>${escapeHtml(n.title)}</strong></td>
						<td><span class="badge badge-blue">${escapeHtml(n.category || 'General')}</span></td>
						<td style="white-space: nowrap;">${escapeHtml(n.date || '')}</td>
						<td style="text-align: center;">${marqueeBadge}</td>
						<td>${pdfLink}</td>
						<td style="text-align: right; white-space: nowrap;">
							<button type="button" class="btn-action btn-edit-notice" data-index="${idx}">Edit</button>
							<button type="button" class="btn-action btn-del btn-delete-notice" data-index="${idx}">Delete</button>
						</td>
					</tr>
				`;
				tbody.append(tr);
			});
		}

		// --- RENDER PROGRAMS TABLE ---
		function renderPrograms() {
			const tbody = $('#tbody-programs');
			tbody.empty();

			if (!state.programs || state.programs.length === 0) {
				tbody.append('<tr><td colspan="6" style="text-align: center; color: #94a3b8; padding: 24px;">No academic programs added yet.</td></tr>');
				return;
			}

			state.programs.forEach((p, idx) => {
				const tr = `
					<tr>
						<td>
							<strong>${escapeHtml(p.title)}</strong>
							<div style="font-size: 12px; color: #64748b; margin-top: 4px;">${escapeHtml(p.description ? p.description.substring(0, 75) + '...' : '')}</div>
						</td>
						<td><span class="badge badge-purple">${escapeHtml(p.stream || 'Undergraduate')}</span></td>
						<td>${escapeHtml(p.duration || '3 Years')}</td>
						<td>${escapeHtml(p.intake || '100 Seats')}</td>
						<td style="font-size: 13px;">${escapeHtml(p.eligibility || '10+2')}</td>
						<td style="text-align: right; white-space: nowrap;">
							<button type="button" class="btn-action btn-edit-program" data-index="${idx}">Edit</button>
							<button type="button" class="btn-action btn-del btn-delete-program" data-index="${idx}">Delete</button>
						</td>
					</tr>
				`;
				tbody.append(tr);
			});
		}

		// --- RENDER FACULTY TABLE ---
		function renderFaculty() {
			const tbody = $('#tbody-faculty');
			tbody.empty();

			if (!state.faculty || state.faculty.length === 0) {
				tbody.append('<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 24px;">No faculty members listed yet.</td></tr>');
				return;
			}

			state.faculty.forEach((f, idx) => {
				const photo = f.photo_url 
					? `<img src="${f.photo_url}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; vertical-align: middle; margin-right: 8px;" />` 
					: `<span class="dashicons dashicons-businessman" style="margin-right: 6px; color: #64748b;"></span>`;

				const tr = `
					<tr>
						<td>${photo} <strong>${escapeHtml(f.name)}</strong></td>
						<td><span class="badge badge-gold">${escapeHtml(f.designation || '')}</span></td>
						<td>${escapeHtml(f.department || '')}</td>
						<td style="font-size: 13px;">${escapeHtml(f.qualification || '')}</td>
						<td>${escapeHtml(f.experience || '')}</td>
						<td><a href="mailto:${f.email}" style="font-size: 13px; color: #2563eb;">${escapeHtml(f.email || '')}</a></td>
						<td style="text-align: right; white-space: nowrap;">
							<button type="button" class="btn-action btn-edit-faculty" data-index="${idx}">Edit</button>
							<button type="button" class="btn-action btn-del btn-delete-faculty" data-index="${idx}">Delete</button>
						</td>
					</tr>
				`;
				tbody.append(tr);
			});
		}

		// --- RENDER ADMISSIONS TABLE ---
		function renderAdmissions() {
			const tbody = $('#tbody-admissions');
			tbody.empty();

			if (!state.admissions || state.admissions.length === 0) {
				tbody.append('<tr><td colspan="7" style="text-align: center; color: #94a3b8; padding: 24px;">No admission lists published.</td></tr>');
				return;
			}

			state.admissions.forEach((a, idx) => {
				const pdfLink = (a.pdf_url && a.pdf_url !== '#') 
					? `<a href="${a.pdf_url}" target="_blank" class="table-link"><span class="dashicons dashicons-pdf"></span> PDF</a>` 
					: '<span style="color: #94a3b8; font-size: 12px;">No PDF</span>';

				const tr = `
					<tr>
						<td><strong>${escapeHtml(a.session || '2026-27')}</strong></td>
						<td>${escapeHtml(a.stream || '')}</td>
						<td>${escapeHtml(a.list_type || 'Merit List')}</td>
						<td>${escapeHtml(a.date || '')}</td>
						<td><span class="badge badge-gold font-bold">${escapeHtml(a.cutoff || '-')}</span></td>
						<td>${pdfLink}</td>
						<td style="text-align: right; white-space: nowrap;">
							<button type="button" class="btn-action btn-edit-admission" data-index="${idx}">Edit</button>
							<button type="button" class="btn-action btn-del btn-delete-admission" data-index="${idx}">Delete</button>
						</td>
					</tr>
				`;
				tbody.append(tr);
			});
		}

		// --- RENDER NAAC TABLE ---
		function renderNaac() {
			const tbody = $('#tbody-naac');
			tbody.empty();

			if (!state.naac || state.naac.length === 0) {
				tbody.append('<tr><td colspan="6" style="text-align: center; color: #94a3b8; padding: 24px;">No NAAC documents uploaded.</td></tr>');
				return;
			}

			state.naac.forEach((doc, idx) => {
				const pdfLink = (doc.pdf_url && doc.pdf_url !== '#') 
					? `<a href="${doc.pdf_url}" target="_blank" class="table-link"><span class="dashicons dashicons-pdf"></span> View Evidence</a>` 
					: '<span style="color: #94a3b8; font-size: 12px;">No File</span>';

				const tr = `
					<tr>
						<td><span class="badge badge-purple">Criterion ${doc.criterion}</span></td>
						<td><strong>${escapeHtml(doc.metric_no || '')}</strong></td>
						<td>${escapeHtml(doc.title)}</td>
						<td>${escapeHtml(doc.session || '2025-26')}</td>
						<td>${pdfLink}</td>
						<td style="text-align: right; white-space: nowrap;">
							<button type="button" class="btn-action btn-edit-naac" data-index="${idx}">Edit</button>
							<button type="button" class="btn-action btn-del btn-delete-naac" data-index="${idx}">Delete</button>
						</td>
					</tr>
				`;
				tbody.append(tr);
			});
		}

		// --- RENDER IQAC TABLE ---
		function renderIqac() {
			const tbody = $('#tbody-iqac');
			tbody.empty();

			if (!state.iqac || state.iqac.length === 0) {
				tbody.append('<tr><td colspan="6" style="text-align: center; color: #94a3b8; padding: 24px;">No IQAC records added.</td></tr>');
				return;
			}

			state.iqac.forEach((item, idx) => {
				const pdfLink = (item.pdf_url && item.pdf_url !== '#') 
					? `<a href="${item.pdf_url}" target="_blank" class="table-link"><span class="dashicons dashicons-pdf"></span> PDF</a>` 
					: '<span style="color: #94a3b8; font-size: 12px;">No File</span>';

				const tr = `
					<tr>
						<td><span class="badge badge-blue">${escapeHtml(item.type || 'AQAR')}</span></td>
						<td><strong>${escapeHtml(item.title)}</strong></td>
						<td>${escapeHtml(item.session || '')}</td>
						<td><span class="badge badge-green">${escapeHtml(item.status || 'Active')}</span></td>
						<td>${pdfLink}</td>
						<td style="text-align: right; white-space: nowrap;">
							<button type="button" class="btn-action btn-edit-iqac" data-index="${idx}">Edit</button>
							<button type="button" class="btn-action btn-del btn-delete-iqac" data-index="${idx}">Delete</button>
						</td>
					</tr>
				`;
				tbody.append(tr);
			});
		}

		// --- RENDER LEADERSHIP DESKS ---
		function renderLeadership() {
			const container = $('#container-leadership');
			container.empty();

			if (!state.leadership || state.leadership.length === 0) {
				container.append('<p style="color: #94a3b8;">No leadership messages added.</p>');
				return;
			}

			state.leadership.forEach((l, idx) => {
				const card = `
					<div class="leader-card" data-index="${idx}">
						<div class="leader-card-header">
							<span class="badge badge-gold">${escapeHtml(l.role_title || 'Desk')}</span>
							<h3 style="margin: 8px 0 4px 0; font-size: 18px;">${escapeHtml(l.name)}</h3>
							<div style="font-size: 13px; color: #64748b;">${escapeHtml(l.qualifications || '')}</div>
						</div>
						<div class="form-group" style="margin-top: 14px;">
							<label style="font-size: 12px; font-weight: 600; color: #334155;">Desk / Heading Name:</label>
							<input type="text" class="input-text lead-name-input" value="${escapeHtml(l.name || '')}" placeholder="e.g. Principal's Desk or Director's Vision" />
						</div>
						<div class="form-group" style="margin-top: 10px;">
							<label style="font-size: 12px; font-weight: 600; color: #334155;">Role / Title:</label>
							<input type="text" class="input-text lead-role-input" value="${escapeHtml(l.role_title || '')}" />
						</div>
						<div class="form-group" style="margin-top: 10px;">
							<label style="font-size: 12px; font-weight: 600; color: #334155;">Qualifications / Person Name:</label>
							<input type="text" class="input-text lead-qual-input" value="${escapeHtml(l.qualifications || '')}" />
						</div>
						<div class="form-group" style="margin-top: 10px;">
							<label style="font-size: 12px; font-weight: 600; color: #334155;">Message Content:</label>
							<textarea rows="4" class="input-textarea lead-msg-input">${escapeHtml(l.message || '')}</textarea>
						</div>
					</div>
				`;
				container.append(card);
			});
		}

		// Initial Renders
		renderNotices();
		renderPrograms();
		renderFaculty();
		renderAdmissions();
		renderNaac();
		renderIqac();
		renderLeadership();

		// --- MODAL CONTROLLER ---
		function openModal(title, contentHtml, type, editIndex) {
			currentModalType = type;
			currentEditIndex = editIndex;
			$('#modal-title').text(title);
			$('#modal-form-content').html(contentHtml);
			$('#cms-modal').fadeIn(150);
		}

		function closeModal() {
			$('#cms-modal').fadeOut(150);
			currentModalType = null;
			currentEditIndex = -1;
		}

		$('#modal-close, #modal-cancel-btn').on('click', closeModal);

		// WordPress Media Uploader Helper
		$(document).on('click', '.btn-upload-media', function(e) {
			e.preventDefault();
			const targetInputId = $(this).data('target');
			const frame = wp.media({
				title: 'Select or Upload Document / Image',
				button: { text: 'Use this media' },
				multiple: false
			});

			frame.on('select', function() {
				const attachment = frame.state().get('selection').first().toJSON();
				$('#' + targetInputId).val(attachment.url);
			});

			frame.open();
		});

		// 1. ADD / EDIT NOTICE
		$('#btn-add-notice').on('click', function() {
			const html = `
				<div class="form-group">
					<label>Notice Title *</label>
					<input type="text" id="m_notice_title" class="input-text" placeholder="Enter notice headline" />
				</div>
				<div class="form-grid-2">
					<div class="form-group">
						<label>Notice Category</label>
						<select id="m_notice_category" class="input-text">
							<option value="Admissions">Admissions</option>
							<option value="Examinations">Examinations</option>
							<option value="IQAC">IQAC</option>
							<option value="Scholarship">Scholarship</option>
							<option value="General Circular">General Circular</option>
						</select>
					</div>
					<div class="form-group">
						<label>Publication Date</label>
						<input type="text" id="m_notice_date" class="input-text" value="${getCurrentDate()}" />
					</div>
				</div>
				<div class="form-group">
					<label>Attachment PDF Document URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_notice_pdf" class="input-text" placeholder="https://... or upload PDF" />
						<button type="button" class="button btn-upload-media" data-target="m_notice_pdf">Upload PDF</button>
					</div>
				</div>
				<div class="form-group" style="margin-top: 14px;">
					<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
						<input type="checkbox" id="m_notice_marquee" checked />
						<span><strong>Show in Top Marquee Ticker</strong> (Highlights on React frontend)</span>
					</label>
				</div>
			`;
			openModal('+ Add New Notice', html, 'notice', -1);
		});

		$(document).on('click', '.btn-edit-notice', function() {
			const idx = $(this).data('index');
			const n = state.notices[idx];
			const html = `
				<div class="form-group">
					<label>Notice Title *</label>
					<input type="text" id="m_notice_title" class="input-text" value="${escapeHtml(n.title)}" />
				</div>
				<div class="form-grid-2">
					<div class="form-group">
						<label>Notice Category</label>
						<select id="m_notice_category" class="input-text">
							<option value="Admissions" ${n.category === 'Admissions' ? 'selected' : ''}>Admissions</option>
							<option value="Examinations" ${n.category === 'Examinations' ? 'selected' : ''}>Examinations</option>
							<option value="IQAC" ${n.category === 'IQAC' ? 'selected' : ''}>IQAC</option>
							<option value="Scholarship" ${n.category === 'Scholarship' ? 'selected' : ''}>Scholarship</option>
							<option value="General Circular" ${n.category === 'General Circular' ? 'selected' : ''}>General Circular</option>
						</select>
					</div>
					<div class="form-group">
						<label>Publication Date</label>
						<input type="text" id="m_notice_date" class="input-text" value="${escapeHtml(n.date || '')}" />
					</div>
				</div>
				<div class="form-group">
					<label>Attachment PDF Document URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_notice_pdf" class="input-text" value="${escapeHtml(n.pdf_url || '')}" />
						<button type="button" class="button btn-upload-media" data-target="m_notice_pdf">Upload PDF</button>
					</div>
				</div>
				<div class="form-group" style="margin-top: 14px;">
					<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
						<input type="checkbox" id="m_notice_marquee" ${n.is_marquee ? 'checked' : ''} />
						<span><strong>Show in Top Marquee Ticker</strong></span>
					</label>
				</div>
			`;
			openModal('Edit Notice', html, 'notice', idx);
		});

		$(document).on('click', '.btn-delete-notice', function() {
			const idx = $(this).data('index');
			if (confirm('Are you sure you want to delete this notice?')) {
				state.notices.splice(idx, 1);
				renderNotices();
				saveAndSyncAll(false, 'DeleteNotice deleted and synced to frontend!');
			}
		});

		// 2. ADD / EDIT PROGRAM
		$('#btn-add-program').on('click', function() {
			const html = `
				<div class="form-group">
					<label>Degree / Program Name *</label>
					<input type="text" id="m_prog_title" class="input-text" placeholder="e.g. Master of Arts (M.A.)" />
				</div>
				<div class="form-grid-2">
					<div class="form-group">
						<label>Stream / Faculty</label>
						<input type="text" id="m_prog_stream" class="input-text" placeholder="e.g. Faculty of Arts" />
					</div>
					<div class="form-group">
						<label>Duration</label>
						<input type="text" id="m_prog_duration" class="input-text" value="3 Years (6 Semesters)" />
					</div>
					<div class="form-group">
						<label>Intake Capacity</label>
						<input type="text" id="m_prog_intake" class="input-text" value="100 Seats" />
					</div>
					<div class="form-group">
						<label>Eligibility</label>
						<input type="text" id="m_prog_eligibility" class="input-text" value="10+2 with minimum 45% marks" />
					</div>
				</div>
				<div class="form-group">
					<label>Program Overview / Description</label>
					<textarea id="m_prog_desc" rows="3" class="input-textarea" placeholder="Brief outline of curriculum and specializations..."></textarea>
				</div>
			`;
			openModal('+ Add Academic Program', html, 'program', -1);
		});

		$(document).on('click', '.btn-edit-program', function() {
			const idx = $(this).data('index');
			const p = state.programs[idx];
			const html = `
				<div class="form-group">
					<label>Degree / Program Name *</label>
					<input type="text" id="m_prog_title" class="input-text" value="${escapeHtml(p.title)}" />
				</div>
				<div class="form-grid-2">
					<div class="form-group">
						<label>Stream / Faculty</label>
						<input type="text" id="m_prog_stream" class="input-text" value="${escapeHtml(p.stream || '')}" />
					</div>
					<div class="form-group">
						<label>Duration</label>
						<input type="text" id="m_prog_duration" class="input-text" value="${escapeHtml(p.duration || '')}" />
					</div>
					<div class="form-group">
						<label>Intake Capacity</label>
						<input type="text" id="m_prog_intake" class="input-text" value="${escapeHtml(p.intake || '')}" />
					</div>
					<div class="form-group">
						<label>Eligibility</label>
						<input type="text" id="m_prog_eligibility" class="input-text" value="${escapeHtml(p.eligibility || '')}" />
					</div>
				</div>
				<div class="form-group">
					<label>Program Overview / Description</label>
					<textarea id="m_prog_desc" rows="3" class="input-textarea">${escapeHtml(p.description || '')}</textarea>
				</div>
			`;
			openModal('Edit Academic Program', html, 'program', idx);
		});

		$(document).on('click', '.btn-delete-program', function() {
			const idx = $(this).data('index');
			if (confirm('Delete this program?')) {
				state.programs.splice(idx, 1);
				renderPrograms();
				saveAndSyncAll(false, 'DeleteAcademic program deleted and synced to frontend!');
			}
		});

		// 3. ADD / EDIT FACULTY
		$('#btn-add-faculty').on('click', function() {
			const html = `
				<div class="form-group">
					<label>Faculty Full Name *</label>
					<input type="text" id="m_fac_name" class="input-text" placeholder="e.g. Dr. Ramesh Chundawat" />
				</div>
				<div class="form-grid-2">
					<div class="form-group">
						<label>Designation</label>
						<input type="text" id="m_fac_desig" class="input-text" placeholder="e.g. Associate Professor & HOD" />
					</div>
					<div class="form-group">
						<label>Department</label>
						<input type="text" id="m_fac_dept" class="input-text" placeholder="e.g. Department of Hindi" />
					</div>
					<div class="form-group">
						<label>Qualifications</label>
						<input type="text" id="m_fac_qual" class="input-text" placeholder="e.g. Ph.D., NET, M.A." />
					</div>
					<div class="form-group">
						<label>Teaching Experience</label>
						<input type="text" id="m_fac_exp" class="input-text" placeholder="e.g. 14 Years" />
					</div>
				</div>
				<div class="form-grid-2">
					<div class="form-group">
						<label>Official Email</label>
						<input type="email" id="m_fac_email" class="input-text" placeholder="faculty@gurukripapeeth.in" />
					</div>
					<div class="form-group">
						<label>Specialization</label>
						<input type="text" id="m_fac_spec" class="input-text" placeholder="e.g. Modern Literature" />
					</div>
				</div>
				<div class="form-group">
					<label>Profile Photo URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_fac_photo" class="input-text" placeholder="Photo URL or choose file" />
						<button type="button" class="button btn-upload-media" data-target="m_fac_photo">Choose Photo</button>
					</div>
				</div>
			`;
			openModal('+ Add Faculty Member', html, 'faculty', -1);
		});

		$(document).on('click', '.btn-edit-faculty', function() {
			const idx = $(this).data('index');
			const f = state.faculty[idx];
			const html = `
				<div class="form-group">
					<label>Faculty Full Name *</label>
					<input type="text" id="m_fac_name" class="input-text" value="${escapeHtml(f.name)}" />
				</div>
				<div class="form-grid-2">
					<div class="form-group">
						<label>Designation</label>
						<input type="text" id="m_fac_desig" class="input-text" value="${escapeHtml(f.designation || '')}" />
					</div>
					<div class="form-group">
						<label>Department</label>
						<input type="text" id="m_fac_dept" class="input-text" value="${escapeHtml(f.department || '')}" />
					</div>
					<div class="form-group">
						<label>Qualifications</label>
						<input type="text" id="m_fac_qual" class="input-text" value="${escapeHtml(f.qualification || '')}" />
					</div>
					<div class="form-group">
						<label>Teaching Experience</label>
						<input type="text" id="m_fac_exp" class="input-text" value="${escapeHtml(f.experience || '')}" />
					</div>
				</div>
				<div class="form-grid-2">
					<div class="form-group">
						<label>Official Email</label>
						<input type="email" id="m_fac_email" class="input-text" value="${escapeHtml(f.email || '')}" />
					</div>
					<div class="form-group">
						<label>Specialization</label>
						<input type="text" id="m_fac_spec" class="input-text" value="${escapeHtml(f.specialization || '')}" />
					</div>
				</div>
				<div class="form-group">
					<label>Profile Photo URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_fac_photo" class="input-text" value="${escapeHtml(f.photo_url || '')}" />
						<button type="button" class="button btn-upload-media" data-target="m_fac_photo">Choose Photo</button>
					</div>
				</div>
			`;
			openModal('Edit Faculty Member', html, 'faculty', idx);
		});

		$(document).on('click', '.btn-delete-faculty', function() {
			const idx = $(this).data('index');
			if (confirm('Delete this faculty member?')) {
				state.faculty.splice(idx, 1);
				renderFaculty();
				saveAndSyncAll(false, 'DeleteFaculty member deleted and synced to frontend!');
			}
		});

		// 4. ADD / EDIT ADMISSION CUTOFF
		$('#btn-add-admission').on('click', function() {
			const html = `
				<div class="form-grid-2">
					<div class="form-group">
						<label>Academic Session</label>
						<input type="text" id="m_adm_session" class="input-text" value="2026-27" />
					</div>
					<div class="form-group">
						<label>Stream / Faculty</label>
						<input type="text" id="m_adm_stream" class="input-text" placeholder="e.g. Faculty of Arts (B.A.)" />
					</div>
					<div class="form-group">
						<label>List Type</label>
						<input type="text" id="m_adm_list_type" class="input-text" value="1st Provisional Merit List" />
					</div>
					<div class="form-group">
						<label>Cutoff Marks</label>
						<input type="text" id="m_adm_cutoff" class="input-text" placeholder="e.g. 74.2%" />
					</div>
				</div>
				<div class="form-group">
					<label>Publication Date</label>
					<input type="text" id="m_adm_date" class="input-text" value="${getCurrentDate()}" />
				</div>
				<div class="form-group">
					<label>Merit List PDF File URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_adm_pdf" class="input-text" placeholder="PDF URL or choose file" />
						<button type="button" class="button btn-upload-media" data-target="m_adm_pdf">Upload PDF</button>
					</div>
				</div>
			`;
			openModal('+ Add Admission Merit List', html, 'admission', -1);
		});

		$(document).on('click', '.btn-edit-admission', function() {
			const idx = $(this).data('index');
			const a = state.admissions[idx];
			const html = `
				<div class="form-grid-2">
					<div class="form-group">
						<label>Academic Session</label>
						<input type="text" id="m_adm_session" class="input-text" value="${escapeHtml(a.session || '')}" />
					</div>
					<div class="form-group">
						<label>Stream / Faculty</label>
						<input type="text" id="m_adm_stream" class="input-text" value="${escapeHtml(a.stream || '')}" />
					</div>
					<div class="form-group">
						<label>List Type</label>
						<input type="text" id="m_adm_list_type" class="input-text" value="${escapeHtml(a.list_type || '')}" />
					</div>
					<div class="form-group">
						<label>Cutoff Marks</label>
						<input type="text" id="m_adm_cutoff" class="input-text" value="${escapeHtml(a.cutoff || '')}" />
					</div>
				</div>
				<div class="form-group">
					<label>Publication Date</label>
					<input type="text" id="m_adm_date" class="input-text" value="${escapeHtml(a.date || '')}" />
				</div>
				<div class="form-group">
					<label>Merit List PDF File URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_adm_pdf" class="input-text" value="${escapeHtml(a.pdf_url || '')}" />
						<button type="button" class="button btn-upload-media" data-target="m_adm_pdf">Upload PDF</button>
					</div>
				</div>
			`;
			openModal('Edit Admission Cutoff List', html, 'admission', idx);
		});

		$(document).on('click', '.btn-delete-admission', function() {
			const idx = $(this).data('index');
			if (confirm('Delete this admission list entry?')) {
				state.admissions.splice(idx, 1);
				renderAdmissions();
				saveAndSyncAll(false, 'DeleteAdmission entry deleted and synced to frontend!');
			}
		});

		// 5. ADD / EDIT NAAC DOCUMENT
		$('#btn-add-naac').on('click', function() {
			const html = `
				<div class="form-grid-2">
					<div class="form-group">
						<label>NAAC Criterion (1 to 7)</label>
						<select id="m_naac_criterion" class="input-text">
							<option value="1">Criterion 1: Curricular Aspects</option>
							<option value="2">Criterion 2: Teaching-Learning & Evaluation</option>
							<option value="3">Criterion 3: Research, Innovations & Extension</option>
							<option value="4">Criterion 4: Infrastructure & Learning Resources</option>
							<option value="5">Criterion 5: Student Support & Progression</option>
							<option value="6">Criterion 6: Governance, Leadership & Management</option>
							<option value="7">Criterion 7: Institutional Values & Best Practices</option>
						</select>
					</div>
					<div class="form-group">
						<label>Metric Number (e.g. 1.1.1, 2.4.2)</label>
						<input type="text" id="m_naac_metric" class="input-text" placeholder="e.g. 1.1.1" />
					</div>
				</div>
				<div class="form-group">
					<label>Document Description / Title *</label>
					<input type="text" id="m_naac_title" class="input-text" placeholder="Detailed title of metric evidence document" />
				</div>
				<div class="form-group">
					<label>Academic Session</label>
					<input type="text" id="m_naac_session" class="input-text" value="2025-26" />
				</div>
				<div class="form-group">
					<label>Evidence PDF File URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_naac_pdf" class="input-text" placeholder="PDF URL or upload file" />
						<button type="button" class="button btn-upload-media" data-target="m_naac_pdf">Upload PDF</button>
					</div>
				</div>
			`;
			openModal('+ Add NAAC Document', html, 'naac', -1);
		});

		$(document).on('click', '.btn-edit-naac', function() {
			const idx = $(this).data('index');
			const d = state.naac[idx];
			const html = `
				<div class="form-grid-2">
					<div class="form-group">
						<label>NAAC Criterion (1 to 7)</label>
						<select id="m_naac_criterion" class="input-text">
							${[1,2,3,4,5,6,7].map(c => `<option value="${c}" ${d.criterion == c ? 'selected' : ''}>Criterion ${c}</option>`).join('')}
						</select>
					</div>
					<div class="form-group">
						<label>Metric Number</label>
						<input type="text" id="m_naac_metric" class="input-text" value="${escapeHtml(d.metric_no || '')}" />
					</div>
				</div>
				<div class="form-group">
					<label>Document Description / Title *</label>
					<input type="text" id="m_naac_title" class="input-text" value="${escapeHtml(d.title || '')}" />
				</div>
				<div class="form-group">
					<label>Academic Session</label>
					<input type="text" id="m_naac_session" class="input-text" value="${escapeHtml(d.session || '')}" />
				</div>
				<div class="form-group">
					<label>Evidence PDF File URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_naac_pdf" class="input-text" value="${escapeHtml(d.pdf_url || '')}" />
						<button type="button" class="button btn-upload-media" data-target="m_naac_pdf">Upload PDF</button>
					</div>
				</div>
			`;
			openModal('Edit NAAC Document', html, 'naac', idx);
		});

		$(document).on('click', '.btn-delete-naac', function() {
			const idx = $(this).data('index');
			if (confirm('Delete this NAAC evidence document?')) {
				state.naac.splice(idx, 1);
				renderNaac();
				saveAndSyncAll(false, 'DeleteNAAC evidence deleted and synced to frontend!');
			}
		});

		// 6. ADD / EDIT IQAC RECORD
		$('#btn-add-iqac').on('click', function() {
			const html = `
				<div class="form-grid-2">
					<div class="form-group">
						<label>Record Type</label>
						<select id="m_iqac_type" class="input-text">
							<option value="AQAR Report">AQAR Report</option>
							<option value="Meeting Minutes">Meeting Minutes</option>
							<option value="Action Taken Report">Action Taken Report (ATR)</option>
							<option value="Feedback Analysis">Feedback Analysis</option>
							<option value="Best Practices">Best Practices</option>
						</select>
					</div>
					<div class="form-group">
						<label>Academic Session</label>
						<input type="text" id="m_iqac_session" class="input-text" value="2025-26" />
					</div>
				</div>
				<div class="form-group">
					<label>Title / Agenda *</label>
					<input type="text" id="m_iqac_title" class="input-text" placeholder="Title of report or meeting agenda" />
				</div>
				<div class="form-group">
					<label>Status / Action Taken</label>
					<input type="text" id="m_iqac_status" class="input-text" value="Submitted / Verified" />
				</div>
				<div class="form-group">
					<label>PDF Document URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_iqac_pdf" class="input-text" placeholder="PDF URL or choose file" />
						<button type="button" class="button btn-upload-media" data-target="m_iqac_pdf">Upload PDF</button>
					</div>
				</div>
			`;
			openModal('+ Add IQAC Record', html, 'iqac', -1);
		});

		$(document).on('click', '.btn-edit-iqac', function() {
			const idx = $(this).data('index');
			const item = state.iqac[idx];
			const html = `
				<div class="form-grid-2">
					<div class="form-group">
						<label>Record Type</label>
						<select id="m_iqac_type" class="input-text">
							<option value="AQAR Report" ${item.type === 'AQAR Report' ? 'selected' : ''}>AQAR Report</option>
							<option value="Meeting Minutes" ${item.type === 'Meeting Minutes' ? 'selected' : ''}>Meeting Minutes</option>
							<option value="Action Taken Report" ${item.type === 'Action Taken Report' ? 'selected' : ''}>Action Taken Report (ATR)</option>
							<option value="Feedback Analysis" ${item.type === 'Feedback Analysis' ? 'selected' : ''}>Feedback Analysis</option>
							<option value="Best Practices" ${item.type === 'Best Practices' ? 'selected' : ''}>Best Practices</option>
						</select>
					</div>
					<div class="form-group">
						<label>Academic Session</label>
						<input type="text" id="m_iqac_session" class="input-text" value="${escapeHtml(item.session || '')}" />
					</div>
				</div>
				<div class="form-group">
					<label>Title / Agenda *</label>
					<input type="text" id="m_iqac_title" class="input-text" value="${escapeHtml(item.title || '')}" />
				</div>
				<div class="form-group">
					<label>Status / Action Taken</label>
					<input type="text" id="m_iqac_status" class="input-text" value="${escapeHtml(item.status || '')}" />
				</div>
				<div class="form-group">
					<label>PDF Document URL</label>
					<div style="display: flex; gap: 8px;">
						<input type="text" id="m_iqac_pdf" class="input-text" value="${escapeHtml(item.pdf_url || '')}" />
						<button type="button" class="button btn-upload-media" data-target="m_iqac_pdf">Upload PDF</button>
					</div>
				</div>
			`;
			openModal('Edit IQAC Record', html, 'iqac', idx);
		});

		$(document).on('click', '.btn-delete-iqac', function() {
			const idx = $(this).data('index');
			if (confirm('Delete this IQAC record?')) {
				state.iqac.splice(idx, 1);
				renderIqac();
				saveAndSyncAll(false, 'DeleteIQAC record deleted and synced to frontend!');
			}
		});

		// SAVE MODAL CHANGES
		$('#modal-save-btn').on('click', function() {
			if (currentModalType === 'notice') {
				const title = $('#m_notice_title').val().trim();
				if (!title) { alert('Notice title is required.'); return; }

				const noticeObj = {
					id: currentEditIndex >= 0 ? state.notices[currentEditIndex].id : Date.now(),
					title: title,
					category: $('#m_notice_category').val(),
					date: $('#m_notice_date').val(),
					pdf_url: $('#m_notice_pdf').val().trim() || '#',
					is_marquee: $('#m_notice_marquee').is(':checked')
				};

				if (currentEditIndex >= 0) {
					state.notices[currentEditIndex] = noticeObj;
				} else {
					state.notices.unshift(noticeObj);
				}
				renderNotices();
			} else if (currentModalType === 'program') {
				const title = $('#m_prog_title').val().trim();
				if (!title) { alert('Program name is required.'); return; }

				const progObj = {
					id: currentEditIndex >= 0 ? state.programs[currentEditIndex].id : Date.now(),
					title: title,
					stream: $('#m_prog_stream').val(),
					duration: $('#m_prog_duration').val(),
					intake: $('#m_prog_intake').val(),
					eligibility: $('#m_prog_eligibility').val(),
					description: $('#m_prog_desc').val()
				};

				if (currentEditIndex >= 0) {
					state.programs[currentEditIndex] = progObj;
				} else {
					state.programs.push(progObj);
				}
				renderPrograms();
			} else if (currentModalType === 'faculty') {
				const name = $('#m_fac_name').val().trim();
				if (!name) { alert('Faculty name is required.'); return; }

				const facObj = {
					id: currentEditIndex >= 0 ? state.faculty[currentEditIndex].id : Date.now(),
					name: name,
					designation: $('#m_fac_desig').val(),
					department: $('#m_fac_dept').val(),
					qualification: $('#m_fac_qual').val(),
					experience: $('#m_fac_exp').val(),
					email: $('#m_fac_email').val(),
					specialization: $('#m_fac_spec').val(),
					photo_url: $('#m_fac_photo').val().trim()
				};

				if (currentEditIndex >= 0) {
					state.faculty[currentEditIndex] = facObj;
				} else {
					state.faculty.push(facObj);
				}
				renderFaculty();
			} else if (currentModalType === 'admission') {
				const stream = $('#m_adm_stream').val().trim();
				if (!stream) { alert('Stream / course name is required.'); return; }

				const admObj = {
					id: currentEditIndex >= 0 ? state.admissions[currentEditIndex].id : Date.now(),
					session: $('#m_adm_session').val(),
					stream: stream,
					list_type: $('#m_adm_list_type').val(),
					date: $('#m_adm_date').val(),
					cutoff: $('#m_adm_cutoff').val(),
					pdf_url: $('#m_adm_pdf').val().trim() || '#'
				};

				if (currentEditIndex >= 0) {
					state.admissions[currentEditIndex] = admObj;
				} else {
					state.admissions.unshift(admObj);
				}
				renderAdmissions();
			} else if (currentModalType === 'naac') {
				const title = $('#m_naac_title').val().trim();
				if (!title) { alert('Title is required.'); return; }

				const naacObj = {
					id: currentEditIndex >= 0 ? state.naac[currentEditIndex].id : Date.now(),
					criterion: parseInt($('#m_naac_criterion').val(), 10),
					metric_no: $('#m_naac_metric').val().trim(),
					title: title,
					session: $('#m_naac_session').val(),
					pdf_url: $('#m_naac_pdf').val().trim() || '#'
				};

				if (currentEditIndex >= 0) {
					state.naac[currentEditIndex] = naacObj;
				} else {
					state.naac.push(naacObj);
				}
				renderNaac();
			} else if (currentModalType === 'iqac') {
				const title = $('#m_iqac_title').val().trim();
				if (!title) { alert('Title is required.'); return; }

				const iqacObj = {
					id: currentEditIndex >= 0 ? state.iqac[currentEditIndex].id : Date.now(),
					type: $('#m_iqac_type').val(),
					title: title,
					session: $('#m_iqac_session').val(),
					status: $('#m_iqac_status').val(),
					pdf_url: $('#m_iqac_pdf').val().trim() || '#'
				};

				if (currentEditIndex >= 0) {
					state.iqac[currentEditIndex] = iqacObj;
				} else {
					state.iqac.push(iqacObj);
				}
				renderIqac();
			}

			closeModal();
			saveAndSyncAll(false, 'Changes applied and automatically synced to React frontend!');
		});

		// --- MASTER SAVE & SYNC ENGINE ---
		function saveAndSyncAll(silent = false, customMsg = null) {
			const btn = $('#btn-save-sync-all');
			if (!silent) {
				btn.prop('disabled', true).html('<span class="dashicons dashicons-update spin"></span> Syncing to React Frontend...');
			}

			// 1. Collect Settings
			const settingsData = {
				college_name: $('#set_college_name').val() || 'Gurukripa Peeth College',
				college_hindi: $('#set_college_hindi').val() || 'गुरुकृपा पीठ महाविद्यालय',
				college_subtitle: $('#set_college_subtitle').val() || '',
				tagline: $('#set_tagline').val() || '',
				affiliating_univ: $('#set_affiliating_univ').val() || '',
				aishe_code: $('#set_aishe_code').val() || '',
				naac_grade: $('#set_naac_grade').val() || '',
				phone_primary: $('#set_phone_primary').val() || '',
				phone_secondary: $('#set_phone_secondary').val() || '',
				email_info: $('#set_email_info').val() || '',
				email_principal: $('#set_email_principal').val() || '',
				address: $('#set_address').val() || '',
				marquee_announcement: $('#set_marquee_announcement').val() || ''
			};

			// 2. Collect Homepage
			const homepageData = {
				hero_heading: $('#hp_hero_heading').val() || '',
				hero_subheading: $('#hp_hero_subheading').val() || '',
				admission_badge: $('#hp_admission_badge').val() || 'Admissions Open 2026-27',
				stat_students: $('#hp_stat_students').val() || '2,400+',
				stat_faculty: $('#hp_stat_faculty').val() || '48+',
				stat_programs: $('#hp_stat_programs').val() || '12+',
				stat_pass_rate: $('#hp_stat_pass_rate').val() || '94%'
			};

			// 3. Collect Leadership cards
			const leadershipData = [];
			$('.leader-card').each(function() {
				const idx = $(this).data('index');
				const orig = state.leadership[idx] || {};
				leadershipData.push({
					id: orig.id || Date.now(),
					role_key: orig.role_key || '',
					name: $(this).find('.lead-name-input').val().trim() || orig.name || '',
					role_title: $(this).find('.lead-role-input').val(),
					qualifications: $(this).find('.lead-qual-input').val(),
					message: $(this).find('.lead-msg-input').val(),
					photo_url: orig.photo_url || ''
				});
			});
			state.leadership = leadershipData;

			// Payload
			const payload = {
				action: 'gurukapeeth_save_all_cms_data',
				nonce: window.gurukapeethAdminData ? window.gurukapeethAdminData.nonce : '',
				settings: JSON.stringify(settingsData),
				homepage: JSON.stringify(homepageData),
				notices: JSON.stringify(state.notices),
				programs: JSON.stringify(state.programs),
				faculty: JSON.stringify(state.faculty),
				admissions: JSON.stringify(state.admissions),
				naac: JSON.stringify(state.naac),
				iqac: JSON.stringify(state.iqac),
				leadership: JSON.stringify(leadershipData)
			};

			return $.ajax({
				url: window.gurukapeethAdminData ? window.gurukapeethAdminData.ajaxUrl : ajaxurl,
				type: 'POST',
				data: payload,
				success: function(resp) {
					btn.prop('disabled', false).html('<span class="dashicons dashicons-cloud-saved"></span> Save & Sync to Frontend');
					if (resp.success) {
						if (!silent) {
							showToast(customMsg || 'All changes successfully saved & synced to React frontend in real-time!');
						}
					} else {
						showToast('Error: ' + (resp.data ? resp.data.message : 'Save failed'), true);
					}
				},
				error: function() {
					btn.prop('disabled', false).html('<span class="dashicons dashicons-cloud-saved"></span> Save & Sync to Frontend');
					showToast('AJAX Server Error. Please verify connection.', true);
				}
			});
		}

		// Master button click
		$('#btn-save-sync-all').on('click', function(e) {
			e.preventDefault();
			saveAndSyncAll(false);
		});

		// Debounced Auto-Save on any direct input edit (Settings, Homepage, Leadership)
		let autoSaveDebounce = null;
		$(document).on('input change', '#tab-settings input, #tab-settings textarea, #tab-homepage input, .lead-name-input, .lead-role-input, .lead-qual-input, .lead-msg-input', function() {
			clearTimeout(autoSaveDebounce);
			autoSaveDebounce = setTimeout(function() {
				saveAndSyncAll(true);
			}, 1000);
		});

		// RESTORE DEFAULT DATA
		$('#btn-restore-defaults').on('click', function(e) {
			e.preventDefault();
			if (!confirm('Restore full sample data for Gurukripa Peeth College? This will refresh all modules.')) {
				return;
			}

			const btn = $(this);
			btn.prop('disabled', true);

			$.ajax({
				url: window.gurukapeethAdminData ? window.gurukapeethAdminData.ajaxUrl : ajaxurl,
				type: 'POST',
				data: {
					action: 'gurukapeeth_restore_sample_data',
					nonce: window.gurukapeethAdminData ? window.gurukapeethAdminData.nonce : ''
				},
				success: function(resp) {
					btn.prop('disabled', false);
					if (resp.success) {
						showToast('Default sample data restored! Reloading dashboard...');
						setTimeout(function() {
							window.location.reload();
						}, 1200);
					}
				}
			});
		});

		// 8. INQUIRY STATUS & DELETE HANDLERS
		$(document).on('change', '.inquiry-status-select', function() {
			const selectEl = $(this);
			const inqId = selectEl.data('id');
			const newStatus = selectEl.val();
			selectEl.prop('disabled', true);

			$.ajax({
				url: window.gurukapeethAdminData ? window.gurukapeethAdminData.ajaxUrl : ajaxurl,
				type: 'POST',
				data: {
					action: 'gurukapeeth_update_inquiry_status',
					nonce: window.gurukapeethAdminData ? window.gurukapeethAdminData.nonce : '',
					id: inqId,
					status: newStatus
				},
				success: function(resp) {
					selectEl.prop('disabled', false);
					if (resp.success) {
						showToast('Inquiry status updated to: ' + newStatus);
					} else {
						showToast('Failed to update status', true);
					}
				},
				error: function() {
					selectEl.prop('disabled', false);
					showToast('Server error while updating status', true);
				}
			});
		});

		$(document).on('click', '.delete-inq-btn', function() {
			const inqId = $(this).data('id');
			if (!confirm('Are you sure you want to delete this student inquiry? This cannot be undone.')) {
				return;
			}

			const rowEl = $('#inq-row-' + inqId);
			rowEl.css('opacity', '0.4');

			$.ajax({
				url: window.gurukapeethAdminData ? window.gurukapeethAdminData.ajaxUrl : ajaxurl,
				type: 'POST',
				data: {
					action: 'gurukapeeth_delete_inquiry',
					nonce: window.gurukapeethAdminData ? window.gurukapeethAdminData.nonce : '',
					id: inqId
				},
				success: function(resp) {
					if (resp.success) {
						rowEl.fadeOut(300, function() {
							$(this).remove();
						});
						showToast('DeleteInquiry deleted successfully');
					} else {
						rowEl.css('opacity', '1');
						showToast('Failed to delete inquiry', true);
					}
				},
				error: function() {
					rowEl.css('opacity', '1');
					showToast('Server error while deleting inquiry', true);
				}
			});
		});

		// Helper Functions
		function getCurrentDate() {
			const d = new Date();
			const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
			return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
		}

		function escapeHtml(text) {
			if (!text) return '';
			return $('<div>').text(text).html();
		}
	});
})(jQuery);
