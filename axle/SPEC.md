# AXLE standard

**Version 0.1, draft, 15 Oct 2026.** This is the console every AntaraX product gives REKA staff, and the base for AXLE Central at `axle.antarax.ai`. It is built from the seven AXLE consoles in [the inventory](../inventory/README.md), the AXLE Central plan in antarax-api ([summary](../inventory/lapisan-console/axle-central-requirements.md)) and the brand kit (13 §6, §1, §2, §10). Where it settles something the brand kit does not, the decision goes into the brand kit's decisions log before products build it. Open choices are in [§17](#17-open-questions).

**Words used here.**
- **Must:** required to call a console AXLE.
- **Should:** expected unless the product has a reason, written down.
- **May:** optional.
- **Organisation:** the customer's account.
- **Member:** a customer's person.
- **Staff:** a REKA person using AXLE.

**Where each rule comes from.** The section headings below name the console each rule is taken from (see [the source map](#appendix-source-map)).

---

## 1 What AXLE is

AXLE is REKA's internal console for running a product: who is on it, whether it works, what it costs, and what needs a person. Customers never see its name, its address or any of its screens (brand kit 03, 13 §6).

There are two levels:

| Level | What it is | Address |
|---|---|---|
| **Product AXLE** | One per product, with the depth that only the product knows (forecast runs, generation traces, job cards) | `axle.<product>.antarax.ai` until Central exists |
| **AXLE Central** | One screen across every product. It reads each product AXLE through AXLE Link, and links back into it for depth. It never replaces a product AXLE | `axle.antarax.ai` |

Both use this standard. A product AXLE built to it can be lifted into Central without a redesign.

## 2 Principles

1. **Attention first.** The first thing on every overview is what needs a person, with a link to the fix. Counts come after. (Janka "Needs a human", Angka and AX Frame "Needs an operator", ISO Generator's attention strip.)
2. **Never a false zero.** If staff cannot see a figure, or it is not measured yet, show a dash and say why ("Needs the Costs right", "No run recorded yet"). Never `$0.00` or `0`. (ISO Generator)
3. **Explain every page.** Each page says in one line what it is for, with a fuller "How this page works" that can be opened. (AX Frame, Janka, ISO Generator)
4. **Every change has a reason and a trail.** Switches, stops, plan changes and support views ask for a reason, record who, when, before, after and why, and show it in Audit. (Angka, antarax-api docs/07)
5. **Read is wide, change is narrow.** Every staff role can read almost everything. Changing things needs the role or right for it, and the screen says which one. (Angka rungs, ISO Generator gates)
6. **Say what state the data is in.** Preview data, a missing database, open access or a paused service is shown as a banner, not left for staff to guess. (AX Frame, Angka, Tinara)
7. **One console, many products.** The same names, the same places and the same look in every product, so staff moving from Yara's AXLE to Janka's find Organisations, Audit and Staff in the same spot.

## 3 Identity

| Element | Standard | Notes |
|---|---|---|
| **Name** | `AXLE` in the sidebar; the product as context: `AXLE · Janka`. Page titles: `<Page> · AXLE · Janka`. Central: `AXLE` alone | Never "REKA Admin", "Platform Admin", "Tinara Admin", "Yara AXLE", "Janka AXLE" |
| **Mark** | The AntaraX A in the sidebar corner, with the product's own mark as a small context chip beside the product name | Brand kit 13 §6. One mark per lockup; the product mark is a chip, not a second logo |
| **Theme** | Dark only (13 §10) | No theme toggle |
| **Ground** | `--axle-bg #071233`; raised `--axle-raised #0C1B47`; raised 2 `#13255C` | AX Frame already ships these |
| **Ink** | Headings `#EAF0FF`; body `#B6C3EA`; muted `#8E9CC9` (6.1:1 on raised) | |
| **Lines** | `rgba(157,184,255,.16)` | |
| **Accent** | REKA orange `#FB9800` (8.4:1 on ground): the active nav marker, the role chip, the one primary action on a page (navy `#071233` text on orange) | It is REKA's tool. Orange never appears in a customer app |
| **Links** | `#4D84FE` | |
| **Focus ring** | 2px, offset 2px, `#4D84FE` | AntaraX blue `#0459F7` reaches only 2.99:1 on raised navy, under the 3:1 minimum. See [§17](#17-open-questions) |
| **Status** | ok `#12B76A`, warn `#F79009`, fault `#F04438`, with dark tints. For small text on dark use fault `#F7877F` and ok `#5FD39B` | Only for real signal |
| **Type** | Poppins for UI; JetBrains Mono for every number, id, time and email (tabular figures) | No third face (ISO Generator uses DM Sans, Bricolage and DM Mono) |
| **Background** | Dots, never ruled lines, if a blueprint ground is used at all | AX Frame |
| **Credit** | No "by AntaraX" inside AXLE. Footer: "Authorised REKA staff · every action is recorded" | Yara's "authorized staff · audit-logged", in British spelling |

## 4 Access

### 4.1 Signing in

- AXLE **must** live on its own host, with its own cookies, separate from the customer app (Yara, AX Frame, Angka, ISO Generator already do this).
- Staff sign in on an AXLE sign-in page titled "Sign in to AXLE", not the customer sign-in.
- Two-step sign-in **should** be required for every staff account (Angka's `/axle/verify`).
- A signed-in person who is not staff sees a plain page: "This account isn't on the REKA staff list. Sign out". Any other AXLE address returns 404, so the console is not advertised (AX Frame DeniedGate, Angka).
- When AXLE Central exists, one REKA staff sign-in covers every product AXLE (13 §6).

### 4.2 Staff roles

One ladder, each rung including the one below it (antarax-api docs/07, already built in Angka):

| Role | Can |
|---|---|
| **Viewer** | Read everything except secrets and, unless granted, money (see §4.3) |
| **Support** | Plus: open a support view, look up calls, see an organisation's keys, add notes, resend invitations |
| **Operator** | Plus: switches, stop keys, suspend organisations, limit overrides, run or pause jobs |
| **Admin** | Plus: plans and features, switching organisations on, staff roles, help content, announcements |
| **Owner** | Plus: platform secrets, deleting data, the two-person approvals below |

- **Every role sees the same navigation.** A control the person cannot use stays visible but disabled, with "Needs Operator" beside it (Angka `NeedsRole`). Do not hide pages from people who may read them (the ISO Generator dead-end).
- **Rights on top of the ladder** **may** be added for narrow powers that do not fit a rung: Costs (`usage.read`), Models and keys, Library publish. A right is shown and granted on the staff member's page (ISO Generator).
- **A page someone cannot open** shows a gate card instead of a 404 or a blank page. The card says:
  - which role or right is missing,
  - what it covers,
  - who can grant it ("An Admin can add it in AXLE → Staff → your name").

  (ISO Generator)
- **Nobody can remove their own Staff right** or lower their own role (ISO Generator).
- **Two people** for anything irreversible (deleting an organisation's data, rotating a platform secret) once there are more than two operators. The second person approves in AXLE; both names go in Audit (antarax-api docs/07).

### 4.3 Money visibility

Money (MRR, invoices, AI cost) is readable by Admin and Owner, and by anyone given the Costs right. Others see a dash with "Needs the Costs right" (ISO Generator). Budget alerts follow the same rule, so a spend figure never leaks through an alert.

## 5 Shell

```
┌──────────────┬──────────────────────────────────────────────────────────────┐
│ A  AXLE      │ [Janka ▾]  Organisation: [All ▾]   [Find… ⌘K]    [●] [AR ▾] │  top bar 56px
│    · Janka   ├──────────────────────────────────────────────────────────────┤
│              │ ▲ Open access is on: every organisation has paid limits.     │  state banner
│ WATCH        ├──────────────────────────────────────────────────────────────┤
│ ◆ Overview   │ Overview                                     [Last 7 days ▾] │
│   Health     │ What needs a person, and how the platform is doing.  ⓘ       │
│   …          │                                                              │
│              │                                                              │
│ ──────────── │                                                              │
│ AR · OPERATOR│                                                              │
│ Authorised   │                                                              │
│ REKA staff   │                                                              │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

| Part | Must have | Taken from |
|---|---|---|
| **Sidebar** (240px, raised ground, full height, own scroll) | The AntaraX A + "AXLE" + product chip; the grouped nav (§6) with counters; at the foot: initials, name, role chip in orange (VIEWER … OWNER), "Authorised REKA staff · every action is recorded" | Yara, Janka, AX Frame |
| **Active item** | Orange text, a 3px orange marker on the left and an orange intan before the label; `aria-current="page"` | Kit 12 (intan), Angka (aria-current) |
| **Top bar** (56px, sticky) | The product switcher (only in Central, or where staff run several products); the **organisation scope picker** (§5.1); **Find** with ⌘K (§5.2); a health dot that opens the status strip; the staff menu | ISO Generator (scope), Angka (⌘K) |
| **Staff menu** | Your account, Two-step sign-in, AXLE guide, Sign out (asks first) | Yara, Janka |
| **State banner** (full width, under the top bar) | Shown while the platform is in a state staff must not forget (§10.2). Never dismissible while the state holds | AX Frame OPEN ACCESS, Angka read-only |
| **Page header** | Title; one plain line saying what the page is for; "How this page works" disclosure; the page's range picker or primary action on the right | AX Frame, Janka, ISO Generator |
| **Content** | Max 1280px, 24px gutters, cards on raised ground, tables full width | |

### 5.1 Organisation scope

One picker in the top bar sets the organisation for every page that can be scoped (Members, Usage, Trace, Audit…). Its value lives in the address (`?org=acme-plastics`), so a link opens the same view for the next person. "All organisations" is the default. Pages that cannot be scoped show the picker disabled with "Not scoped" (ISO Generator `TenantPicker`).

### 5.2 Find

⌘K (Ctrl K) opens one search over:

- organisations,
- members (by name or email),
- staff,
- AXLE pages,
- a request id (`req_…`), which jumps to Lookup.

No AXLE has this today. ISO Generator's search stops at customer pages, and AXLE Central plans Lookup by request id.

## 6 Navigation

Groups and order are fixed. A product **must** keep the core items in these places, under these names. It **may** leave out an item it has nothing for, and **may** add its own items only inside the **Product** group. Every page has its own address, so the browser's back button works (Grid's AXLE has none).

| Group | Item | Core? | What it is | Change needs | Seen today in |
|---|---|---|---|---|---|
| **Watch** | **Overview** | Core | §7 | Viewer | all but Grid |
| | **Health** | Core | Status of every job, backup, webhook and outside service; the "machinery" (AX Frame R8 becomes this page, not a mode) | Operator (run, pause, test) | Angka, AX Frame R8, ISO Generator, Yara Data health |
| | **Errors** | Core | Unknown errors grouped, newest first, each with a request id | Viewer | Angka |
| | **Growth** | Should | Sign-ups, activation funnel, where people stop, stalled organisations | Viewer | Angka, AX Frame Analytics, Yara Analytics |
| | **Feedback** | May | What members sent from the product | Support | Angka |
| **Organisations** | **Organisations** | Core | §8.1 list and §8.2 detail | Operator (suspend), Admin (switch on, plan) | all |
| | **Members** | Core | Every customer member, across organisations. Never lists staff | Support (resend, reset), Operator (suspend) | Yara Tenant users, Janka, AX Frame, Angka People, ISO Generator |
| | **Invitations** | Should | Open invitation links, and links that start a new organisation | Support | Yara |
| | **Requests** | Should | Access requests, data-protection (PDPA) requests, pilot requests | Admin | Angka Requests, ISO Generator Workspace requests, Grid approvals |
| **‹Product›** (the product's name) | Product items | May | Whatever only this product has: Janka Forecast accuracy; ISO Generator Library, Learning, Scorecard; Yara Workflows templates | as the product sets, on the ladder | Janka, ISO Generator, AX Frame |
| **AI** | **Models & keys** | Core if the product uses AI | Providers, routes, keys (stored as pointers, shown masked), last success or failure | Admin, or the Models right | Janka, Grid, ISO Generator, Angka AI |
| | **AI calls** | Core if AI | Calls, errors, latency and cost per organisation; **Live trace** for one run, diagnosis first (§8.4) | Viewer (cost needs the Costs right) | Angka, Janka Usage & cost, ISO Generator Analytics and Live trace |
| | **Learning** | May | How the AI is learning: references, scoring, tuning | Admin | Janka, ISO Generator |
| **Money** | **Plans & features** | Core | Plan ladder (Seed · Terra · Nova · Galaxy · Quantum), features per plan, per-organisation overrides | Admin | Janka, Angka, AX Frame Catalog, Tinara |
| | **Billing** | Should | Subscriptions, invoices, discounts and comps, by currency | Admin | Yara, Grid, AX Frame, Angka |
| | **Costs** | Should | What the product costs to run: AI, infrastructure, email; share of revenue against target | Costs right | Angka, Janka |
| **Platform** | **API** | Core once the product has an API | The Lapisan section: Keys, Switches, Calls, Lookup, Connect apps (antarax-api docs/07). Angka's is the pattern | Operator (switches, stop keys), Admin (plans) | Angka |
| | **Email** | Should | What the product sent, bounces, the template preview | Support | Angka |
| | **Announcements** | Should | Banners and emails to members, scheduled, with audience | Admin | Angka, AX Frame Broadcast |
| | **Help content** | Should | The `/help` answers the product shows, edited here | Admin | Yara, AX Frame FAQ, Angka Help centre |
| | **Settings** | Core | Platform switches (open access, maintenance, pause generation), each with a reason | Admin, Owner for secrets | all |
| **Trail** | **Audit** | Core | Every staff action, filterable by staff, organisation, action and date; before and after | Viewer | all |
| | **Staff** | Core | Staff, their roles and rights, two-step status. Never lists customer members; no "create" button, staff are added deliberately (Yara) | Admin | Yara AXLE admins, Janka, AX Frame Team, Angka |
| | **AXLE guide** | Should | The staff guide, in REKA's user-guide format | n/a | Yara |

**Counters** sit on the right of an item. They count only things that need a person:
- new errors in 24 hours,
- unread feedback,
- open requests (Admin and above),
- failing keys.

A counter is loud (orange) when action is due, grey when it is only a count (Angka).

**AXLE Central** uses the same groups. It adds a **Products** group at the top of Watch, with one item per product showing its health dot. Every list gets a product filter.

## 7 Overview

The same page in every product, top to bottom. Products fill in their own figures; the order and the kinds of block do not change.

| # | Block | What it holds | Rules | Taken from |
|---|---|---|---|---|
| 1 | **Header** | "Overview" · one line ("What needs a person, and how {product} is doing") · state line ("Live database · last 7 days" or "Preview: figures come from this browser") · range picker: 7 days (default), 30, 90, 12 months, All time, Choose days | Range lives in the address | Angka, ISO Generator |
| 2 | **Status strip** | Five to eight tiles: each scheduled job, backups, new errors in 24 hours, webhook failures, each outside service, sign-in ("Ways in") | ok, warn or fault tint plus a word, never colour alone; each tile opens Health | Angka UptimeStrip, AX Frame R8 tiles |
| 3 | **Needs a person** | A list of what needs action, worst first. Each row: what, which organisation, since when, and a link to the fix ("Check key", "Review 5 photos"). Includes failing keys, budgets past 80%, stuck runs, suspended organisations, unread requests | Empty state: "Nothing needs a person. Every job ran and every service answered." The list respects §4.3 | Janka, AX Frame, Angka, ISO Generator |
| 4 | **Platform figures** | Four tiles: **Organisations** (hint: by plan), **Active members** in range, **MRR** by currency, **AI cost** in range (hint: calls, failures) | Numbers in mono; money grouped by currency, never converted (RM1,200 + US$45); a dash with a reason when hidden or unmeasured | Yara, Janka, AX Frame, ISO Generator |
| 5 | **Organisations at a glance** | Table of organisations with: name, plan, stage (sandbox, pilot, live, suspended), readiness ("4 of 6 ready"), open problems, members, this month's cost | Sorted by problems first; links to §8.2 | Yara readiness table, ISO Generator rollout table |
| 6 | **Trend** | One or two small charts over the range: the product's core activity (forecasts run, documents generated, work orders) and AI cost | Latest value ends in a pad; flagged points are an intan (kit 12, Charts) | ISO Generator, Angka |
| 7 | **Recent staff actions** | Last 10 audit entries in words: "Aisyah suspended Acme Plastics: unpaid since 1 Oct" | Link to Audit | Yara, Janka, Angka, ISO Generator |
| 8 | **Product block** | May: one product-specific card (Janka's nightly forecast, Angka's funnel) | At most one; below everything above | Janka, Angka |

No hard-coded figure may ever appear on the Overview. Tinara's admin dashboard does this today.

## 8 Standard pages

### 8.1 Organisations list

- **Columns:**
  - name and slug (mono);
  - stage chip;
  - plan;
  - members;
  - readiness;
  - open problems;
  - this month's cost (Costs right);
  - created (11 Oct 2026).
- **Filters:** stage, plan, has problems, product (Central), plus search.
- **Actions:** row actions open the detail page. They never act straight from the list with a browser `confirm()`, as Grid does.
- **Export:** CSV named `axle-<product>-organisations-<YYYY-MM-DD>.csv`.

### 8.2 Organisation page

Opens on **what is missing**: a readiness checklist ("Before Acme Plastics can go live: 2 things left"), each item linking to its fix. Then tabs:

| Tab | Holds |
|---|---|
| **Summary** | Stage stepper (sandbox → pilot → live), with each step change logged in Audit; owner and contacts; notes from staff |
| **Members** | The organisation's members and roles (Owner · Admin · Member · Viewer); resend, reset, suspend |
| **Plan & limits** | Plan, feature overrides, limits (per minute, day, month), comps and discounts |
| **Usage & cost** | Activity and AI cost in range, by currency |
| **Health** | This organisation's data checks: "3 fix now · 2 to check" (Yara `tenant_integrity`) |
| **API** | Keys, switches, recent calls (if the product has an API) |
| **Audit** | Staff actions on this organisation |

Primary actions at the top right:
- **Open support view** (§9);
- **Suspend**, which needs Operator and asks for a reason the members will read.

### 8.3 Members and Staff

Two different pages that never mix:

- **Members** lists only customers.
- **Staff** lists only REKA people.

A staff account must never appear as, or be edited as, a customer member (Yara).

### 8.4 Live trace (AI products)

One run of the product's AI, in this order:

1. **Verdict:** finished, failed or still running, and what that means.
2. **What to fix:** worst first.
3. **The run step by step:** one row per step, with status, model, time, cost and findings.
4. **Raw events, last.**

Diagnosis first, data after (ISO Generator `Trace.tsx`). The prompt and reply bodies are shown only to Admin and above, and never contain secrets.

### 8.5 Audit

- One row per action: when (mono, MYT), who, role, what, which organisation, reason, before and after.
- Filters by staff, organisation, action and date range, kept in the address.
- Never editable, never deletable from AXLE.
- AXLE Link calls from Central appear here as the service ("AXLE Central switched Lapis off: paused while we fix a problem").

### 8.6 Settings and switches

- **Every switch has:**
  - the current state in words;
  - who changed it, when;
  - a reason, written for the customer where callers will see it (antarax-api docs/07);
  - "Change", which asks for the reason before applying.
- **Platform-wide switches** (open access, maintenance, pause generation) raise the state banner (§10.2) on every AXLE page while they are on.

## 9 Support view

How REKA support sees what a customer sees. This is the most sensitive thing AXLE does. Angka's support view is the reference; ISO Generator's must change.

| Rule | Standard |
|---|---|
| Who | Support and above |
| How it starts | "Open support view" on the organisation page. AXLE asks for a reason ("Member reported a missing forecast") and a length: 30 minutes (default), 1 hour, 4 hours |
| What it is | **Read only.** Every control that changes data is disabled or hidden in the customer app while it runs. A write is refused by the server, not only hidden |
| What the staff member sees | A fixed banner at the very top of the customer app, on every page: "REKA support view of Acme Plastics · read only · ends at 14:30 · End now" |
| What the organisation sees | The session in its own activity log as "REKA support viewed your organisation, 13:30 to 14:30, reason: …" |
| When it ends | At the time shown, or "End now". Both are recorded in Audit |
| Writing on a customer's behalf | Not part of the support view. If it is ever needed, it is a separate Operator action, with its own reason and a red banner. It is listed as an open question, not built |

## 10 States and honesty

### 10.1 Figures

| Situation | Show |
|---|---|
| Hidden by role or right | "–" and "Needs the Costs right" |
| Not measured yet | "–" and "No run recorded yet" |
| The product's AXLE Link is not set up (Central) | "Not connected" in grey, not an error |
| A product refuses central switches (Central) | "Takes switches: no" on its row |
| Live-only data in a preview | A note in place of the block: "Only on the live database" |
| Truly zero | 0 |

### 10.2 State banner

These states put a banner under the top bar, in warn tint, on every page, until the state ends:

| State | Banner |
|---|---|
| Open access | "Open access is on: every organisation has paid limits. Settings" |
| Maintenance | "Maintenance is on: members see the maintenance page. Settings" |
| Generation or jobs paused | "AI generation is paused for every organisation since 14:05. Settings" |
| No database (preview) | "Preview: figures come from this browser, and nothing here changes the live platform." |
| Read-only console | "Read only here: AXLE has no live database." |

### 10.3 Loading, empty and error

- **Loading:** a skeleton in the dark neutrals; nothing spins (kit 12).
- **Empty:** says what will appear and how it gets there ("No organisations yet. They appear here when someone signs up or you send an invitation").
- **Error:** says what failed and what to try ("Couldn't load AI calls: the provider log didn't answer. Try again"), never "Oops".

## 11 Actions and confirmations

- No browser `alert()`, `confirm()` or `prompt()`. Confirmations are in-page and name the thing and the consequence. The button names the action: "Suspend Acme Plastics? Its 12 members can't sign in until you switch it back. *Suspend Acme Plastics*" (kit 13 §5).
- Irreversible actions are typed to confirm (the organisation's slug) and need a second person once the two-person rule applies (§4.2).
- After an action: a short toast in the past tense, with Undo where it can be undone ("Plan changed to Nova. *Undo*").

## 12 Words and formats

| Thing | Write | Never |
|---|---|---|
| The customer's account | organisation | tenant, company, client, workspace (unless the product has workspaces inside an organisation), organization |
| A customer's person | member | user, seat |
| A REKA person | staff | admin, superadmin, AXLE admin |
| REKA helping a customer (customer-facing) | REKA support | AXLE, REKA admin |
| Staff roles | Viewer · Support · Operator · Admin · Owner | ADMIN MODE, AXLE ADMIN |
| Getting in and out | Sign in · Sign out | Log in, Log out |
| Money | RM1,200 · US$45 · grouped by currency | RM 1,200 · $45 · USD 45 · converted totals |
| Dates and times | 11 Oct 2026 · 14:30 MYT (the organisation's time zone on its own pages) | 10/11/2026 · 2:30 PM |
| Spelling | British: organisation, authorised, cancelled, optimise | US |
| Code words | `tenant`, `org_id` stay in code and in the API, never on screen | |

## 13 Phones

AXLE is a desk tool, but on-call staff use phones. It **must** work at 390px:

- Below 1024px the sidebar becomes a left drawer with its groups and counters, opened by a 44px menu button, with a focus trap and Escape (Yara). Not a strip of sideways chips (Angka, ISO Generator).
- The page title is never covered by the menu button (the AX Frame bug).
- Overview blocks stack in the order of §7. Tables scroll sideways inside their own container. Figure tiles go two across.
- Every target is at least 44px.

## 14 Accessibility

- WCAG 2.2 AA on the dark palette (checked: body 10.5:1, muted 6.1:1, orange 8.4:1).
- The focus ring as in §3, on every control.
- A skip link; `aria-current` on the active item; counters with spoken labels ("3 open requests").
- Reduced motion stops all motion; the health dot does not pulse.
- An automated check (axe) runs on Overview, Organisations, an organisation page and Audit in each product's CI (13 §10).

## 15 AXLE Link and AXLE Central

Each product AXLE **must** serve the four AXLE Link endpoints from `@lapisan/core` (antarax-api docs/07) before it joins Central:

| Endpoint | Feeds in Central |
|---|---|
| `GET /internal/axle/v1/tenants` | Organisations list, plans, stage, API on or off |
| `GET /internal/axle/v1/usage` | Figures and trends, by day, organisation, route |
| `GET /internal/axle/v1/health` | The product's health dot and the status strip |
| `POST /internal/axle/v1/switches` | Central switches, each with a reason |

Central's Overview is §7 with one row per product in block 5. Every block gets a product filter. Every row deep-links into the product AXLE at the same place: the same organisation, the same range.

Status today:
- Angka and Lapis have AXLE Link.
- Yara has a status API.
- Janka, AX Frame, Grid, Tinara and ISO Generator have none.

## 16 What each console changes

Scores are from the AXLE scorecard in the [gallery](../inventory/gallery.html) (of 8).

| Console | Score | Biggest changes to meet this standard |
|---|---|---|
| **AX Frame** | 6 | Fold the R8 mode into Health and drop the mode switch; add a staff menu with Sign out, Find and the organisation picker; fix the phone header overlap; "Workspaces" → Organisations in AXLE |
| **Angka** | 6 | Move to the dark look (§3); a drawer on phones; "USD" → US$; keep everything else: it is the content reference |
| **Yara** | 4 | Rename "Yara AXLE" → "AXLE · Yara"; ground `#0B0E14` → `#071233` throughout, not only the sidebar; adopt the five-rung ladder (only `reka_admin` today); add Find and the state banner; "Organizations" → Organisations |
| **Janka** | 4 | Rename; dark content area, not only the rail; add the AntaraX A; ladder from admin and manager to five rungs; add JetBrains Mono |
| **ISO Generator** | 4 | Rename from "REKA Admin"; dark look and fonts; put its eight rights on the ladder (§4.2); support view to §9 (banner, read only); a drawer on phones; stop hiding readable pages; AXLE Link. Decide first whether it joins the AntaraX standard |
| **PLExyz Grid** | 1 | Rebuild on this standard: an Overview, addresses for every page, the dark look, the ladder, no `confirm()` |
| **Tinara** | 1 | Rebuild on this standard as `AXLE · Tinara` on its own host, out of the customer app; remove every hard-coded figure |
| **PLExyz Crowd** | n/a | Has no internal console. First remove AXLE from the customer app; build AXLE only when needed |

## 17 Open questions

To record in the brand kit's `11-open-questions.md` and decide with the owner:

1. **Focus ring on dark.** Kit 05 and 12 say AntaraX blue `#0459F7` everywhere, but it reaches only 2.99:1 on AXLE's raised navy. Proposed: `#4D84FE`, the dark-mode AntaraX blue, as AX Frame already uses, as the dark-mode focus colour for every product.
2. **The "Support" staff role.** Kit 13 reserves "REKA support" for customer-facing words. The staff role name comes from antarax-api docs/07. Keep it (it is never shown to customers), or rename it (for example "Helper")?
3. **The primary action colour.** This spec uses orange with navy text for the one primary action. AX Frame uses Frame blue for actions and orange only as signal. Which?
4. **Writing on a customer's behalf** from a support view: never, or a separate Operator action (§9)?
5. **ISO Generator:** does it adopt the AntaraX AXLE standard (and host `axle.<product>.antarax.ai`), or stay a REKA-only console?
6. **The organisation's view of support sessions** (§9): shown in their activity log by default?
7. **The staff guide:** one AXLE guide for every product, with product chapters, or one per product?

## Appendix: source map

| Idea | Best example today | Where |
|---|---|---|
| Five-rung staff ladder, "needs {role}" | Angka | `inventory/angka/` (AXLE section) |
| Rights gate that explains itself | ISO Generator | `AdminApp.tsx:102-127`, screenshot `25-axle-gate-no-right` |
| Unknown, not zero | ISO Generator | `Overview.tsx:36-38, 94-103` |
| Organisation scope in the address | ISO Generator | `TenantPicker.tsx:11-46` |
| Readiness checklist on the organisation page | ISO Generator, Yara | `Tenants.tsx:330-349`; Yara readiness table |
| Live trace, diagnosis first | ISO Generator | `Trace.tsx`, screenshot `15-axle-live-trace` |
| Status strip | Angka | screenshot `03-axle-dashboard` |
| Needs a person | Janka, AX Frame R8, Angka | screenshots `03-axle-*` |
| Data health per organisation | Yara | `tenant_integrity`, screenshot `03-axle-dashboard` |
| Dark look and name | AX Frame | `admin.css`, screenshot `03-axle-dashboard` |
| Always-on state banner | AX Frame | OPEN ACCESS banner |
| Support view banner | Angka | "Support view of {business}, read only, ends at {time} · End now" |
| Members and staff never mixed | Yara | AXLE Tenant users and AXLE admins |
| "How this page works" | AX Frame, Janka | `AdmGuide`, `axle/intros.ts` |
| AXLE Link and the API section | Angka, antarax-api | `lib/axle/link`, `packages/lapisan-core/src/link/` |
