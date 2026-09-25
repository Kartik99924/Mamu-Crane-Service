import { NextResponse } from 'next/server';
import { serviceSlugs } from '@/lib/services';

/**
 * Contact enquiry endpoint.
 *
 * Validation runs here rather than only in the browser, because client-side
 * checks are a convenience and not a control. No secrets appear in this file:
 * any delivery integration should read its key from process.env on the server.
 */

export const runtime = 'nodejs';

/* ------------------------------- rate limit ------------------------------- */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;

/**
 * In-memory limiter. Sufficient for a single instance; move to a shared store
 * (Redis, Upstash) if this is ever deployed across several instances.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

// Opportunistic cleanup so the map cannot grow without bound.
function sweep() {
  const now = Date.now();
  for (const [ip, entry] of hits) if (now > entry.resetAt) hits.delete(ip);
}

/* ------------------------------- validation ------------------------------- */

/** Strips control characters and clamps length before anything else touches the value. */
const sanitize = (value: unknown, max: number) =>
  typeof value === 'string'
    ? value
        .replace(/[\u0000-\u001f\u007f]/g, ' ')
        .trim()
        .slice(0, max)
    : '';

/** Accepts 10-digit Indian mobile numbers, with or without +91 / 0 prefix. */
const isValidPhone = (phone: string) => {
  const digits = phone.replace(/[\s\-()]/g, '');
  return /^(?:\+91|91|0)?[6-9]\d{9}$/.test(digits);
};

export type ContactPayload = {
  name: string;
  phone: string;
  service: string;
  location: string;
  message: string;
  /** Honeypot: must stay empty. */
  company?: string;
};

export async function POST(request: Request) {
  sweep();

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const { allowed, retryAfter } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many enquiries from this connection. Please try again shortly, or call us.' },
      { status: 429, headers: { 'Retry-After': String(retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  const raw = body as Partial<ContactPayload>;

  // Honeypot — a real visitor never fills this hidden field.
  if (sanitize(raw.company, 100)) {
    // Respond as success so bots get no signal about why it failed.
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(raw.name, 80);
  const phone = sanitize(raw.phone, 20);
  const service = sanitize(raw.service, 60);
  const location = sanitize(raw.location, 120);
  const message = sanitize(raw.message, 1500);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!isValidPhone(phone)) errors.phone = 'Please enter a valid 10-digit mobile number.';
  if (service && service !== 'other' && !serviceSlugs.includes(service)) {
    errors.service = 'Please choose a service from the list.';
  }
  if (location.length < 2) errors.location = 'Please tell us where the site is.';

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  /*
   * Delivery step. Wire up whichever channel the business prefers — email via
   * Resend/Nodemailer, a WhatsApp Business API call, or a CRM webhook — reading
   * credentials from server-side environment variables only, e.g.:
   *
   *   const key = process.env.RESEND_API_KEY;
   *
   * Until that is configured the enquiry is logged server-side so nothing is
   * silently dropped during development.
   */
  console.info('[contact] enquiry received', {
    name,
    phone,
    service: service || 'unspecified',
    location,
    messageLength: message.length,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
