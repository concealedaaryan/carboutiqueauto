# Supplied screenshot audit

## Screenshots reviewed

### Screenshot2026-08-26211909.png

The services-page desktop view shows the main header readable, but service cards have a large amount of pale empty space and weak visual anchoring. Several prices in the upper-right corner are extremely faint against the white cards. The price/tag area competes with the decorative arrow and feels visually detached from the service copy. The service-copy CTA is also low contrast in the pale card treatment. The left connected-scroll marker is visible but visually disconnected from the content.

### Screenshot2026-08-26212933.png

The services hero is structurally clean but the right hero image panel is rendering as an almost completely blank white rectangle. Its bottom caption is also very faint, indicating either a missing/failed image background or an overlay/color issue. The hero heading is strong, but the body copy is wide and slightly low-contrast. The floating Crest AI control is visually detached from the hero and overlaps the bottom-right edge of the captured viewport.

## Initial cross-screenshot issues

1. Service pricing needs stronger contrast, dedicated layout space, and guaranteed separation from card arrows.
2. Light card copy and CTA links need stronger contrast.
3. The services hero media must visibly render an image or a deliberate dark/toned fallback rather than a blank white block.
4. The floating chatbot should not visually collide with important viewport content.
5. Continue checking repeated issues across the remaining screenshots before editing.

## Additional screenshots reviewed

### Screenshot2026-08-26213000.png

The service cards are breaking their content into narrow vertical columns, with titles such as “Premium waterless wash & wax” and “Interior cleaning (basic)” wrapping one word per line. This is a severe grid-width/layout failure. The cards reserve too much horizontal space for price or are being captured at an unintended narrow viewport state. The price itself is more readable here, but the card composition is unusable because title and description columns collapse.

### Screenshot2026-08-26213021.png

The memberships hero has the same blank white media-panel problem as the services hero. The large heading is strong, but the right-side package image/card has no visible visual asset, while its title is almost white and unreadable against the white panel. The hero body copy is acceptable but could use a tighter max width and more balanced vertical alignment.

## Confirmed patterns

The blank media-panel and pale text-on-light-panel failures repeat across routes. The service-card grid also has a responsive breakpoint or captured viewport mismatch that must be fixed at the source rather than handled per screenshot.

### Screenshot2026-08-26213025.png

The compact crop shows the monthly-memberships page label and breadcrumb rendered extremely faintly on the cream surface. The breadcrumb’s “Home” is nearly invisible while the slash and current label are only slightly stronger. This confirms a shared breadcrumb/page-label contrast issue.

### Screenshot2026-08-26213053.png

The “Four ways to keep the gloss going” section heading is constrained to an implausibly narrow column, wrapping almost every word onto its own line. The supporting copy sits far to the right with a large empty gap. This indicates a grid/flex column sizing failure, not a content problem. The section needs an explicit balanced two-column layout with a sensible heading max-width and a mobile breakpoint that stacks rather than collapses the heading column.

### Screenshot2026-08-26213109.png

The coating cards have strong titles and body copy, but their prices, warranty tags, and estimate links are very low contrast—especially the pale price figures and apricot CTA text against white cards. The small arrow in the upper-right is visually detached and adds noise. Prices should use a dark navy value style and each card should have a clear lower pricing/action zone.

### Screenshot2026-08-26213119.png

The Rodim catalog list is almost entirely washed out: variant names, supporting text, and some action links are nearly invisible on a cream background. Only the page heading and a few numbers remain readable. This is a shared typography/color override issue in the protection route, likely caused by a dark-theme text color being applied to a light chapter. Each row needs a clear navy title, muted but readable description/meta, and a defined action column.

## Confirmed patterns

Low contrast is not isolated to the footer or services page. Prices, tags, card actions, Rodim rows, breadcrumbs, and hero captions share pale-on-light failures. The correction should establish route-level light-surface text contracts with explicit navy ink, muted blue-gray body copy, darker apricot metadata, and no inherited white/gold text on light panels.

### Screenshot2026-08-26213129.png

The protection add-on cards show readable navy titles but almost invisible total prices, GST labels, and lower breakdown rows. The right-side numeric values are technically present but too pale to function as decision information. The cards need an explicit dark total-price treatment and readable row labels/values, with the CTA separated from the breakdown.

### Screenshot2026-08-26213152.png

The estimate hero has a strong first line, but the emphasized “Confirm together.” line is nearly invisible on the cream background. The “Review all services” link is also too pale. This confirms the animated/emphasized heading color and text-action hover/base tokens are still leaking low-contrast colors into light sections. The estimate route needs an explicit light-surface heading-emphasis and link contract.

### Screenshot2026-08-26213201.png

The estimate configuration hero repeats the same failure: “Built for your car.” is almost white and disappears into the cream background. The supporting copy is readable, so the problem is specifically the emphasized heading treatment rather than the entire section.

### Screenshot2026-08-26213210.png

The instant-estimate hero again has an almost invisible emphasized line, “precision.” The calculator preview card at right also renders its instructional/disabled-state copy nearly white on a white panel. The route needs a coherent light calculator surface with dark instructional copy, readable field labels, and a high-contrast empty-state message.

### Screenshot2026-08-26213226.png

The location hero image itself is strong and appropriately dark, but the caption panel below it is nearly white with a very faint emphasized line (“Private care, close to home.”). This repeats the light-surface emphasized-heading failure. The right information column is well structured, though its CTA should remain darker and more decisive.

### Screenshot2026-08-26213238.png

The contact hero heading and paragraph are readable, but the contact-person names and phone numbers near the bottom-left are nearly invisible. The names are pale on cream and the WhatsApp link is also too low contrast. Contact details need a distinct dark ink style and a small structured contact panel rather than relying on inherited muted colors.

### Screenshot2026-08-26213244.png

The compact “Service window” detail is nearly invisible: the `5 AM–6 PM` value and supporting line are too pale on cream. This is another shared fact-card/utility-text contrast failure that should be corrected through explicit dark ink tokens.

### Screenshot2026-08-26213253.png

The compact “Explore first” CTA is readable enough in apricot, but the supporting “Find your community” line beneath it is nearly invisible. The CTA block needs a readable supporting-copy color and better hierarchy on light surfaces.

## Consolidated issue categories

The supplied screenshots reveal six recurring problems: emphasized heading lines are too pale on cream; page labels and breadcrumbs are weak; hero/media caption panels frequently render blank or lose contrast; service, coating, protection, package, and add-on prices need protected dark-value zones; several grid layouts collapse text into implausibly narrow columns; and contact/fact/CTA supporting copy is too faint. The implementation should address these through shared route-level tokens and a small number of explicit layout contracts, then verify the affected routes at desktop and narrow widths.
