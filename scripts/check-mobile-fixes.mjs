import { chromium } from '@playwright/test';

const baseUrl = 'http://localhost:4322';
const widths = [375, 390, 768];
const browser = await chromium.launch({ headless: true });
const failures = [];

const checkMobileLayout = async (page, width) => {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.locator('[data-hero-carousel]').waitFor({ state: 'visible', timeout: 30000 });
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(150);
  const result = await page.evaluate(() => {
    const rect = (selector) => {
      const node = document.querySelector(selector);
      if (!node) return null;
      const box = node.getBoundingClientRect();
      return { left: box.left, right: box.right, top: box.top, bottom: box.bottom, width: box.width, height: box.height };
    };
    const overlaps = (a, b) => a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    const sticky = rect('.sticky-booking');
    const chatbot = rect('.chatbot-launcher');
    const backToTop = rect('.back-to-top');
    return {
      sticky,
      chatbot,
      backToTop,
      overlapChatSticky: overlaps(chatbot, sticky),
      overlapBackSticky: overlaps(backToTop, sticky),
      overlapBackChat: overlaps(backToTop, chatbot),
      previousControls: document.querySelectorAll('[data-carousel-prev]').length,
      nextControls: document.querySelectorAll('[data-carousel-next]').length,
      legacyControls: document.querySelectorAll('.carousel-control').length,
      activeIndex: document.querySelector('[data-carousel-slide].is-active')?.dataset.index ?? null,
      dots: document.querySelectorAll('[data-carousel-dot]').length,
    };
  });
  const pass = !result.overlapChatSticky && !result.overlapBackSticky && !result.overlapBackChat && result.previousControls === 0 && result.nextControls === 0 && result.legacyControls === 0 && result.dots > 1;
  console.log(JSON.stringify({ width, check: 'mobile-layout', result, pass }));
  if (!pass) failures.push({ width, check: 'mobile-layout', result });

  const initialIndex = result.activeIndex;
  await page.waitForTimeout(6700);
  const nextIndex = await page.locator('[data-carousel-slide].is-active').getAttribute('data-index');
  const autoplayPass = nextIndex !== initialIndex;
  console.log(JSON.stringify({ width, check: 'autoplay', initialIndex, nextIndex, pass: autoplayPass }));
  if (!autoplayPass) failures.push({ width, check: 'autoplay', initialIndex, nextIndex });
};

const page = await browser.newPage();
for (const width of widths) await checkMobileLayout(page, width);
await page.close();

const reducedPage = await browser.newPage({ reducedMotion: 'reduce' });
await reducedPage.setViewportSize({ width: 390, height: 900 });
await reducedPage.goto(`${baseUrl}/`, { waitUntil: 'domcontentloaded', timeout: 30000 });
await reducedPage.locator('[data-hero-carousel]').waitFor({ state: 'visible', timeout: 30000 });
const reducedInitial = await reducedPage.locator('[data-carousel-slide].is-active').getAttribute('data-index');
await reducedPage.waitForTimeout(6700);
const reducedNext = await reducedPage.locator('[data-carousel-slide].is-active').getAttribute('data-index');
const reducedPass = reducedNext === reducedInitial;
console.log(JSON.stringify({ width: 390, check: 'reduced-motion', reducedInitial, reducedNext, pass: reducedPass }));
if (!reducedPass) failures.push({ width: 390, check: 'reduced-motion', reducedInitial, reducedNext });
await reducedPage.close();
await browser.close();

if (failures.length) {
  console.error(JSON.stringify({ failures }, null, 2));
  process.exit(1);
}
