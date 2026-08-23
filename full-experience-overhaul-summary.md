# Crest Automotive full experience overhaul

The site has been moved away from a glorified list-with-a-UI treatment and toward a more visual luxury automotive studio experience.

## Shared experience system

The shared Astro layout now supports richer editorial rhythm through image-backed surfaces, translucent content panels, stronger typographic hierarchy, split image-and-copy moments, guided paths, story sections, and consistent interaction states. The implementation remains pure Astro/CSS with no React or Vue dependency.

## Homepage

The homepage keeps the Crest + Rodim PPF hero carousel and now presents a visual journey: proof metrics, a guided `Start here` service section, image-backed popular-treatment cards, a Crest-standard editorial proof panel, guided next-step paths, a ceramic protection feature, and a final appointment CTA. The popular cards no longer display numeric prefixes.

## Services

The complete 16-treatment catalogue remains intact, but the page is now divided into four named chapters: Daily exterior care; Interior and cabin care; Correction and surface protection; and Glass and cabin comfort. Service entries render as image-backed visual cards with dark gradients and a spacious responsive layout. The full pricing matrix remains available at the end as a reference tool rather than the primary experience.

## Packages

The four package cards remain data-driven and retain all pricing and enquiry links. A new image-and-copy membership story explains the rhythm of care—Arrive, Reset, and Repeat—before the full pricing matrix.

## Protection

Rodim PPF remains the central offering. A new image-led `The Rodim approach` story explains Prepare, Protect, and Maintain before the ceramic/graphene choices, Rodim PPF matrix, and add-ons.

## Other routes

The shared visual system also improves Why Crest, Locations, FAQ, Estimate, Contact, and supporting legal/error layouts through stronger section surfaces, image treatments, split compositions, readable overlays, sticky FAQ framing, and clearer conversion hierarchy. Pricing, calculator logic, GST, PPF/add-ons, Google Form handoff, chatbot, legal notices, route transitions, SEO, and Vercel configuration remain preserved.

## Verification

| Check | Result |
|---|---|
| Astro check | Passed with 0 errors, 0 warnings, and 0 hints |
| Production build | Passed; 17 static routes generated |
| Playwright E2E | Passed; 17 tests |
| Browser review | Homepage, Services, Packages, and Protection reviewed in the running Astro preview |
| Responsive correction | Services falls back to a spacious single-column layout at intermediate widths |
