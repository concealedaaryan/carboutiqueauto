import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const configured = import.meta.env.PUBLIC_SITE_URL || site?.toString() || '';
  const origin = configured.replace(/\/$/, '');
  const sitemapLine = origin ? `\nSitemap: ${origin}/sitemap.xml` : '';
  const body = `User-agent: *\nAllow: /${sitemapLine}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
