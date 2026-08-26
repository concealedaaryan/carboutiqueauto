# Crest Automotive Care — Design System

> **Design intent:** The Crest website should feel like entering a considered luxury detailing studio. The interface is organized as a sequence of purposeful stations: arrival, intake, preparation, protection, correction, handover, standards, service desk, and concierge. Every visual treatment must help the visitor orient themselves, understand the work, compare options, or take the next useful action.

## 1. Brand character

Crest is presented as an in-house automotive care studio serving DLF The Camellias, DLF Crest, and DLF The Magnolias in Gurugram. The design should feel precise, calm, fresh, and materially aware. It is not a generic black luxury template and it should not rely on decorative glassmorphism without a reason.

The visual system balances two environments. Fresh, light surfaces are used for reading, comparison, service selection, and handover confidence. Dark workshop zones are used for vehicle imagery, protection, correction, material context, and moments that should feel focused or technical. Translucent glass is selective: it should indicate a floating control, a station instrument, or a layer above an image.

## 2. Color palette

### Core tokens

| Token / role | Hex value | Use |
|---|---:|---|
| Concierge cream | `#F8F8F4` | Primary page canvas, readable public background, mobile menu |
| Concierge cream deep | `#F0F3F1` | Soft alternate canvas, legal footer, preparation surfaces |
| Concierge navy | `#123D66` | Primary headings, navigation, primary actions, trust bands, dark section surfaces |
| Concierge navy deep | `#0C2D4A` | Hover state for primary buttons, dark utility zones, high-contrast emphasis |
| Concierge ink | `#17324D` | Default dark text, strong inline emphasis, body-level contrast |
| Concierge muted | `#5D7183` | Paragraphs, supporting copy, descriptions, secondary information |
| Concierge line | `#D9E0DC` | Rules, card borders, dividers, input borders, navigation boundaries |
| Concierge mint | `#EFF3F1` | Soft glass surfaces, preparation/maintenance panels, completion states |
| Concierge mint signal | `#8EB9A1` | Active/completed station states, status dots, focus support, process accents |
| Concierge apricot | `#E49B57` | Primary signal color, eyebrow rules, CTA accents, animated text accents |
| Concierge apricot soft | `#FFF5E9` | Warm light chapter, notice panels, handover and reassurance surfaces |
| Concierge blue soft | `#EEF3F8` | Protection lab, comparison, FAQ, and technical reading surfaces |
| Header link blue | `#47637C` | Default navigation and utility link text |
| Link blue | `#385B78` | Text links, service actions, secondary navigation |
| Small-label blue | `#6F808B` | Metadata, captions, station sublabels, legal secondary text |
| White | `#FFFFFF` | Text on navy surfaces and primary button text |
| Warm white | `#FFFAF3` | Loader and dark workshop text |

### Usage ratios

The page canvas should remain mostly cream or one of the light chapter surfaces. Navy should be used for concentrated bands, headings, navigation actions, and selected work zones rather than as a constant full-page background. Dark boundary anchors also appear as station rules, proof bands, process-card caps, and selected work-zone surfaces so the light chapters have a clear rhythm and do not flatten into one pale field. Apricot should be a signal, not a general fill: it marks the primary action, a station rule, an active accent, or a small confidence cue. Mint should communicate calm, progress, and maintenance. Blue-soft should indicate explanation, comparison, or technical decision-making.

### Color combinations

| Context | Background | Primary text | Accent | Border |
|---|---|---|---|---|
| Public reading surface | `#F8F8F4` | `#123D66` | `#E49B57` | `#D9E0DC` |
| Dark workshop zone | `#123D66` or `#0C2D4A` | `#FFFFFF` / `#FFFAF3` | `#E49B57` | `rgba(255,255,255,.16)` |
| Fresh glass panel | `rgba(255,255,255,.62)` | `#123D66` | `#8EB9A1` | `rgba(255,255,255,.72)` |
| Technical panel | `#EEF3F8` | `#123D66` | `#8EB9A1` | `#D9E0DC` |
| Warm reassurance panel | `#FFF5E9` | `#17324D` | `#E49B57` | `#E8D5BD` |
| Legal notice | `#EFF3F1` | `#5D7183` | `#A76535` | `#D9E3DF` |

## 3. Typography

### Font family

The primary and only interface family is **Space Grotesk**, loaded from Google Fonts in the shared public and legal layouts. The fallback stack is `ui-sans-serif, system-ui, sans-serif`.

```css
font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
```

Space Grotesk is used consistently for navigation, headings, descriptions, labels, prices, forms, legal copy, buttons, and metadata. No serif font is used in the current unified system, and emphasized heading lines do not switch to a second family.

### Type scale

