# Crest Automotive Website — Final UX Audit Report

**Author:** Manus AI  
**Audit perspective:** A first-time, non-technical customer trying to understand services, compare prices, build an estimate, and make a booking enquiry.  
**Audit date:** 22 August 2026  
**Preview environment:** Local Astro development server at `http://localhost:4322`

## Executive summary

The complete Crest Automotive site was previewed in a real browser across every public page, every legal route, and an invalid route. The audit covered both desktop and mobile layouts, with particular attention to the booking journey rather than only visual polish. The site’s core story is strong: the navy-and-gold identity feels premium, the homepage is intentionally concise, service and protection details are separated into dedicated pages, and the calculator provides a useful price-to-enquiry path.

The highest-impact issues were not content gaps but small moments of uncertainty: the Contact submit control was falling back to the browser’s default styling, the mobile pricing tables did not explain that they were horizontally scrollable, location enquiries did not remember the selected community, the Back to top control did not return immediately, and the 404 route incorrectly looked like a legal-policy page. These issues were corrected. Legal inline links were also rechecked so that regular links remain free of underlines while intentional active indicators remain intact.

> The site is now in a substantially more customer-ready state, but the Contact page still correctly identifies itself as a frontend-only preview. A live form endpoint or CRM integration is required before real enquiries can be received.

## Browser coverage

The audit visited the following route groups at both **1440×900 desktop** and **390×844 mobile** sizes: the homepage, Services, Packages, Protection, Estimate, Why Crest, Locations, FAQ, Contact, all seven legal-policy pages, and a deliberately invalid route for 404 recovery. The interactive pass additionally exercised the mobile menu, service calculator, PPF reveal, PPF film and size recalculation, calculator-to-contact handoff, FAQ accordion, Contact form, chatbot open/close states, Back to top, and legal-link styles.

| Area audited | Result | Customer interpretation |
| --- | --- | --- |
| Homepage hierarchy | Pass after review | Premium first impression with clear service and estimate entry points. |
| Dedicated navigation | Pass | Every major navigation item has its own route. |
| Services catalogue | Pass with mobile improvement | All 16 services and the complete category matrix remain available; mobile tables now explain horizontal scrolling. |
| Packages | Pass with mobile improvement | Four packages are easy to compare; the mobile matrix now exposes its swipe affordance. |
| Protection and PPF | Pass with mobile improvement | Coatings, add-ons, and all 15 PPF options remain available; film names stay visible while comparing columns. |
| Estimate calculator | Pass | Category, service, add-ons, PPF film, PPF size, GST, total, and handoff were verified. |
| Contact form | Pass for preview mode | Required fields are clearer, the submit control is branded, and context handoff is preserved. Live delivery is intentionally not enabled. |
| FAQ accordion | Pass | Closed questions open correctly and expose readable answers. |
| Chatbot | Pass for client behavior | Launcher, panel, close state, ARIA state, and local unavailable-endpoint fallback behave safely. |
| Back to top | Pass after refinement | The control returns immediately to the top instead of waiting for smooth scrolling to finish. |
| Legal pages | Pass | Working-draft and attorney-review framing is preserved; inline links no longer use underlines. |
| 404 recovery | Pass after refinement | Error pages now point customers to Home, Estimate, Services, and Contact instead of showing legal-policy content. |
| Media and layout sweep | Pass | No broken local images were found. Intentional pricing-table overflow is contained within scroll regions. |

## First-time-customer findings and refinements

### Booking confidence and Contact form

The Contact page initially presented a clean layout but did not identify required fields, and its submit button rendered with browser-default styling because shared button CSS was scoped away from slotted page content. The form now shows a clear required-field note, marks Full name and Phone number, uses browser autocomplete hints, applies the same rounded gold gradient as the rest of the site, and explains the frontend-only preview state more directly.

The Contact page also now accepts context from location cards. Selecting “Ask about availability” for The Camellias, The Crest, or The Magnolias opens Contact with that community preselected, reducing repetition and the chance of a vague enquiry.

### Calculator and PPF interaction

The calculator was tested with category changes, treatment changes, leather conditioning, ceramic add-ons, PPF activation, film selection, size selection, GST, and the Contact handoff. PPF activation reveals its required film and size controls and updates the estimate. The handoff preserved the selected service, vehicle category, PPF choice, size, and GST-inclusive total in the Contact message.

The mobile experience now makes dense comparison tables more understandable by showing a plain-language instruction to swipe sideways, adding keyboard-focusable table regions, and keeping the first label column sticky while other columns move. This is especially important for customers comparing packages or PPF films on a phone.

### Navigation, widgets, and long pages

The mobile menu was verified to open, update `aria-expanded` and `aria-hidden`, lock body scrolling, and navigate to Estimate correctly. The FAQ disclosure was checked with a closed question and opened successfully. The chatbot opens and closes with synchronized ARIA state. Back to top was refined to temporarily disable smooth scrolling for its click action, returning from a scroll position near 6,000 pixels to the actual top immediately.

The decorative cursor glow is disabled on touch-sized screens so it cannot create an unnecessary overflow candidate or compete with content. Desktop header navigation retains the intentional gold pseudo-element indicator for hover and active-page states. Regular content, footer, social, and legal links remain visually clean with no underline.

### 404 recovery and trust

The invalid route previously used the legal layout, which caused a lost visitor to see an effective/reviewed date and an attorney-review disclaimer on an error page. It now uses the normal Crest site layout with a clear “Page not found” explanation, a visual 404 treatment, direct Home and Estimate buttons, and secondary links to Services and Contact.

The Why Crest page’s “Meet the team” button was also inaccurate because it led to the general Contact page. It is now labeled “Talk to the team,” and a second bottom-of-page booking CTA gives a hesitant visitor an obvious next action after reading the trust content.

## Remaining launch considerations

The form’s preview confirmation is intentionally honest: it does not claim that a real message was delivered. Before launch, connect the form to the intended email, CRM, or Vercel-compatible endpoint and replace the preview copy with the actual response expectation. Replace the Instagram and Facebook placeholders with the business’s real profiles. Replace bracketed legal entity, address, and support details in the working-draft policies after qualified legal review.

The Google Maps iframe is present on Locations and points to The Crest DLF Gurugram. The final production preview should confirm that the deployed domain’s embedding policy, map loading, and directions experience are acceptable on the target browsers. The Premium-tier sun-film price remains explicitly flagged for confirmation because it is reproduced as supplied in the source catalogue.

## Verification record

| Verification | Result |
| --- | --- |
| `pnpm check` | 0 errors, 0 warnings, 0 hints across 22 Astro files. |
| `pnpm build` | 17 static pages generated successfully. |
| Existing E2E suite | 17/17 tests passed in 8.4 seconds. |
| Browser route sweep | 34 route/viewport combinations inspected. |
| Interactive browser audit | Navigation, calculator, PPF, FAQ, form, chatbot, Back to top, table region, and legal-link checks passed. |

## References

No external research was required for this report. Findings are based on direct browser inspection and automated interaction checks against the local Crest Automotive Astro project.
