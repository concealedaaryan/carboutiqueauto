import { chromium } from '@playwright/test';

const baseURL = process.env.BASE_URL || 'http://localhost:4321';
const routes = [
  '/', '/services', '/packages', '/protection', '/why-crest', '/faq', '/locations', '/contact', '/estimate',
  '/terms-of-service', '/privacy-policy', '/cookie-policy', '/refund-cancellation', '/grievance-redressal', '/accessibility', '/disclaimer',
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const report = [];

for (const route of routes) {
  await page.goto(`${baseURL}${route}?audit=a11y`, { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => {
    const issues = [];
    const text = (element) => element?.textContent?.replace(/\\s+/g, ' ').trim() || '';
    const visible = (element) => { const rect = element.getBoundingClientRect(); const style = getComputedStyle(element); return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none'; };
    const name = (element) => {
      const labelledBy = element.getAttribute('aria-labelledby');
      if (labelledBy) return labelledBy.split(/\\s+/).map((id) => document.getElementById(id)?.textContent || '').join(' ').trim();
      return element.getAttribute('aria-label') || element.getAttribute('title') || (element.labels?.[0]?.textContent || '').trim() || element.getAttribute('placeholder') || text(element).slice(0, 120);
    };
    const describe = (element) => ({ tag: element.tagName.toLowerCase(), id: element.id || null, className: typeof element.className === 'string' ? element.className.split(/\\s+/).slice(0, 3).join('.') : null, text: text(element).slice(0, 100) });

    if ((document.documentElement.getAttribute('lang') || '').toLowerCase() !== 'en') issues.push({ type: 'document-language', actual: document.documentElement.getAttribute('lang') });
    document.querySelectorAll('img').forEach((element) => { if (!element.hasAttribute('alt')) issues.push({ type: 'image-missing-alt', element: describe(element) }); });
    document.querySelectorAll('a[href],button,input,select,textarea,summary,[role="button"],[tabindex]:not([tabindex="-1"])').forEach((element) => {
      if (!visible(element)) return;
      if (!name(element)) issues.push({ type: 'interactive-no-accessible-name', element: describe(element) });
      if (element.matches('input,select,textarea') && !element.closest('[aria-hidden="true"], [inert]')) {
        const associated = element.labels?.length || element.getAttribute('aria-label') || element.getAttribute('aria-labelledby');
        if (!associated) issues.push({ type: 'form-control-without-label', element: describe(element) });
      }
    });
    document.querySelectorAll('[aria-controls]').forEach((element) => { const id = element.getAttribute('aria-controls'); if (id && !document.getElementById(id)) issues.push({ type: 'missing-aria-controls-target', id, element: describe(element) }); });
    document.querySelectorAll('[aria-labelledby],[aria-describedby]').forEach((element) => { for (const attr of ['aria-labelledby', 'aria-describedby']) { const value = element.getAttribute(attr); if (value && value.split(/\\s+/).some((id) => !document.getElementById(id))) issues.push({ type: `missing-${attr}-target`, value, element: describe(element) }); } });
    document.querySelectorAll('[aria-hidden="true"] a,[aria-hidden="true"] button,[aria-hidden="true"] input,[aria-hidden="true"] select,[aria-hidden="true"] textarea,[aria-hidden="true"] [tabindex]:not([tabindex="-1"])').forEach((element) => { if (!element.hasAttribute('disabled') && !element.closest('[inert]')) issues.push({ type: 'focusable-inside-aria-hidden-region', element: describe(element) }); });
    document.querySelectorAll('a[target="_blank"]').forEach((element) => { if (!/\bnoopener\b/.test(element.getAttribute('rel') || '')) issues.push({ type: 'blank-link-without-noopener', element: describe(element) }); });
    if (!document.querySelector('main')) issues.push({ type: 'missing-main-landmark' });
    if (!document.querySelector('h1')) issues.push({ type: 'missing-h1' });
    const visibleHeadings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map((element) => Number(element.tagName.slice(1)));
    for (let index = 1; index < visibleHeadings.length; index += 1) if (visibleHeadings[index] - visibleHeadings[index - 1] > 1) issues.push({ type: 'heading-level-skipped', previous: visibleHeadings[index - 1], current: visibleHeadings[index] });
    return { title: document.title, issues };
  });
  report.push({ route, ...result });
}

// Keyboard pass on the homepage: every tab stop should either be visible or intentionally hidden/inert.
await page.goto(`${baseURL}/?audit=a11y-keyboard`, { waitUntil: 'networkidle' });
await page.evaluate(() => sessionStorage.setItem('crestIntroSeen', '1'));
await page.reload({ waitUntil: 'networkidle' });
const keyboard = await page.evaluate(() => {
  const focusable = [...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"])')].filter((element) => { const rect = element.getBoundingClientRect(); const style = getComputedStyle(element); return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden' && !element.closest('[aria-hidden="true"], [inert]'); });
  return { focusableCount: focusable.length, focusableLabels: focusable.slice(0, 30).map((element) => element.getAttribute('aria-label') || element.textContent?.replace(/\\s+/g, ' ').trim().slice(0, 60) || element.tagName) };
});

await browser.close();
const issues = report.flatMap(({ route, issues: routeIssues }) => routeIssues.map((issue) => ({ route, ...issue })));
console.log(JSON.stringify({ routes: report.length, issueCount: issues.length, issues, keyboard }, null, 2));
