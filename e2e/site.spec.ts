import { expect, test } from '@playwright/test';

const publicRoutes = ['/services', '/packages', '/protection', '/estimate', '/why-crest', '/locations', '/faq', '/contact'];
const navLabels = ['Services', 'Packages', 'Protection', 'Estimate', 'Locations', 'Contact'];

test.describe('Crest Automotive multi-page navigation', () => {
  test('homepage is concise and links to dedicated detail pages', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Premium Car Detailing in DLF Gurugram \| Crest Automotive/);
    await expect(page.getByRole('heading', { name: /Care for the car\s+you already love/i })).toBeVisible();
    await expect(page.getByText(/Crest Automotive · Rodim PPF/i).first()).toBeVisible();
    await expect(page.locator('[data-hero-carousel]')).toBeVisible();
    await expect(page.locator('[data-carousel-slide]')).toHaveCount(3);
    await expect(page.getByRole('link', { name: /See every service/i })).toBeVisible();
    await expect(page.locator('table')).toHaveCount(0);
    for (const label of navLabels) await expect(page.locator('.desktop-nav').getByRole('link', { name: label, exact: true })).toBeVisible();
  });

  for (const route of publicRoutes) {
    test(`${route} renders successfully`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator('header.site-header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('body')).not.toContainText('404 Not Found');
    });
  }

  test('desktop navigation reaches services from homepage', async ({ page }) => {
    await page.goto('/');
    await page.locator('.desktop-nav').getByRole('link', { name: 'Services', exact: true }).click();
    await expect(page).toHaveURL(/\/services\/?$/);
    await expect(page.getByRole('heading', { name: /Choose the ritual/i })).toBeVisible();
    await expect(page.locator('.service-row')).toHaveCount(16);
  });

  test('mobile navigation opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    const toggle = page.locator('.menu-toggle');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator('.mobile-menu')).toHaveClass(/is-open/);
    await expect(page.locator('.mobile-menu a', { hasText: 'Services' })).toBeVisible();
    await toggle.click();
    await expect(page.locator('.mobile-menu')).not.toHaveClass(/is-open/);
  });
});

test.describe('Crest Automotive booking calculator', () => {
  test('preselects a treatment from a service-page link and calculates GST', async ({ page }) => {
    await page.goto('/estimate?service=13');
    await expect(page.locator('#calc-service')).toHaveValue('13');
    await page.locator('#calc-category').selectOption({ label: 'Luxury' });
    await expect(page.locator('#calc-base')).toHaveText('₹38,000');
    await expect(page.locator('#calc-gst')).toHaveText('₹6,840');
    await expect(page.locator('#calc-total')).toHaveText('₹44,840');
  });

  test('adds leather, PPF, and ceramic add-ons using exact category prices', async ({ page }) => {
    await page.goto('/estimate?service=13');
    await page.locator('#calc-category').selectOption({ label: 'Super luxury (GLE)' });
    await page.locator('#calc-ppf').check();
    await page.locator('#calc-ppf-film').selectOption({ label: 'BASF Rodim TPU (German) R4 Pro · 15 years' });
    await page.locator('#calc-ppf-size').selectOption('large');
    await page.locator('#calc-leather').check();
    await page.locator('#calc-exterior-ceramic').check();
    await page.locator('#calc-interior-ceramic').check();
    await expect(page.locator('#calc-base')).toHaveText('₹42,000');
    await expect(page.locator('#calc-addons-total')).toHaveText('₹3,61,500');
    await expect(page.locator('#calc-gst')).toHaveText('₹72,630');
    await expect(page.locator('#calc-total')).toHaveText('₹4,76,130');
    await expect(page.locator('#calc-breakdown')).toContainText('Premium graphene coating');
    await expect(page.locator('#calc-breakdown')).toContainText('PPF · large');
  });

  test('transfers the estimate into the Google Form contact handoff', async ({ page }) => {
    await page.goto('/estimate?service=12');
    await page.locator('#calc-category').selectOption({ label: 'Premium (Ioniq)' });
    await page.locator('#calc-cta').click();
    await expect(page).toHaveURL(/\/contact\/?$/);
    await expect(page.locator('#estimate-context')).toBeVisible();
    await expect(page.locator('#estimate-context-service')).toContainText('Premium ceramic coating');
    await expect(page.locator('#estimate-context-category')).toContainText('Premium (Ioniq)');
    await expect(page.locator('iframe[title="Crest Automotive contact form"]')).toBeVisible();
  });
});

test.describe('Crest Automotive interactions', () => {
  test('FAQ accordion expands and collapses', async ({ page }) => {
    await page.goto('/faq');
    const item = page.locator('details.faq-item').first();
    await expect(item).toHaveAttribute('open', '');
    await item.locator('summary').click();
    await expect(item).not.toHaveAttribute('open', '');
    await item.locator('summary').click();
    await expect(item).toHaveAttribute('open', '');
  });

  test('contact route exposes the Google Form and fallback link', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('iframe[title="Crest Automotive contact form"]')).toHaveAttribute('src', /docs\.google\.com\/forms/);
    await expect(page.getByRole('link', { name: /Open the form in a new tab/i })).toBeVisible();
    await expect(page).toHaveURL(/\/contact\/?$/);
  });

  test('back-to-top appears after scrolling and returns to the top', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, 1000));
    await expect(page.locator('[data-back-to-top]')).toHaveClass(/is-visible/);
    await page.locator('[data-back-to-top]').click({ force: true });
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 3000 }).toBeLessThan(20);
  });
});
