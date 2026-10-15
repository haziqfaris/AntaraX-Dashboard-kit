# AXLE standard

**Version 0.3, draft, 15 Oct 2026.** This is the console every AntaraX product gives REKA staff, and the base for AXLE Central at `axle.antarax.ai`.

It merges two sources:

- **The REKA AXLE Admin Console Standard v0.1** ([reference copy](reference/axle-admin-console-standard-v0.1.md), cited as **std A1** to **std L7**). It says *what* AXLE must be able to do, in tiers, built from the owner's corrections across nine REKA projects.
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
| **Later** | When a client, a regulation or scale needs it, recorded in the decisions log |

**The minimum first release** for a new product is every Always item, plus Orgs if it has several organisations, plus AI if it uses AI (std). [§19](#19-how-to-prove-it) is the test.

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
| **Sidebar** | 240px, raised ground. Its own brand block (the products keep one too): the A, "AXLE" and "REKA STAFF CONSOLE" in mono; grouped navigation (§7) with counters; at the foot, initials, name, the role chip in orange, and the footer line | Always |
| **Active item** | Orange text, a 3px orange marker, an orange intan before the label, `aria-current="page"` | Always |
| **State banner** | A rounded warn band under the top bar, in the same gutter, while a state staff must not forget holds (§13.2) | Always |
| **Page header** | The title is in the top bar. Under it: one line saying what the page is for, the state line, the "How this page works" disclosure, and the page's range picker or primary action | Always |
| **Phones** | Below 1024px the sidebar becomes a drawer with its groups and counters (Yara), not a chip strip. AXLE on a phone shows AXLE, never the customer app (std L1). The title is never covered | Always |

### 6.1 Organisation scope

One picker sets the organisation for every page that can be scoped. Its value is in the address (`?org=acme-plastics`), and "All organisations" is the default. Staff see no organisation's data on scoped pages until they pick one, or choose "All", which shows only platform-level rows (std QA "Separation"; ISO Generator).

### 6.2 Find (std H5)

⌘K searches organisations, members, staff, AXLE pages and records, filtered by the person's rights. A request id (`req_…`) jumps to Lookup. Tier: Later as global search across records; page search is Always.

## 7 Navigation

Groups and order are fixed. A product keeps the items its tiers require, in these places and under these names, and adds its own items only inside the **‹Product›** group. AXLE Central adds a **Products** group at the top of Watch, with one item per product and its health dot.

| Group | Item | Tier | What it is (std) | Change needs |
|---|---|---|---|---|
| **Watch** | **Overview** | Always | §8 (B1–B4) | Viewer |
| | **Health** | Always | Status of the app, database, sign-in, storage, email, AI providers, deployed version, backups, scheduled jobs and webhooks (B3, H1, H3); AX Frame's R8 lives here | Operator |
| | **Alerts** | Always | Operator alerts and their thresholds, by email and in AXLE (H2) | Admin |
| | **Errors** | Always | Unknown errors grouped, each with a request id | Viewer |
| | **Adoption** | Always | Active organisations and members over time, feature use per organisation, who stopped using it (I1) | Viewer |
| | **Service** | Later | Response times, errors and uptime against promised targets (I2) | Viewer |
| **Organisations** | **Organisations** | Orgs | List, create, lifecycle and the organisation page (C1–C6, §10.1–10.3) | Operator, Admin |
| | **Members** | Orgs | Members across organisations (D2) | Support, Operator |
| | **Invitations** | Always | Single-use expiring links (D3) | Support |
| | **Requests** | Orgs | Access requests, data export and deletion requests, pilot requests (C5, J3) | Admin, Security right |
| | **Support** | Orgs | Notes and tickets per organisation, never shown to it (H4) | Support |
| **‹Product›** | Product items | as needed | What only this product has: libraries, catalogues, device types (G1), forecast accuracy, scorecards | on the ladder |
| **AI** | **Models & keys** | AI | Providers, keys (masked, test, rotate), model per task with default and fallback chain, automatic switch on outage (F1, F2) | AI right |
| | **AI usage** | AI | Usage, performance and cost per organisation, task and model; monthly budgets and alerts (F4) | Viewer; cost needs Finance |
| | **Live trace** | AI | One run, diagnosis first, AXLE only (F5, §10.6) | Viewer; bodies need AI |
| | **Prompts & quality** | AI | Prompt and configuration versions with a change log; feedback, evaluation scores, learning (F6) | AI right |
| **Money** | **Plans & features** | Always | Plans or editions and what each includes; features classified as core, configurable, module or flag; per-organisation switches; "why does it have this?"; quotas with logged overrides (E1–E4, §10.5) | Admin |
| | **Billing** | Billing | Revenue, invoices, failed payments, by currency (I3) | Finance |
| | **Costs** | Later | What the product costs to run, against revenue | Finance |
| **Platform** | **API** | when the product has one | Lapisan's section: Keys, Switches, Calls, Lookup, Connect apps (antarax-api docs/07) | Operator |
| | **Announcements** | Later | Draft, audience, schedule, delivery status (H6) | Admin |
| | **Help content** | Later | The product's `/help` answers | Admin |
| | **Demo** | Always | Demo data switch, demo organisations per prospect (K1, K2) | Admin |
| | **Access** | Always | Links to every surface per environment, with the test account to use; never passwords (K3) | Viewer |
| | **Settings** | Always | Email templates and sender, legal texts, regions and time zones, module off switches, maintenance mode (G2, E5) | Admin, Owner for secrets |
| **Trail** | **Audit** | Always | Every staff action (J1, §10.8) | Viewer |
| | **Security** | Later | Sign-in activity, failed sign-ins, sessions, MFA status (J2) | Security right |
| | **Staff** | Always | Staff, rungs, rights, MFA status (D1) | Admin |
| | **AXLE guide** | Later | The staff guide in REKA's user-guide format | |

**Counters** count only what needs a person: new errors, open requests, failing keys, unread feedback. They are loud (orange) when action is due and grey when they are only a count.

## 8 Overview (std B1–B4)

The same page in every product, top to bottom. Every block is visual, every figure is real, and every figure opens its filtered list.

| # | Block | Holds | Rules |
|---|---|---|---|
| 1 | **Header** | Title, one line, a state line ("Live database · last 7 days"), a range picker: 7 days (default), 30, 90, 12 months, All time, Choose days | The range is in the address |
| 2 | **Health strip** | App, database, sign-in, storage, email, each AI provider, deployed version, last backup, last scheduled job (B3) | Tint plus a word, never colour alone; each tile opens Health |
| 3 | **Needs a person** | Failing jobs and webhooks, failing keys, budgets past 80%, suspended organisations, open requests, stuck runs; each with which organisation, since when, and a link to the fix | Empty: "Nothing needs a person. Every job ran and every service answered." Respects rights |
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

### 10.7 Libraries (std G1, Later)

Templates, catalogues and device types the platform owns. Each has versions and a release step: draft → review → published. Organisations see only published versions (ISO Generator Library; PLExyz Crowd device catalogue).

### 10.8 Audit (std J1)

- **Each row:** when (mono, MYT), who, rung, what, which organisation, reason, before and after.
- **Filters and export:** by staff, organisation, action and date range.
- **Never editable** from AXLE.
- **Central's calls** through AXLE Link appear as the service.

### 10.9 Jobs, alerts and backups (std H1–H3)

| Page | Must show |
|---|---|
| Jobs | Every background job and webhook: last run, next run, failures with a safe error message, retry, cancel |
| Alerts | Thresholds (job failures, budget, health, error rate) and who is told, by email and in AXLE |
| Backups | Last backup, the last restore drill and its result, where backups are kept |

### 10.10 Demo and access (std K1–K3)

- **Demo data** has a switch. It is clearly labelled, and off by default for real organisations; switching it off leaves no demo rows.
- **Demo organisations per prospect** are rich enough to test with: at least one realistic record on every screen (Yara's Showcase).
- **The Access page** lists the address of every surface per environment (AXLE, product, client portal) and which test account to use. It never shows passwords.

## 11 Support sessions (std H7)

How REKA support sees what a member sees. **Later** (std H7): build it only when the product needs it. When it is built, these rules hold (Angka is the reference; ISO Generator's must change):

| Rule | Standard |
|---|---|
| Who | Support rung and above |
| How it starts | "Start support session" on the organisation page; a reason; a length of 30 minutes (default), 1 hour or 4 hours |
| Default mode | **Read only.** The server refuses writes, not only the interface |
| Acting as a member | Only if the product needs it (std H7): Operator, a second reason, sensitive actions blocked (billing, members, deletion, exports) |
| Banner | Fixed at the top of every page in the product: "REKA support view of Acme Plastics · read only · ends at 14:30 · End now" |
| The organisation sees | The session in its own activity log, with the time and reason |
| Ending | At the time shown or "End now"; every action in the session is audited |

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
| **Support session** | (If built) the banner shows, writes are refused by the server, the session ends on time, and the organisation sees it in its log |
| **Links** | Copying the address on any filtered, scoped page and opening it in a new window shows the same view |
| **Phone** | Every page opens from the drawer at 390px with nothing hidden or overlapping |
| **Look** | Dark sidebar and top bar, light page, the orange `AXLE` tag and accent, the AntaraX A, "AXLE · Product" in the page title; the focus ring is visible on every control in both; axe passes |

## 20 Open questions

1. ~~**The look.**~~ Decided 15 Oct 2026: dark bars, light page (§4). Recorded in the brand kit (10, 13 §6).
2. **Roles (std A2 against antarax-api docs/07).** std A2 lists functional roles that one person may combine; antarax-api and Angka use a ladder. This draft maps them onto one model: a ladder for how much, rights for which area. Confirm the rungs and the four rights.
3. **Support sessions (std H7 Later against Angka, which has one).** Keep them Later for new products, with the §11 rules binding wherever one exists?
4. **Acting as a member.** Allowed at all (§11)?
5. **Focus ring on the dark bars.** `#4D84FE` there, AntaraX blue `#0459F7` on the light page (§4). Confirm for the brand kit.
6. **The primary action colour.** Orange (this draft) or the product's colour (AX Frame)?
7. **The "Support" rung name.** The brand kit reserves "REKA support" for customers. The rung is never shown to them, so is it fine to keep?
8. **Scope.** The std draws on YARA One, Entangled Particles and KITAR AI, which the inventory has not covered, and ISO Generator, which the brand kit doesn't list. Which products must meet this standard?
9. **Lifecycle words.** std C3's statuses (trial, active, restricted, suspended, cancelled, pending deletion) alongside a rollout stage (sandbox, pilot, live): confirm both are wanted.
10. **Cooling-off and invitation expiry defaults** (30 days, 7 days).

## 21 What each console changes

Scores from the AXLE scorecard in the [gallery](../inventory/gallery.html), out of 8. The minimum first release (§2) adds lists, lifecycle, features, demo and access to every row.

| Console | Score | Biggest changes |
|---|---|---|
| AX Frame | 6 | Fold R8 into Health; add the staff menu, Find, the organisation picker; fix the phone header; Workspaces → Organisations; lists to §9 |
| Angka | 6 | Dark sidebar and top bar around its light page; a phone drawer; US$; the organisation create flow and lifecycle |
| Yara | 4 | Rename; bars from `#0B0E14` to `#071233`; the `AXLE` tag; the ladder (only `reka_admin` today); the state banner; Organizations → Organisations; Demo and Access pages (Showcase already exists) |
| Janka | 4 | Rename; the AntaraX top bar in its dark variant over the light page; rail `#0B0E14` → `#071233`; the AntaraX A; the ladder; JetBrains Mono; Members management (std D2 correction) |
| ISO Generator | 4 | Rename from REKA Admin; dark bars (its page is already light); rights onto the ladder; support session to §11; phone drawer; stop hiding readable pages; AXLE Link |
| PLExyz Grid | 1 | Rebuild: Overview, addresses for every page, dark bars around its light page, ladder, no `confirm()`, a create flow |
| Tinara | 1 | Rebuild as `AXLE · Tinara` on its own host; remove hard-coded figures |
| PLExyz Crowd | n/a | No internal console; remove AXLE from the customer app first |

## Appendix A: coverage of the REKA standard

Every item in [the REKA standard](reference/axle-admin-console-standard-v0.1.md), and where it lives here.

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
| B3 | §8 block 2, §7 Health | | E5 | §10.5, §13.2 | | H7 | §11 |
| B4 | §8 | | F1–F6 | §10.6 | | I1 | §7 Adoption |
| C1 | §9 | | | | | I2 | §7 Service |
| C2 | §10.1 | | | | | I3 | §7 Billing |
| C3–C5 | §10.2 | | | | | J1 | §10.8 |
| C6 | §10.3 | | | | | J2 | §7 Security |
| C7 | §10.3 Branding | | | | | J3 | §7 Requests |
| K1–K3 | §10.10 | | L1 | §6, §17 | | L2 | §3, §6 |
| L3 | §9 | | L4 | §3, §8 | | L5 | §4, §20 |
| L6 | §14 | | L7 | §3, §6.1 | | QA | §19 |

## Appendix B: where each pattern comes from

| Pattern | Best example today |
|---|---|
| Ladder with "Needs {role}" | Angka |
| Gate card, unknown not zero, organisation scope in the address, readiness checklist, diagnosis-first trace, health card | ISO Generator |
| Status strip, support banner, range picker, AXLE Link | Angka |
| Needs a person | Janka, AX Frame, Angka, ISO Generator |
| Data health per organisation, staff and members kept apart, Showcase demo organisation | Yara |
| Dark look and name, state banner, "How this page works" | AX Frame |
| Phone drawer with focus trap | Yara |
