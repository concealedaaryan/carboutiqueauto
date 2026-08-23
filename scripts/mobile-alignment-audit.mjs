import { chromium } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:4330';
const widths = [320, 375, 390, 430];
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium', headless: true });
const results = [];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 844 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  await page.goto(`${baseURL}/`, { waitUntil: 'networkidle' });
  const audit = await page.evaluate(() => {
    const rect = (selector) => { const el = document.querySelector(selector); if (!el) return null; const r = el.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), top: Math.round(r.top), bottom: Math.round(r.bottom), width: Math.round(r.width), height: Math.round(r.height) }; };
    const proofInner = document.querySelector('.proof-inner');
    const proofRect = proofInner?.getBoundingClientRect();
    const proofItems = [...document.querySelectorAll('.proof-item')].map((el) => { const r = el.getBoundingClientRect(); return { left: Math.round(r.left), width: Math.round(r.width), top: Math.round(r.top), bottom: Math.round(r.bottom), textAlign: getComputedStyle(el).textAlign }; });
    const headings = [...document.querySelectorAll('.section-heading')].map((el) => { const heading = el.querySelector('h2'); const copy = el.querySelector('.section-heading-side') || [...el.children].find((child) => child.matches('p')); const h = heading?.getBoundingClientRect(); const c = copy?.getBoundingClientRect(); return { headingLeft: h ? Math.round(h.left) : null, headingBottom: h ? Math.round(h.bottom) : null, copyLeft: c ? Math.round(c.left) : null, copyTop: c ? Math.round(c.top) : null, copyBelowHeading: Boolean(h && c && c.top >= h.bottom - 1), alignedLeft: Boolean(h && c && Math.abs(c.left - h.left) < 3) }; });
    const cta = document.querySelector('.home-cta .cta-contact');
    const ctaStyle = cta ? getComputedStyle(cta) : null;
    return { overflowX: document.documentElement.scrollWidth > window.innerWidth + 1, scrollWidth: document.documentElement.scrollWidth, viewportWidth: window.innerWidth, proof: proofRect && { left: Math.round(proofRect.left), width: Math.round(proofRect.width), top: Math.round(proofRect.top), height: Math.round(proofRect.height), display: getComputedStyle(proofInner).display, columns: getComputedStyle(proofInner).gridTemplateColumns }, proofItems, headings, ctaContact: cta && { rect: rect('.home-cta .cta-contact'), columns: ctaStyle.gridTemplateColumns, display: ctaStyle.display, childCount: cta.children.length } };
  });
  results.push({ width, consoleErrors: errors, ...audit });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
