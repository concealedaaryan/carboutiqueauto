# Crest Automotive UI redesign context inventory

## Known facts

The project is a frontend-only, multi-page Astro site using static output and pure `.astro` components. The primary application routes are `/`, `/services`, `/packages`, `/protection`, `/estimate`, `/locations`, `/contact`, `/why-crest`, and `/faq`; legal routes use a separate legal layout. The shared public shell is `src/layouts/SiteLayout.astro`, with reusable Astro components for the calculator, chatbot, hero carousel, image cards, proof strip, choice cards, page transitions, back-to-top behavior, sticky booking, breadcrumbs, and structured data.

The current public visual system is a dark Crest Automotive / Rodim PPF theme with midnight/slate surfaces, electric blue accents, silver-white typography, generated automotive imagery, image-backed sections, responsive navigation, and reduced-motion support. The current redesign work has already removed decorative section and card numbering from customer-facing UI and corrected the Services desktop grid after screenshot feedback about narrow, stretched cards.

Business-critical behavior must remain unchanged: the full PDF-backed service and package catalogues, Rodim-only PPF catalogue, vehicle-category pricing, GST, add-ons, query-string service preselection, calculator-to-contact session handoff, Google Form embed/fallback, server-only Groq chatbot, legal notices, SEO metadata and structured data, sitemap/robots, Vercel configuration, and Playwright coverage.

The repository has existing uncommitted work from the earlier redesign and should be edited in place. The package manager is pnpm. Available validation commands are `pnpm check`, `pnpm build`, and `pnpm test:e2e`. The site is deployed as static Astro output with a serverless chatbot endpoint.

## Assumptions

The redesign should be a premium visual evolution rather than a new information architecture. The homepage should stay concise, service details should remain on their dedicated routes, and the primary conversion path should remain “understand the care → configure an estimate → enquire.” The most valuable design improvements are hierarchy, spacing, card proportions, typographic rhythm, and a calmer visual system rather than additional effects or decorative labels.

The current generated image library can be reused as photographic surfaces, but imagery should support content contrast and should not make copy unreadable. The existing pure-Astro approach should be preserved without adding React, Vue, or another UI runtime.

## Open decisions requiring approval

The redesign direction still needs a named visual direction before implementation. The main choices are whether to keep the current blue-accented midnight theme or move toward a warmer studio palette, whether to use a more editorial split-screen composition or a calmer content-first grid, and how much of the current image-backed treatment should remain on dense catalogue pages.

No Figma file, Stitch design export, or connected design-tool reference has been supplied in this request. Per the UI design-to-implementation workflow, implementation should pause after presenting design directions until the user approves one direction or explicitly authorizes an implementation-only route.

## Acceptance criteria

The approved redesign must remain pure Astro, preserve all routes and business behavior, provide responsive desktop/tablet/mobile layouts, maintain readable long-content wrapping, keep visible focus and keyboard behavior, remove decorative numbering, retain accessible native FAQ and form states, preserve image alt text and semantic headings, and pass `pnpm check`, `pnpm build`, and `pnpm test:e2e`.
