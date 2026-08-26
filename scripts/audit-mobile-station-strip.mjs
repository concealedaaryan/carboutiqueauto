import { chromium } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4321';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
await page.evaluate(() => sessionStorage.clear());
await page.reload({ waitUntil: 'networkidle' });
await page.waitForTimeout(300);

const metrics = await page.locator('.studio-rail').evaluate((rail) => {
  const track = rail.querySelector('.studio-rail-track');
  const active = rail.querySelector('.is-active');
  const railStyle = getComputedStyle(rail);
  const trackStyle = getComputedStyle(track);
  return {
    railPosition: railStyle.position,
    railTop: railStyle.top,
    railHeight: Math.round(rail.getBoundingClientRect().height),
    trackScrollWidth: track.scrollWidth,
    trackClientWidth: track.clientWidth,
    trackOverflowX: trackStyle.overflowX,
    trackSnapType: trackStyle.scrollSnapType,
    trackTouchAction: trackStyle.touchAction,
    activeStation: active?.dataset.stationLink || null,
    activeText: active?.textContent?.replace(/\s+/g, ' ').trim() || null,
  };
});

await page.locator('[data-station-link="04"]').click();
await page.waitForTimeout(550);
const navigation = {
  hash: new URL(page.url()).hash,
  activeStation: await page.locator('.studio-rail .is-active').getAttribute('data-station-link'),
  activeVisible: await page.locator('.studio-rail .is-active').isVisible(),
  activeInStrip: await page.locator('.studio-rail .is-active').evaluate((el) => {
    const parent = el.parentElement.getBoundingClientRect();
    const rect = el.getBoundingClientRect();
    return rect.left >= parent.left && rect.right <= parent.right;
  }),
};

await page.screenshot({ path: 'mobile-station-strip-audit.png', fullPage: false });
console.log(JSON.stringify({ metrics, navigation }, null, 2));
await browser.close();
