// ☕ Coffee-meeting booking API
// Stores bookings in Upstash Redis (REST) so a booked slot is blocked for everyone.
// Env: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
// (Vercel → Storage → Upstash for Redis also provides KV_REST_API_URL / KV_REST_API_TOKEN.)

const crypto = require('crypto');
const express = require('express');

const router = express.Router();

// ---------------------------------------------------------------------------
// Availability rules (Sri Lanka time, UTC+05:30, no DST) — keep in sync with
// src/data/coffeeSpots.ts on the frontend.
// ---------------------------------------------------------------------------
const OFFSET_MIN = 330;
const STEP_MIN = 30;
const MIN_NOTICE_MIN = 60;
const WINDOW_DAYS = 30;
const DURATIONS = [30, 60, 90];
const WEEKDAY = { start: 17 * 60 + 30, end: 22 * 60 };
const WEEKEND = { start: 10 * 60, end: 16 * 60 };

const pad = (n) => String(n).padStart(2, '0');
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const colomboNow = () => {
  const d = new Date(Date.now() + OFFSET_MIN * 60000);
  return {
    key: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`,
    dayMs: Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
    minutes: d.getUTCHours() * 60 + d.getUTCMinutes(),
  };
};

const parseDate = (key) => {
  if (!DATE_RE.test(key)) return null;
  const [y, m, d] = key.split('-').map(Number);
  const ms = Date.UTC(y, m - 1, d);
  const date = new Date(ms);
  if (date.getUTCDate() !== d) return null;
  const weekday = date.getUTCDay();
  return { key, ms, isWeekend: weekday === 0 || weekday === 6 };
};

const addDays = (key, n) => {
  const { ms } = parseDate(key);
  const d = new Date(ms + n * 86400000);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
};

/** Returns an error string, or null when the slot respects the rules. */
const validateSlot = (dateKey, start, duration) => {
  const day = parseDate(dateKey);
  if (!day) return 'Invalid date.';
  if (!Number.isInteger(start) || start % STEP_MIN !== 0) return 'Invalid start time.';
  if (!DURATIONS.includes(duration)) return 'Invalid duration.';

  const now = colomboNow();
  const diffDays = Math.round((day.ms - now.dayMs) / 86400000);
  if (diffDays < 0 || diffDays >= WINDOW_DAYS) return 'Date is outside the booking window.';
  if (diffDays === 0 && start < now.minutes + MIN_NOTICE_MIN) return 'That time has already passed.';

  const win = day.isWeekend ? WEEKEND : WEEKDAY;
  if (start < win.start || start + duration > win.end) return 'Outside available hours.';
  return null;
};

// ---------------------------------------------------------------------------
// Storage: Upstash Redis REST, with an in-memory fallback for local dev only.
// ---------------------------------------------------------------------------
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const hasRedis = Boolean(REDIS_URL && REDIS_TOKEN);
const allowMemory = !process.env.VERCEL; // serverless instances don't share memory

const memory = new Map();

/** Run a batch of Redis commands, returning their results in order. */
async function redis(commands) {
  if (hasRedis) {
    const res = await fetch(`${REDIS_URL}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(commands),
    });
    if (!res.ok) throw new Error(`Redis HTTP ${res.status}`);
    const out = await res.json();
    return out.map((r) => {
      if (r.error) throw new Error(r.error);
      return r.result;
    });
  }

  // Minimal in-memory implementation of the commands used below.
  return commands.map(([cmd, key, ...args]) => {
    switch (cmd) {
      case 'SET': {
        if (args.includes('NX') && memory.has(key)) return null;
        memory.set(key, args[0]);
        return 'OK';
      }
      case 'GET':
        return memory.has(key) ? memory.get(key) : null;
      case 'DEL':
        return memory.delete(key) ? 1 : 0;
      case 'HSET': {
        const h = memory.get(key) || new Map();
        h.set(args[0], args[1]);
        memory.set(key, h);
        return 1;
      }
      case 'HDEL': {
        const h = memory.get(key);
        return h && h.delete(args[0]) ? 1 : 0;
      }
      case 'HVALS': {
        const h = memory.get(key);
        return h ? [...h.values()] : [];
      }
      case 'EXPIREAT':
        return 1;
      default:
        throw new Error(`Unsupported command ${cmd}`);
    }
  });
}

const storageReady = (res) => {
  if (hasRedis || allowMemory) return true;
  res.status(503).json({ error: 'Booking storage is not configured.' });
  return false;
};

const dayKey = (date) => `coffee:day:${date}`;
const slotKey = (date, minute) => `coffee:slot:${date}:${minute}`;
const bookingKey = (id) => `coffee:booking:${id}`;
/** Keep data until 2 days after the meeting. */
const expiry = (date) => Math.floor(parseDate(date).ms / 1000) + 2 * 86400;

