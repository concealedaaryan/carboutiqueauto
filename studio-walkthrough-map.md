# Crest studio walkthrough map

## Core concept

The website should feel like the visitor is entering a real luxury detailing studio and moving through its stations in the correct order. Every section is a station with a job. The visual language is translucent architectural glass over dark workshop depth, with fresh light surfaces used where customers make decisions and darker zones used where craft, protection, and concentration are the subject.

## Homepage sequence

| Order | Studio station | Customer question answered | Visual treatment | Primary next action |
|---|---|---|---|---|
| 01 | Arrival / front desk | Where am I and what happens here? | Bright glass entry panel, studio wordmark, clear navigation, one evaluation action | Start an evaluation |
| 02 | Vehicle intake bay | What is the right starting point for my car? | Dark photo bay with condition notes, vehicle category, owner objective, and three-community access | Tell us about your car |
| 03 | Wash and preparation bay | What happens before any treatment? | Cool translucent process panel with preparation steps, waterless-care explanation, and real service links | Explore services |
| 04 | Correction bay | How is paint clarity restored? | Focused dark work zone with inspection lighting, process evidence, and before/after framing | Explore correction |
| 05 | Protection lab | Which protection is right: film, ceramic, or graphene? | Glass comparison console over deep blue/graphite surface, Rodim options, fit guidance, and warranty context | Compare protection |
| 06 | Handover inspection | How do I know the result is accountable? | Bright inspection glass with technician check, owner-level final check, handover note, and aftercare | See the Crest standard |
| 07 | Studio network | Where can I access Crest? | Fresh light location panel with three connected DLF community nodes and practical contact actions | Find your studio |
| 08 | Concierge desk | What should I do now? | High-contrast final consultation panel with phone, WhatsApp, estimate, and contact routes | Discuss your car |

## Inner-page sequence

| Route | Studio metaphor | Purpose |
|---|---|---|
| `/services` | Treatment floor | Service groups arranged from daily care to correction/protection, with price context and direct estimate actions |
| `/packages` | Care plan desk | Monthly cadence and category pricing presented as a calm planning surface |
| `/protection` | Protection lab | Film/coating comparison, Rodim range, installation logic, and maintenance context |
| `/estimate` | Intake console | One decision at a time with persistent summary and clear confirmation boundary |
| `/locations` | Studio directory | Three DLF communities presented as one in-house network with clear access actions |
| `/why-crest` | Standards room | Proof of process, inspection, communication, and aftercare rather than generic claims |
| `/faq` | Service desk | Grouped answers by decision stage with related routes |
| `/contact` | Concierge desk | Short, calm enquiry path with a clear physical-evaluation expectation |
| Legal routes | Records room | Quiet long-form reading surface with persistent contents navigation and no promotional clutter |

## Materials and depth

- **Workshop dark:** `#0d1822` and `#102536` for hero imagery, correction, protection, and technical work.
- **Fresh glass:** `rgba(255,255,255,.62)` over `#f6f8f5` for intake, decisions, service planning, and handover.
- **Cool glass:** `rgba(238,243,248,.78)` for comparison tables, package planning, and FAQs.
- **Trust navy:** `#123d66` for headings, navigation, primary actions, and high-confidence moments.
- **Apricot signal:** `#e49b57` for the single primary action and small warmth cues.
- **Mint signal:** `#8eb9a1` for completion, maintenance, and aftercare states.

Glass is used as a surface hierarchy, not a blur effect everywhere. Dark zones should hold the image and craft story; light zones should carry readable decision content. Borders should be translucent and intentional. Shadows should suggest depth only where a glass panel floats above a work zone.

## Interaction principles

The visitor should always know which station they are in, what the station is for, and what the next useful action is. Station markers use a visible sequence number and a thin connector rule. Cards should not float randomly; they should lock into the station’s architecture. Hover reveals should expose more information or direction, not merely scale the box. Scroll motion should move the visitor through the studio: station labels settle in, glass panels lift from the background, image crops drift slightly, and the connector line progresses. Reduced-motion mode must show the same hierarchy without transforms.
