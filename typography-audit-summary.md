# Typography harmonization audit

## Finding

The homepage is now harmonized locally, but the remaining public marketing pages still inherit a mixed heading treatment: the first portion of each H1 uses Inter while the `<em>` second portion uses DM Serif Display.

## Public marketing routes

| Route | Heading finding | Rendered hero description |
|---|---|---:|
| `/services` | H1 second line uses DM Serif Display | 15.84px |
| `/packages` | H1 second line uses DM Serif Display | 15.84px |
| `/protection` | H1 second line uses DM Serif Display | 15.84px |
| `/locations` | H1 second line uses DM Serif Display | 15.84px |
| `/faq` | H1 second line uses DM Serif Display | 16px |
| `/contact` | H1 second line uses DM Serif Display | 16px |
| `/why-crest` | H1 second line uses DM Serif Display | 15.84px |
| `/estimate` | H1 is Inter only; no mixed H1 font, but hero description is 16px | 16px |
| `/404` | H1 is Inter only; no mixed H1 font | 15.84px |

These pages use the shared `SiteLayout.astro` rule `main h1 em, main h2 em, main h3 em { font-family:'DM Serif Display', Georgia, serif; ... }`. The shared public hero description rules generally resolve to 15.84–16px, whereas the updated homepage hero description resolves to 19px on the audited desktop viewport.

## Legal routes

The seven legal pages use `LegalLayout.astro`. Their standalone H1 is entirely DM Serif Display at approximately 82px on desktop, while legal body headings use Inter and introductory paragraphs resolve to 16px. They are internally deliberate but are not typographically harmonized with the public marketing pages.

## Recommendation

If the desired direction is one consistent Inter system across the site, update the shared `SiteLayout.astro` `main h1/h2/h3 em` rule to Inter and raise the public hero-intro description group from 16px to approximately 17–18px, with a mobile value around 17–18px. Decide separately whether the legal pages should retain their editorial serif H1 or move to the same Inter treatment.

## Applied harmonization

The shared public `SiteLayout.astro` now forces all emphasized heading lines to use Inter, normal style, and the same 600 weight as their surrounding headings. Hero and introductory descriptions across the public marketing routes now use `clamp(17px, 1.25vw, 19px)` with a 1.6 line-height.

The legal `LegalLayout.astro` now uses Inter-only typography for the policy H1, legal-content H2/H3 headings, introductory copy, and body paragraphs. Legal H1s use a quieter `clamp(40px, 5vw, 64px)` scale, legal introductions use `clamp(17px, 1.25vw, 19px)`, body paragraphs and lists use 16px with 1.75 line-height, and secondary notices use 14px. The legal layout’s unused DM Serif Display font import was removed.

Final rendered audit results show Inter for the H1 and emphasized H1 line on all seven public marketing pages and Inter for all seven legal-page H1s and body headings. Public hero descriptions resolve to 18px on the audited desktop viewport; legal introductions resolve to 18px. `pnpm check` passed with 0 errors, 0 warnings, and 0 hints; the production build generated 17 pages; and Playwright passed all 18 tests.
