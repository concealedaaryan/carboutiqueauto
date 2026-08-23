# Warm Private Garage implementation map

## Approved direction

Warm Private Garage: a charcoal, graphite, brushed-silver, and warm-amber interface with cinematic automotive photography, tactile material cues, restrained motion, and a quieter premium hierarchy. The redesign should feel like entering a private detailing bay: confident, warm, considered, and easy to navigate.

## Shared shell

`src/layouts/SiteLayout.astro` will own the revised tokens, typography, header, desktop navigation, mobile navigation, CTA treatment, footer, focus states, selection state, backdrop treatments, and responsive content rails. Existing SEO metadata, JSON-LD, canonical handling, ClientRouter, chatbot mount, back-to-top control, sticky booking bar, and accessibility behavior remain intact.

The shell will use a warm neutral palette, a single restrained accent, a serif display face only for emphasis, and consistent width/spacing tokens. Decorative numbering will stay removed. Navigation remains visible by default, links remain un-underlined except intentional active/hover navigation treatment, and the primary CTA remains an estimate or enquiry path.

## Route mapping

| Route | Existing implementation to preserve | Warm Private Garage treatment |
|---|---|---|
| `/` | `HeroCarousel`, proof strip, popular-service cards, editorial sections, pathway cards, CTA | Convert the hero to a private-bay arrival composition; strengthen warm photography, simplify proof metrics, use tactile pathway cards, and keep the homepage concise. |
| `/services` | All 16 treatments, grouped chapters, service cards, full pricing matrix | Use broad catalogue chapters, natural card heights, warm image surfaces, readable price blocks, and stronger distinction between browse cards and the technical matrix. |
| `/packages` | Four monthly packages, pricing matrix, membership story | Use a membership-as-routine composition with warm studio imagery and clearer package comparison hierarchy. |
| `/protection` | Rodim-only PPF, coating cards, add-ons, warranty/pricing content | Make Rodim PPF the visual anchor with a film-installation hero, calm coating comparison, and clear technical pricing table. |
| `/estimate` | Client-side calculator, GST, add-ons, PPF options, query preselection, contact handoff | Give the calculator a warm, high-contrast control panel, preserve blank-first behavior, validation, live totals, and all exact pricing. |
| `/locations` | Google Maps embed, three communities, contact details | Use a private-studio location story, warm map framing, and simpler location cards. |
| `/contact` | Google Form iframe/fallback, session estimate summary, contact details | Make the enquiry handoff feel like a concierge desk with clear form context, summary state, and fallback link. |
| `/why-crest` | Full reasons, stats, CTA | Use a craft-and-process editorial layout with material details and restrained proof metrics. |
| `/faq` | Native accessible `details`/`summary` accordion | Retain native semantics, remove numbering, improve row rhythm, contrast, and focus/expanded states. |
| Legal routes | `LegalLayout.astro` and working-draft notices | Retain content and notices; align colors, typography, links, and spacing with the new shell where compatible. |

## Reusable components and assets

Reuse `HeroCarousel`, `ImageCard`, `ChoiceCard`, `ProofStrip`, `SectionHeading`, `BookingCalculator`, `Chatbot`, `BackToTop`, `StickyBookingBar`, `Breadcrumbs`, and `StructuredData`. Reuse the existing generated automotive images as approved project assets, assigning warm overlays and image crops rather than adding unnecessary new dependencies or frameworks.

## Responsive behavior

Use a shared desktop content rail with wide gutters, a tablet breakpoint that moves split layouts to one column before text becomes cramped, and a mobile layout with 20px gutters, full-width controls, natural card height, visible focus, and no horizontal overflow except explicitly scrollable pricing matrices. Preserve mobile navigation and reduced-motion behavior.

## Required states

The redesign must preserve and visually support empty-first calculator state, required-field validation, dynamic add-on visibility, calculator totals, Google Form/session summary handoff, FAQ open/closed states, mobile menu open/closed state, chatbot closed/open/unavailable states, loading/reveal transitions, keyboard focus, reduced motion, long service names, long pricing labels, and legal working-draft notices.

## Acceptance criteria

The implementation remains pure `.astro`, changes no business data or pricing, keeps all routes and links working, uses no React/Vue runtime, avoids decorative section/card numbering, maintains readable type hierarchy at desktop/tablet/mobile widths, preserves warm image contrast, passes `pnpm check`, `pnpm build`, and `pnpm test:e2e`, and is reviewed in a fresh browser preview before delivery.
