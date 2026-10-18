# AXLE brief for product work

**Read this first in any chat that builds or changes a product's AXLE.** It sums up what was decided on 15 Oct 2026, where everything is, and how a product chat should work. The detail lives in the files it links; when they disagree with this page, the files win. Last updated 18 Oct 2026.

**Client projects are different again:** the client's brand, never AntaraX's look, with the shell's places and "Built by REKA" in the footer. Start with [project/README.md](project/README.md). Their AXLE is this same AXLE.

**Customer apps are different:** each product's own, apart from the AntaraX shell (top bar with Help and the account at the right, the account menu, standard pages under `/settings`, shared roles and moments). Start with [app/README.md](app/README.md); spec v1.3: the bar's exact sizes are tokens (`app/tokens.css`), every mock is rendered to PNG, and `tools/check-shell.mjs` measures a product against them. Products pin the kit version in `antarax-kit.lock` ([CHANGELOG](CHANGELOG.md)).

## How to use it in another chat

Start the chat in the product's repository, with this repository attached (`haziqfaris/AntaraX-Dashboard-kit`, public). Then say:

> Read `BRIEF.md` in haziqfaris/AntaraX-Dashboard-kit, then `axle/README.md` there. Bring ‹product›'s AXLE up to the standard, starting with ‹the part you want›. Plan first, from the product's current code, and show me before changing anything.

The product chat builds in the product's own repository. If it needs something the standard does not have, it stops and asks. A change to the standard comes back to this repository and is mocked first (see [the last section](#changing-the-standard)).

## What is decided

