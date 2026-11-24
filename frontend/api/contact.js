// Vercel Serverless Function: Contact Form & Inquiry Processing
// Security: Origin validation, regex email/phone checks, bot honeypot trap, input sanitization

import { sendContactInquiryEmail } from './_email.js';

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

    // 1. Bot Honeypot Trap: If hidden bot fields are populated, silently drop the spam
    if (body.website || body.honeypot || body.company || body.hp_check) {
      return res.status(200).json({
        success: true,
        reference_number: 'GPC-INQ-' + new Date().getFullYear() + '-000000',
        message: 'Your inquiry has been received.',
      });
    }

    const name = String(body.name || '').trim().slice(0, 100);
    const email = String(body.email || '').trim().slice(0, 120);
    const phone = String(body.phone || '').trim().replace(/[^0-9+\s-]/g, '').slice(0, 20);
    const subject = String(body.subject || 'General Inquiry').trim().slice(0, 200);
    const message = String(body.message || '').trim().slice(0, 3000);

    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'A valid full name (minimum 2 characters) is required.',
      });
    }

    if (!message || message.length < 5) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Please provide inquiry message details (minimum 5 characters).',
      });
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Please provide a valid email address.',
      });
    }

    // Generate institutional inquiry reference tracking number
    const refNumber = 'GPC-INQ-' + new Date().getFullYear() + '-' + Math.floor(100000 + Math.random() * 900000);

    // 2. Dispatch Email via Resend Serverless Utility
    let emailResult = { success: false };
    try {
      emailResult = await sendContactInquiryEmail({
        name,
        email,
        phone,
        subject,
        message,
      });
    } catch (eErr) {
      console.warn('Resend contact dispatch warning:', eErr.message);
    }

    // 3. Forward to WordPress backend (if accessible, non-blocking)
    let wpSaved = false;
    try {
      const wpBase = process.env.VITE_WP_API_URL || 'https://backend.gurukripapeeth.in';
      const wpRes = await fetch(`${wpBase}/wp-json/gurukapeeth/v1/inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: body.type || 'General',
          name,
          email,
          phone,
          subject,
          message,
        }),
      });
      if (wpRes.ok) {
        wpSaved = true;
      }
    } catch (_wpErr) {
      // Non-blocking
    }

    return res.status(200).json({
      success: true,
      reference_number: refNumber,
      email_delivered: emailResult.success,
      wp_synced: wpSaved,
      message: 'Your inquiry has been successfully transmitted to the college administration.',
    });
  } catch (error) {
    console.error('Contact endpoint exception:', error);
    return res.status(500).json({
      success: false,
      error: 'InternalServerError',
      message: error.message || 'An unexpected error occurred while submitting inquiry.',
    });
  }
}
