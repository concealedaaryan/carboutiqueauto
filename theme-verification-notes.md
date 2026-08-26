# Concierge theme verification notes

The reference theme has been integrated into the shared public and legal shells, and the Astro build passes. Browser verification at `http://localhost:4321/` shows the header, body surface, navigation, primary action, and description text using the warm concierge system.

A computed-style check found a legacy page-local heading rule still winning over the final shared override on the homepage: the first `main h1` and `main h2` resolve to Inter with warm-white text (`rgb(245, 239, 232)`) instead of Space Grotesk with service-navy text. The page-local rule is emitted after the shared layout style for the slotted page, so the next fix must use a stronger global selector or add a page-level final style layer.

The hero description resolves to Space Grotesk at 17.28px with a warm muted color, and the main body also resolves to Space Grotesk at 17.28px. The button resolves to Space Grotesk at 13px with a navy/white treatment. The intro loader is present but `display:none` with opacity 0, so it is not responsible for the heading color issue.

After correcting the directive to `<style is:global>`, browser verification confirmed the warm concierge theme is visually applied. The homepage has a cream canvas, service-navy headings, Space Grotesk, a rounded mint/apricot hero image frame, navy primary CTA, compact wordmark, and soft status strip. The legal Terms page uses the same cream/navy system with a readable two-column policy layout, sticky legal navigation, mint notice panel, and evaluation CTA. The annotated browser screenshot shows the intended reference styling; green/yellow outlines are the browser inspection overlay, not site UI.

Current build state: Astro check and production build both pass with 0 diagnostics, and 17 static pages are generated.

After the visual-character pass, the rendered homepage verifies the intended changes: the desktop navigation is a visible rounded capsule with a mint background; headings use service navy; the emphasized second heading line is still Space Grotesk but now uses warm apricot/sage underline treatment; the hero image frame has a 36px concierge radius; and hero/reveal elements have active cubic-bezier entrance animations and transitions. The current homepage has no `.is-current` nav link because currentPath is `/`, which is expected for the route-level nav implementation.
