# REKA project template

**v1.1 · 16 Oct 2026.** The standard for dashboards REKA builds for a client: bespoke work carrying the client's brand, and the AXLE REKA runs it from. Decided by the owner on 16 Oct 2026. The mock: [`mock/`](mock/README.md); the branding SOP: [`BRANDING.md`](BRANDING.md).

## 1 Three dashboards

| | AntaraX products (`app/`) | REKA projects (this) | AXLE (`axle/`) |
|---|---|---|---|
| **Is** | A product REKA sells under AntaraX | Work REKA builds and runs for one client | REKA's staff console |
| **Whose look** | The product's own, inside the AntaraX shell | **The client's**, on a neutral base. Never AntaraX's | REKA's: dark bars, light page, REKA orange |
| **Places** | The AntaraX shell | **The shell's places** (owner, 16 Oct 2026) | The AXLE standard |
| **Credit** | "‹Product› · by AntaraX" | **"Built by REKA"**, in the footer (owner, 16 Oct 2026) | None; staff only |
| **Tickets and feedback** | YaraOne's front office | YaraOne's front office, in the client's look | YaraOne's back office |

A project's AXLE is the same AXLE as a product's (§7), and is part of this template: the set is complete with the client app, its AXLE, the building blocks (§8) and the branding SOP (§3a).

## 2 What a project keeps from the shell

Everything in [`app/SPEC.md`](../app/SPEC.md) that is about **places, words and behaviour** applies, read with "the project" for "the product":

| From app SPEC | In a project |
|---|---|
| §2 The top bar | The same order: the client's logo and the project's name (in place of the brand pill), the page title, the project's slot, search and notifications where it has them, **Help**, then **the account at the far right**. Attached and flat (§3), not floating |
| §3 The account menu | The same items and order. Plan and billing only if the project bills. The foot: "‹Project› v‹x› · Built by REKA", Privacy, Terms |
| §4 Standard pages | `/account`, `/settings` (and its standard sections), `/guide`, `/help`, `/legal/privacy`, `/legal/terms`. The legal pages are the client's, under the client's name |
| §4 Roles | Owner, Admin, Member, Viewer mean the same; the project may add roles named for a job |
| §6 to §11 | Getting in, banners in order, notifications, feedback and support through YaraOne (§6 here), dialogs, toasts, errors and empty states: the same words and behaviour |
| §12 | Every wait animated, in the project's own quiet style; never "Loading…" alone, a static placeholder or a spinner |
| §13 | The organisation's admin area, including Support access for REKA support sessions |
| §15 Built right | All of it: passwords, forms, PDPA data handling, speed and caching, reliability, security, time and language, devices |
| §16 Never | Every rule that is not about AntaraX's brand: data, waits, pop-ups, passwords, payments |

**Not kept:** anything that says AntaraX (§3).

## 3 What makes it not AntaraX

A project must never read as an AntaraX product. **The test:** put the AntaraX logo where the client's sits; if the screen then reads as an AntaraX product, it is too close.

| | AntaraX products | A REKA project |
|---|---|---|
| **Type** | Poppins, JetBrains Mono for numbers | **IBM Plex Sans**, IBM Plex Mono for codes and numbers; or the client's own typeface |
| **Colour** | The product's palette from the brand kit | The neutral base (below) plus **one client primary colour**. No colour from the AntaraX brand kit, product palettes included |
| **Shape** | Cards 20px, buttons 12px, pills | Controls 6px, cards and menus 8px, badges 4px. No pills |
| **Top bar** | Floating and rounded, the brand pill | Attached, flat, full width, a bottom border |
| **Navigation** | The product's own | A classic left sidebar by default, stacking on a phone; the project may choose otherwise |
| **Marks** | The AntaraX A, the product chip, the AI sparkle, the halo, the intan, BaTech | None of them. AI work is said in words, with the project's own plain icon |
| **Words** | "by AntaraX", plan names (Seed, Nova…), Lapisan | None of them |

**The neutral base**, as shadcn/ui CSS variables. It is also REKA's default for a client without a brand kit (§3a):

