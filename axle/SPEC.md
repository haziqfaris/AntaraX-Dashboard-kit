# AXLE standard

**Version 1.0, the standard (owner, 15 Oct 2026).** This is the console every AntaraX product gives REKA staff, and the base for AXLE Central at `axle.antarax.ai`. Every product's AXLE is built from it, with the final design in [mock/](mock/README.md) and the values in [tokens.css](tokens.css); [README.md](README.md) is the step-by-step. Questions still open in §20 are settled one at a time; until then, this text applies.

It merges two sources:

- **The REKA AXLE Admin Console Standard v0.2** ([reference copy](reference/axle-admin-console-standard-v0.2.md), cited as **std A1** to **std M17**; [v0.1](reference/axle-admin-console-standard-v0.1.md) kept for history). It says *what* AXLE must be able to do, in tiers, built from the owner's corrections across nine REKA projects. v0.2 adds section M, **AXLE R8**, from the AXLE R8 Operations Brief and the R8 mode built in AX Frame. One owner decision departs from it: **every product has R8**, at Base or Full (§2, 15 Oct 2026).
- **The AXLE inventory.** These are the seven AXLE consoles in [the inventory](../inventory/README.md), the AXLE Central plan in antarax-api ([summary](../inventory/lapisan-console/axle-central-requirements.md)) and the brand kit (03, 12, 13 §1, §2, §6, §10). It says *how* AXLE looks, is organised and behaves, and which console already does each thing best.

