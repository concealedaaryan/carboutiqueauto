import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const expectedOrigin = String(process.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
const failures = [];
const htmlFiles = fs.existsSync(dist) ? fs.readdirSync(dist, { recursive: true }).filter((file) => String(file).endsWith('index.html')) : [];

if (!expectedOrigin) failures.push('PUBLIC_SITE_URL is required when running the SEO smoke test.');
if (!htmlFiles.length) failures.push('No built HTML routes found in dist/.');

for (const file of htmlFiles) {
  const fullPath = path.join(dist, file);
  const html = fs.readFileSync(fullPath, 'utf8');
  const route = file === 'index.html' ? '/' : `/${String(file).replace(/\\/g, '/').replace(/index\.html$/, '')}`;
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || '';
  const description = html.match(/<meta name="description" content="([^"]*)"/i)?.[1] || '';
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1] || '';
  const robots = html.match(/<meta name="robots" content="([^"]+)"/i)?.[1] || '';
  const h1Count = (html.match(/<h1\b/gi) || []).length;
  if (!title) failures.push(`${route}: missing title`);
  if (!description) failures.push(`${route}: missing meta description`);
  if (!canonical || !canonical.startsWith(expectedOrigin)) failures.push(`${route}: canonical does not use ${expectedOrigin}`);
  if (!robots) failures.push(`${route}: missing robots directive`);
  if (h1Count !== 1) failures.push(`${route}: expected exactly one H1, found ${h1Count}`);
}

const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
const robots = fs.readFileSync(path.join(dist, 'robots.txt'), 'utf8');
if (!sitemap.includes(`<loc>${expectedOrigin}/</loc>`)) failures.push('sitemap.xml: missing configured origin');
if (sitemap.includes('your-domain.example')) failures.push('sitemap.xml: placeholder domain found');
if (!robots.includes(`Sitemap: ${expectedOrigin}/sitemap.xml`)) failures.push('robots.txt: missing configured sitemap URL');
if (robots.includes('your-domain.example')) failures.push('robots.txt: placeholder domain found');

const vercel = fs.readFileSync(path.join(root, 'vercel.json'), 'utf8');
for (const header of ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']) {
  if (!vercel.includes(`"key": "${header}"`)) failures.push(`vercel.json: missing ${header}`);
}
const chat = fs.readFileSync(path.join(root, 'api/chat.js'), 'utf8');
for (const hardening of ['MAX_BODY_BYTES', 'RATE_LIMIT', 'AbortController', 'Content-Type must be application/json', 'X-Robots-Tag', 'Access-Control-Allow-Origin', 'Cross-origin requests are not allowed']) {
  if (!chat.includes(hardening)) failures.push(`api/chat.js: missing ${hardening} control`);
}
if (chat.includes("Access-Control-Allow-Origin', '*'")) failures.push('api/chat.js: wildcard CORS remains');

console.log(JSON.stringify({ routes: htmlFiles.length, expectedOrigin, failures }, null, 2));
if (failures.length) process.exit(1);
