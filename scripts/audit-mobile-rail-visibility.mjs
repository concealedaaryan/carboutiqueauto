import { chromium } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:4321';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto(`${baseURL}/?audit=mobile-rail-visibility`, { waitUntil: 'networkidle' });
await page.evaluate(() => sessionStorage.setItem('crestIntroSeen', '1'));
await page.reload({ waitUntil: 'networkidle' });
const readState = () => page.evaluate(() => {
  const rail = document.querySelector('.studio-rail');
  const track = document.querySelector('.studio-rail-track');
  return { collapsed: rail?.classList.contains('is-rail-collapsed') ?? false, railDisplay: rail ? getComputedStyle(rail).display : null, trackScrollWidth: track?.scrollWidth ?? null, trackClientWidth: track?.clientWidth ?? null };
});
const initial = await readState();
await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
await page.waitForTimeout(120);
const moving = await readState();
await page.waitForTimeout(850);
const idle = await readState();
await page.evaluate(() => window.scrollTo({ top: 1400, behavior: 'instant' }));
await page.waitForTimeout(120);
const movingAgain = await readState();
console.log(JSON.stringify({ initial, moving, idle, movingAgain }, null, 2));
await browser.close();
