import { chromium } from '@playwright/test';
const baseURL = process.env.BASE_URL || 'http://localhost:4321';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${baseURL}/?audit=hidden-focusables`, { waitUntil: 'networkidle' });
const findings = await page.evaluate(() => [...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"])')].filter((element) => {
  const rect = element.getBoundingClientRect(); const style = getComputedStyle(element);
  return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
}).map((element) => {
  let current = element.parentElement; const ancestors = [];
  while (current) { if (current.hasAttribute('aria-hidden') || current.hasAttribute('inert')) ancestors.push({ tag: current.tagName.toLowerCase(), id: current.id, className: current.className, ariaHidden: current.getAttribute('aria-hidden'), inert: current.hasAttribute('inert') }); current = current.parentElement; }
  return ancestors.length ? { tag: element.tagName.toLowerCase(), text: element.textContent?.replace(/\\s+/g, ' ').trim().slice(0, 80), ancestors } : null;
}).filter(Boolean));
console.log(JSON.stringify(findings.slice(0, 40), null, 2));
await browser.close();
