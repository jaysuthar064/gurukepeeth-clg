// Serverless Email Delivery Utility via Resend API
// Domain: gurukripapeeth.in (Verified)
// Security: Full HTML entity sanitization prevents HTML/script injection in email templates

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendEmail({ to, subject, html, replyTo, text }) {
  const apiKey = (process.env.RESEND_API_KEY || '').trim();
  const from = (process.env.RESEND_FROM_EMAIL || 'Gurukripa Peeth College <admissions@gurukripapeeth.in>').trim();

  if (!apiKey) {
    console.warn('RESEND_API_KEY is missing. Email dispatch skipped.');
    return { success: false, error: 'Resend API key missing' };
  }

  const payload = {
    from,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
  };

  if (replyTo) {
    payload.reply_to = replyTo;
  }
  if (text) {
    payload.text = text;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'ResendNode/2.0.0',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Resend API delivery error:', data);
      return { success: false, error: data.message || 'Email delivery failed', data };
    }

    return { success: true, id: data.id };
  } catch (err) {
    console.error('Resend fetch exception:', err);
    return { success: false, error: err.message };
  }
}

export async function sendPaymentReceiptEmail({
  studentEmail,
  studentName,
  studentPhone,
  program,
  amount,
  paymentId,
  orderId,
  applicationRef,
}) {
  const formattedAmount = Number(amount || 0).toLocaleString('en-IN');
  const safeName = escapeHtml(studentName || 'Applicant');
  const safeRef = escapeHtml(applicationRef || 'GSS-2026-ONLINE');
  const safeProgram = escapeHtml(program || 'Undergraduate Degree Program');
  const safePaymentId = escapeHtml(paymentId || 'N/A');
  const safeOrderId = escapeHtml(orderId || '');
  const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Official Admission Fee Receipt</title>
</head>
<body style="margin:0;padding:24px 12px;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 8px 24px rgba(15,23,42,0.06);">
    
    <!-- Header -->
    <div style="background:#7c2d12;padding:28px 24px;text-align:center;color:#ffffff;border-bottom:3px solid #f59e0b;">
      <div style="font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:#fde68a;margin-bottom:6px;">
        Govind Guru Tribal University (GGTU) Affiliated • AISHE: C-48902
      </div>
      <h1 style="margin:0;font-size:20px;font-weight:800;letter-spacing:0.5px;color:#ffffff;line-height:1.3;">
        GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH
      </h1>
      <p style="margin:6px 0 0 0;font-size:13px;color:#fed7aa;">
        Peeth, Tehsil Simalwara, Dungarpur, Rajasthan - 314406
      </p>
    </div>

    <!-- Status Banner -->
    <div style="padding:20px 24px;background:#ecfdf5;border-bottom:1px solid #d1fae5;text-align:center;">
      <span style="display:inline-block;background:#059669;color:#ffffff;font-size:11px;font-weight:800;padding:4px 14px;border-radius:20px;letter-spacing:0.04em;text-transform:uppercase;">
        STATUS: ADMISSION FEE PAID ✓
      </span>
      <h2 style="margin:10px 0 2px 0;font-size:18px;color:#065f46;font-weight:700;">
        Official Admission Fee Receipt &amp; Confirmation
      </h2>
      <p style="margin:0;font-size:13px;color:#047857;">
        Academic Session 2026-27 • Enrolment Verification
      </p>
    </div>

    <!-- Receipt Details Table -->
    <div style="padding:28px 24px;">
      <p style="margin:0 0 16px 0;font-size:14px;line-height:1.6;color:#334155;">
        Dear <strong>${safeName}</strong>,
      </p>
      <p style="margin:0 0 20px 0;font-size:14px;line-height:1.6;color:#475569;">
        Thank you for completing your online admission registration and fee payment. Your payment has been securely verified and your application has been recorded in the central college registry.
      </p>

      <table style="width:100%;border-collapse:collapse;margin:0 0 24px 0;font-size:13px;">
        <tbody>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Candidate Name:</td>
            <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${safeName}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Application Ref Number:</td>
            <td style="padding:10px 0;text-align:right;font-weight:800;color:#c2410c;font-family:monospace;font-size:14px;">${safeRef}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Selected Program:</td>
            <td style="padding:10px 0;text-align:right;font-weight:700;color:#0f172a;">${safeProgram}</td>
          </tr>
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Razorpay Payment ID:</td>
            <td style="padding:10px 0;text-align:right;font-family:monospace;color:#c2410c;font-weight:700;">${safePaymentId}</td>
          </tr>
          ${safeOrderId ? `
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Razorpay Order ID:</td>
            <td style="padding:10px 0;text-align:right;font-family:monospace;color:#64748b;">${safeOrderId}</td>
          </tr>` : ''}
          <tr style="border-bottom:1px solid #f1f5f9;">
            <td style="padding:10px 0;color:#64748b;">Transaction Date:</td>
            <td style="padding:10px 0;text-align:right;color:#334155;">${dateStr}</td>
          </tr>
          <tr style="border-bottom:2px solid #7c2d12;background:#fff7ed;">
            <td style="padding:12px 8px;font-weight:800;font-size:14px;color:#9a3412;">Total Amount Paid:</td>
            <td style="padding:12px 8px;text-align:right;font-weight:800;font-size:17px;color:#059669;">₹ ${formattedAmount}.00</td>
          </tr>
        </tbody>
      </table>

      <!-- Next Steps Guidance -->
      <div style="background:#fff7ed;border-left:4px solid #ea580c;padding:16px 18px;border-radius:6px;margin-bottom:24px;">
        <h4 style="margin:0 0 8px 0;font-size:14px;color:#9a3412;">Next Steps for Verification:</h4>
        <ol style="margin:0;padding-left:18px;font-size:13px;color:#475569;line-height:1.6;">
          <li>Save this email and note your <strong>Application Reference Number (${safeRef})</strong>.</li>
          <li>Visit the college office in Peeth on any working day (10:00 AM – 03:00 PM) with original 10th &amp; 12th marksheets, Aadhaar card, and 4 passport photos.</li>
          <li>Physical document verification will be completed in 10 minutes and your official college student ID card will be issued.</li>
        </ol>
      </div>

      <!-- Campus Helpline -->
      <div style="font-size:12px;color:#64748b;line-height:1.6;border-top:1px solid #e2e8f0;padding-top:16px;">
        <strong>Campus Administrative Helplines:</strong><br>
        • IT &amp; Admission Desk: <a href="tel:+918209277580" style="color:#c2410c;text-decoration:none;font-weight:600;">+91 82092 77580</a> (Mr. Ramesh Chandra Pargi)<br>
        • Secretary: <a href="tel:+919587433001" style="color:#c2410c;text-decoration:none;font-weight:600;">+91 95874 33001</a> (Mr. Vipin Kumar Labana)<br>
        • Email: <a href="mailto:gurukripa.peeth@gmail.com" style="color:#c2410c;text-decoration:none;">gurukripa.peeth@gmail.com</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f8fafc;padding:16px 24px;text-align:center;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;">
      © 2026 Gurukripa Shikshan Sansthan College Peeth. All Rights Reserved.<br>
      This is an automated institutional transaction receipt generated via Razorpay secure gateway.
    </div>
  </div>
</body>
</html>
`;

  const collegeAdminEmail = (process.env.COLLEGE_ADMIN_EMAIL || 'gurukripa.peeth@gmail.com').trim();
  const recipients = [];
  if (studentEmail && studentEmail.includes('@') && !studentEmail.includes('example.com') && !studentEmail.includes('admission.ac.in')) {
    recipients.push(studentEmail);
  }
  if (!recipients.includes(collegeAdminEmail)) {
    recipients.push(collegeAdminEmail);
  }

  return await sendEmail({
    to: recipients,
    subject: `Official Admission Fee Receipt (${safeRef}) — Gurukripa Shikshan Sansthan College`,
    html,
  });
}

export async function sendContactInquiryEmail({ name, email, phone, subject, message }) {
  const safeName = escapeHtml(name || 'Visitor');
  const safePhone = escapeHtml(phone || 'Not Provided');
  const safeEmail = escapeHtml(email || 'Not Provided');
  const safeSubject = escapeHtml(subject || 'General Institutional Query');
  const safeMessage = escapeHtml(message || '').replace(/\n/g, '<br>');
  const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const collegeAdminEmail = (process.env.COLLEGE_ADMIN_EMAIL || 'gurukripa.peeth@gmail.com').trim();

  // 1. Email notification dispatched to College Administration
  const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Website Inquiry</title>
</head>
<body style="margin:0;padding:24px 12px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.05);">
    <div style="background:#7c2d12;padding:20px;color:#fff;">
      <h2 style="margin:0;font-size:18px;">New Portal Contact Inquiry</h2>
      <p style="margin:4px 0 0 0;font-size:12px;color:#fde68a;">Received on: ${dateStr}</p>
    </div>
    <div style="padding:24px;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
        <tbody>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;width:120px;">Sender Name:</td><td style="padding:8px 0;font-weight:700;">${safeName}</td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;">Email Address:</td><td style="padding:8px 0;font-weight:600;"><a href="mailto:${safeEmail}" style="color:#c2410c;">${safeEmail}</a></td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;">Contact Phone:</td><td style="padding:8px 0;font-weight:600;"><a href="tel:${safePhone}" style="color:#c2410c;">${safePhone}</a></td></tr>
          <tr style="border-bottom:1px solid #f1f5f9;"><td style="padding:8px 0;color:#64748b;">Subject / Topic:</td><td style="padding:8px 0;font-weight:600;">${safeSubject}</td></tr>
        </tbody>
      </table>
      <div style="background:#f8fafc;border-left:4px solid #ea580c;padding:14px;border-radius:4px;">
        <strong style="font-size:12px;color:#9a3412;display:block;margin-bottom:6px;">Message Content:</strong>
        <p style="margin:0;font-size:13px;line-height:1.6;color:#334155;">${safeMessage}</p>
      </div>
    </div>
    <div style="background:#f8fafc;padding:12px 24px;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;text-align:center;">
      Transmitted via Gurukripa Shikshan Sansthan College Peeth Portal
    </div>
  </div>
</body>
</html>
`;

  await sendEmail({
    to: [collegeAdminEmail],
    replyTo: email && email.includes('@') ? email : undefined,
    subject: `[Web Inquiry] ${safeSubject} — from ${safeName}`,
    html: adminHtml,
  });

  // 2. Automated acknowledgment dispatched to the inquirer
  if (email && email.includes('@') && !email.includes('example.com')) {
    const studentAckHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inquiry Received</title>
</head>
<body style="margin:0;padding:24px 12px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#0f172a;">
  <div style="max-width:580px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.05);">
    <div style="background:#7c2d12;padding:20px;color:#fff;text-align:center;">
      <h2 style="margin:0;font-size:18px;">Gurukripa Shikshan Sansthan College Peeth</h2>
      <p style="margin:4px 0 0 0;font-size:12px;color:#fde68a;">Inquiry Acknowledgment • Academic Helpdesk</p>
    </div>
    <div style="padding:24px;">
      <p style="margin:0 0 14px 0;font-size:14px;color:#334155;">Dear <strong>${safeName}</strong>,</p>
      <p style="margin:0 0 16px 0;font-size:13px;line-height:1.6;color:#475569;">
        Thank you for contacting Gurukripa Shikshan Sansthan College Peeth. We have received your inquiry regarding "<strong>${safeSubject}</strong>".
      </p>
      <p style="margin:0 0 16px 0;font-size:13px;line-height:1.6;color:#475569;">
        Our academic administration desk will review your message and contact you within 1 working day. If your inquiry is urgent regarding admissions, please feel free to call our admissions desk directly:
      </p>
      <div style="background:#fff7ed;padding:12px 16px;border-radius:8px;border:1px solid #fed7aa;font-size:13px;color:#9a3412;">
        <strong>Direct Admission Helplines:</strong><br>
        • IT &amp; Admission Desk: +91 82092 77580 (Mr. Ramesh Chandra Pargi)<br>
        • Secretary: +91 95874 33001 (Mr. Vipin Kumar Labana)
      </div>
    </div>
    <div style="background:#f8fafc;padding:14px;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;text-align:center;">
      © 2026 Gurukripa Shikshan Sansthan College Peeth, Dungarpur (Rajasthan)
    </div>
  </div>
</body>
</html>
`;
    await sendEmail({
      to: [email],
      subject: `Inquiry Received: ${safeSubject} — Gurukripa Shikshan Sansthan College Peeth`,
      html: studentAckHtml,
    });
  }

  return { success: true };
}
