# Crest Automotive full overhaul blueprint

## Positioning

Crest should read as a private automotive care studio rather than a generic car wash. The visual language is editorial luxury: ink navy, warm champagne, ivory, and restrained graphite; large cinematic photography; fine rules; calm typography; generous whitespace; and one decisive action per section.

## Information architecture

The primary journey is Home → Services → Protection / Packages → Estimate → Contact. Locations, FAQ, Why Crest, and legal pages remain accessible but should feel like supporting evidence rather than competing destinations. Every public page should expose a breadcrumb, a short “what this is” explanation, a proof signal, and one obvious next action.

## Shared component system

Use local `.astro` primitives for section headings, breadcrumbs, service/choice cards, pricing rows, stat strips, image panels, proof/testimonial cards, native disclosures, sticky mobile booking, empty/loading states, and compact action bars. All interactive controls must retain native keyboard support, explicit labels, inert hidden panels, visible focus states, and reduced-motion behavior.

## Image system

Use a single coherent generated photographic language: dark architectural studio, graphite/black cars, champagne-gold practical lights, polished paint reflections, black gloves, close-up precision work, and clean negative space for copy. Planned assets: hero studio sedan, technician finishing paint, ceramic water-beading macro, PPF precision detail, wide studio location, interior-cabin finish, and community/location detail.

## Public routes

- `/`: premium studio hero, proof strip, three popular treatments, “choose your care” paths, quality promise, and decisive booking CTA.
- `/services`: catalog hero, grouped service cards, category pricing matrix, swipe/keyboard table region, and sticky estimate action.
- `/packages`: monthly-care hero, plan comparison cards, pricing matrix, “which rhythm fits” guidance, and contact handoff.
- `/protection`: protection decision guide, ceramic/graphene cards, PPF table, image proof, add-ons, and estimate action.
- `/estimate`: three-step explainer, empty-first calculator, visual summary, transparent GST note, and contact handoff.
- `/why-crest`: quality principles, process timeline, proof metrics, generated studio/process images, and booking CTA.
- `/locations`: DLF community cards, location-specific copy, map, directions, and selected-community contact handoff.
- `/faq`: native disclosure list, short answers, and contact transition.
- `/contact`: plain-language form, estimate/package/location context, direct phone/WhatsApp options, and clear confirmation state.

## SEO foundation

Add route-level title/description/canonical metadata, Open Graph/Twitter cards, `LocalBusiness` JSON-LD with service areas and opening hours, `Service` JSON-LD on major service/protection pages, `FAQPage` JSON-LD only where visible FAQs exist, `BreadcrumbList` JSON-LD for inner routes, sitemap and robots files, descriptive image alt text, stable dimensions/lazy loading, and local phrases such as premium car detailing in DLF Gurugram, The Camellias, The Crest, and The Magnolias.

## Acceptance criteria

The finished site must remain pure Astro, preserve the existing pricing data and interactions, avoid the previous hero-overlay problem, use one coherent art direction across every route, make the customer’s next action obvious, pass `astro check`, build successfully, pass the existing E2E suite, and show strong Lighthouse accessibility, SEO, and mobile performance scores.
