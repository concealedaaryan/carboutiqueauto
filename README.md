# Crest Automotive Care Website

A complete multi-page Astro website for Crest Automotive Care, focused on premium car detailing, Rodim PPF, ceramic coatings, monthly care packages, DLF Gurugram service intent, and enquiry conversion.

## Run locally

On macOS, Linux, or a terminal with pnpm available:

```bash
pnpm install
pnpm dev
```

On Windows, double-click `start.bat`. It checks for pnpm, installs the locked dependencies when Astro is not yet installed, and starts the development server at `http://localhost:4321/`.

The repository includes `.gitignore` rules for `node_modules`, Astro/build output, `.env` secrets, Vercel metadata, logs, and Playwright reports. The safe `.env.example` template remains trackable.

The production build requires a clean HTTPS site origin so canonical URLs, social metadata, JSON-LD, the sitemap, and robots.txt cannot be published incorrectly:

```bash
PUBLIC_SITE_URL=https://example.com pnpm build
PUBLIC_SITE_URL=https://example.com pnpm preview
```

On Vercel, the build also accepts `VERCEL_PROJECT_PRODUCTION_URL` or `VERCEL_URL` as a fallback when Vercel System Environment Variables are enabled. Set `PUBLIC_SITE_URL` explicitly to the real custom production domain whenever possible.

If the local environment blocks package-manager lifecycle scripts, run `./node_modules/.bin/astro build` directly after dependencies are installed.

## Site architecture

The homepage is intentionally concise. It includes the brand introduction, proof metrics, three popular-service highlights, a brief Crest-difference section, exploration cards, and a contact CTA. Detailed content now lives on dedicated routes: `/services` contains all 16 treatments and the full treatment matrix; `/packages` contains all monthly plans and their vehicle-category prices; `/protection` contains ceramic, graphene, Rodim PPF, warranties, coverage and add-ons; `/estimate` contains the live calculator; `/why-crest` contains the full reasons-to-choose-us content; `/locations` contains the three DLF communities and Google Maps; `/faq` contains the complete FAQ; and `/contact` contains the enquiry form and contact details.

## Images and shared layouts

Public-facing pages use `src/layouts/SiteLayout.astro` for shared navigation, footer, social links, and responsive styling. Legal routes use `src/layouts/LegalLayout.astro`. Generated automotive background images are stored in `public/images/crest-hero.jpg`, `crest-detailing.jpg`, and `crest-beading.jpg`; replace them with brand-approved photography when available.

## Form behavior

The Contact page embeds the supplied Google Form and provides a fallback link to open the form in a new tab. The estimate calculator can transfer the selected service and vehicle category to the contact handoff.

## Content notes

The page uses the services, add-ons, monthly packages, Rodim PPF catalogue and prices supplied in the PDF. GST at 18% is called out as extra. The Premium-tier sun-film price is reproduced exactly as it appears in the PDF (₹1,500) and is flagged in the UI for confirmation before booking.
## Booking calculator

The calculator is fully client-side and lives on the dedicated `/estimate` route. It uses the shared PDF-backed data module at `src/data/catalog.ts`. It supports all 16 treatments and five exact vehicle categories: Hatchback / small, Sedan / compact SUV, Premium (Ioniq), Luxury, and Super luxury (GLE). A core treatment must be selected before optional add-ons are enabled. The calculator supports leather conditioning, Rodim PPF film, both ceramic add-ons, 18% GST, live totals, and a CTA that transfers the estimate into the contact form.

## Visual system and assets

The landing page uses a graphite, navy, electric-blue, and silver palette, white text, Inter/Space Grotesk typography, controlled hover states, responsive mobile navigation, section-reveal transitions, pointer glow, and a fixed page-indicator rail on desktop. Generated background images are stored in `public/images/crest-hero.jpg`, `crest-detailing.jpg`, and `crest-beading.jpg`; replace them with brand-approved photography if required.

## Legal pages

The project includes `/terms-of-service`, `/privacy-policy`, `/cookie-policy`, `/refund-cancellation`, `/grievance-redressal`, `/accessibility`, `/disclaimer`, and a branded `/404` fallback. The legal pages are working drafts, not legal advice. Before publishing, replace bracketed entity/contact details, confirm the final payment/refund/retention/vendor policies, and have qualified counsel review the text and deployment configuration.

