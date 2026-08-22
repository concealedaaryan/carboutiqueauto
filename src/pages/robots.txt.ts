import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const configured = import.meta.env.PUBLIC_SITE_URL || site?.toString() || 'https://your-domain.example';
  const origin = configured.replace(/\/$/, '');
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
