// Vercel Serverless Function: Gateway Health & Diagnostics
// Security: Safe diagnostic status, never exposes raw credentials

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const keyId = (process.env.RAZORPAY_KEY_ID || '').trim();
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();

  return res.status(200).json({
    status: 'healthy',
    serverless: true,
    node_version: process.version,
    gateway: {
      provider: 'Razorpay',
      key_id_configured: Boolean(keyId),
      is_live_mode: keyId.startsWith('rzp_live_'),
      key_secret_configured: Boolean(keySecret),
    },
    institution: 'GURUKRIPA SHIKSHAN SANSTHAN COLLEGE PEETH',
    timestamp: new Date().toISOString(),
  });
}