| Element | Desktop | Mobile | Weight | Color |
|---|---:|---:|---:|---|
| H1 | `clamp(42px, 5.6vw, 76px)` | `clamp(38px, 11vw, 54px)` | 600 | `#123D66` or white in dark zones |
| H2 | `clamp(32px, 4vw, 52px)` | `clamp(30px, 9vw, 42px)` | 600 | `#123D66` or white in dark zones |
| H3 | `clamp(20px, 1.8vw, 26px)` | 20–21px | 600 | `#123D66` or white in dark zones |
| Intro description | `clamp(18px, 1.5vw, 21px)` | 18px | 400–500 | `#5D7183` |
| Standard paragraph | 16px | 15–16px | 400 | `#5D7183` |
| Legal paragraph | 16px | 16px | 400 | `#5D7183` |
| Small metadata | 13px | 12–13px | 400–600 | `#6F808B` |
| Eyebrow / station label | 12px | 11–12px | 600 | `#A76535` |
| Navigation | 12px | 15px in mobile menu | 500–600 | `#47637C` / `#123D66` |
| Button text | 13–14px | 13–14px | 600 | white on navy or navy on light |

Headings use a negative tracking value of approximately `-.05em` to create a compact editorial silhouette. Body copy uses a line height around `1.6–1.75`. Text should wrap naturally; animated treatment must never reduce readability or hide content from assistive technology.

## 4. Layout and spacing

The principal content width is `1280px` with horizontal padding of `20px` on small screens and a fluid desktop gutter. Section padding generally falls between `72px` and `112px` vertically. Mobile section padding generally falls between `48px` and `84px`.

The layout is intentionally asymmetrical when an image or operational detail benefits from emphasis. Hero content commonly uses a split between copy and a rounded image frame. Cards are used only when the content benefits from comparison or grouping; the homepage station sequence should not become a repeated wall of identical cards.

## 5. Surfaces and shape language

Rounded corners indicate a real surface or control. Primary action buttons use full pill geometry with `border-radius: 999px`. Hero media uses large rounding around `2.25rem`, with the internal image frame around `1.6rem`. Glass panels use approximately `1.0–1.35rem` rounding. Content cards should use smaller radius values unless they represent a floating station instrument.

Glass surfaces use a translucent white or mint-tinted background, a visible light border, and a restrained shadow. `backdrop-filter: blur()` is reserved for sticky navigation, station controls, and floating panels. It should not be applied to every section.

```css
background: rgba(255, 255, 255, .62);
border: 1px solid rgba(255, 255, 255, .72);
backdrop-filter: blur(18px) saturate(130%);
box-shadow: 0 22px 55px rgba(33, 58, 68, .13);
```

## 6. Navigation

The global desktop header is sticky, 76px tall, and uses a translucent cream surface with a subtle line beneath it. The brand is a text wordmark: `CREST` with `AUTOMOTIVE CARE` as a small submark. The primary navigation includes Services, Packages, Protection, Estimate, Locations, and Contact. The evaluation action is visually separate from ordinary navigation.

The mobile header is 72px tall. The menu opens as a full-height cream panel with large readable links and a single evaluation button. The homepage additionally has a studio station strip. At desktop it is a vertical glass rail; below 1040px it becomes a sticky horizontal touch strip beneath the header.

The mobile station strip uses horizontal overflow, `touch-action: pan-x`, momentum scrolling, x-axis scroll snapping, edge spacing, and safe-area padding. The active station receives a pill surface and is smoothly centered after a station tap. Station synchronization is driven by throttled scroll-position logic so smooth anchor navigation does not produce active-state jitter. On the homepage, the rail is a visibility-aware instrument: active scrolling tucks it away to protect reading space, a short scroll pause brings it back for orientation, and it collapses again after the visitor has resumed moving. Pointer hover, keyboard focus, and station taps can also bring it forward; reduced-motion mode keeps it persistently available.

## 7. Studio station sequence

The homepage uses the following ordered stations:

| Number | Station | Purpose | Typical surface |
|---:|---|---|---|
| 01 | Arrival / front desk | Establish Crest, orient the visitor, and offer the first action | Fresh cream + framed dark media |
| 02 | Vehicle intake bay | Explain location, vehicle context, and starting point | Light trust surface |
| 03 | Preparation bay | Explain what happens before treatment | Mint preparation surface |
| 04 | Protection lab | Help visitors compare Rodim protection options | Blue-soft technical surface |
| 05 | Correction bay | Explain process and material context | Deep navy work zone |
| 06 | Handover inspection | Make accountability and result verification visible | Warm apricot-light surface |
| 07 | Crest standard | Explain technician inspection, owner check, and support | Fresh reading surface |
| 08 | Service desk | Answer high-intent questions | Blue-soft FAQ surface |
| 09 | Concierge desk | Convert understanding into a consultation | Deep navy closing surface |

