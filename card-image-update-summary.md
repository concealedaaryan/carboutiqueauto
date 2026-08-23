# Service and package card image update

Implemented image-backed treatments for every Service and Package card in the current pure-Astro repository.

## Card treatment

All 16 service rows on `/services` and all four package cards on `/packages` now receive explicit automotive image assignments through the `--card-image` CSS variable. The image set cycles through the existing generated Crest assets: detailing process, hero studio, Rodim precision installation, ceramic beading, and studio-wide imagery.

Each card uses a consistent dark layered gradient overlay so headings, descriptions, prices, metadata, and enquiry links remain readable against the photography. The overlay becomes stronger on smaller screens, and hover/focus states preserve the electric-blue premium interaction treatment.

The implementation remains pure Astro/CSS with no React or Vue dependencies and leaves the existing data model, pricing values, links, calculator, Google Form handoff, chatbot, transitions, legal pages, and Vercel configuration unchanged.

## Verification

| Check | Result |
|---|---|
| Astro check | Passed with 0 errors, 0 warnings, and 0 hints |
| Production build | Passed; 17 static routes generated |
| Playwright E2E | Passed; 17 tests |
| Services browser preview | All 16 service rows rendered with visible image-backed surfaces and readable gradients |
| Packages browser preview | All four package cards rendered with visible image-backed surfaces and readable gradients |
| Browser computed-style check | Confirmed card image variables and gradient pseudo-elements are active |
