import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const expectedTitles = ['Google Maps location for DLF Crest', 'Google Maps location for DLF The Camellias', 'Google Maps location for DLF The Magnolias'];
const expectedCoords = ['28.4456252,77.1128288', '28.4507956,77.1005205', '28.4572893,77.0998467'];
const failures = [];
for (const width of [375, 768, 1440]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto('http://localhost:4322/locations', { waitUntil: 'domcontentloaded', timeout: 30000 });
  const result = await page.locator('.location-maps-section').evaluate((section) => {
    const frames = [...section.querySelectorAll('iframe')];
    const grid = section.querySelector('.location-map-grid').getBoundingClientRect();
    return {
      titles: frames.map((frame) => frame.title),
      srcs: frames.map((frame) => frame.src),
      count: frames.length,
      pageOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      gridWidth: grid.width,
    };
  });
  const orderPass = JSON.stringify(result.titles) === JSON.stringify(expectedTitles) && expectedCoords.every((coord, index) => result.srcs[index].includes(coord));
  const pass = orderPass && result.count === 3 && !result.pageOverflow && result.gridWidth <= width;
  console.log(JSON.stringify({ width, result, pass }));
  if (!pass) failures.push({ width, result });
  await page.close();
}
await browser.close();
if (failures.length) { console.error(JSON.stringify({ failures }, null, 2)); process.exit(1); }
