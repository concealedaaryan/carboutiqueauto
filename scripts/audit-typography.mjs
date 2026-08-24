import { chromium } from '@playwright/test';

const base = process.env.BASE_URL || 'http://127.0.0.1:4321';
const routes = [
  '/', '/services', '/packages', '/protection', '/estimate', '/locations', '/faq', '/contact', '/why-crest',
  '/terms-of-service', '/privacy-policy', '/cookie-policy', '/refund-cancellation', '/grievance-redressal', '/accessibility', '/disclaimer', '/404'
];

const browser = await chromium.launch({ headless: true });
const results = [];
for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}${route}`, { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => {
    const styles = (selector) => [...document.querySelectorAll(selector)].map((el) => {
      const s = getComputedStyle(el);
      return { text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 100), fontFamily: s.fontFamily, fontSize: s.fontSize, lineHeight: s.lineHeight };
    });
    const h1s = styles('main h1, .legal-hero h1');
    const ems = styles('main h1 em, main h2 em, .legal-hero h1 em');
    const h2s = styles('main h2, .legal-content h2');
    const heroParagraphs = styles('.hero-copy > p, .page-hero p, .services-hero p, .packages-hero p, .protection-hero p, .why-hero p, .location-hero p, .faq-hero p, .estimate-hero p, .contact-hero p, .legal-hero p');
    const firstParagraph = styles('main p, .legal-content p')[0] || null;
    return { title: document.title, h1: h1s[0] || null, h1Em: ems[0] || null, h2: h2s[0] || null, heroParagraph: heroParagraphs[0] || firstParagraph, allH1Families: [...new Set(h1s.map((x) => x.fontFamily))], allEmFamilies: [...new Set(ems.map((x) => x.fontFamily))] };
  });
  results.push({ route, ...result });
  await page.close();
}
await browser.close();
console.log(JSON.stringify(results, null, 2));