| Topic | Decision | Where |
|---|---|---|
| What AXLE is | REKA's staff console for one product. Members never see it, its name or its address | [SPEC §1](axle/SPEC.md#1-what-axle-is), §12 |
| The look | Dark bars (sidebar, top bar) around a light page. The AntaraX top bar in its dark variant, with an orange `AXLE` tag after the brand pill | §4, §6 |
| Two modes | **Dashboard** (the business: organisations, people, plans, money, AI set-up, the trail). **R8** (the machinery: incidents, troubleshooting, jobs, providers, services, configuration). A switch at the top of the sidebar changes only the menu | §7.1 |
| R8 levels | **Base** in every product: Overview, Troubleshoot, Jobs, Providers, Services, Configuration, Operations audit. **Full** adds Incidents and the machinery blocks. Probes, Agents and Visual appear once their backend exists | §2, §7.4 |
| The menu | The standard groups, with the same names and order in every product. The product's own pages go in a dashed "‹Product› only" box at the end | §7.2, §7.3 |
| The sidebar | Groups are folding cards: a tinted icon tile and the title in the group's colour. A folded card lists its pages in grey and keeps the orange total. The current page is an orange tint with orange text and the intan, never a side stripe | §6, §7.2 |
| Colour rules | Orange means "needs a person" and "you are here", nothing else. Group colours mark an area, never a status. Status colours only on a real signal, always with a word | §3, §13 |
| Staff | A ladder (Viewer, Support, Operator, Admin, Owner) plus rights (Finance, Security, AI, Library). Every rung sees every page; what they cannot do is disabled, with "Needs ‹rung›" | §5.2 |
| R8 actions | Level 1 (run, retry, pause, test, acknowledge, suppress) from Operator. Level 2 (drain, restart, scale) from Admin, later. Level 3 (shell, deploy, restart a customer's machine) never. Each asks for a reason and is audited | §14.1 |
| R8 → AI flow | Every product with AI features has it, after Providers: the product's AI drawn from its AI manifest, through the five steps (Asked, Allowed, Answered, Checked, Decided) and the five outcomes. Read only; never prompts or answers. The rules for the AI itself are the [AntaraX AI framework](https://github.com/haziqfaris/ai-framework-heuristiks) | §7.4, §10.6.1 |
| Tickets and feedback | They live in **YaraOne**. AXLE embeds YaraOne's back office as Watch → Tickets; the customer app embeds its front office from Help. No product builds its own ticketing or feedback; AXLE runs everything else | §10.12, [yaraone/EMBEDS.md](yaraone/EMBEDS.md) |
| Capacity | R8 → Capacity in every product: every plan it runs on, every limit, the trend and when it runs out, what to do, and an outside availability check. Generic for any infrastructure, from the product's `capacity.json` | §10.13, [capacity/](capacity/README.md) |
| Email | Every product sends through **AntaraX email** (`email.antarax.ai`, from `product@mail.antarax.ai`). AXLE shows Watch → Email, read from the service with the product's service key, and never holds templates, a sender or an address. AXLE Central → Email shows every product's email, the service's alerts and health, and is the only place a shared bounce is lifted (Admin). Every email looks the same everywhere: the brand kit's layout with the family's BaTech band and, on first emails, the product's motif. Angka is deferred | [SPEC §10.14](axle/SPEC.md#1014-email-antarax-email-as-this-product-sees-it-owner-17-oct-2026); brand kit `guide/13` §4 and `assets/email/`; antarax-api `docs/15` |
| Figures | Real and clickable. Money is grouped by currency. A hidden or unknown figure is a dash with the reason, never `0` | §3, §13.1 |
| Values | Every colour and size comes from [`axle/tokens.css`](axle/tokens.css), generated from the brand kit (tokens 1.9.0) | [README](README.md#connected-to-the-brand-kit) |

## Where everything is

| What | Where |
|---|---|
| Step-by-step for building an AXLE | [axle/README.md](axle/README.md) |
| The standard, v1.0 | [axle/SPEC.md](axle/SPEC.md) |
| The final design of every page (AXLE · Janka) | [axle/mock/](axle/mock/README.md), and the private canvas https://claude.ai/artifact/NbWWVFkowB1rKddfSS5hmr |
| Tokens to copy into the product | [axle/tokens.css](axle/tokens.css) |
| What each product's AXLE looks like today, with screenshots | [inventory/](inventory/README.md), [inventory/gallery.html](inventory/gallery.html) |
| How a product's AI must work, its manifest and its AI document | [AntaraX AI framework](https://github.com/haziqfaris/ai-framework-heuristiks): `BRIEF.md` for a product chat |
| Brand decisions, names, colours | [AntaraX brand kit](https://github.com/haziqfaris/AntaraX-brand-kit): `guide/10-decisions-log.md`, `guide/13-shared-product-standards.md` §6 |
| Every email template, rendered, and how a new product joins | [AntaraX brand kit](https://github.com/haziqfaris/AntaraX-brand-kit) `assets/email/`; the code is antarax-api `packages/lapisan-email` |

## Each product's starting point

Scores are from the AXLE scorecard in the gallery, out of 8. "Own pages" go in the product's box.

| Product | Repository | R8 | Own pages: Dashboard | Own pages: R8 | Score | Biggest changes ([SPEC §21](axle/SPEC.md#21-what-each-console-changes)) |
|---|---|---|---|---|---|---|
| AX Frame | `haziqfaris/axframe` | Full; Observe shows Probes and network, and Visual | AI connections, Customer health, Catalog | None | 6 | Regroup R8 into the four standard groups; move AI set-up and Errors to Dashboard; staff menu, Find, organisation picker; Workspaces → Organisations |
| Angka (with Lapis) | `haziqfaris/angka` | Full | Lapis, Weekly brief | Runs | 6 | Dark bars around its light page; phone drawer; US$; organisation create flow and lifecycle |
| Janka | `haziqfaris/janka-inventory-intelligence` | Full | Forecast accuracy, Reference library, Learning | Nightly forecast | 4 | Rename; the AntaraX top bar; bars to `#071233`; the ladder; JetBrains Mono; Members management |
| Yara | `haziqfaris/yara` | Base | Data integrity, Modules, Status API | None | 4 | Add R8 Base; rename; bars to `#071233`; the `AXLE` tag; the ladder; state banner; Demo and Access pages |
| Tinara | `haziqfaris/tinara` | Full | Scoring & metrics, Data sources, Intelligence ledger | Data pipelines | 1 | Rebuild as `AXLE · Tinara` on its own host; remove hard-coded figures |
| PLExyz Grid | `haziqfaris/plexyz-grid` | Base | None | None | 1 | Rebuild: Overview, R8 Base, addresses for every page, the ladder, no `confirm()`, a create flow |
| ISO Generator | `haziqfaris/iso-generator` | On hold | | | 4 | **On hold (owner, 15 Oct 2026): do not touch it.** Not part of this work until the owner says so |
| PLExyz Crowd | `haziqfaris/plexyz-crowd` | n/a | | | n/a | No internal console; take AXLE out of the customer app first |
| AXLE Central | `haziqfaris/antarax-api` | n/a | | | n/a | Planned at `axle.antarax.ai`; reads each product AXLE through AXLE Link (§18). Not built |

## How a product chat should work

1. **Read** this brief and `axle/README.md`, then the SPEC sections for the part being built.
2. **Look at the product as it is.** Use its inventory page here and its own code.
3. **Plan the change against the standard and show it before editing.** Keep to the product's own conventions (its AGENTS.md or CLAUDE.md) for code, data and deployment.
4. **Build:**
   - Copy `axle/tokens.css` into the product and use only those names.
   - Take the layout from the closest mock page.
   - Keep standard menu names and order.
   - Put the product's own pages in its box.
5. **Check** against SPEC §19 before calling it done.
6. **Report back** anything the standard did not cover. Do not invent it in the product.

## Not settled yet

- **Open questions** in [SPEC §20](axle/SPEC.md#20-open-questions):
  - roles against antarax-api;
  - acting as a member;
  - the focus ring on the bars;
  - the "Support" rung name;
  - which products are in scope;
  - lifecycle words;
  - cooling-off and invitation expiry defaults;
  - where the product box sits.

  Until one is decided, the SPEC text applies.
- **Decided 15 Oct 2026:** the main action is REKA orange, and support sessions are in every product, read only, with the organisation's consent (SPEC §11).
- **Not mocked yet:**
  - R8 → Services in the new layout (the current page is the older Health layout);
  - each product's own pages;
  - AXLE Central, apart from its Email page (`axle/mock/CentralEmail.dc.html`, SPEC §10.14);
  - the standard customer dashboard (step 2 in [README](README.md)).

## Changing the standard

A product chat never changes the standard on its own. A change happens in this repository:

1. Mock it beside the standard pages.
2. Get the owner's decision.
3. Update `axle/SPEC.md` and `axle/mock/` together.
4. Record the decision in the brand kit's `guide/10-decisions-log.md`.
5. For a new colour or size, add it to the brand kit first, then run `python3 tools/sync-brand-kit.py` here.
6. Update this brief if a row above changes.

[AGENTS.md](AGENTS.md) has the full rules.
