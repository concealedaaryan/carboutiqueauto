# Crest Automotive image-backed section update

Implemented the requested visual treatment across the current pure-Astro repository.

## Homepage

The homepage hero uses the `HeroCarousel.astro` component with three generated automotive background images. The carousel includes a dark layered gradient overlay to preserve text contrast, readable Crest + Rodim PPF copy, previous/next controls, tab-style slide indicators, pause behavior on hover and focus, automatic rotation, and reduced-motion support.

## Public routes

Image-backed backgrounds with readable overlays now cover the major hero and alternating content surfaces across the public routes: Services, Packages, Protection, Why Crest, Locations, Estimate, Contact, FAQ, and the homepage. Content cards remain translucent so the photography is visible without reducing clarity. The visual system alternates studio, detailing-process, ceramic-beading, and Rodim precision-installation imagery instead of relying solely on solid or gradient backgrounds.

## Preserved behavior

The redesign preserves the existing page routes, pricing calculator, Rodim PPF film and size selection, GST calculations, Google Form contact embed, estimate-to-contact session handoff, chatbot, legal pages, transitions, Vercel configuration, and route navigation.

## Verification

| Check | Result |
|---|---|
| Astro check | Passed with 0 errors, 0 warnings, and 0 hints |
| Static build | Passed; 17 routes generated |
| Playwright E2E | Passed; 17 tests |
| Browser verification | Homepage and Protection route visually inspected; carousel and overlay visible |
