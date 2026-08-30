import { expect, test } from '@playwright/test';

const publicRoutes = ['/services', '/packages', '/protection', '/rodim', '/estimate', '/why-crest', '/locations', '/faq', '/contact'];
const navLabels = ['Services', 'Packages', 'Protection', 'Rodim PPF', 'Estimate', 'Locations', 'Contact'];

test.describe('Crest Automotive multi-page navigation', () => {
  test('homepage is concise and links to dedicated detail pages', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Rodim PPF and Premium Car Care in DLF Gurugram \| Crest Automotive Care/);
    await expect(page.getByRole('heading', { name: /Protect the paint\s+Keep the presence/i })).toBeVisible();
    await expect(page.getByText(/Crest Automotive Care · Rodim PPF/i).first()).toBeVisible();
    await expect(page.locator('[data-hero-carousel]')).toBeVisible();
    await expect(page.locator('[data-carousel-slide]')).toHaveCount(3);
    await expect(page.getByRole('link', { name: /Explore the Rodim range/i })).toBeVisible();
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

  test('Rodim page presents verified product links and no removed legacy film offering', async ({ page }) => {
    await page.goto('/rodim');
    await expect(page).toHaveTitle(/Rodim PPF Information & Consultation/);
    await expect(page.getByRole('heading', { name: /Protection with a point of view/i })).toBeVisible();
    await expect(page.getByText(/legacy film/i)).toHaveCount(0);
    await expect(page.locator('a[href="https://rodim.in/rodim-r1/"]')).toHaveAttribute('target', '_blank');
    await expect(page.locator('a[href="https://rodim.in/rodim-r2/"]')).toHaveAttribute('rel', /noopener/);
    await expect(page.getByRole('link', { name: /View warranty terms on Rodim.in/i })).toHaveAttribute('href', 'https://rodim.in/product-warranty-service-description/');
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
    await page.locator('#calc-ppf-film').selectOption({ label: 'Rodim R2 Black' });
    await page.locator('#calc-ppf-category').selectOption({ label: 'Super luxury (GLE)' });
    await page.locator('#calc-leather').check();
    await page.locator('#calc-exterior-ceramic').check();
    await page.locator('#calc-interior-ceramic').check();
    await expect(page.locator('#calc-base')).toHaveText('₹42,000');
    await expect(page.locator('#calc-addons-total')).toHaveText('₹2,16,500');
    await expect(page.locator('#calc-gst')).toHaveText('₹46,530');
    await expect(page.locator('#calc-total')).toHaveText('₹3,05,030');
    await expect(page.locator('#calc-breakdown')).toContainText('Premium graphene coating');
    await expect(page.locator('#calc-breakdown')).toContainText('PPF · Super luxury (GLE)');
  });

  test('ignores a stale PPF query token and starts on a current Rodim film', async ({ page }) => {
    await page.goto('/estimate?service=13&ppf=legacy-film');
    await page.locator('#calc-category').selectOption({ label: 'Luxury' });
    await page.locator('#calc-ppf').check();
    await expect(page.locator('#calc-ppf-film')).toHaveValue('Rodim R1');
  });

  test('requires a core treatment before enabling add-ons', async ({ page }) => {
    await page.goto('/estimate');
    await expect(page.locator('#calc-addons')).toHaveAttribute('disabled', '');
    await expect(page.locator('#calc-addons-notice')).toHaveText('Select a core treatment above before choosing any add-ons.');
    await expect(page.locator('#calc-exterior-ceramic')).toBeDisabled();

    await page.locator('#calc-category').selectOption({ label: 'Premium (Ioniq)' });
    await page.locator('#calc-service').selectOption({ label: '01 — Premium waterless wash & wax' });
    await expect(page.locator('#calc-addons')).not.toHaveAttribute('disabled', '');
    await expect(page.locator('#calc-addons-notice')).toHaveText('Core treatment selected. You can now add optional protection upgrades.');
    await page.locator('#calc-exterior-ceramic').check();
    await expect(page.locator('#calc-breakdown')).toContainText('Premium waterless wash & wax');
    await expect(page.locator('#calc-breakdown')).toContainText('exterior ceramic add-on');
  });

  test('transfers the estimate into the Google Form contact handoff', async ({ page }) => {
    await page.goto('/estimate?service=12');
    await page.locator('#calc-category').selectOption({ label: 'Premium (Ioniq)' });
    await page.locator('#calc-cta').click();
    await expect(page).toHaveURL(/\/contact\/?$/);
    await expect(page.locator('#estimate-context')).toBeVisible();
    await expect(page.locator('#estimate-context-service')).toContainText('Premium ceramic coating');
    await expect(page.locator('#estimate-context-category')).toContainText('Premium (Ioniq)');
    await expect(page.locator('.form-embed iframe')).toBeVisible();
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
    await expect(page.locator('.form-embed iframe')).toHaveAttribute('title', 'Crest Automotive Care contact form');
    await expect(page.locator('.form-embed iframe')).toHaveAttribute('src', /docs\.google\.com\/forms/);
    await expect(page.getByRole('link', { name: /Open the form in a new tab/i })).toBeVisible();
    await expect(page).toHaveURL(/\/contact\/?$/);
  });

  test('back-to-top appears after scrolling and returns to the top', async ({ page }) => {
    await page.goto('/');
    await page.waitForFunction(() => !document.documentElement.classList.contains('intro-lock'));
    await page.evaluate(() => window.scrollTo({ top: 1000, behavior: 'auto' }));
    await expect(page.locator('[data-back-to-top]')).toHaveClass(/is-visible/);
    await page.locator('[data-back-to-top]').click({ force: true });
    await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 3000 }).toBeLessThan(20);
  });
});