Every std item has a place here; the [coverage table](#appendix-a-coverage-of-the-reka-standard) proves it. Where the two sources disagree, this draft takes a side and lists the choice in [§20](#20-open-questions) for the owner. Once decided, decisions go into the brand kit's decisions log before products build them.

**Words used here.**
- **Organisation:** the customer's account (on screen; `tenant` stays in code).
- **Member:** a customer's person.
- **Staff:** a REKA person using AXLE.
- **Must, should, may:** as usual.

---

## 1 What AXLE is

AXLE is REKA's console for running a product. REKA is the **operator**, never a tenant. REKA's own demo organisations are ordinary organisations (std A3).

The product has two planes:

| Plane | Who | What | Rule |
|---|---|---|---|
| **AXLE (platform plane)** | REKA staff only | Overview and health, organisations and people, features and plans, AI, operations, audit | Customers never see its name, address or any screen (brand kit 03) |
| **Organisation plane** | Each customer sees only its own | Organisation admin, the product, client portal | Never sees what is listed in §3 |

There are two levels of AXLE:

| Level | Address | Notes |
|---|---|---|
| **Product AXLE**, one per product | `axle.<product>.antarax.ai` | Has the depth only that product knows |
| **AXLE Central** | `axle.antarax.ai` | One screen across every product. It reads each product AXLE through AXLE Link (§18) and links back for depth. It never replaces a product AXLE |

## 2 Tiers

Every item carries a tier (std):

| Tier | Applies |
|---|---|
| **Always** | Every AXLE, from its first release |
| **Orgs** | When the product has more than one customer organisation (std "Tenants", Platform Core C1) |
| **AI** | When the product uses AI |
| **Billing** | When the product bills inside itself; otherwise AXLE shows the plan only |
| **R8 Base** | Every product (owner, 15 Oct 2026). Every product has a database, sign-in, email, deploys, outside providers and some jobs, so every product gets the R8 mode with its standard pages: Overview, Troubleshoot, Jobs, Providers, Services, Configuration, Operations audit |
| **R8 Full** | When the product runs machinery of its own: monitoring checks, probes, devices or sensors, agents on hosts, browser or screenshot workers, heavy background jobs, realtime pipelines (std v0.2's R8 tier). Adds Incidents, the machinery and cost blocks of the R8 Overview, and the Observe pages whose backend exists |
| **Later** | When a client, a regulation or scale needs it, recorded in the decisions log |

**The minimum first release** for a new product is every Always item, plus Orgs if it has several organisations, plus AI if it uses AI (std). **R8 Base v1**, for every product, is std M1 to M5, M10 to M14 and M17. **R8 Full v1** adds M9 (Incidents) and M15 (cost per subsystem), plus M6 and M7 when the product has probes or screenshots. Agents (M8), Level 2 actions and logs come when their backend exists. [§19](#19-how-to-prove-it) is the test.

## 3 Principles

1. **Two planes, nothing crosses.** The following never reach the organisation plane: model names, prompts, traces, AI cost, sandbox notices, internal notes, other organisations' names or data, and staff names unless REKA support is acting (std A4). This is tested on every release (§19).
2. **Real numbers, clickable.** Every figure is computed from the database, matches a count taken there, and opens the filtered list behind it (std B2).
3. **Visual first.** Numbers are tiles and charts, not paragraphs. This was the owner's most repeated correction ("too plain, too many words, too little visual") (std B1, L4).
4. **Attention first.** The first block on every overview is what needs a person, with a link to the fix (Janka, AX Frame, Angka, ISO Generator).
5. **Never a false zero.** A hidden or unmeasured figure shows a dash and why, never `0` or `$0.00` (ISO Generator).
6. **Explain every page.** A title, one line saying what it is for, a short "How this page works" guide, and an empty state that says what to do first (std B4, L2; AX Frame, Janka).
7. **Every change has a reason and a trail.** Switches, suspensions, overrides, plan changes and support sessions ask for a reason and are audited with before and after (std C4, E4, J1).
8. **Read wide, change narrow.** Staff can read almost everything; changing needs the right role or right, and the screen says which (Angka, ISO Generator).
9. **Every state has a link.** Pages, filters, the selected organisation, the date range and open panels live in the address, so any view can be shared and opened again (std L7).
10. **One console, many products.** The same names, places and look in every product.

## 4 Identity

| Element | Standard | Tier |
|---|---|---|
| **Name** | `AXLE` in the sidebar, with the product as context: `AXLE · Janka`. Page titles: `<Page> · AXLE · Janka`. Central: `AXLE` | Always |
| **Never** | "REKA Admin", "Platform Admin", "Tinara Admin", "Yara AXLE", "Janka AXLE" | |
| **Mark** | The AntaraX A in the sidebar corner. The product's own mark appears as a small chip beside the product name | Always |
| **Theme** | **Dark bars, light page** (owner, 15 Oct 2026). The sidebar and the top bar are dark; the page between them is light. No theme toggle. This is what Yara's and Janka's AXLE already do | Always |
| **Bars (sidebar, top bar, drawer)** | Ground `#071233`; raised `#0C1B47`; raised 2 `#13255C`. Ink `#EAF0FF`, body `#B6C3EA`, muted `#8E9CC9`. Lines `rgba(157,184,255,.16)` | |
| **Page** | Ground `#F5F7FC` (the kit's sunken surface, so white cards stand out); cards `#FFFFFF`, radius 20px, 1px `#E5E8EE` border. Ink `#0B1B4F`, body `#3B4469`, muted `#5B6488` (5.4:1 on the ground) | |
| **Accent** | REKA orange `#FB9800`: the active nav item, the role chip, the `AXLE` tag, the selected range and the one primary action (navy `#071233` text on orange, 8.4:1). Never orange text on the light page (2:1); there, text in orange's family is `#B54708` | |
| **Links** | On the page `#0459F7` (5.6:1 on white); on the bars `#4D84FE` | |
| **Focus ring** | 2px, offset 2px: AntaraX blue `#0459F7` on the page; `#4D84FE` on the bars, where `#0459F7` reaches only 2.99:1 | |
| **Status** | ok `#12B76A`, warn `#F79009`, fault `#F04438`, real signal only. On the page: tints `#E7F8EF` / `#FEF4E6` / `#FEECEB` with text `#067647` / `#B54708` / `#B42318`. On the bars: `#5FD39B` / `#F8B862` / `#F7877F` | |
| **Charts** | On the page: `#2A78D6`, `#1BAF7A`, `#EB6834`, `#6250D6`, in that order, checked for colour-blind separation on white. Every series is labelled, because `#1BAF7A` is under 3:1 on white | |
| **Type** | Poppins for UI; JetBrains Mono for every number, id, time and email | |
| **Components** | The same component set as the AntaraX product core: tables, buttons, inputs, search, dialogs, toasts, on the same light page. The dark bars, the orange accent and the `AXLE` tag make it unmistakable (std L5) | Always |
| **Footer** | "Authorised REKA staff · every action is recorded" | |

## 5 Access and separation

### 5.1 Addresses and sign-in (std A1, A5, A6)

| Rule | Tier |
|---|---|
| AXLE is on its own host, with its own cookies and its own "Sign in to AXLE" page. Members of an organisation can never reach it; any AXLE address returns 404 to them. `/axle` on one host is allowed only in local development | Always |
| Staff need two-step sign-in (MFA) | Always |
| At least two staff can sign in as Owner on company accounts, never personal ones, so access is never lost (std A5) | Always |
| A signed-in person who is not staff sees: "This account isn't on the REKA staff list. Sign out" | Always |
| One staff sign-in for every product AXLE, once AXLE Central exists | Later |
| On the organisation plane, sign-in is company-first: the organisation's own name and logo, never another client's (std A6). This is a product rule, listed here because AXLE configures it | Orgs |

### 5.2 Staff roles and rights (std A2, D1)

Two axes:

- **A ladder** for how much a person may change (antarax-api docs/07; built in Angka). Each rung includes the one below.
- **Rights** for which sensitive areas a person may see or run (ISO Generator; std A2's functional roles). One person may hold several rights.

| Rung | Can | std A2 role |
|---|---|---|
| **Viewer** | Read everything except secrets and the areas behind a right | Read-only auditor |
| **Support** | Plus: support sessions, look up calls, resend invitations, add notes | Support |
| **Operator** | Plus: suspend and restore, switches, quota overrides, retry and cancel jobs, stop keys | Operations |
| **Admin** | Plus: create organisations, plans and features, staff roles, settings, help content, announcements | |
| **Owner** | Plus: secrets, deletion, two-person approvals | Super Admin |

| Right | Covers | std A2 role |
|---|---|---|
| **Finance** | MRR, invoices, AI and infrastructure cost, budgets | Finance |
| **Security** | Sign-in activity, sessions, staff access reviews, exports and deletion approvals | Security |
| **AI** | Providers, keys, routes, prompts and their versions | |
| **Library** | Publishing platform libraries (§10.7) | |

Rules:

- **Every rung sees the same navigation.** A control the person can't use stays visible, disabled, with "Needs Operator" or "Needs the Finance right" (Angka).
- **A page behind a right someone lacks** shows a gate card. It names the right, what it covers, and who can grant it (ISO Generator). Pages are never hidden from people who may read them.
- **A hidden figure** shows "–" and "Needs the Finance right". Alerts follow the same rule, so a cost never leaks through a budget warning.
- **The Staff page is separate from Members** and lists only REKA staff. It has no casual "create" button: staff are added deliberately, with a reason (std D1; Yara).
- **Nobody can lower their own role** or remove their own Security right.
- **Two people** must approve anything irreversible: deletion, secret rotation (antarax-api docs/07).

**R8 on the same ladder (std M14).** R8 has no roles of its own; std M14's four map onto the ladder and rights, so one person never holds two role systems.

| std M14 | Here | May do in R8 |
|---|---|---|
| Support | **Support** rung | Read every R8 page; acknowledge an incident; add a note |
| Engineering | **Operator** rung for Level 1; **Admin** rung for Level 2 | Level 1 actions (§14.1) from Operator; Level 2, when it exists, from Admin |
| Finance | **Finance** right | Cost per organisation and subsystem (§8.1 block 6); nothing else extra |
| Super Admin | **Owner** rung | Everything, including suppressions longer than a day |

A Viewer reads R8 and acts on nothing. Level 3 is not a permission anyone holds (§14.1).

## 6 Shell (std L1, L5)

AXLE keeps the **AntaraX top bar** every product already ships (adopted 12 Oct 2026 from the Angka dashboard; built in Yara `Topbar.tsx`, Janka `TopBar.tsx` and `BrandPill.tsx`, AX Frame `BrandPill.tsx` and `brandpill.css`, PLExyz Grid `App.tsx`). AXLE uses its dark variant, which Yara's AXLE already has. AXLE does not get its own bar.

```
  ╭──────────────────────────────────────────────────────────────────────────────────╮
  │ ╭──┬─────────────╮                                                               │
  │ │A │ ▣ Janka     │ AXLE │ Overview     [Organisation: All ▾] [Find… ⌘K] (♥1) (AR) │  64px card
  │ ╰──┴─────────────╯                                                               │
  ╰──────────────────────────────────────────────────────────────────────────────────╯
    ▲ Open access is on since 1 Oct 2026: every organisation has paid limits. Settings     state banner
┌────────────┐
│ AXLE       │  What needs a person, and how Janka is doing.            [7 days|30|90|…]
│ REKA STAFF │  How this page works ▾
│ WATCH      │
│ ◆ Overview │
└────────────┘
```

### The AntaraX top bar, dark variant

| Part | Standard (light value → AXLE dark value) |
|---|---|
| **Card** | A floating card in the page gutter (16px above, 24 to 32px each side), 64px tall, radius 24px, 1px border, soft shadow. Light: white, `#E5E7EB` border. AXLE: raised `#0C1B47`, border `rgba(157,184,255,.22)`, shadow `0 10px 28px -18px rgba(0,0,0,.6)`. On phones: 58px tall, radius 20px, 8px gutter above and 12px at the sides |
| **Brand pill** | A well (4px padding, radius 16px, 1px border) holding two parts, each 40px tall with radius 12px. First, the AntaraX A (22px, link to antarax.ai, "AntaraX" as its name). Second, the product chip (product mark plus product name, 17px, weight 600, link to this console's home). Light: grey well `#F3F4F6`, raised white chip in the product's colour. AXLE: well `rgba(255,255,255,.05)` with border `rgba(255,255,255,.10)`; chip `rgba(255,255,255,.10)` with white text; the A in AntaraX blue, not dimmed. A product mark that needs a light ground sits on a small white tile (kit 12, app tile) |
| **AXLE tag** | AXLE only: an orange `#FB9800` capsule reading `AXLE` in JetBrains Mono, navy text, right after the pill. It is what tells staff, at a glance, that this is not the customer app (std L5) |
| **Page title** | The page's `h1`, after a 1px divider, 18px weight 600, cut with an ellipsis (Janka, AX Frame) |
| **Right side** | Controls 44px tall: the organisation scope picker as a rounded field (§6.1; Janka's site field), Find as a rounded field with ⌘K (§6.2; Yara's search), the health button (44px round, a count when anything fails), the staff menu (44px round initials: Your account, Two-step sign-in, AXLE guide, Sign out, which asks first). Below 1024px a 44px round menu button sits before the pill and opens the drawer |
| **Focus** | The ring from §4 on every part of the bar |

### The rest of the shell

| Part | Standard | Tier |
|---|---|---|
| **Sidebar** | 240px, raised ground. Its own brand block (the products keep one too): the A, "AXLE" and "REKA STAFF CONSOLE" in mono; the Dashboard · R8 switch with a one-line description of the mode (§7.1); the AXLE standard groups, then the dashed ‹Product› only box (§7); at the foot, initials, name, the role chip in orange, and the footer line | Always |
| **Active item** | An orange tint (`rgba(251,152,0,.16)`), orange text in weight 600, an orange intan before the label, `aria-current="page"`. No side stripe or border marker (owner, 15 Oct 2026: "looks too AI"). Selected rows in lists follow the same rule | Always |
| **State banner** | A rounded warn band under the top bar, in the same gutter, while a state staff must not forget holds (§13.2) | Always |
| **Page header** | The title is in the top bar. Under it: one line saying what the page is for, the state line, the "How this page works" disclosure, and the page's range picker or primary action | Always |
| **Phones** | Below 1024px the sidebar becomes a drawer with its groups and counters (Yara), not a chip strip. AXLE on a phone shows AXLE, never the customer app (std L1). The title is never covered | Always |

### 6.1 Organisation scope

One picker sets the organisation for every page that can be scoped. Its value is in the address (`?org=acme-plastics`), and "All organisations" is the default. Staff see no organisation's data on scoped pages until they pick one, or choose "All", which shows only platform-level rows (std QA "Separation"; ISO Generator).

### 6.2 Find (std H5)

⌘K searches organisations, members, staff, AXLE pages and records, filtered by the person's rights. A request id (`req_…`) jumps to Lookup. Tier: Later as global search across records; page search is Always.

## 7 Navigation

### 7.1 Two modes: Dashboard and R8 (std M1, M2, M17)

AXLE is one product with two modes (std v0.2; AX Frame's AXLE, owner 7 Oct 2026: "full mode switch").

| Mode | Question it answers | What it holds | Who lives in it | Tier |
|---|---|---|---|---|
| **Dashboard** | How is the product doing, and who needs us? | Organisations, people, plans, money, AI configuration, content, the trail of staff actions (std A to L) | Support, account and finance work | Always |
| **R8** | Is the platform okay, and why did this fail? | Troubleshooting, jobs, providers, services, configuration; with Full, incidents, probes, agents, screenshots (std M) | Operators and engineers | R8 Base everywhere; R8 Full with machinery |

- **Every product has R8, at one of two levels** (owner, 15 Oct 2026; §2). **Base** is the standard R8 pages every product can fill from day one. **Full** adds Incidents and the machinery blocks, for products that run machinery of their own. A product moves from Base to Full when it gains machinery, never to look complete. Health, Jobs and Configuration always live in R8, never in the Dashboard.
- **Staff can see the level.** The line under the switch reads "R8 Base · …" or "R8 Full · …", so an empty Observe group is never mistaken for a fault.
- **The switch changes the menu, not the app (M1).** A two-part control under the sidebar's brand block, with one line saying what the mode is for. Same sign-in, same people, same top bar, same audit log. It is remembered per staff member; AXLE opens where they last worked (AX Frame). Members can open no R8 address.
- **A page appears only once its backend exists (M2).** Never an empty or "coming soon" page. A group with no pages is not shown (Observe, in most products).
- **Each mode has its own Overview:** §8 for Dashboard, §8.1 for R8.
- **Find and the organisation picker** are the same in both modes. Find searches both.
- **The health button** in the top bar always opens R8 → Overview.
- **R8 words stay in R8 (M17).** The Dashboard says "AI provider failing" and links to Troubleshoot; it never says probe, queue depth or p95. A founder never needs R8 to run the business.
- **R8 is not** a Grafana clone, a remote shell, a copy of the customer's own health screens, a second sign-in or a second data model for organisations (std M).

### 7.2 AXLE standard and product-only

Each mode's sidebar has two parts, always in this order:

1. **AXLE standard.** A small `AXLE STANDARD` label, then the standard groups below. They have the same names and the same order in every product. A product leaves out an item only when its tier does not apply (§2); it never renames, moves or regroups one.
2. **‹Product› only.** A dashed box at the end of the list, headed by the product's mark on a white tile and "‹Product› only" in mono capitals. It holds every page that exists in this product alone, in either mode. When a product has none in a mode, the box says so ("No PLExyz Grid-only pages in R8. Everything above is the standard.") rather than disappearing, so staff learn that the standard is the whole story there.

Product-only items sit at the end so that adding one never moves a standard item. A page that turns out to be useful to every product is promoted into the standard, with a tier, and leaves the box.

**Groups are cards that fold** (owner, 15 Oct 2026, from the collapse styles in the mock).
- **The card:** each standard group is a soft card, `rgba(255,255,255,.035)` with a `rgba(157,184,255,.10)` border and a 12px radius, 6px apart.
- **The title** is a button (`aria-expanded`, 38px on desktop and 44px on touch): a 24px icon tile tinted in the group's colour (16% of it), then the title in that colour, 13px weight 600, and a chevron on the right that turns down when open (owner, 15 Oct 2026). The colour belongs to the area and never means a status; orange stays reserved for what needs a person and for the current page.
- **A folded card** lists its pages in one grey line under the title ("Plans & features · Billing · Costs"), so staff know what is inside without opening it.
- **A folded card shows a roll-up**: the total of its loud counters in orange ("1 needs a person"). Quiet counts (48 organisations) do not roll up, so folding never hides something that needs a person.
- **The group holding the current page opens on arrival**, so staff always see where they are.
- **"Collapse all" and "Expand all"** sit at the end of the AXLE STANDARD line. Collapse all leaves the current page's group open.
- **Remembered per staff member**, like the mode, separately for Dashboard and R8. Everything starts open on a first visit.
- **The ‹Product› only box does not fold.** It is short, and its point is to be seen.
- The phone drawer follows the same rules.
- **Group colours and icons**, the same in every product (light enough for at least 6:1 on the card):

  | Mode | Group | Colour | Icon |
  |---|---|---|---|
  | Dashboard | Watch | `#7FA4FF` | eye |
  | | Organisations | `#5ED3C9` | building |
  | | AI | `#B7A8FF` | sparkle |
  | | Money | `#E3C25E` | coin |
  | | Platform | `#F2A0CB` | sliders |
  | | Operations | `#8FD3FF` | pulse |
  | | Trail | `#C4CDE8` | list |
  | R8 | Command | `#7FA4FF` | flag |
  | | Observe | `#5ED3C9` | eye |
  | | System | `#B7A8FF` | server |
  | | Control and diagnostics | `#C4CDE8` | sliders |

  One title blue, white titles beside the tiles, and colour without tiles were mocked and not chosen (mock `NavTitles`).

### 7.3 Dashboard mode, standard

| Group | Item | Tier | What it is (std) | Change needs |
|---|---|---|---|---|
| **Watch** | **Overview** | Always | §8 (B1–B4) | Viewer |
| | **Adoption** | Always | Active organisations and members over time, feature use per organisation, who stopped using it (I1) | Viewer |
| | **Feedback** | Later | What members sent from the product | Support |
| **Organisations** | **Organisations** | Orgs | List, create, lifecycle and the organisation page (C1–C6, §10.1–10.3) | Operator, Admin |
| | **Members** | Orgs | Members across organisations (D2) | Support, Operator |
| | **Invitations** | Always | Single-use expiring links (D3) | Support |
| | **Requests** | Orgs | Access requests, data export and deletion requests, pilot requests (C5, J3) | Admin, Security right |
| | **Support** | Orgs | Notes and tickets per organisation, never shown to it (H4) | Support |
| **AI** | **Models & keys** | AI | Providers, keys (masked, test, rotate), model per task with default and fallback chain, automatic switch on outage (F1, F2). Provider *health* is R8 → Providers; this page is the configuration | AI right |
| | **AI usage** | AI | Usage, performance and cost per organisation, task and model; budgets and alerts (F4) | Viewer; cost needs Finance |
| | **Live trace** | AI | One run, diagnosis first, AXLE only (F5, §10.6) | Viewer; bodies need AI |
| | **Prompts & quality** | AI | Prompt and configuration versions with a change log; feedback, evaluation scores, learning (F6) | AI right |
| **Money** | **Plans & features** | Always | Plans or editions; features classified as core, configurable, module or flag; per-organisation switches; "why does it have this?"; quotas with logged overrides (E1–E4, §10.5) | Admin |
| | **Billing** | Billing | Revenue, invoices, failed payments, by currency (I3) | Finance |
| | **Costs** | Later | What the product costs to run, against revenue | Finance |
| **Platform** | **Announcements** | Later | Draft, audience, schedule, delivery status (H6) | Admin |
| | **Help content** | Later | The product's `/help` answers | Admin |
| | **Demo** | Always | Demo data switch, demo organisations per prospect (K1, K2) | Admin |
| | **Settings** | Always | Platform switches, email templates and sender, legal texts, regions and time zones, maintenance mode (G2, E5) | Operator for switches, Admin, Owner for secrets |
| | **API** | when the product has one | Lapisan's section: Keys, Switches, Calls, Lookup, Connect apps (antarax-api docs/07) | Operator |
| **Operations** | **Errors** | Always | Unknown errors grouped, each with a request id. In the Dashboard because an error usually lands on a customer first; each links to Troubleshoot | Viewer |
| | **Alerts** | Always | Thresholds and who is told, by email and in AXLE (H2). Each alert links to Troubleshoot (M10) | Admin |
| | **Backups** | Always | Last backup, last restore drill and its result, where backups are kept (H3) | Owner records drills |
| | **Access** | Always | Links to every surface per environment, with the test account to use; never passwords (K3) | Viewer |
| **Trail** | **Audit** | Always | Every staff action (J1, §10.8) | Viewer |
| | **Security** | Later | Sign-in activity, failed sign-ins, sessions, MFA status (J2) | Security right |
| | **Staff** | Always | Staff, rungs, rights, MFA status (D1) | Admin |
| | **AXLE guide** | Later | The staff guide in REKA's user-guide format | |

### 7.4 R8 mode, standard (std M, AXLE-04)

Every product has these pages at **Base**; **Full** adds Incidents. Observe pages appear only when their backend exists (M2), so a Base product shows no Observe group.

| Group | Item | Shown when | What it is (std) | Change needs |
|---|---|---|---|---|
| **Command** | **Overview** | Base | Is it okay now (§8.1, M3) | Viewer |
| | **Incidents** | Full | Correlated signals with a lifecycle: open, acknowledged, recovered, closed or suppressed; severity, affected organisations and assets, source signals, notes, recovery evidence (M9). A failed check is a signal, not an incident | Support acknowledges; Operator suppresses |
| | **Troubleshoot** | Base | One problem, all its evidence (§10.11, M10, M11) | Operator for Level 1 actions |
| **Observe** | **Probes and network** | Full, and the product checks things from outside | Probes online, checks per minute, success and timeout rates, latency, per region. Never calls a worldwide outage from one probe (M6) | Operator |
| | **Agents** | Full, and an agent on customer or REKA hosts exists | Enrolled, connected, offline, outdated; per agent version, last heartbeat, telemetry flowing or stopped; ping, rotate credentials, push config, revoke. Telemetry only at first (M8; agents come last, 6 Oct 2026) | Operator; revoke needs Admin |
| | **Visual** | Full, and the product takes screenshots or renders pages | Captures, success rate, changes found, failures, queue, storage, provider quota; capture now, retry, pause (M7) | Operator |
| **System** | **Jobs** | Base | Last run, result, duration, next run; per run eligible, processed, failed, skipped and the top failure reasons; run now, retry failures, pause, resume. Schedules in plain words, raw cron only in an advanced drawer (M4, H1) | Operator |
| | **Providers** | Base | Every outside dependency (AI providers, email, storage, payments, any product API): state, calls in 24 hours, success rate, latency, quota exposure, latest error and latest success; Test provider. Credentials never shown (M5) | Operator tests; keys stay in Dashboard → Models & keys |
| | **AI flow** | Base, and the product calls an AI model | How the product's AI is wired and what happened on each path, drawn from its AI manifest (§10.6.1) | Viewer: read only |
| | **Services** | Base | REKA's own platform: API, database, workers, queues, storage, AI gateway, email, deployed version (B3) | Viewer |
| **Control and diagnostics** | **Configuration** | Base | Schedules, limits, and whether each setting the product needs is set, never its value (AX Frame R8 Configuration) | Admin |
| | **Operations audit** | Base | Every R8 action with who, what, target and reason (M13): the operations side of Audit, same log | Viewer |
| | **Logs and traces** | Later | When a log backend exists | Viewer |

### 7.5 Product-only pages today

Each product's R8 level, and what each product's box holds. Anything here that a second product needs becomes standard (Visual and Troubleshoot, AX Frame's until v0.2, now are).

| Product | R8 level | Observe shows | Dashboard: ‹Product› only | R8: ‹Product› only |
|---|---|---|---|---|
| Janka | Full: nightly forecast, AI on two providers | Nothing yet | Forecast accuracy, Reference library, Learning | Nightly forecast |
| AX Frame | Full: daily site checks, screenshots, the R8 it built | Probes and network, Visual | AI connections, Customer health, Catalog | None: Visual and Troubleshoot are standard now |
| Angka | Full: scheduled runs and the weekly brief | Nothing yet | Lapis, Weekly brief | Runs |
| Tinara | Full: ingestion pipelines | Nothing yet | Scoring & metrics, Data sources, Intelligence ledger | Data pipelines |
| Yara | Base: database triggers, the status API, deploy checks | Nothing | Data integrity (`tenant_integrity`), Modules, Status API | None yet |
| PLExyz Grid | Base: nothing of its own to run yet | Nothing | None: its AXLE is covered by the standard | None |

AXLE Central adds a **Products** group at the top of each mode, one item per product with its health dot, and keeps no product-only box of its own.

**Counters** count only what needs a person: new errors, open requests, failing keys, unread feedback. They are loud (orange) when action is due and grey when they are only a count.

## 8 Overview (std B1–B4)

The same page in every product, top to bottom. Every block is visual, every figure is real, and every figure opens its filtered list.

| # | Block | Holds | Rules |
|---|---|---|---|
| 1 | **Header** | Title, one line, a state line ("Live database · last 7 days"), a range picker: 7 days (default), 30, 90, 12 months, All time, Choose days | The range is in the address |
| 2 | **Health strip** | App, database, sign-in, storage, email, each AI provider, deployed version, last backup, last scheduled job (B3) | Tint plus a word, never colour alone; each tile opens Health |
| 3 | **Needs a person** | Failing jobs and webhooks, failing keys, budgets past 80%, suspended organisations, open requests, stuck runs; each with which organisation, since when, and a link to the fix. A technical problem's link is **Troubleshoot in R8** (M10) | Empty: "Nothing needs a person. Every job ran and every service answered." Respects rights |
| 4 | **Platform figures** | Organisations **by status** (a stacked bar: trial, active, restricted, suspended, cancelled, pending deletion), active members, sign-ups, AI usage and cost this month, failed jobs, open alerts (B1) | Mono numbers; money by currency (RM1,200 + US$45); a dash with a reason when hidden; each opens its list |
| 5 | **Organisations at a glance** | Organisations with plan, status, readiness ("4 of 6 ready"), open problems, members, this month's cost | Problems first; opens the organisation page |
| 6 | **Trend** | The product's core activity and AI cost over the range | Latest value ends in a pad; flagged points are an intan (kit 12) |
| 7 | **Recent sensitive actions** | The last 10 staff actions in words: suspensions, overrides, deletions, support sessions (B1) | Opens Audit |
| 8 | **Product block** | May: one product card | At most one |

**When the platform is new (B4),** blocks 3 to 7 are replaced by a first-steps list:
1. Add a second Owner.
2. Connect an AI provider.
3. Create the first organisation.
4. Switch on backups.

Each step links to its page.

No figure may be hard-coded (Tinara today).

### 8.1 R8 Overview (std M3)

The same rules as §8, for the machinery. Dense, technical and calm: status colours only on real signals, detail one click away (M17). Blocks 4 to 6 are R8 Full only; a Base product's Overview is blocks 1, 2, 3 and 7. Top to bottom:

| # | Block | Holds |
|---|---|---|
| 1 | **Overall state** | One word for the whole platform (Working, Degraded, Down) with the reason and since when, then the build: commit, when it was deployed, whether it matches the main branch (Yara's `/api/version` check), last check time |
| 2 | **Needs an operator** | The technical attention list, worst first: open incidents (Full), failing providers, stuck or failed jobs, missing setup. Every item opens its Troubleshoot (M3). Empty: "Nothing. Every job ran and every service answered." |
| 3 | **Platform services** | One tile per REKA service: API, database, workers, queues, storage, AI gateway, email. State in a word, reason, median time |
| 4 | **‹Product›'s machinery** | One tile per thing the product runs: probes, workers, agents, ingestion, pending jobs. Each tile carries a dashed "‹PRODUCT› ONLY" tag when it is not standard |
| 5 | **Incidents** | Open and recently recovered incidents with severity, affected organisations and state |
| 6 | **Cost per organisation and subsystem** | An internal estimate (checks, screenshots, samples, AI) for pricing, abuse and retention decisions; needs the Finance right, otherwise dashes (M15) |
| 7 | **Recent operations** | The last run-now, pause, retry, suppression and automatic switch, from the operations audit |

## 9 Every list (std C1, L3)

Organisations, Members, Invitations, Requests, AI usage, Audit, Errors and every product list behave the same way:

- A **stats strip** above the list, showing counts by status. It updates with the filters.
- **Search, filter, sort and group.** All of them are kept in the address.
- **Bulk actions** on selected rows. Each one needs a reason where the single action does, and is audited per row.
- **CSV export** named `axle-<product>-<list>-<YYYY-MM-DD>.csv`: UTF-8, ISO dates, plain numbers, currency in its own column.
- **Columns:**
  - names in Poppins;
  - ids, emails, times and numbers in mono;
  - status as a chip with a word.
- **No dead or duplicate buttons** (std L6).

## 10 Standard pages

### 10.1 Create an organisation (std C2)

One guided flow, in order:

1. Name and address.
2. Plan or edition.
3. Modules.
4. First Owner's email (required).
5. Demo data, yes or no.

The last screen says what happens next ("Aisyah gets an invitation; the organisation is a trial until she accepts").

### 10.2 Lifecycle (std C3, C4, C5)

Statuses: **trial → active → restricted → suspended → cancelled → pending deletion**. Separately, for products that roll out in stages, a **stage**: sandbox → pilot → live (ISO Generator, Yara).

| Change | Rule |
|---|---|
| Suspend | Operator; a reason the members will read; reversible; audited. Suspended members can't sign in and see a clear message naming REKA support |
| Restore | Operator; reason; audited |
| Delete | Never instant. Request → export offered → cooling-off (default 30 days) → scheduled deletion → completion record. Owner plus a second person (§5.2) |

### 10.3 Organisation page, "Organisation 360" (std C6)

The page opens on **what is missing**: a readiness checklist ("Before Acme Plastics can go live: 2 things left") (ISO Generator, Yara). Then tabs:

| Tab | Holds |
|---|---|
| **Summary** | Status and stage, owners and contacts, plan, one **timeline** of everything that happened to it |
| **Members** | Members, roles (Owner · Admin · Member · Viewer), last sign-in; lock and unlock, revoke sessions, resend sign-in. An organisation always keeps at least one Owner; transferring ownership is a logged action (D2, D4) |
| **Plan & features** | Plan, modules, flags, quotas and overrides, with "why" (§10.5) |
| **Usage & AI** | Activity, AI usage and cost (Finance) |
| **Integrations** | Connected services and their state |
| **Errors & health** | Recent errors; data checks: "3 fix now · 2 to check" (Yara `tenant_integrity`) |
| **Notes** | Internal notes and tickets; never visible to the organisation (H4) |
| **Branding** | Logo, colours, sender name, where the product supports it (C7, Later) |
| **Audit** | Staff actions on this organisation |

### 10.4 Members and invitations (std D2, D3)

- **Members** lists customers across organisations, with:
  - status;
  - last sign-in;
  - their role in each organisation;
  - lock, unlock, revoke sessions and resend sign-in.
- **Members never lists staff.**
- **Invitations:**
  - the email is required;
  - each link works once and expires (default 7 days);
  - each can be resent or revoked, and shows its status;
  - the person lands in the right organisation and role.

### 10.5 Plans and features (std E1–E5)

- **Every feature driven by a client** is classified as one of:
  - **core:** everyone has it;
  - **configurable:** everyone has it, set per organisation;
  - **module:** entitled by plan;
  - **flag:** a temporary switch.

  Each is switched per organisation.
- **"Why does Acme have this?"** is answered on screen. The checks run in this order:
  1. global off;
  2. organisation off;
  3. organisation on;
  4. plan;
  5. default.

  The page names the step that decided (E2).
- **Plans use the brand kit's ladder:** Seed · Terra · Nova · Galaxy · Quantum; Angka keeps its own names. Where billing happens outside the product, AXLE shows the edition only (E3).
- **Quotas and limits** are set per organisation. An override needs a reason and is logged (E4).
- **A global off switch** for any module, and **maintenance mode** with a notice to members (E5, Later). Either one raises the state banner.

### 10.6 AI (std F1–F6)

| Page | Must show |
|---|---|
| Models & keys | Providers; keys kept in the vault, shown masked, test and rotate; the model per task with a default and a fallback chain; automatic switch on outage, with a toggle and a log of switches (F1, F2) |
| Per organisation | AI on or off; model override (F3) |
| AI usage | Calls, errors, latency, cost by organisation, task and model; monthly budgets with alerts at 80% and 100% (F4) |
| Live trace | One run: verdict → what to fix, worst first → steps (status, model, time, cost, findings) → raw events last. AXLE only (F5; ISO Generator) |
| Prompts & quality | Versions of prompts and configuration, with a change log and who changed what; feedback captured; evaluation scores over time (F6) |

### 10.6.1 R8 → AI flow (owner, 15 Oct 2026)

Every product that calls an AI model has this page in R8 → System, after Providers. It answers "how does this product's AI work, and what actually happened?" without reading code.

- **Drawn from the product's AI manifest**, never by hand. The manifest is the machine-readable list of the product's AI features, in the form the AntaraX AI framework sets (`haziqfaris/ai-framework-heuristiks`). The page says which manifest version it shows and whether it matches the deployed prompts; a mismatch is a Needs-a-person row.
- **The five steps**, the same in every product: **Asked** (a person or a job asked for AI) → **Allowed** (membership, suspension, plan, REKA switch, organisation switch, monthly cap) → **Answered** (a model replied, after failover if needed) → **Checked** (the answer passed the server's checks) → **Decided** (a guardrail or a person decided). Each step shows how many calls reached it and how many left it, and why.
- **Where every call ended**, in the framework's five outcome words: Used as is · Corrected by a person · Not used · Waiting · ‹Product›'s own logic.
- **A row per AI feature** with its outcomes and its own measure of being right over 8 weeks.
- **The feature's card**: the manifest's fields for the chosen feature (where people meet it, what it sends and never sends, models, what happens without AI, checks, who decides, switches, what is logged).
- **Never shown:** prompts, photos, answers or personal data. One run, step by step, is Dashboard → Live trace; cost is Dashboard → AI usage; changes are Dashboard → Models & keys.
- Read only. A failing provider links to Troubleshoot.

**From framework 0.4 and 0.5 (owner, 16 Oct 2026).** The page also shows, still from the manifest and the call records only:

| Part | Shows | From |
|---|---|---|
| **Free first** | Per feature, the share of calls answered with no tokens (the product's own algorithms and task engines) against paid models, and the card's `free_first` verdicts, rung by rung | Call records' provider and price; the card |
| **Where answers came from** | Asked a model or engine · reused from the cache · shared with an identical call in flight, with the cost the reuse saved | `served_from` |
| **Traffic** | Per provider: calls in flight and waiting, and turn-aways ("AI was busy"). Over 1% of a provider's calls turned away in a week is a Needs-a-person row: a scaling signal | `traffic:busy` stops; the gateway's traffic stats |
| **Rollouts** | Features with a candidate route in shadow or canary: the split, and the verdict (hold, promote, roll back) with its reasons. Roll back is a safe action (§14.1) that sets the feature's rolled-back switch | `variant`; canaryVerdict |
| **Alerts** | A canary token in an answer is a high alert at once; refusal, check-failure, turn-away and cost spikes per organisation are Needs-a-person rows | detectAnomalies over the call records |
| **Retrieval** | For features that answer from an organisation's sources: the oldest source in each organisation's index against the card's limit, and the retrieval set's last score | The index's state; the evaluation run |
| **Where it runs** | Cloud, hybrid or on premises, and what may leave (`deployment.outbound`) | The manifest |

### 10.7 Libraries (std G1, Later)

Templates, catalogues and device types the platform owns. Each has versions and a release step: draft → review → published. Organisations see only published versions (ISO Generator Library; PLExyz Crowd device catalogue).

### 10.8 Audit (std J1)

- **Each row:** when (mono, MYT), who, rung, what, which organisation, reason, before and after.
- **Filters and export:** by staff, organisation, action and date range.
- **Never editable** from AXLE.
- **Central's calls** through AXLE Link appear as the service.

### 10.9 Jobs, alerts and backups (std H1–H3)

Jobs is R8 → Jobs in every product, with std M4's depth; Alerts and Backups stay in Dashboard → Operations.

| Page | Must show |
|---|---|
| Jobs | Every background job and webhook: last run, next run, failures with a safe error message, retry, cancel |
| Alerts | Thresholds (job failures, budget, health, error rate) and who is told, by email and in AXLE |
| Backups | Last backup, the last restore drill and its result, where backups are kept |

### 10.10 Demo and access (std K1–K3)

- **Demo data** has a switch. It is clearly labelled, and off by default for real organisations; switching it off leaves no demo rows.
- **Demo organisations per prospect** are rich enough to test with: at least one realistic record on every screen (Yara's Showcase).
- **The Access page** lists the address of every surface per environment (AXLE, product, client portal) and which test account to use. It never shows passwords.

### 10.11 Troubleshoot (std M10, M11, AXLE-03)

One problem, all its evidence. Every product has it, Base or Full. Opened in one click from any Dashboard alert or Needs-a-person row, from an R8 incident, or from R8 → Troubleshoot. On a Base product it usually holds the Application layer only, and that is enough: a failing provider, a stuck job, a missing setting. It opens scoped to that organisation and asset, with the scope in the address.

| Part | Holds |
|---|---|
| **Header** | The incident or signal in words, its severity and state, affected organisations, since when; a link back to where it was opened from |
| **Evidence, in layers** | **Outside** (probes, DNS, TLS, what a customer would see), **Inside** (host, agent, workers, queues), **Application** (errors, job runs, provider answers), **Visual** (the screenshot, where the product takes them). Each fact names its source and when it was read. A layer with no backend is not shown (M2) |
| **Timeline** | Every signal, automatic switch and staff action on this problem, in order, mono times |
| **AXLE's reading** | A plain-words diagnosis derived from the evidence, labelled as derived, naming the facts it rests on. Never a root cause the evidence does not show |
| **Your conclusion** | The operator's own words, stored apart from the evidence and the reading (M11). An AI guess is never stored as a fact |
| **Safe actions** | Only the actions that apply to this problem, each labelled with its level (§14.1): for example Test provider, Retry failed items, Suppress for 1 hour. Actions that live in the Dashboard (rotating a key) are links, not buttons |

## 11 Support sessions (std H7)

How REKA support sees an organisation exactly as its people see it, to solve a problem they reported, without asking for screenshots. **In every product** (owner, 15 Oct 2026; std H7 had it as Later). Angka's is the reference. The organisation's side is app SPEC §7 and §13.

| Rule | Standard |
|---|---|
| **Who** | The Support rung and above |
| **How it starts** | "Start support session" on the organisation page. It asks for:<ul><li>a reason, which is required and shown to the organisation;</li><li>the message or ticket it answers, if any;</li><li>a length: 30 minutes (default), 1 hour, or 4 hours at most.</li></ul> |
| **Consent** | Follows the organisation's own Support access setting (app SPEC §13):<ul><li>**Always allowed:** it starts at once, and the Owners are told.</li><li>**Ask each time** (the default): the Owners get the request in the product, as a banner and a notification, and by email, with the reason. It starts when one of them approves. An unanswered request lapses after 24 hours.</li><li>**Never:** the button is disabled, with "‹Organisation› doesn't allow support sessions. Ask an Owner to change Support access."</li></ul> |
| **Read only** | The server refuses every change during a session, not only the screen. Buttons that would change something show disabled, with "Read only in a support session" |
| **What staff see** | The product as an Owner sees it, except passwords, two-step settings and payment details, which are never shown |
| **Acting as a member** | Not built (§20 question 4) |
| **Banner, staff side** | Fixed at the top of every page of the product for the REKA person, in AXLE's look (navy, REKA orange): "Support view of ‹Organisation› · read only · ends at 12:12 · End now" |
| **Banner, organisation side** | Every member of the organisation sees "REKA support is here" with the person's name and end time, and Owners and Admins can End session (app SPEC §7, banner 1) |
| **Ending** | At the time shown, by "End now" for staff, or by "End session" from an Owner or Admin. A longer session is a new request |
| **The trail** | Every page viewed and every refused change is recorded:<ul><li>in AXLE's Audit;</li><li>in the organisation's own Activity log;</li><li>in its Support access history, with who, when, why and what was looked at.</li></ul>The Owners are told when a session starts and ends |

## 12 Never crosses to organisations (std A4)

| Never shown on the organisation plane | Shown instead |
|---|---|
| Model and provider names, prompts, traces | "AI" with the sparkle; the result |
| AI cost and REKA's margins | The plan and its quota |
| Sandbox, preview and environment notices meant for staff | Nothing, or the organisation's own trial status |
| Internal notes and tickets | Nothing |
| Other organisations' names or data | Nothing |
| The word AXLE, its address, staff rungs | "REKA support" |

## 13 States and honesty

### 13.1 Figures

| Situation | Show |
|---|---|
| Hidden by a rung or right | "–" and "Needs the Finance right" |
| Not measured yet | "–" and "No run recorded yet" |
| AXLE Link not set up (Central) | "Not connected", grey |
| Product refuses central switches (Central) | "Takes switches: no" |
| Live-only data in a preview | "Only on the live database" |
| Truly zero | 0 |

### 13.2 State banner

These states show a warn banner on every AXLE page until they end:
- open access;
- maintenance;
- a module or AI switched off globally;
- jobs paused;
- preview or no database;
- read-only console.

Each banner says what is on, since when, and links to Settings.

### 13.3 Loading, empty and error

- **Loading:** a skeleton in the page's light neutrals; nothing spins.
- **Empty:** says what will appear and how to get the first one.
- **Error:** says what failed and what to try, never "Oops".

## 14 Actions and confirmations (std L6)

- **No browser pop-ups.** In-app dialogs only, never `alert()`, `confirm()` or `prompt()`.
- **Destructive actions** name the thing and the consequence, ask for a reason, and their button names the action ("Suspend Acme Plastics").
- **Irreversible actions:** typed confirmation plus a second person.
- **After any action:** a past-tense toast, with Undo where possible.

### 14.1 R8 safety levels (std M12, M13)

| Level | Actions | Who | When |
|---|---|---|---|
| **1** | Run a check, refresh, capture, retry a job or its failed items, pause or resume monitoring, test a provider, ping or rotate an agent, acknowledge or suppress an incident | Operator (acknowledge: Support) | At launch |
| **2** | Drain, restart a worker, rebalance, scale, retention, sampling. REKA-owned machinery only | Admin | Later, when the backend exists |
| **3** | Shell, restarting a customer's machines or containers, deploying | Nobody | Never without a separate recorded decision. No Level 3 button exists |

- Every action shows its level next to its name.
- Every R8 action asks for a reason when it changes anything, and lands in the operations audit with who, what, target and reason (M13).
- A suppression always has an end time.

## 15 Words and formats

| Thing | Write | Never |
|---|---|---|
| Customer account | organisation | tenant (on screen), company, client, organization |
| Customer's person | member | user, seat |
| REKA person | staff | admin, superadmin, AXLE admin |
| REKA helping a customer, as the customer reads it | REKA support | AXLE, REKA admin |
| Staff rungs | Viewer · Support · Operator · Admin · Owner | Super Admin, ADMIN MODE |
| In and out | Sign in · Sign out | Log in, Log out |
| Money | RM1,200 · US$45, grouped by currency | RM 1,200 · $45 · USD · converted totals |
| Dates | 11 Oct 2026 · 14:30 MYT | 10/11/2026 · 2:30 PM |
| Spelling | British | US |

## 16 Accessibility

- **WCAG 2.2 AA** on both the dark bars and the light page.
- **The focus ring** from §4, on every control.
- **Skip link** and `aria-current` on the active item.
- **Counters** with spoken labels.
- **Targets** of at least 44px.
- **Reduced motion** stops all motion.
- **An axe check** runs in CI on Overview, Organisations, the organisation page and Audit.

## 17 Phones (std L1)

- Every AXLE page opens from the drawer at 390px with nothing hidden or overlapping.
- Overview blocks stack in order; figure tiles go two across.
- Tables scroll inside their own container.

## 18 AXLE Link and AXLE Central

Before a product joins Central, its AXLE serves AXLE Link's four endpoints from `@lapisan/core`:

| Endpoint | Feeds in Central |
|---|---|
| `GET /internal/axle/v1/tenants` | Organisations list and plans |
| `GET /internal/axle/v1/usage` | Figures and trends |
| `GET /internal/axle/v1/health` | Health dot and strip |
| `POST /internal/axle/v1/switches` | Switches, each with a reason |

- Central's Overview is §8 with one row per product.
- Every list gets a product filter.
- Every row deep-links into the product AXLE at the same organisation and range.

Angka and Lapis have AXLE Link today; no other product does.

## 19 How to prove it

The std QA checks, plus the ones this spec adds. Every product AXLE passes these before release.

| Check | Passes when |
|---|---|
| **Separation** | A member opens every AXLE address and gets 404; staff see no organisation's data on a scoped page until they pick one |
| **Nothing leaks** | Signed in as a member, searching the screens and the network responses finds no model name, trace, cost, AXLE, staff rung or other organisation |
| **Real numbers** | Every Overview figure matches a database count, and clicking it opens a list of that many rows |
| **Organisation life** | Create, suspend (member refused with a message), restore, request deletion: each step audited with a reason |
| **Invitation** | The email arrives; the link works once, expires, and lands the person in the right organisation and role |
| **Feature switch** | A module turned off for one organisation disappears from its menu and pages only; "why" names the deciding step |
| **AI** | Switch provider, run one AI action, see usage and cost recorded; with AI off the member sees a clear message |
| **Lists** | On every list: search, filter, sort, group, a bulk action on 2 rows, export; the stats strip updates |
| **Audit** | Three staff changes each appear with who, what, when, reason, before and after |
| **Rights** | A Viewer sees every page, disabled controls say what they need, and a missing right shows its gate card and dashes, never zeros |
| **Support session** | With "Ask each time", the session waits for an Owner's approval; the staff and organisation banners both show; a change is refused by the server; the session ends on time or when an Owner ends it; it appears in Audit, in the organisation's Activity log and in its Support access history |
| **Links** | Copying the address on any filtered, scoped page and opening it in a new window shows the same view |
| **Phone** | Every page opens from the drawer at 390px with nothing hidden or overlapping |
| **Collapsed groups** | Collapse every group: each one holding something that needs a person still shows its orange total; the current page's group is open on arrival; the choice is remembered after signing out and in |
| **R8 switch** | The switch changes only the menu, is remembered, needs no new sign-in, and says Base or Full; a member cannot open any R8 address |
| **R8 jobs** | Run a job now: it appears with eligible, processed and failed counts; retry failures runs only the failed items |
| **R8 providers** | Test provider gives a result and a latency; no key or secret appears on the page or in its network responses |
| **R8 AI flow** | Every AI feature in the code appears in the manifest and on the page; the five steps add up (asked = every outcome together), and so do model, cache and shared answers; turn-aways are counted; no prompt, photo, answer, reused answer or source text appears on the page or in its network responses |
| **R8 troubleshoot** | From a Dashboard alert, Troubleshoot opens R8 on that organisation and asset with outside evidence, a timeline and only safe actions; the reading and the conclusion are stored apart |
| **R8 safety** | No Level 3 action exists; every R8 action appears in the audit log with a reason |
| **Backend exists** | No R8 page or Observe item is empty or "coming soon"; a Base product shows no Incidents or Observe |
| **Look** | Dark sidebar and top bar, light page, the orange `AXLE` tag and accent, the AntaraX A, "AXLE · Product" in the page title; the focus ring is visible on every control in both; axe passes |

## 20 Open questions

1. ~~**The look.**~~ Decided 15 Oct 2026: dark bars, light page (§4). Recorded in the brand kit (10, 13 §6).
2. **Roles (std A2 against antarax-api docs/07).** std A2 lists functional roles that one person may combine; antarax-api and Angka use a ladder. This draft maps them onto one model: a ladder for how much, rights for which area. Confirm the rungs and the four rights.
3. ~~**Support sessions.**~~ Decided 15 Oct 2026: in every product now, with the organisation's consent (§11).
4. **Acting as a member.** Allowed at all (§11)?
5. **Focus ring on the dark bars.** `#4D84FE` there, AntaraX blue `#0459F7` on the light page (§4). Confirm for the brand kit.
6. ~~**The primary action colour.**~~ Decided 15 Oct 2026: REKA orange `#FB9800` with navy text, in every product's AXLE.
7. **The "Support" rung name.** The brand kit reserves "REKA support" for customers. The rung is never shown to them, so is it fine to keep?
8. **Scope.** The std draws on YARA One, Entangled Particles and KITAR AI, which the inventory has not covered, and ISO Generator, which the brand kit doesn't list. Which products must meet this standard? **ISO Generator is on hold** (owner, 15 Oct 2026): nothing in this standard applies to it until the owner says so, and nobody changes its AXLE.
9. **Lifecycle words.** std C3's statuses (trial, active, restricted, suspended, cancelled, pending deletion) alongside a rollout stage (sandbox, pilot, live): confirm both are wanted.
10. **Cooling-off and invitation expiry defaults** (30 days, 7 days).
11. ~~**R8 for every product.**~~ Decided 15 Oct 2026: every product has R8, Base or Full (§2, §7.1). This departs from std v0.2, which gives R8 only to products with machinery; the standard should take it in v0.3.
12. **Where the product-only box sits.** At the end of each mode's list (this draft), so the standard never moves; or first, because product pages may be the ones staff open most.
13. ~~**Which products are R8 Full.**~~ Decided 15 Oct 2026: AX Frame, Janka, Angka and Tinara are Full; Yara and PLExyz Grid are Base (§7.5).
14. ~~**Where Errors lives.**~~ Decided 15 Oct 2026: Dashboard → Operations in every product, each error linking to Troubleshoot (§7.3).
15. ~~**R8 roles on the ladder.**~~ Decided 15 Oct 2026: std M14 maps onto Support, Operator (Level 1), Admin (Level 2), the Finance right and Owner (§5.2).
16. ~~**AI split.**~~ Decided 15 Oct 2026: AI configuration, including Live trace, stays in Dashboard (std F); provider health and Test provider are R8 → Providers (M5).

## 21 What each console changes

Scores from the AXLE scorecard in the [gallery](../inventory/gallery.html), out of 8. The minimum first release (§2) adds lists, lifecycle, features, demo and access to every row.

| Console | Score | Biggest changes |
|---|---|---|
| AX Frame | 6 | Keep Dashboard and R8; regroup R8 into Command, Observe, System, Control and diagnostics (§7.4); Visual and Troubleshoot are standard now; move AI configuration and Errors into Dashboard; add the staff menu, Find, the organisation picker; fix the phone header; Workspaces → Organisations; lists to §9 |
| Angka | 6 | Dark sidebar and top bar around its light page; a phone drawer; US$; the organisation create flow and lifecycle |
| Yara | 4 | Add R8 Base (Services from its `/api/version` check, Jobs, Providers, Configuration, Troubleshoot); rename; bars from `#0B0E14` to `#071233`; the `AXLE` tag; the ladder (only `reka_admin` today); the state banner; Organizations → Organisations; Demo and Access pages (Showcase already exists) |
| Janka | 4 | Rename; the AntaraX top bar in its dark variant over the light page; rail `#0B0E14` → `#071233`; the AntaraX A; the ladder; JetBrains Mono; Members management (std D2 correction) |
| ISO Generator | 4 | **On hold** (owner, 15 Oct 2026): do not change it. The scorecard stays for reference |
| PLExyz Grid | 1 | Rebuild: Overview, R8 Base, addresses for every page, dark bars around its light page, ladder, no `confirm()`, a create flow |
| Tinara | 1 | Rebuild as `AXLE · Tinara` on its own host, with R8 Full for its pipelines; remove hard-coded figures |
| PLExyz Crowd | n/a | No internal console; remove AXLE from the customer app first |

## Appendix A: coverage of the REKA standard

Every item in [the REKA standard](reference/axle-admin-console-standard-v0.2.md), and where it lives here.

| std | Here | | std | Here | | std | Here |
|---|---|---|---|---|---|---|---|
| A1 | §5.1 | | D1 | §5.2, §7 Staff | | G1 | §10.7 |
| A2 | §5.2 | | D2 | §10.3, §10.4 | | G2 | §7 Settings |
| A3 | §1 | | D3 | §10.4 | | H1 | §10.9 |
| A4 | §3, §12, §19 | | D4 | §10.3 | | H2 | §7 Alerts, §10.9 |
| A5 | §5.1 | | E1 | §10.5 | | H3 | §10.9 |
| A6 | §5.1 | | E2 | §10.5 | | H4 | §7 Support, §10.3 |
| B1 | §8 | | E3 | §10.5 | | H5 | §6.2 |
| B2 | §3, §8, §19 | | E4 | §10.5 | | H6 | §7 Announcements |
| B3 | §8 block 2, §7.4 Services | | E5 | §10.5, §13.2 | | H7 | §11 |
| B4 | §8 | | F1–F6 | §10.6 | | I1 | §7 Adoption |
| C1 | §9 | | | | | I2 | §7 Service |
| C2 | §10.1 | | | | | I3 | §7 Billing |
| C3–C5 | §10.2 | | | | | J1 | §10.8 |
| C6 | §10.3 | | | | | J2 | §7 Security |
| C7 | §10.3 Branding | | | | | J3 | §7 Requests |
| K1–K3 | §10.10 | | L1 | §6, §17 | | L2 | §3, §6 |
| L3 | §9 | | L4 | §3, §8 | | L5 | §4, §20 |
| L6 | §14 | | L7 | §3, §6.1 | | QA | §19 |
| M1 | §7.1 | | M7 | §7.4 Visual | | M13 | §14.1, §7.4 Operations audit |
| M2 | §7.1, §7.4, §10.11 | | M8 | §7.4 Agents | | M14 | §5.2 |
| M3 | §8.1 | | M9 | §7.4 Incidents | | M15 | §8.1 block 6 |
| M4 | §7.4 Jobs | | M10 | §10.11, §8 block 3 | | M16 | §6.2 (Later) |
| M5 | §7.4 Providers | | M11 | §10.11 | | M17 | §7.1, §8.1 |
| M6 | §7.4 Probes and network | | M12 | §14.1 | | R8 Base, Full | §2 |

## Appendix B: where each pattern comes from

| Pattern | Best example today |
|---|---|
| Ladder with "Needs {role}" | Angka |
| Gate card, unknown not zero, organisation scope in the address, readiness checklist, diagnosis-first trace, health card | ISO Generator |
| Status strip, support banner, range picker, AXLE Link | Angka |
| Needs a person | Janka, AX Frame, Angka, ISO Generator |
| Data health per organisation, staff and members kept apart, Showcase demo organisation | Yara |
| Dark look and name, state banner, "How this page works" | AX Frame |
| R8 mode, Jobs, Providers, Visual, Troubleshoot | AX Frame |
| Phone drawer with focus trap | Yara |
