# REKA project template

**v1.0 · 16 Oct 2026.** The standard for dashboards REKA builds for a client: bespoke work carrying the client's brand. Decided by the owner on 16 Oct 2026. The mock: [`mock/`](mock/README.md).

## 1 Three dashboards

| | AntaraX products (`app/`) | REKA projects (this) | AXLE (`axle/`) |
|---|---|---|---|
| **Is** | A product REKA sells under AntaraX | Work REKA builds and runs for one client | REKA's staff console |
| **Whose look** | The product's own, inside the AntaraX shell | **The client's**, on a neutral base. Never AntaraX's | REKA's: dark bars, light page, REKA orange |
| **Places** | The AntaraX shell | **The shell's places** (owner, 16 Oct 2026) | The AXLE standard |
| **Credit** | "‹Product› · by AntaraX" | **"Built by REKA"**, in the footer (owner, 16 Oct 2026) | None; staff only |
| **Tickets and feedback** | YaraOne's front office | YaraOne's front office, in the client's look | YaraOne's back office |

A project's AXLE is the same AXLE as a product's (§7).

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

**The neutral base**, as shadcn/ui CSS variables:

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

The same as a product ([`yaraone/EMBEDS.md`](../yaraone/EMBEDS.md)): Help → Send feedback, Contact support and Your requests open YaraOne's front office, wearing the project's theme. Its foot line names REKA support; the project may hide it. REKA staff answer from the project's AXLE → Tickets.

## 7 AXLE for a project

The same AXLE standard, read for one client:

- **Organisations** usually holds one organisation, the client. Tier "Orgs" pages appear only when the project serves several.
- **R8 Base**, unless the project runs machinery of its own.
- **The ‹Project› only box** holds the project's own pages.
- **Handover.** AXLE stays with REKA. If the client takes the project over to run themselves, they run it from the organisation's admin area (app SPEC §13); AXLE does not go with it unless the contract says so.

## 8 How to prove it

| Check | Passes when |
|---|---|
| **Logo swap** | With the AntaraX logo in the client's place, three people asked "is this an AntaraX product?" say no |
| **Colours** | `tools/sync-brand-kit.py --project PATH` passes |
| **Places** | Help second from the right and the account at the far right on every page; the account menu in app SPEC §3's order |
| **Credit** | "Built by REKA" on the sign-in foot, the account menu foot and the footer, and nowhere else |
| **Legal** | The legal pages name the client, not REKA or AntaraX |
| **Shell checks** | app SPEC §17's checks, except the ones about AntaraX's look |

## 9 Decisions

All by the owner, 16 Oct 2026:

- A third dashboard for REKA's client projects, looking different from AntaraX's at all costs.
- AXLE is the same for products and projects.
- Projects follow the shell's places.
- The credit is "Built by REKA" in the footer.
- The stack: Next.js, TypeScript, Tailwind, shadcn/ui, TanStack, React Hook Form with Zod, Supabase, Refine where it fits.

New questions go here.
