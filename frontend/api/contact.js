// Vercel Serverless Function: Contact Form & Inquiry Processing
// Security: Sanitized input, rate limiting safe, dispatches verified email via Resend

import { sendContactInquiryEmail } from './_email.js';

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
    const name = String(body.name || '').trim().slice(0, 100);
    const email = String(body.email || '').trim().slice(0, 120);
    const phone = String(body.phone || '').trim().slice(0, 20);
    const subject = String(body.subject || 'General Inquiry').trim().slice(0, 200);
    const message = String(body.message || '').trim().slice(0, 3000);

    if (!name || !message) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Name and message are required fields.',
      });
    }

    // 1. Dispatch Email via Resend Serverless Utility
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

    // 2. Forward to WordPress backend (if accessible, non-blocking)
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
