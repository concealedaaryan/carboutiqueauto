import { chromium } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:4321';
const routes = [
  '/', '/services', '/packages', '/protection', '/why-crest', '/faq', '/locations', '/contact', '/estimate',
  '/terms-of-service', '/privacy-policy', '/cookie-policy', '/refund-cancellation', '/grievance-redressal', '/accessibility', '/disclaimer',
];
const selectors = [
  'h1', 'h2', 'h3', '.eyebrow', '.breadcrumbs', '.page-title-bar', 'main p', 'main li', 'main a:not(.button)',
  '.service-price', '.from-price', '.coating-card > strong', '.addon-card > strong', '.ppf-list-item strong',
  '.calc-summary-lines span', '.calc-summary-lines strong', '.calc-breakdown', '.calc-source-note', '.form-note', '.form-fallback',
  '.trust-copy small', '.contact-details a', '.contact-details small', '.contact-bottom strong', '.contact-bottom span', '.footer-brand-block > p',
];

function parseRGB(value) {
  const match = value.match(/rgba?\\(([^)]+)\\)/);
  if (!match) return null;
  const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()));
  if (parts.length < 3) return null;
  return [parts[0], parts[1], parts[2], parts[3] == null ? 1 : parts[3]];
}
function blend(fg, bg) {
  const a = fg[3];
  return [0, 1, 2].map((index) => fg[index] * a + bg[index] * (1 - a)).concat(1);
}
function luminance(rgb) {
  return rgb.slice(0, 3).map((channel) => channel / 255).map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4).reduce((sum, channel, index) => sum + channel * [0.2126, 0.7152, 0.0722][index], 0);
}
function contrastRatio(first, second) {
  const light = Math.max(luminance(first), luminance(second));
  const dark = Math.min(luminance(first), luminance(second));
  return (light + 0.05) / (dark + 0.05);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const report = [];
for (const route of routes) {
  await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
  const result = await page.evaluate((selectors) => {
    const parse = (value) => {
      const match = value.match(/rgba?\\(([^)]+)\\)/);
      if (!match) return null;
      const parts = match[1].split(',').map((part) => Number.parseFloat(part.trim()));
      return parts.length >= 3 ? [parts[0], parts[1], parts[2], parts[3] == null ? 1 : parts[3]] : null;
    };
    const sampleBackground = (element) => {
      let current = element;
      while (current && current !== document.documentElement) {
        const style = getComputedStyle(current);
        const color = parse(style.backgroundColor);
        if (color && (color[3] > 0.03 || style.backgroundImage !== 'none')) return color;
        current = current.parentElement;
      }
      return [248, 248, 244, 1];
    };
    return selectors.flatMap((selector) => [...document.querySelectorAll(selector)].slice(0, 8).map((element) => {
      const style = getComputedStyle(element);
      const color = parse(style.color);
      const background = sampleBackground(element);
      const rect = element.getBoundingClientRect();
      return { selector, text: element.textContent?.replace(/\\s+/g, ' ').trim().slice(0, 100), color, background, fontSize: style.fontSize, visible: rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden', ratioHint: color && background ? { color, background } : null };
    }));
  }, selectors);
  report.push({ route, findings: result });
}
await browser.close();

const warnings = [];
for (const pageReport of report) {
  for (const finding of pageReport.findings) {
    if (!finding.visible || !finding.color || !finding.background) continue;
    const ratio = contrastRatio(finding.color, finding.background);
    if (ratio < 3.0 && finding.text) warnings.push({ route: pageReport.route, selector: finding.selector, text: finding.text, ratio: Number(ratio.toFixed(2)), color: finding.color, background: finding.background });
  }
}
console.log(JSON.stringify({ routes: routes.length, warnings: warnings.slice(0, 160), warningCount: warnings.length }, null, 2));
