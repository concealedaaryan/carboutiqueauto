# Rodim PPF redesign browser audit

## Homepage

Previewed `http://localhost:4330/` after the Rodim-focused migration. The hero now presents `Crest Automotive · Rodim PPF`, the headline `Protection with precision.`, a primary `Explore Rodim PPF` CTA, a secondary estimate CTA, and the `Crest × Rodim.` trust note.

The hero carousel renders three background-image slides using the generated Crest studio, Rodim precision-installation, and studio-wide assets. It includes previous/next controls, three tab-style dots, readable captions, and a layered dark gradient overlay that keeps text legible. Clicking the next control successfully changed the visible image from the studio sedan to the Rodim precision-installation visual.

The homepage’s pathway card now says `Rodim PPF, ceramic, graphene and more.` The page still retains the concise service hierarchy, treatment cards, protection section, contact CTA, chatbot, and footer navigation.

## Validation

`pnpm check`: 0 errors, 0 warnings, 0 hints.

`pnpm build`: 17 static pages generated, including `/robots.txt` and `/sitemap.xml`.

`pnpm test:e2e`: 17 tests passed after updating the contact coverage for the embedded Google Form and adding carousel assertions.

## Implementation note

The PPF catalogue now contains only the seven Rodim/BASF Rodim rows and their existing retained prices. Non-Rodim brands were removed from the customer-facing catalog and AI system prompt. The calculator still supports PPF selection, size-based pricing, GST calculation, and the estimate-to-contact handoff; the Contact route now shows the handoff summary above the Google Form.
