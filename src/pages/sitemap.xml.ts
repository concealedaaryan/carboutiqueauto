import type { APIRoute } from 'astro';

const routes = [
  '/', '/services', '/packages', '/protection', '/estimate', '/locations', '/why-crest', '/faq', '/contact',
  '/terms-of-service', '/privacy-policy', '/cookie-policy', '/refund-cancellation', '/grievance-redressal', '/accessibility', '/disclaimer'
];

export const GET: APIRoute = ({ site }) => {
  const configured = import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://your-domain.example';
  const origin = configured.replace(/\/$/, '');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `\n  <url><loc>${origin}${route || '/'}</loc></url>`).join('')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
