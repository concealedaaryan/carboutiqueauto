import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const baseUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:4330/';
const viewports = [
  { name: 'small-phone', width: 320, height: 844 },
  { name: 'standard-phone', width: 375, height: 812 },
  { name: 'large-phone', width: 390, height: 844 },
  { name: 'wide-phone', width: 430, height: 932 },
];

const browser = await chromium.launch({ headless: true, executablePath: '/usr/bin/chromium' });
const results = [];
try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(message.text()); });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    const response = await page.goto(baseUrl, { waitUntil: 'networkidle' });
    const metrics = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      overflow: document.documentElement.scrollWidth > window.innerWidth,
      headerVisible: Boolean(document.querySelector('header.site-header')),
      heroVisible: Boolean(document.querySelector('.hero-shell')),
      carouselVisible: Boolean(document.querySelector('[data-hero-carousel]')),
      serviceCards: document.querySelectorAll('.popular-card').length,
      routeCards: document.querySelectorAll('.path-grid .choice-card').length,
      chatbotLauncherVisible: Boolean(document.querySelector('.chatbot-launcher')),
      backToTopAriaLabel: document.querySelector('[data-back-to-top]')?.getAttribute('aria-label'),
    }));
    results.push({ ...viewport, status: response?.status(), consoleErrors, pageErrors, metrics });
    await page.close();
  }
} finally {
  await browser.close();
}

await fs.writeFile('mobile-homepage-check.json', JSON.stringify({ baseUrl, results }, null, 2));
for (const result of results) {
  console.log(JSON.stringify({ name: result.name, width: result.width, status: result.status, overflow: result.metrics.overflow, documentWidth: result.metrics.documentWidth, consoleErrors: result.consoleErrors.length, pageErrors: result.pageErrors.length, serviceCards: result.metrics.serviceCards, routeCards: result.metrics.routeCards }, null, 2));
}
if (results.some((result) => result.status !== 200 || result.metrics.overflow || result.consoleErrors.length || result.pageErrors.length)) process.exitCode = 1;
