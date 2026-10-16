# Client branding: the SOP

**For REKA's SOP. v1.0 · 16 Oct 2026 · decided by the owner.** Every REKA client project follows this from kick-off. Board: `mock/Branding.dc.html`.

**The rule.** If the client has a brand kit, the project adopts it. If not, it uses REKA's default: the neutral base (SPEC §3) with the client's logo and one colour from the default set. Either way, the bare minimum every application must have (SPEC §2, §4, and app SPEC §15 "Built right") stays the same, and the brand never overrides it.

## The steps

| # | Step | Who | Done when |
|---|---|---|---|
| 1 | **Ask** at kick-off: does the client have a brand kit (guidelines, logo files, colours, fonts)? | Project lead | The answer is in the kick-off notes, before any screen is drawn |
| 2a | **Yes: collect.** Logo as SVG in full colour, white and one colour; the mark alone if they have one · colours, and what each is for · typefaces and proof the licence covers web use · photography or illustration · tone of voice · letterhead · any app or site they already have | Project lead, from the client | Every item is in the project's `brand/` folder, or noted as missing |
| 2b | **No: REKA's default.** The neutral base · the client's logo, or their name set as a wordmark in IBM Plex Sans semibold · one primary from the default set (below), chosen with the client | Designer, with the client | The choice is in `client-brand.json` |
| 3 | **Map onto the base.** Their colours become the base's variables (`--primary`, a secondary for charts and highlights); their typeface replaces IBM Plex; their rounding within 4 to 12px. Write it once in `client-brand.json` at the project's root; the theme is generated from it | Designer | `client-brand.json` holds every brand value the project uses |
| 4 | **Standards check** (below). Where the brand fails a standard, the standard wins, and the fix is written in `client-brand.json` under `fixes` | Designer, then a reviewer | Every check passes; `tools/sync-brand-kit.py --project PATH` passes |
| 5 | **Client signs off** on the sign-in page and one working screen in their look, before the build goes wide | Project lead | The name and date are in `client-brand.json` under `signedOff` |

A change to the brand later goes through steps 3 to 5 again.

## What the brand decides, and what it never does

| The client's brand decides | Our standards decide, whatever the brand |
|---|---|
| The logo, and the wordmark beside it | Where things are: the top bar's order with Help and the account at the far right, the account menu, the standard pages (app SPEC §2 to §4) |
| The primary colour, and a secondary for charts and highlights | The shared words and roles |
| The typeface, where licensed for the web | Contrast: text 4.5:1, large text and controls 3:1. A brand colour that fails is darkened until it passes, for text and for buttons |
| Photography, illustration, the sign-in panel | A visible focus ring; 44px touch targets |
| The tone of the words on the project's own pages | Status colours by meaning (done, attention, problem), always with the word, never the brand colour |
| Letterhead on documents; how emails look | Every wait animated; forms, passwords, data handling, speed, security (app SPEC §15) |
| Corner rounding, within 4 to 12px; whether the top bar is light or in the brand colour | "Built by REKA" in the footer; YaraOne for help and feedback |
| | No AntaraX font, colour, mark or word |

## The default set

For a client without a brand kit. Each passes 4.5:1 with white text, and none is an AntaraX colour.

| Name | Primary | With white |
|---|---|---|
| Ink (until the client chooses) | `#1C1C1A` | 17.1:1 |
| Forest | `#2F5D3A` | 7.6:1 |
| Harbour | `#23466E` | 9.7:1 |
| Clay | `#8A4A2B` | 6.8:1 |
| Ochre | `#7A5A12` | 6.4:1 |
| Slate | `#3F4A5A` | 9.0:1 |

## `client-brand.json`

At the project's root. The theme is generated from it, and the colour check reads it: a colour listed there is the client's own, so it is allowed even if it happens to match an AntaraX colour. Example: [`mock/client-brand.json`](mock/client-brand.json).

| Key | Holds |
|---|---|
| `client`, `project` | Names |
| `source` | The brand kit and its version, or "No brand kit: REKA's default" |
| `logo` | Paths to the SVGs, or the wordmark |
| `colours` | `primary`, `secondary` and any tints the project uses |
| `fixes` | Every place a standard changed a brand value, and why |
| `type` | The typefaces and their licence |
| `radius` | 4 to 12px |
| `signedOff` | Who signed off for the client, and when |

## Notes

- A client's brand that happens to look like an AntaraX product is still the client's brand: the logo-swap test (SPEC §9) is about REKA's choices, not theirs.
- Fonts the client cannot license for the web are replaced with the closest licensed font, recorded in `fixes`.
- Never ask a client to adopt AntaraX or REKA branding. The only REKA mark in a client project is "Built by REKA" in the footer.
