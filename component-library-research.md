# Component library research

## bejamas/ui — https://ui.bejamas.com

The site demonstrates a copy-and-own Astro-native approach with zero framework runtime. Useful patterns include accessible inputs and labels, combobox/select affordances, tabs, feedback forms, cookie-management controls, skeleton/loading states, toasts, and compact command/search surfaces. The design language is restrained and systematized, with clear focus states and component-level examples.

## WebcoreUI — https://webcoreui.dev

WebcoreUI exposes a direct Astro import path and a wide catalog of static components plus optional interactive patterns. Useful Crest candidates include accordion, alert, badge, breadcrumb, card, data table, FAQ, form, hero, skeleton, sticky CTA, testimonial, pricing table, tabs, timeline, spotlight, and scroll progress. The library also makes the distinction between Astro, Svelte, and React implementations explicit; Crest should use only the Astro path or copy the markup/CSS into local components.

## Integration guardrails

Do not add React, Vue, or a client framework merely to consume a component. Prefer local `.astro` components with scoped CSS and small `is:inline` scripts only when interaction is needed. Use existing Crest data and routes as the source of truth. Prioritize patterns that make a booking decision easier: breadcrumbs, segmented service cards, comparison/pricing tables, FAQ disclosure, sticky mobile booking CTA, testimonial/proof cards, form field states, and skeleton/loading states.

## Astro Components Kit — https://astrocomponents.dev

Astro Components Kit reinforces a zero-JS, copy-paste architecture with accessible-by-default components and CSS custom properties. Useful Crest patterns include floating-label inputs, glass cards, alert/notice callouts, stat cards, segmented controls, rating/proof elements, gradient headings, navigation, tables, sticky CTA, and complete hero/CTA sections. The strongest fit is the local adaptation of glass cards, stats, sticky CTA, and accessible input states rather than importing a visually noisy cyberpunk style.

## Accessible Astro Components — https://github.com/incluud/accessible-astro-components

The repository is a strong reference for semantic component structure: skip links, breadcrumbs, buttons, cards, fieldsets, forms, inputs, textareas, modals, notifications, pagination, tabs, media, and keyboard/ARIA behavior. Crest should borrow the accessibility architecture—native controls, explicit labels, focus management, predictable disclosure—without taking on an unnecessary package runtime.

## daisyUI — https://daisyui.com

daisyUI demonstrates semantic component class naming, theme tokens, pure CSS controls, toggles, alerts, cards, and responsive layouts. Crest can borrow the ideas of semantic tokens, compact control variants, and consistent active/focus states, but should keep its own bespoke class names and luxury visual language rather than adding Tailwind/daisyUI to the existing Astro site.

## Flowbite — https://flowbite.com

Flowbite is useful as a reference for dark-mode-aware semantic tokens, responsive layout primitives, accessible controls, and copy-paste components. Its Astro integration exists, but Crest’s existing project does not need a full Tailwind migration; we can apply the dark-mode/contrast discipline locally.

## Preline UI — https://preline.co

Preline provides a large static HTML/Tailwind block library and an Astro integration guide. Useful patterns include advanced selects, accordions, badges, tables, switches, date/booking controls, hero sections, advanced forms, sticky nav, and content blocks. For Crest, the most relevant ideas are a clearer service-discovery hero, form grouping, sticky mobile action, accordion FAQs, and a consistent semantic spacing system.

## HyperUI — https://hyperui.dev

HyperUI is a strong source for simple marketing blocks: breadcrumbs, accordions, details lists, button groups, contact forms, cards, CTAs, badges, empty states, and dark-mode utilities. The useful Crest takeaway is restraint: one clear action per block, modest surface treatment, predictable responsive stacking, and less decorative chrome around important booking decisions.

## Tailwind UI / Tailwind Plus — https://tailwindcss.com/plus/ui-blocks

The public catalog highlights strong marketing information architecture: hero sections, feature sections, CTA sections, bento grids, pricing, stats, testimonials, contact, FAQs, footers, page headings, description lists, navbars, breadcrumbs, tabs, tables, sticky action panels, alerts, and empty states. Public access is sufficient for pattern research; premium code should not be copied without the proper license. Crest should adapt the information hierarchy, not reproduce proprietary source.

## Tailblocks — https://tailblocks.cc

Tailblocks offers simple category-driven blocks for hero, feature, pricing, statistics, steps, gallery, team, testimonials, and CTA sections. The strongest Crest takeaway is modular composition: each section has one job, a compact heading, and a clear next action.

## Meraki UI — https://merakiui.com

Meraki emphasizes responsive Tailwind components, elegant dark mode, accessible form patterns, skeleton states, pricing, breadcrumbs, alerts, and marketing heroes. Crest can borrow its use of explicit loading/empty states and high-contrast dark surfaces while keeping the existing bespoke automotive visual language.

## Selected local integrations for Crest

1. A reusable `SectionHeading` primitive for consistent eyebrow, heading, supporting copy, and action hierarchy.
2. A semantic `Breadcrumbs` primitive for service, package, protection, estimate, location, and legal pages.
3. A `ServiceCard` / `ChoiceCard` pattern with clear labels, price cues, hover/focus states, and single next actions.
4. A `StickyBookingBar` pattern on mobile and long service pages so booking remains visible without obscuring content.
5. An accessible `Disclosure`/FAQ pattern using native details/summary semantics and improved keyboard focus.
6. A `ProofStrip` / stats component and testimonials/quality-proof block to make trust visible before the first CTA.
7. Skeleton/empty states for the estimate checker, contact confirmation, and page transitions.

These will be implemented as local `.astro` components and CSS, not as a framework migration.