Each station must have a visible reason to exist, a clear heading, enough context to answer a real customer question, and one logical next action. Station numbers and connector rules are information cues, not decoration.

## 8. Motion and text effects

Motion should communicate entry, hierarchy, progress, or interaction. It should not make body copy difficult to read.

### Loading screens

The homepage intro loader is a studio boot sequence with a dark navy workshop gradient, calibration grid, scanning light, geometric mark, wordmark, progress line, and changing status copy:

> CALIBRATING THE STUDIO → SETTING THE LIGHT → PREPARING YOUR FINISH

It runs once per session and is suppressed on repeat navigation. Reduced-motion mode removes the grid and scan animations and shortens the experience to a simple readable fade.

Route transitions use a dark studio shutter with a calibration line and a progress sweep. Transitions are short, should never block navigation unnecessarily, and have reduced-motion fallbacks.

### Typing effect

Typing is reserved for the short homepage eyebrow `Crest Automotive Care · Rodim PPF`. The visible typed span is paired with a screen-reader-only full text alternative. The caret disappears after completion. Long headings and paragraphs are never typed character-by-character.

### Heading effects

Public headings use a clip-and-rise reveal when entering the viewport. Emphasized lines use a one-time apricot-to-mint sweep and a small underline draw. The effect is strongest on hero and section headings and should not be applied to every line of text.

### Interaction effects

Buttons use a restrained highlight sweep, lift by approximately 2px on hover, and show a visible focus outline. Text actions move their arrow by a few pixels to confirm direction. The studio station label changes with a short opacity/translate transition. Service and comparison cards may lift slightly, reveal a directional arrow, or show a pointer-aware light; these effects must preserve the content hierarchy. There is no global cursor-following glow. On supported fine-pointer devices, card-like surfaces respond locally with an apricot/mint radial highlight, a restrained border lift, and a few-pixel heading or label response based on the cursor position inside that surface. Keyboard focus uses the same surface response through `:focus-within`; touch devices receive the border and lift treatment without pointer tracking.

### Connected-body scroll

The homepage and public routes share a living scroll state rather than treating each section as an isolated reveal. The shell tracks page-level progress in `--body-scroll-progress`, moves a restrained vertical studio thread through that progress, and shifts the ambient apricot light position to give the page a single spatial continuity. Each main section receives `--section-focus`, `--section-enter`, `--section-exit`, and `--section-progress` values. The section nearest the reading line remains fully present; the outgoing section subtly lifts and gains a lower handoff shadow as its lower edge leaves the reading line; the incoming section receives a restrained top-edge signal. These effects use only transform and opacity for scroll-linked movement and remain subordinate to content.

The connected state is applied to all main sections, including non-station bridge bands, so proof bars and supporting chapters participate in the same body. The homepage station rail remains the explicit orientation instrument; it continues to use its own active/completed state and shares the same scroll position model. Dark correction and concierge stations keep white heading and copy contrast while participating in the handoff choreography.

### Reduced motion

All decorative motion is disabled or reduced under `prefers-reduced-motion: reduce`. Content remains visible without requiring an animation to finish. Smooth anchor scrolling becomes instant, entrance transforms are removed, and decorative shimmer/caret effects are disabled.

## 9. Accessibility and interaction states

All interactive controls must retain a visible keyboard focus ring using an apricot outline with a minimum 3px width and a 4px offset. Active navigation states must be communicated by more than color alone where possible. Station links expose `aria-current="step"`. Mobile navigation controls expose `aria-expanded`, `aria-controls`, and `aria-hidden`/`inert` states.

Images require meaningful alt text when they communicate service or studio context. Decorative textures and grids use `aria-hidden="true"`. Status loaders use `role="status"` and `aria-live` where appropriate, while visible typing is paired with accessible static text.

## 10. Implementation references

The current source of truth for these rules is distributed across:

- `src/layouts/SiteLayout.astro` — public tokens, navigation, station rail, responsive shell, and global motion/text rules.
- `src/layouts/LegalLayout.astro` — records-room legal variant using the same Space Grotesk and concierge palette.
- `src/components/IntroLoader.astro` — homepage studio boot sequence.
- `src/components/PageTransition.astro` — route-transition shutter and calibration animation.
- `src/pages/index.astro` — homepage station anchors and ordered studio walkthrough.
- `src/pages/services.astro` — service-card scroll and pointer interaction layer.
- `studio-walkthrough-map.md` — station architecture and content purpose.
- `authored-studio-system.md` — rationale for the authored studio system and motion language.

This document describes the implemented design system. When adding new pages or components, prefer extending these tokens and behaviors rather than introducing a new color family, font, radius language, or unrelated animation vocabulary.
