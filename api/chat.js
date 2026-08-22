import { CREST_SYSTEM_PROMPT } from './crest-system-prompt.js';

const MODEL = 'openai/gpt-oss-20b';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1200;
const SYSTEM_PROMPT = CREST_SYSTEM_PROMPT;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
}

function cleanMessages(input) {
  if (!Array.isArray(input)) return [];
  return input.slice(-MAX_MESSAGES).map((message) => ({
    role: message?.role === 'assistant' ? 'assistant' : 'user',
    content: String(message?.content || '').trim().slice(0, MAX_MESSAGE_LENGTH),
  })).filter((message) => message.content);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.end();
  }
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed.' });
  if (!process.env.GROQ_API_KEY) return json(res, 503, { error: 'Chatbot is not configured yet. Add GROQ_API_KEY in Vercel project settings.' });

  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { return json(res, 400, { error: 'Invalid JSON request.' }); }
  const messages = cleanMessages(body?.messages);
  if (!messages.length || messages[messages.length - 1].role !== 'user') return json(res, 400, { error: 'Please send a user message.' });

  try {
    const upstream = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages], temperature: 0.35, max_tokens: 320, top_p: 0.9 }),
    });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) return json(res, upstream.status >= 500 ? 502 : upstream.status, { error: data?.error?.message || 'The AI service could not answer right now.' });
    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) return json(res, 502, { error: 'The AI service returned an empty response.' });
    return json(res, 200, { reply, model: MODEL });
  } catch (error) {
    console.error('Groq request failed', error);
    return json(res, 502, { error: 'The AI service is temporarily unavailable. Please call Crest directly.' });
  }
}
