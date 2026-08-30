import type { APIRoute } from 'astro';

const routes = [
  '/', '/services', '/packages', '/protection', '/rodim', '/estimate', '/locations', '/why-crest', '/faq', '/contact'
];

export const GET: APIRoute = ({ site }) => {
  const configured = import.meta.env.PUBLIC_SITE_URL || site?.toString() || '';
  const origin = configured.replace(/\/$/, '');
  if (!origin) return new Response('Sitemap unavailable until PUBLIC_SITE_URL is configured.\n', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' } });
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `\n  <url><loc>${origin}${route || '/'}</loc></url>`).join('')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