const blocksFor = (start, duration) => {
  const blocks = [];
  for (let t = start; t < start + duration; t += STEP_MIN) blocks.push(t);
  return blocks;
};

const clean = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

/** Public: busy intervals only (no personal data). */
router.get('/bookings', async (req, res) => {
  if (!storageReady(res)) return;
  try {
    const today = colomboNow().key;
    const dates = Array.from({ length: WINDOW_DAYS }, (_, i) => addDays(today, i));
    const results = await redis(dates.map((d) => ['HVALS', dayKey(d)]));
    const busy = [];
    results.forEach((vals, i) => {
      (vals || []).forEach((raw) => {
        try {
          const b = JSON.parse(raw);
          busy.push({ date: dates[i], start: b.start, end: b.start + b.duration });
        } catch {
          /* skip malformed */
        }
      });
    });
    res.set('Cache-Control', 'no-store');
    res.json({ busy });
  } catch (err) {
    console.error('Coffee bookings fetch failed:', err.message);
    res.status(500).json({ error: 'Could not load bookings.' });
  }
});

/** Public: reserve a slot. Returns 409 if any part of it is already taken. */
router.post('/book', async (req, res) => {
  if (!storageReady(res)) return;

  const date = clean(req.body.date, 10);
  const start = Number(req.body.start);
  const duration = Number(req.body.duration);
  const name = clean(req.body.name, 120);
  const email = clean(req.body.email, 200);

  const invalid = validateSlot(date, start, duration);
  if (invalid) return res.status(400).json({ error: invalid });
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Name and a valid email are required.' });
  }

  const id = crypto.randomBytes(9).toString('base64url');
  const cancelKey = crypto.randomBytes(12).toString('base64url');
  const exp = expiry(date);
  const blocks = blocksFor(start, duration);

  try {
    // Atomically claim each 30-minute block; roll back if any is already taken.
    const claims = await redis(
      blocks.map((m) => ['SET', slotKey(date, m), id, 'NX', 'EXAT', String(exp)])
    );
    const taken = claims.some((r) => r !== 'OK');
    if (taken) {
      const mine = blocks.filter((_, i) => claims[i] === 'OK');
      if (mine.length) await redis(mine.map((m) => ['DEL', slotKey(date, m)]));
      return res.status(409).json({ error: 'Sorry — that time was just booked. Please pick another slot.' });
    }

    const booking = {
      id,
      cancelKey,
      date,
      start,
      duration,
      name,
      email,
      phone: clean(req.body.phone, 40),
      topic: clean(req.body.topic, 200),
      message: clean(req.body.message, 2000),
      spotId: clean(req.body.spotId, 80),
      location: clean(req.body.location, 200),
      createdAt: new Date().toISOString(),
    };
    const publicSlot = JSON.stringify({ id, start, duration });

    await redis([
      ['HSET', dayKey(date), id, publicSlot],
      ['EXPIREAT', dayKey(date), String(exp)],
      ['SET', bookingKey(id), JSON.stringify(booking), 'EXAT', String(exp)],
    ]);

    const base = `${req.protocol}://${req.get('host')}`;
    res.status(201).json({
      id,
      cancelUrl: `${base}/api/coffee/cancel?id=${id}&key=${cancelKey}`,
    });
  } catch (err) {
    console.error('Coffee booking failed:', err.message);
    res.status(500).json({ error: 'Could not save the booking.' });
  }
});

/** Cancel link (sent to Rusira and shown to the guest) — frees the slot. */
router.get('/cancel', async (req, res) => {
  if (!storageReady(res)) return;
  const id = clean(req.query.id, 40);
  const key = clean(req.query.key, 40);
  const page = (title, body) =>
    res.send(
      `<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>` +
        `<body style="font-family:system-ui;background:#07070b;color:#e4e4e7;display:grid;place-items:center;min-height:100vh;margin:0">` +
        `<div style="text-align:center;padding:24px"><div style="font-size:48px">☕</div><h1>${title}</h1><p style="color:#a1a1aa">${body}</p>` +
        `<a style="color:#fbbf24" href="https://rusirasandul.online/coffeewithme">Book another time</a></div></body>`
    );

  try {
    const [raw] = await redis([['GET', bookingKey(id)]]);
    if (!raw) return page('Booking not found', 'It may have already been cancelled or has expired.');
    const booking = JSON.parse(raw);
    if (!key || key !== booking.cancelKey) return page('Invalid link', 'This cancellation link is not valid.');

    await redis([
      ...blocksFor(booking.start, booking.duration).map((m) => ['DEL', slotKey(booking.date, m)]),
      ['HDEL', dayKey(booking.date), id],
      ['DEL', bookingKey(id)],
    ]);
    page('Booking cancelled', `The slot on ${booking.date} is free again.`);
  } catch (err) {
    console.error('Coffee cancel failed:', err.message);
    res.status(500).send('Something went wrong.');
  }
});

module.exports = router;

