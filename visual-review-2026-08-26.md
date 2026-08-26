# Crest visual review — 26 August 2026

## Scope

Reviewed the 16 public routes: `/`, `/services`, `/packages`, `/protection`, `/why-crest`, `/faq`, `/locations`, `/contact`, `/estimate`, `/terms-of-service`, `/privacy-policy`, `/cookie-policy`, `/refund-cancellation`, `/grievance-redressal`, `/accessibility`, and `/disclaimer`.

## Contrast audit

The rendered audit inspected headings, eyebrows, body copy, links, prices, calculator values, contact notes, footer copy, image-card labels, and legal/supporting text. It reported **0 elements below the 3:1 warning threshold** among visible sampled elements.

The Trust by Address disclaimer resolves to `#526E83` at 13px with 1.6 line height. Its desktop section uses two balanced columns; the heading is 568px wide in the 1440px audit viewport instead of collapsing into a narrow word column.

## Mobile Trust by Address and walkthrough

At a 390px touch viewport, the document scroll width is 390px, so there is no horizontal page overflow. The Trust section stacks correctly at 390px wide; both the intro and supporting-copy columns are 350px wide with 20px side gutters. The studio walkthrough rail remains sticky at 72px with a 53px strip, and its horizontal track is 721px wide inside a 350px viewport with `overflow-x: auto`, `scroll-snap-type: x`, and `touch-action: pan-x`. Keyboard focus remains reachable on station links.

The mobile rail state machine behaves as intended: it is visible at rest, collapses while scrolling, reappears after approximately 850ms of idle time, and collapses again when scrolling resumes.

## Additional audit artifacts

- `scripts/audit-contrast-all-routes.mjs`
- `scripts/audit-mobile-trust-sidebar.mjs`
- `scripts/audit-mobile-rail-visibility.mjs`
- `/tmp/crest-all-route-contrast-report.json`
- `/tmp/crest-mobile-trust-sidebar-report.json`
- `/tmp/crest-mobile-rail-visibility-report.json`
