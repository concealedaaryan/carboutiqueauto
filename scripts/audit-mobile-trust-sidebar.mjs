import { chromium } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:4321';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto(`${baseURL}/?audit=mobile-trust`, { waitUntil: 'networkidle' });
await page.evaluate(() => sessionStorage.setItem('crestIntroSeen', '1'));
await page.reload({ waitUntil: 'networkidle' });
const metrics = await page.evaluate(() => {
  const trust = document.querySelector('.trust-section');
  const intro = trust?.querySelector('.section-intro');
  const copy = trust?.querySelector('.trust-copy');
  const rail = document.querySelector('.studio-rail');
  const railTrack = document.querySelector('.studio-rail-track');
  const rect = (element) => { if (!element) return null; const r = element.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }; };
  const style = (element) => element ? { display: getComputedStyle(element).display, position: getComputedStyle(element).position, color: getComputedStyle(element).color, overflowX: getComputedStyle(element).overflowX, touchAction: getComputedStyle(element).touchAction } : null;
  return { viewport: { width: innerWidth, height: innerHeight }, documentScrollWidth: document.documentElement.scrollWidth, trust: rect(trust), trustStyle: style(trust), intro: rect(intro), introStyle: style(intro), copy: rect(copy), copyStyle: style(copy), rail: rect(rail), railStyle: style(rail), railTrack: rect(railTrack), railTrackStyle: style(railTrack), horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1 };
});
const focusResult = await page.evaluate(() => { const link = document.querySelector('.studio-rail-track a'); link?.focus(); return { focused: document.activeElement === link, activeLabel: document.activeElement?.textContent?.replace(/\\s+/g, ' ').trim() }; });
console.log(JSON.stringify({ metrics, focusResult }, null, 2));
await browser.close();
