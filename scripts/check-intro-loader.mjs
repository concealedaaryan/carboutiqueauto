import { chromium } from '@playwright/test';

const baseUrl = 'http://localhost:4322';
const widths = [375, 768, 1440];
const browser = await chromium.launch({ headless: true });
const failures = [];

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.locator('[data-intro-loader]').waitFor({ state: 'visible', timeout: 30000 });
  const initial = await page.locator('[data-intro-loader]').evaluate((loader) => {
    const inner = loader.querySelector('.intro-loader-inner').getBoundingClientRect();
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    return {
      loaderVisible: getComputedStyle(loader).visibility !== 'hidden',
      centered: Math.abs(inner.left + inner.width / 2 - viewport.width / 2) < 2 && Math.abs(inner.top + inner.height / 2 - viewport.height / 2) < 2,
      sessionSeen: sessionStorage.getItem('crestIntroSeen'),
    };
  });
  await page.waitForTimeout(2800);
  const afterPlay = await page.locator('[data-intro-loader]').evaluate((loader) => ({
    hidden: getComputedStyle(loader).visibility === 'hidden' || loader.classList.contains('is-suppressed'),
  }));
  await page.goto(`${baseUrl}/services`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(150);
  const repeat = await page.locator('[data-intro-loader]').evaluate((loader) => ({
    suppressed: loader.classList.contains('is-suppressed'),
  }));
  const pass = initial.loaderVisible && initial.centered && initial.sessionSeen === '1' && afterPlay.hidden && repeat.suppressed;
  console.log(JSON.stringify({ width, initial, afterPlay, repeat, pass }));
  if (!pass) failures.push({ width, initial, afterPlay, repeat });
  await context.close();
}

const reducedContext = await browser.newContext({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
await reducedPage.locator('[data-intro-loader]').waitFor({ state: 'visible', timeout: 30000 });
await reducedPage.waitForTimeout(900);
const reducedResult = await reducedPage.locator('[data-intro-loader]').evaluate((loader) => ({
  hidden: getComputedStyle(loader).visibility === 'hidden' || loader.classList.contains('is-suppressed'),
  animations: getComputedStyle(loader.querySelector('.intro-loader-mark')).animationName,
}));
const reducedPass = reducedResult.hidden && reducedResult.animations === 'none';
console.log(JSON.stringify({ width: 390, reducedMotion: reducedResult, pass: reducedPass }));
if (!reducedPass) failures.push({ width: 390, reducedMotion: reducedResult });
await reducedContext.close();
await browser.close();

if (failures.length) {
  console.error(JSON.stringify({ failures }, null, 2));
  process.exit(1);
}