| Token | Value | Use |
|---|---|---|
| `--background` | `#F6F6F4` | Page ground |
| `--card` | `#FFFFFF` | Surfaces |
| `--border` | `#E3E3DE` | Lines |
| `--foreground` | `#1C1C1A` | Strong text |
| `--body` | `#45453F` | Body text |
| `--muted-foreground` | `#6E6E66` | Quiet text |
| `--muted` | `#EDEDEA` | Subtle fills |
| `--primary` | the client's colour; `#1C1C1A` until there is one | Actions, the current page, the logo tile |
| `--success` · tint | `#1F6B45` · `#E6F2EC` | Done |
| `--warning` · tint | `#8A5300` · `#FBF0DF` | Needs attention |
| `--destructive` · tint | `#9F2B22` · `#FBE9E7` | Problems, deleting |
| `--ring` | `#1C1C1A`, or the primary when it passes 3:1 | Focus |

- The client's primary must pass 4.5:1 with white text; if their brand colour does not, use its darkest shade that does.
- Status colours mean a real state, always with the word.
- **Checked by a script:** `python3 tools/sync-brand-kit.py --project PATH` fails if any colour from the brand kit's tokens or product palettes (white and black aside) appears in the project's code.

## 3a Client branding (REKA SOP)

**If the client has a brand kit, the project adopts it; if not, it uses REKA's default: this neutral base with the client's logo and one colour from the default set** (owner, 16 Oct 2026). Either way the bare minimum stays: §2, §4, and app SPEC §15. The brand decides the logo, colours, typeface, imagery, tone and rounding (4 to 12px); our standards decide places, words, contrast, focus, status meanings, waits, security, the credit and YaraOne. Where a brand value fails a standard, the standard wins and the fix is written down.

The steps (ask at kick-off, collect or choose, map onto the base, standards check, client sign-off), the default set of six primaries and `client-brand.json`, which records the brand once and which the colour check reads, are in [`BRANDING.md`](BRANDING.md), written to go straight into REKA's SOP.

## 4 The credit: "Built by REKA"

- **Where:** the sign-in page's foot, the account menu's foot, and the app's footer. Nowhere else.
- **How:** plain text in the muted colour, linking to reka.re. Never REKA orange, never a logo, never larger than the footer's other text.
- **Not on** the client's emails, invoices, documents or public pages, unless the contract asks.
- The legal pages and copyright are the client's: "© ‹Client› Sdn Bhd".

## 5 The framework (owner, 16 Oct 2026)

One stack for every project, so any REKA engineer or coding agent can pick any project up.

| Layer | Use |
|---|---|
| Framework | **Next.js** (App Router), **TypeScript** strict |
| Styling | **Tailwind CSS**, the base's variables (§3) |
| Components | **shadcn/ui** on Radix, re-themed to the base; **Lucide** icons |
| Data | **TanStack Query** for client data; **TanStack Table** for every list |
| Forms | **React Hook Form** with **Zod**; the same schema validates on the server |
| Back end | **Supabase**: Auth, Postgres with row-level security, Storage |
| CRUD-heavy back offices | **Refine** on top, with its Supabase data provider, only where list, create, edit and show screens are most of the work |
| Tests | **Vitest**; **Playwright** for the flows that matter |

Rules that come with it:

- **Row-level security is the boundary.** Every table with client data has `organisation_id` and its policies in the same migration. The service role never runs in a request path.
- **One way to change data:** a server action or route that checks who is calling, validates with Zod, writes with the caller's own client, then writes the audit row.
- **Migrations, not hand edits.** Every schema change is a file.
- **Theme by variables only.** A client's look is a change to the base's variables and their logo; components stay shadcn's.
- **Tickets and feedback through YaraOne** (§6); no project builds its own.
- A starter repository with all of this wired in is the next step; until it exists, a project starts from this spec and the mock.

## 6 YaraOne in a project

The same as a product ([`yaraone/EMBEDS.md`](../yaraone/EMBEDS.md)): Help → Send feedback, Contact support and Your requests open YaraOne's front office, wearing the project's theme. Its foot line, "Managed by REKA · Powered by YaraOne", may be hidden in a client project. REKA staff answer from the project's AXLE → Tickets.

## 7 AXLE for a project

Part of the template, and the same AXLE standard ([`axle/`](../axle/README.md)) read for one client. Boards: `mock/AxleOverview`, `mock/AxleR8`, with the AXLE sidebar and top bar set for the project.