The privacy and accessibility drafts were informed by the official [Digital Personal Data Protection Act, 2023](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf), [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Department of Consumer Affairs](https://consumeraffairs.gov.in/pages/consumer-protection-unit), and [National Consumer Helpline](https://consumerhelpline.gov.in/) references.

## AI chatbot

The public layouts mount `src/components/Chatbot.astro`, which calls the server-side `api/chat.js` Vercel function. The function calls Groq’s `openai/gpt-oss-20b` model and keeps the API key out of browser code. In Vercel project settings, add `GROQ_API_KEY` as an environment variable for Preview and Production. The chatbot gracefully explains that it is unavailable until the key is configured. Do not commit the key or place it in a `PUBLIC_` environment variable.

The Groq model and API notes are recorded in `groq-integration-notes.md`. The full custom system prompt is maintained in `groq-system-prompt.md` and mirrored into `api/crest-system-prompt.js`, which is imported by `api/chat.js`. The prompt covers the booking workflow, all vehicle-category treatment prices, monthly packages, Rodim PPF options, protection add-ons, GST rules, calculation examples, lead handoff, and safety boundaries. The endpoint intentionally constrains message length/history and tells the assistant not to invent final pricing, availability, guarantees, legal conclusions or sensitive-data requests.

## Interaction polish

The shared public and legal layouts include a rounded back-to-top button, rounded CTA/button corners, subtle navy-to-gold gradients, hover lift and glow states, responsive mobile navigation, and reduced-motion support.

## End-to-end tests

Playwright tests live in `e2e/site.spec.ts` and are configured by `playwright.config.ts`. They cover the homepage, every primary public route, shared navigation, mobile navigation, the 16-treatment Services page, monthly packages, Protection page, calculator preselection, exact GST totals, core-treatment gating for add-ons, Rodim PPF/leather/ceramic add-ons, estimate-to-contact handoff, FAQ accordion, contact confirmation, and back-to-top behavior.

Run them before pushing to Vercel:

```bash
pnpm test:e2e
```

The test runner starts Astro on port 4322 and uses Chromium. Use `CHROMIUM_PATH` if the CI environment stores Chromium at a different path. It creates an HTML report in `playwright-report/`; failure screenshots and traces are stored under `test-results/`, and both directories are ignored from source control and Vercel uploads.

## Post-deployment monitoring

Use `POST-DEPLOYMENT-MONITORING.md` for the production runbook. It covers Vercel Runtime Logs, Groq status-code and rate-limit handling, alert thresholds, secret rotation, smoke checks, safe structured logging, error-tracking options, and incident response. The research source notes are kept in `monitoring-research-notes.md`.

## Vercel deployment

This project is configured for Vercel through `vercel.json` and `astro.config.mjs`. It uses static output, `pnpm install --frozen-lockfile`, `pnpm build`, and the `dist` output directory. The project includes cache headers for generated images and Astro assets, plus baseline security response headers. `package.json` pins the deployment runtime to Node 22 and pnpm 10.12.4.

To deploy from the Vercel dashboard, import the repository, keep the detected Astro framework, and use the committed configuration. If Vercel asks for overrides, use `pnpm install --frozen-lockfile` as the install command, `pnpm build` as the build command, and `dist` as the output directory. Vercel will serve the Astro pages as static files and deploy `api/chat.js` as a serverless function.

Copy `.env.example` to `.env` for local reference, but add the real secret in Vercel instead: open Project Settings → Environment Variables, create `GROQ_API_KEY`, paste the Groq API key, select both Preview and Production, save it, and redeploy. Do not prefix it with `PUBLIC_`, do not place it in client-side Astro code, and do not commit `.env`. The key is read only by `api/chat.js`.

Before launch, set `PUBLIC_SITE_URL` to the real HTTPS production domain. If it is omitted, enable Vercel System Environment Variables so the build can use `VERCEL_PROJECT_PRODUCTION_URL` or `VERCEL_URL`; an origin-less build still fails safely rather than publishing incorrect canonical URLs. Keep `GROQ_API_KEY` server-only and never expose it to the client. Replace placeholder social URLs, business/legal identity fields, policy contact emails, and any unverified supplier, warranty, address, or partnership claims before publishing. Run `pnpm run audit:seo-security` and test both Preview and Production after deployment.
