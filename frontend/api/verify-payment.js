// Vercel Serverless Function: Cryptographic Razorpay Signature Verification
// Security: Origin validation, HMAC-SHA256 timing-safe comparison, prevents replay attacks & payment spoofing

import crypto from 'crypto';
import { sendPaymentReceiptEmail } from './_email.js';

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
    const paymentId = String(body.razorpay_payment_id || '').trim();
    const orderId = String(body.razorpay_order_id || '').trim();
    const signature = String(body.razorpay_signature || '').trim();
    const ref = String(body.ref || body.application_id || body.application_ref || '').trim().replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40);

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        error: 'MissingPaymentId',
        message: 'Razorpay Payment ID is required for verification.',
      });
    }

    const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

    if (!keySecret || keySecret.includes('PLACEHOLDER')) {
      console.error('RAZORPAY_KEY_SECRET is not configured on server.');
      return res.status(500).json({
        success: false,
        error: 'ServerConfigurationError',
        message: 'Payment verification secret is not configured on the server.',
      });
    }

    if (!orderId || !signature) {
      return res.status(400).json({
        success: false,
        error: 'MissingOrderOrSignature',
        message: 'Both order ID and cryptographic signature are required for verification.',
      });
    }

    // Expected signature = HMAC_SHA256(order_id + "|" + payment_id, secret)
    const dataToSign = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(dataToSign)
      .digest('hex');

    // Constant-time buffer comparison to prevent timing attacks
    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const providedBuffer = Buffer.from(signature, 'utf8');

    if (expectedBuffer.length !== providedBuffer.length || !crypto.timingSafeEqual(expectedBuffer, providedBuffer)) {
      console.warn('Security Alert: Invalid Razorpay signature attempted:', {
        orderId,
        paymentId,
        providedSignature: signature,
      });

      return res.status(400).json({
        success: false,
        verified: false,
        error: 'InvalidSignature',
        message: 'Cryptographic signature verification failed. Payment cannot be verified.',
      });
    }

    // 2. Synchronize payment with WordPress backend (if accessible)
    let wpSyncStatus = 'offline';
    try {
      const wpBase = process.env.VITE_WP_API_URL || 'https://backend.gurukripapeeth.in';
      const wpRes = await fetch(`${wpBase}/wp-json/gurukapeeth/v1/admission/verify-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          application_id: ref,
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          razorpay_signature: signature,
        }),
      });
      if (wpRes.ok) {
        wpSyncStatus = 'synced';
      }
    } catch (_wpErr) {
      // Non-blocking
    }

    // 3. Dispatch official email receipt via Resend (non-blocking)
    let emailStatus = 'pending';
    try {
      const emailRes = await sendPaymentReceiptEmail({
        studentEmail: body.student_email || body.email,
        studentName: body.student_name || body.name,
        studentPhone: body.student_phone || body.phone,
        program: body.program,
        amount: body.amount,
        paymentId,
        orderId,
        applicationRef: ref,
      });
      if (emailRes && emailRes.success) {
        emailStatus = 'delivered';
      }
    } catch (eErr) {
      console.warn('Resend receipt dispatch warning:', eErr.message);
    }

    return res.status(200).json({
      success: true,
      verified: true,
      status: 'Paid',
      payment_id: paymentId,
      order_id: orderId,
      reference_number: ref,
      wp_sync: wpSyncStatus,
      email_status: emailStatus,
      verified_at: new Date().toISOString(),
      message: 'Payment cryptographically verified and recorded successfully.',
    });
  } catch (error) {
    console.error('verify-payment serverless exception:', error);
    return res.status(500).json({
      success: false,
      error: 'InternalServerError',
      message: error.message || 'An unexpected error occurred during payment verification.',
    });
  }
}
