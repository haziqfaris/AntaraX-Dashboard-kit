<!-- values for AppBar.dc.html, source 3bc44ea8d889edf2 -->
# AppBar: values

The top bar every customer app shares (SPEC §2). Renders: `renders/AppBar-<product>-<wide|phone>[-dark].png`. All of it is **shell**: tokens in `app/tokens.css`, built in `reference/`.

## The bar

| Part | Wide (1280) | Phone (390) | Token `--shell-…` |
|---|---|---|---|
| Gutter | 14px 20px 0 | 8px 12px 0 | `bar-outer-padding` |
| Height | 64px | 58px | `bar-height` |
| Inside | 0 10px 0 7px; items 8px apart | same | `bar-inner-padding`, `bar-gap` |
| Radius | 24px (Janka 20, AX Frame 16, Angka 28) | 20px | `bar-radius` |
| Edge | 1px solid `line` | same | `bar-border-width` |
| Shadow | 0 10px 28px -20px rgba(11,27,79,.35) | same | `bar-shadow` |
| Surface | `surface` (white; #0C1B47 dark) | same | `surface` |
| Flat bar (Tinara) | no gutter, radius 0, no shadow, bottom edge only, inside 0 16px 0 12px | same | recorded exception |

## Left side

| Part | Value | Token |
|---|---|---|
| Menu button | 44px round, 1px `line`, `well` fill, 18px icon; phone or drawer widths only | `control-round` |
| Pill well | padding 4px, radius 16px, gap 2px, `well` fill, 1px `line` | `pill-well-*` |
| AntaraX A | link 32 × 38px, radius 12px, A at 21px; blue A on light, white A on dark | `pill-a-*` |
| Product chip | 38px tall, radius 12px, padding 0 12px 0 7px (phone 0 7px, mark only), `subtle-tint` fill, name 16px / 600 / −0.01em in `ink` | `pill-chip-*` |
| Mark tile | 24px, radius 7px, white in light and dark, mark at most 18px | `pill-mark-*` |
| Page title | 12px after a 1px `line` divider; h1 18px / 600, ellipsis; wide only | `title-*` |

## Right side, in this order

| # | Part | Value | Token |
|---|---|---|---|
| 4 | Product slot | buttons 40px tall (44px hit area), radius 12px, padding 0 12px, 13px / 600, 6px apart; action button on `action` with `on-action` text, quiet button on `surface` with 1px `line`; hidden on phones | `control-slot-*` |
| 5 | Search | wide: field 210 × 44px, radius 14px, `well`, 1px `line`, ⌘K chip; medium: 44px round control; phone: in the navigation | `search-*` |
| 6 | Notifications | 44px round, `well`, 1px `line`; count 18px on `action`, 10px / 600 mono | `control-round`, `badge` |
| 7 | Help | 44px round, `well`, 1px `line`; open: `subtle-tint` fill and `action` edge | `control-round` |
| 8 | Account | 44px round, `action` fill, initials 14px / 600 in `on-action`, 2px ring in `surface` (`subtle-tint` while open) | `control-round` |

## Menus

| Part | Value | Token |
|---|---|---|
| Help menu | 280px wide, padding 6px, radius 16px, 1px `line`, `surface`, shadow 0 18px 40px -18px rgba(11,27,79,.35); items min 44px, radius 10px, padding 4px 12px, a label and a hint | `menu-*` |
| Help items | User guide · Help centre · What's new (if kept) · Send feedback · Contact support · Your requests | SPEC §2.1 |
| Account menu | 300px wide, same styling; you (40px avatar, name, email, role in `action`), Organisation (Switch organisation if several), Your account, Settings, Plan and billing (Owners), Language (if offered), Help (phones), Appearance (if offered), Sign out, then "‹Product› · by AntaraX", version, Privacy, Terms | SPEC §3 |
| Placement | 86px from the page top under a floating bar (72px flat, 74px phone); right edge 20px from the page (12px phone) | — |

## Dark

`data-theme="dark"`: surface #0C1B47, ground #071233, well #050D26, line rgba(157,184,255,.16), ink #EAF0FF, the product's dark accent as `action` with #071233 text, subtle tint = the accent 22% into #0C1B47.
