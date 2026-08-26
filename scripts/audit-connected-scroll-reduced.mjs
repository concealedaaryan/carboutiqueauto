import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.waitForTimeout(350);
const result = await page.evaluate(() => {
  const body = document.body;
  const sections = [...document.querySelectorAll('main > section')];
  const heading = document.querySelector('main h1');
  const thread = document.querySelector('.connected-scroll-thread');
  return {
    connected: body.classList.contains('connected-scroll'),
    sectionCount: sections.length,
    hiddenSections: sections.filter((section) => getComputedStyle(section).opacity !== '1').length,
    headingOpacity: heading ? getComputedStyle(heading).opacity : null,
    headingTransform: heading ? getComputedStyle(heading).transform : null,
    threadDisplay: thread ? getComputedStyle(thread).display : null,
    smoothScroll: getComputedStyle(document.documentElement).scrollBehavior,
  };
});
console.log(JSON.stringify(result, null, 2));
await browser.close();
