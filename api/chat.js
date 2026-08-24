import { CREST_SYSTEM_PROMPT } from './crest-system-prompt.js';

const MODEL = 'openai/gpt-oss-20b';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;
const MAX_BODY_BYTES = 24_000;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 20;
const UPSTREAM_TIMEOUT_MS = 15_000;
const SYSTEM_PROMPT = CREST_SYSTEM_PROMPT;
const rateBuckets = new Map();

function commonHeaders(res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Referrer-Policy', 'no-referrer');
}

function json(res, status, body, headers = {}) {
  commonHeaders(res);
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value));
  res.statusCode = status;
  res.end(JSON.stringify(body));
}

function requestOrigin(req) {
  const origin = String(req.headers.origin || '').trim();
  return origin || null;
}

function allowedOrigin(req) {
  const origin = requestOrigin(req);
  if (!origin) return null;
  const configured = String(process.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
  const host = String(req.headers.host || '').trim();
  const sameHost = host && (origin === `https://${host}` || origin === `http://${host}`);
  if (sameHost || (configured && origin === configured)) return origin;
  return false;
}

function clientKey(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
  return forwarded || String(req.socket?.remoteAddress || 'unknown');
}

function allowRequest(req) {
  const now = Date.now();
  for (const [key, bucket] of rateBuckets) {
    if (bucket.resetAt <= now) rateBuckets.delete(key);
  }
  const key = clientKey(req);
  const bucket = rateBuckets.get(key) || { count: 0, resetAt: now + RATE_WINDOW_MS };
  if (bucket.resetAt <= now) { bucket.count = 0; bucket.resetAt = now + RATE_WINDOW_MS; }
  bucket.count += 1;
  rateBuckets.set(key, bucket);
  return { allowed: bucket.count <= RATE_LIMIT, retryAfter: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
}

function cleanMessages(input) {
  if (!Array.isArray(input)) return [];
  return input.slice(-MAX_MESSAGES).map((message) => ({
    role: message?.role === 'assistant' ? 'assistant' : 'user',
    content: String(message?.content || '').trim().slice(0, MAX_MESSAGE_LENGTH),
  })).filter((message) => message.content);
}

function cleanReply(input) {
  return String(input || '')
    .replace(/<br\s*\/?>(?=\s*)/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr|table|blockquote)>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s*/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '• ')
    .replace(/^\s*>\s?/gm, '')
    .replace(/```[a-zA-Z0-9_-]*\n?/g, '')
    .replace(/```/g, '')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, 4000);
}

export default async function handler(req, res) {
  const origin = allowedOrigin(req);
  if (origin === false) return json(res, 403, { error: 'Cross-origin requests are not allowed.' });
  const cors = origin ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {};

  if (req.method === 'OPTIONS') {
    commonHeaders(res);
    Object.entries(cors).forEach(([key, value]) => res.setHeader(key, value));
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.statusCode = 204;
    return res.end();
  }
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' }, { Allow: 'POST, OPTIONS', ...cors });
  if (!process.env.GROQ_API_KEY) return json(res, 503, { error: 'Chatbot is not configured yet.' }, cors);
  if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) return json(res, 415, { error: 'Content-Type must be application/json.' }, cors);
  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > MAX_BODY_BYTES) return json(res, 413, { error: 'Request is too large.' }, cors);

  const rate = allowRequest(req);
  if (!rate.allowed) return json(res, 429, { error: 'Too many requests. Please wait before trying again.' }, { 'Retry-After': String(rate.retryAfter), ...cors });

  let body;
  try {
    if (typeof req.body === 'string') {
      if (Buffer.byteLength(req.body, 'utf8') > MAX_BODY_BYTES) return json(res, 413, { error: 'Request is too large.' }, cors);
      body = JSON.parse(req.body);
    } else {
      body = req.body;
    }
  } catch {
    return json(res, 400, { error: 'Invalid JSON request.' }, cors);
  }
  const messages = cleanMessages(body?.messages);
  if (!messages.length || messages[messages.length - 1].role !== 'user') return json(res, 400, { error: 'Please send a user message.' }, cors);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages], temperature: 0.35, max_tokens: 320, top_p: 0.9 }),
      signal: controller.signal,
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      console.error('Chat upstream error', { status: upstream.status, type: data?.error?.type || 'unknown' });
      return json(res, upstream.status === 429 ? 503 : 502, { error: 'The AI service is temporarily unavailable.' }, cors);
    }
    const reply = cleanReply(data?.choices?.[0]?.message?.content);
    if (!reply) return json(res, 502, { error: 'The AI service returned an empty response.' }, cors);
    return json(res, 200, { reply }, cors);
  } catch (error) {
    console.error('Chat upstream request failed', { name: error?.name || 'Error' });
    return json(res, 502, { error: 'The AI service is temporarily unavailable. Please call Crest directly.' }, cors);
  } finally {
    clearTimeout(timeout);
  }
}
