# Authored studio experience system

The website behaves like a digital walkthrough of a real luxury detailing studio. The visitor moves through a clear sequence rather than an arbitrary stack of sections. Each station has one job: orient, diagnose, prepare, treat, protect, verify, maintain, answer, or convert.

## Visual grammar

The base is a fresh mineral canvas for readable customer decisions. Workshop zones use deep navy/graphite and hold the strongest imagery. Glass panels appear only when they describe a station, comparison, or instrument. A glass surface is always paired with a visible edge, a numbered station, or a practical interaction; no blur is used as decoration.

## Station language

A fixed desktop studio rail communicates the sequence and current position on the homepage. Each station section carries a numbered label and a short name. The rail progresses using scroll position and activates the current station. On mobile, the same sequence becomes a compact horizontal station strip above the relevant content rather than a fixed control.

## Motion language

The entry loader is a 1.5–2.0 second studio boot sequence: calibration lines, a scanning beam, and the wordmark resolving from workshop darkness. It is skipped on repeat visits in a session and collapses to a short fade for reduced-motion users.

Page transitions use a glass shutter and a horizontal calibration line. Scroll reveals are staggered and tied to station entry. Images have restrained depth movement. Cards lift only when the action or information inside them is available. Text effects are limited to a line-draw accent and subtle label tracking; no effects compete with reading.

## Navigation language

Desktop navigation is a visible console capsule with a current-page state, a separate phone/status channel, and a single evaluation action. The homepage rail handles station orientation; the global nav handles destination changes. Mobile uses a full-height navigation panel with a large station index and one persistent evaluation action.

## Information architecture

The homepage order is Arrival → Intake → Preparation → Protection lab → Correction bay → Handover inspection → Crest standard → Service desk → Concierge. Inner pages preserve the same visual language but use their own task sequence. Legal pages use the records-room variant with reduced motion and a quiet reading surface.

## Verification note

The rendered homepage now exposes a visible studio walkthrough rail with nine numbered stations. The rail updates its current station label as the visitor moves through the page and direct links preserve the existing semantic anchors for PPF education, the Rodim range, and the FAQ. The Protection station link was browser-tested and navigated to `#rodim-range` with the rail label updated to `Protection lab`. The authored loading and route-transition components include calibration-grid, scan-line, progress, and status-copy treatments with reduced-motion fallbacks. Astro diagnostics, the 17-page production build, and the 18-test Playwright suite pass.