- **Its look is AXLE's**, never the client's: dark bars, light page, REKA orange. Clients never see it. The client appears inside it only as their logo or monogram and their name.
- **Organisations** holds one organisation, the client, so Overview shows a card for them instead of a list; Organisation 360 opens from it. Tier "Orgs" list pages appear only when the project serves several organisations.
- **R8 Base**, unless the project runs machinery of its own.
- **The ‹Project› only box** holds the project's own pages (Asset Care: Plants, PM templates).
- **Tickets** is YaraOne's back office, as in every AXLE.
- **Capacity** (R8): the project's `capacity.json` lists the client's plans and limits, whoever pays for them; a project on the client's own servers uses the same classes ([`capacity/`](../capacity/README.md)).
- **In the code:** keep AXLE under a folder named `axle` or the route group `(axle)`, on its own host where the project has one (as Yara and YaraOne do). The project colour check skips it; AXLE's own tokens apply.
- **Handover.** AXLE stays with REKA. If the client takes the project over to run themselves, they run it from the organisation's admin area (app SPEC §13); AXLE does not go with it unless the contract says so.

## 8 Building blocks

Patterns that come back in nearly every client project. Each is built once in the starter on shadcn/ui, behaves the same in every project, and takes the client's look. Board: `mock/Patterns`; the list page is `mock/Workspace`.

| Block | Always has |
|---|---|
| **List page** | Search, filters, sort, columns, bulk actions on selected rows, export of the current view, paging; a row opens its record; the address keeps the view |
| **Record page** | A header with name, status, key facts and the one main action; tabs; an activity timeline with who, when, before and after; comments with mentions |
| **Form** | Sections; errors in words beside each field and summed up at the top; nothing typed is lost; leaving with unsaved changes asks first; one Zod schema on the client and the server |
| **Import** | CSV or Excel; a template to download; columns matched by name and changeable; a check that shows every problem row before anything is written; import only the good rows; undo for 24 hours |
| **Approval** | Who approves is a rule the client sets (amount, kind, site), never code; approve, or return with a reason; nobody approves their own request; every step on the record's timeline; the asker is told |
| **Dashboard figure** | Real numbers, a labelled axis, a written summary for screen readers; a figure opens the list it counts; the client's primary and its tints |
| **Printed document** | PDF, A4 by default; the client's letterhead; when and by whom it was made; page numbers. Never "Built by REKA" |
| **Files** | Drag and drop or choose; type and size checked on the server; private storage opened through short-lived links; preview |
| **Find (⌘K)** | Across the records the person may see, grouped by kind, keyboard first |
| **Notifications and email** | The in-app panel (app SPEC §8) and emails in the client's look, from the project's own sender |
| **Formats** | 16 Oct 2026 · 14:30 MYT · RM 18,400.00 · a dash with the reason for an unknown or hidden figure, never 0 |
| **Statuses** | Data, not code: each with a word and a meaning colour; every change recorded |

A pattern a second project needs and this list lacks is added here first, mocked, then built into the starter.

## 9 How to prove it

| Check | Passes when |
|---|---|
| **Logo swap** | With the AntaraX logo in the client's place, three people asked "is this an AntaraX product?" say no |
| **Colours** | `tools/sync-brand-kit.py --project PATH` passes, with the client's colours in `client-brand.json` |
| **Branding** | `client-brand.json` exists, every `fixes` entry has a reason, and `signedOff` is filled before the build goes wide |
| **Places** | Help second from the right and the account at the far right on every page; the account menu in app SPEC §3's order |
| **Credit** | "Built by REKA" on the sign-in foot, the account menu foot and the footer, and nowhere else |
| **Legal** | The legal pages name the client, not REKA or AntaraX |
| **Shell checks** | app SPEC §17's checks, except the ones about AntaraX's look |

## 10 Decisions

All by the owner, 16 Oct 2026:

- A third dashboard for REKA's client projects, looking different from AntaraX's at all costs.
- AXLE is the same for products and projects.
- Projects follow the shell's places.
- The credit is "Built by REKA" in the footer.
- The stack: Next.js, TypeScript, Tailwind, shadcn/ui, TanStack, React Hook Form with Zod, Supabase, Refine where it fits.
- **v1.1:** the template includes the project's AXLE, and the building blocks (§8).
- **v1.1, client branding for REKA's SOP:** a client's brand kit is adopted; without one, REKA's default (§3a, `BRANDING.md`). The bare minimum stays either way.

New questions go here.
