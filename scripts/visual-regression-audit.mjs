import { chromium } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4330';
const routes = ['/', '/services', '/packages', '/protection', '/estimate', '/locations', '/contact', '/why-crest', '/faq'];
const widths = [1280, 1440];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true });
const results = [];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  const consoleErrors = [];
  page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(`console: ${message.text()}`); });
  for (const route of routes) {
    await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    const audit = await page.evaluate(() => {
      const rect = (selector) => { const el = document.querySelector(selector); if (!el) return null; const r = el.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) }; };
      const headings = [...document.querySelectorAll('.section-heading')].map((el) => { const heading = el.querySelector('h2'); const copy = el.querySelector('.section-heading-side') || [...el.children].find((child) => child.matches('p')); const hr = el.querySelector('.eyebrow i, .page-title-line'); const h = heading?.getBoundingClientRect(); const c = copy?.getBoundingClientRect(); return { headingTop: h ? Math.round(h.top) : null, copyTop: c ? Math.round(c.top) : null, copyLeft: c ? Math.round(c.left) : null, hasDecorativeLine: Boolean(hr), copyBelowHeading: Boolean(h && c && c.top >= h.bottom - 1) }; });
      const proof = rect('.proof-inner');
      const proofItems = [...document.querySelectorAll('.proof-item')].map((el) => { const r = el.getBoundingClientRect(); return { left: Math.round(r.left), width: Math.round(r.width), center: Math.round(r.left + r.width / 2), textAlign: getComputedStyle(el).textAlign }; });
      const body = document.body.getBoundingClientRect();
      return { bodyScrollWidth: document.documentElement.scrollWidth, viewportWidth: window.innerWidth, bodyWidth: Math.round(body.width), overflowX: document.documentElement.scrollWidth > window.innerWidth + 1, proof, proofItems, headings, ctaContact: rect('.home-cta .cta-contact'), ctaCopy: rect('.home-cta .cta-copy'), pageLabel: rect('.page-title-bar') };
    });
    results.push({ width, route, consoleErrors: [...consoleErrors], ...audit });
    consoleErrors.length = 0;
  }
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
