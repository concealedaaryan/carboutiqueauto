# Crest Automotive Rodim PPF update

## Implemented

The homepage is now centred on Crest Automotive’s Rodim PPF offering. The hero copy presents `Crest × Rodim`, uses the headline `Protection with precision.`, and makes `Explore Rodim PPF` the primary conversion path.

A pure-Astro `HeroCarousel` component was added. It uses three generated automotive background images, a layered readability overlay, accessible previous/next controls, tab-style slide dots, hover/focus pause behavior, reduced-motion support, and ClientRouter-safe cleanup. No React or Vue dependencies were added.

The major route hero sections now use photographic backgrounds with dark overlays rather than relying only on flat or gradient surfaces. The Protection, Services, Packages, Why Crest, Locations, Estimate, Contact, and FAQ hero treatments are all covered by the shared image-backed system, and the Protection route uses the Rodim precision-installation visual.

The shared typography layer now establishes a consistent responsive scale for H1, H2, H3, body copy, labels, and small supporting text across the site. The scale reduces the previous mismatch between oversized headings and undersized body copy while preserving the premium editorial direction.

## Rodim PPF content

The customer-facing PPF catalogue now contains the seven Rodim/BASF Rodim entries already present in the source pricing data: R4 Pro, R3 Pro, R + Black Shield, R2 Matt, R2, R1, and R Star. Existing retained prices, warranties, coverage values, PPF size logic, GST logic, and calculator behavior remain intact for those entries. Non-Rodim brands were removed from the public catalogue and the chatbot system prompt so the site does not present competing PPF brands.

The calculator labels, chatbot opening message, FAQ, legal metadata, Protection page copy, homepage pathways, README, and AI system prompts now identify the offering as Rodim PPF where applicable.

## Contact handoff

The embedded Google Form remains the submission mechanism. The calculator now preserves its estimate handoff by storing the selected estimate in session storage, and the Contact page displays a summary above the Google Form so the visitor can submit the same treatment, vehicle category, and indicative total to Crest.

## Validation

| Check | Result |
|---|---|
| Astro check | Passed with 0 errors, 0 warnings, and 0 hints |
| Static build | Passed; 17 routes generated, including sitemap and robots |
| Playwright E2E | Passed; 17 tests |
| Browser preview | Homepage and carousel inspected; next-slide control successfully changed the active visual |
| Brand audit | No `Llumar`, `Garware`, `Proteq`, or `Carbins` references remain in source or built output |

The repository was updated locally from `concealedaaryan/carboutiqueauto` at the latest available commit. Changes have not been pushed back to GitHub.
