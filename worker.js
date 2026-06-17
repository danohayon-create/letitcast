/**
 * Let it Cast — Waitlist proxy (Cloudflare Worker)
 *
 * Receives { "email": "..." } from the landing page and forwards it to
 * Airtable. The Airtable token never reaches the browser: it lives only in
 * this Worker's environment variables (set in the Cloudflare dashboard).
 *
 * Required environment variables (Dashboard → Worker → Settings → Variables):
 *   AIRTABLE_TOKEN  (secret)  the pat... personal access token
 *   AIRTABLE_BASE             apppBsU6uHmT3lMg3
 *   AIRTABLE_TABLE            tblrq5tisXa6dnnth
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }
    if (request.method !== 'POST') {
      return json({ error: 'method not allowed' }, 405);
    }

    let email = '';
    try {
      const body = await request.json();
      email = (body.email || '').trim();
    } catch {
      return json({ error: 'bad request' }, 400);
    }

    // Basic email sanity check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: 'invalid email' }, 400);
    }

    const res = await fetch(
      `https://api.airtable.com/v0/${env.AIRTABLE_BASE}/${env.AIRTABLE_TABLE}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.AIRTABLE_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records: [{ fields: { Email: email } }] }),
      }
    );

    if (!res.ok) {
      return json({ error: 'upstream error' }, 502);
    }
    return json({ ok: true });
  },
};
