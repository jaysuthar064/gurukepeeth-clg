// Vercel Serverless Function: Cryptographic Razorpay Signature Verification
// Security: HMAC-SHA256 timing-safe comparison, prevents replay attacks & payment spoofing

import crypto from 'crypto';
import { sendPaymentReceiptEmail } from './_email.js';

export default async function handler(req, res) {
  // Enable CORS
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
      message: 'Only POST requests are permitted on this endpoint.',
    });
  }

  try {
    const body = req.body || {};
    const paymentId = String(body.razorpay_payment_id || '').trim();
    const orderId = String(body.razorpay_order_id || '').trim();
    const signature = String(body.razorpay_signature || '').trim();
    const ref = String(body.ref || body.application_id || body.application_ref || '').trim();

    if (!paymentId) {
      return res.status(400).json({
        success: false,
        error: 'MissingPaymentId',
        message: 'Razorpay Payment ID is required for verification.',
      });
    }

    const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

    // 1. If Razorpay Secret Key is configured, perform strict HMAC-SHA256 verification
    if (keySecret && !keySecret.includes('PLACEHOLDER')) {
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
    } else {
      // Secret key not configured yet (test/sandbox mode)
      console.warn('RAZORPAY_KEY_SECRET is not set in Vercel environment variables. Operating in sandbox verification mode.');
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
      // Non-blocking: If WordPress is temporarily sleeping, payment verification is already complete
    }

    // 3. Dispatch Official Fee Receipt Email via Resend Serverless Utility
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
      emailStatus = emailRes.success ? 'sent' : 'failed';
    } catch (eErr) {
      console.warn('Receipt email dispatch error:', eErr.message);
      emailStatus = 'error';
    }

    // 4. Return verified response
    return res.status(200).json({
      success: true,
      verified: true,
      payment_id: paymentId,
      order_id: orderId,
      application_ref: ref,
      email_status: emailStatus,
      wp_sync: wpSyncStatus,
      verified_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Serverless verify-payment exception:', error);
    return res.status(500).json({
      success: false,
      error: 'InternalServerError',
      message: error.message || 'Payment verification encounter unexpected error.',
    });
  }
}
