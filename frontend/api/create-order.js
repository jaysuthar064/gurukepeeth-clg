// Vercel Serverless Function: Create Razorpay Order
// Security: Origin validation, server-side pricing authority, zero client price tampering, input sanitization

const ALLOWED_ORIGINS = [
  'https://www.gurukripapeeth.in',
  'https://gurukripapeeth.in',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getSafeOrigin(req) {
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin) || origin.endsWith('.vercel.app')) {
    return origin;
  }
  return 'https://www.gurukripapeeth.in';
}

export default async function handler(req, res) {
  const safeOrigin = getSafeOrigin(req);
  res.setHeader('Access-Control-Allow-Origin', safeOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'MethodNotAllowed',
      message: 'Only POST requests are permitted on this endpoint.',
    });
  }

  try {
    const body = req.body || {};
    const rawRef = String(body.ref || body.application_id || body.application_ref || '').trim();
    const studentName = String(body.name || body.student_name || 'Applicant').trim().slice(0, 80);
    const studentPhone = String(body.phone || body.student_phone || '').trim().replace(/[^0-9+]/g, '').slice(0, 15);
    const program = String(body.program || '').trim();

    // Sanitize application reference
    const ref = rawRef.replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40) || ('GPC-ADM-' + Date.now());

    // 1. Authoritative server-side fee calculation (Prevents any client-side tampering)
    // B.Sc. Bio = Rs 6,000 (600,000 paise), B.A. = Rs 4,000 (400,000 paise)
    const isBsc = program.toUpperCase().includes('B.SC') || program.toUpperCase().includes('BSC');
    const feeAmountRupees = isBsc ? 6000 : 4000;
    const feeAmountPaise = feeAmountRupees * 100;

    // 2. Read server-side Razorpay environment credentials
    const keyId = (process.env.RAZORPAY_KEY_ID || '').trim();
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

    const hasKeys = keyId && keySecret && !keyId.includes('PLACEHOLDER') && !keySecret.includes('PLACEHOLDER');

    if (!hasKeys) {
      console.error('RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not configured in Vercel environment variables.');
      return res.status(500).json({
        success: false,
        error: 'PaymentGatewayNotConfigured',
        message: 'Payment gateway configuration is missing on the server. Please contact college admissions.',
      });
    }

    // 3. Create real order via Razorpay Orders API
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const orderPayload = {
      amount: feeAmountPaise,
      currency: 'INR',
      receipt: ref,
      notes: {
        application_ref: ref,
        student_name: studentName,
        student_phone: studentPhone,
        program: isBsc ? 'B.Sc. (Bachelor of Science)' : 'B.A. (Bachelor of Arts)',
        portal: 'gurukripapeeth.in',
      },
    };

    const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    const rzpData = await rzpRes.json();

    if (!rzpRes.ok) {
      console.error('Razorpay API error response:', rzpData);
      return res.status(rzpRes.status || 500).json({
        success: false,
        error: 'RazorpayOrderCreationFailed',
        message: rzpData.error?.description || 'Failed to generate order from Razorpay.',
      });
    }

    return res.status(200).json({
      success: true,
      order_id: rzpData.id,
      amount: feeAmountRupees,
      amount_paise: feeAmountPaise,
      currency: 'INR',
      key_id: keyId,
      application_ref: ref,
      program: isBsc ? 'B.Sc. (Bachelor of Science)' : 'B.A. (Bachelor of Arts)',
      is_live: keyId.startsWith('rzp_live_'),
    });
  } catch (error) {
    console.error('create-order serverless exception:', error);
    return res.status(500).json({
      success: false,
      error: 'InternalServerError',
      message: error.message || 'An unexpected error occurred while generating payment order.',
    });
  }
}
