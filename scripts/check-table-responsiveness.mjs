import { chromium } from '@playwright/test';

const baseUrl = 'http://localhost:4322';
const pages = [
  { path: '/services', label: 'Services', selector: '.matrix-section .table-scroll' },
  { path: '/packages', label: 'Packages', selector: '.matrix-section .table-scroll' },
  { path: '/protection', label: 'Protection', selector: '.ppf-section .table-scroll' },
];
const widths = [375, 390, 768, 1024];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const failures = [];

for (const width of widths) {
  await page.setViewportSize({ width, height: 900 });
  for (const item of pages) {
    await page.goto(`${baseUrl}${item.path}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator(item.selector).waitFor({ state: 'visible', timeout: 30000 });
    const result = await page.locator(item.selector).evaluate((container) => {
      const table = container.querySelector('table');
      const hint = container.parentElement.querySelector('.table-scroll-hint');
      const tableStyle = table ? getComputedStyle(table) : null;
      const fadeOpacity = getComputedStyle(container, '::after').opacity;
      const body = document.body;
      return {
        containerClientWidth: container.clientWidth,
        containerScrollWidth: container.scrollWidth,
        tableScrollWidth: table?.scrollWidth ?? 0,
        tableMinWidth: tableStyle?.minWidth ?? 'missing',
        bodyClientWidth: body.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        hintDisplay: hint ? getComputedStyle(hint).display : 'missing',
        fadeOpacity,
      };
    });
    const hasHorizontalTableOverflow = result.containerScrollWidth > result.containerClientWidth;
    const bodyIsContained = result.bodyScrollWidth <= result.bodyClientWidth + 1;
    const desktopBreakpoint = item.label === 'Protection' ? 980 : 1080;
    const isDesktop = width > desktopBreakpoint;
    const overflowExpected = isDesktop ? result.tableScrollWidth > result.containerClientWidth ? false : true : true;
    const hintExpected = isDesktop ? result.hintDisplay === 'none' : result.hintDisplay === 'block';
    const fadeExpected = isDesktop ? result.fadeOpacity === '0' : result.fadeOpacity !== '0';
    const overflowPass = isDesktop ? !hasHorizontalTableOverflow || overflowExpected : hasHorizontalTableOverflow;
    if (!overflowPass || !bodyIsContained || !hintExpected || !fadeExpected) {
      failures.push({ width, page: item.label, result, overflowPass, bodyIsContained, hintExpected, fadeExpected });
    }
    console.log(JSON.stringify({ width, page: item.label, result, pass: overflowPass && bodyIsContained && hintExpected && fadeExpected }));
  }
}

await browser.close();
if (failures.length) {
  console.error(JSON.stringify({ failures }, null, 2));
  process.exit(1);
}
