import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const failures = [];
for (const width of [375, 390, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto('http://localhost:4322/packages', { waitUntil: 'domcontentloaded', timeout: 30000 });
  const result = await page.locator('.matrix-section').evaluate((section) => {
    const scroll = section.querySelector('.table-scroll');
    const table = scroll?.querySelector('table');
    const firstCell = table?.querySelector('tbody td:first-child');
    const box = (node) => { const r = node.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }; };
    return {
      viewport: window.innerWidth,
      section: box(section),
      scroll: box(scroll),
      table: box(table),
      firstCell: box(firstCell),
      pageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      tableOverflow: scroll.scrollWidth > scroll.clientWidth,
      sectionTopToTable: table.getBoundingClientRect().top - section.getBoundingClientRect().top,
    };
  });
  const compactMobile = width <= 620 ? result.firstCell.width <= 210 && result.table.width <= 700 : true;
  const pass = !result.pageOverflow && result.tableOverflow === (width <= 1080) && compactMobile && result.sectionTopToTable < (width <= 620 ? 230 : 280);
  console.log(JSON.stringify({ width, result, pass }));
  if (!pass) failures.push({ width, result });
  await page.close();
}
await browser.close();
if (failures.length) { console.error(JSON.stringify({ failures }, null, 2)); process.exit(1); }
