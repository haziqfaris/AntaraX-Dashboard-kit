# Agent rules for the AntaraX Dashboard kit

This repository holds the **standard design for every AntaraX product's dashboards and AXLE console**. It sits beside the [AntaraX brand kit](https://github.com/haziqfaris/AntaraX-brand-kit), which stays the source of truth for names, colour, type and brand decisions.

## When working in another repository on AXLE

Any work on a product's AXLE uses the template in `axle/`; that includes a new product, a new page, or a change. This was decided by the owner on 15 Oct 2026.

- Read `BRIEF.md` first: what is decided, where everything is, and each product's starting point. Then follow `axle/README.md` step by step.
- `axle/SPEC.md` decides what to build. `axle/mock/` shows what it looks like. `axle/tokens.css` is the only source of values.
- If the template does not cover what you need, stop and raise it with the owner. Do not invent a menu group, colour, active-item style or page pattern in the product.

## When working in another repository on a customer app

A product's customer app is its own: identity, shape, theme and UI (owner, 15 Oct 2026). Only the AntaraX shell is shared: the words, the top bar, where Help and the account sit, the account menu, and the standard pages. Follow `app/README.md` and `app/SPEC.md` (v1.6, the standard). Everything the spec does not name is the product's own; a new shared rule goes into the spec first, never into one product.

- **Before planning, write a gap table** (owner, 16 Oct 2026). Open the closest product's mock PNG (`app/mock/renders/AppBar-<product>-wide.png` and `-phone.png`, and the board for the page) and its `.values.md`. List every difference between the product, the mock and the spec, with what you will do about each. Where the spec says "the product's own", say what the product chose and why. Put the table in your plan before any code.
- **Take values from `app/tokens.css`**, never from prose or by measuring a mock by eye. `app/reference/` shows them built.
- **Before calling it done, run `node tools/check-shell.mjs`** against the running product (app/README.md, Before you ship). Record any difference that stays in the product's `antarax-kit.lock` with its reason, and pin the kit version you built against.

## When working in another repository on a REKA client project

A client project carries the client's brand and must never look like an AntaraX product (owner, 16 Oct 2026). Follow `project/README.md` and `project/SPEC.md`: the shell's places from `app/SPEC.md`, the neutral base, "Built by REKA" in the footer, the stack in SPEC §5. Never use an AntaraX font, colour, mark or word; check with `python3 tools/sync-brand-kit.py --project PATH`. Its AXLE follows `axle/` like any product's.

## Getting in and acting

Every customer app and every AXLE meets two more standards (owner, 18 Oct 2026):

- **`getting-in/SPEC.md`:** signing in, passwords, sign-in links, two-step sign-in, sessions and account changes. Its §1 (GI-01 to GI-20) is the bare minimum before release. §14 says what each product had on 18 Oct 2026 and §15 what each changes. Check with `node tools/check-signin.mjs` against the running product.
- **`actions/SPEC.md`:** confirming, waiting and results. Its §1 (AC-01 to AC-12) is the bare minimum. Every action is at one of three levels, and what a person sees while it runs depends on how long it takes. §10 says what each product does today and §11 what each changes. Check with `node tools/check-actions.mjs PATH` on the product's source.

The reference pieces are in `app/reference/`: `PasswordField`, `ConfirmDialog`, `ProgressDialog` and `useAction`. Each product's screens are drawn in `app/mock/GettingIn<Product>.dc.html` and `app/mock/Actions<Product>.dc.html`, with PNGs in `app/mock/renders/` and values beside them.

## Capacity

Every product and client project keeps `capacity.json` at its root, listing every plan it runs on and every limit it can reach, and passes `python3 capacity/check.py capacity.json` from this kit (owner, 16 Oct 2026). A new provider, plan, function, bucket or sending service is added there in the same piece of work. Never guess a limit: take it from the provider's plan page, or mark the plan not confirmed.

## Tickets and feedback are YaraOne's

No product, customer app or AXLE builds its own ticketing, feedback inbox or support form that stores anything (owner, 16 Oct 2026). Customers reach YaraOne's **front office** from Help; staff reach its **back office** in AXLE → Tickets. Follow `yaraone/EMBEDS.md` v1.0: `embed.js`, a token the product's server signs, nothing stored in the product. Wire it in once YaraOne's front office is built (its docs/19 phase W); never invent another embed mechanism or sign-in handover in a product.

## AI, APIs and data

Each has one owner (owner, 25 Oct 2026; AwanGan decision 0021). When you build a product's AXLE, take each to its owner; never build it in the product.

- **AI** follows the AntaraX AI framework, Heuristiks (`haziqfaris/ai-framework-heuristiks`). Its provider keys, models and routing are **AwanGan**'s (`haziqfaris/AntaraX-AwanGan`), AntaraX's AI control plane. Once a product comes through AwanGan, it holds no provider key, only an AntaraX key for product `ai`; before that, AwanGan records the keys it still holds, watch only. Prompts, gates, checks and decisions stay in the product. In AXLE, Models & keys is a read-only view of AwanGan's keys and routes, and AI usage reads Lapisan's usage rows for product `ai` (`axle/SPEC.md` §10.6).
- **APIs:** keys for callers, tenants, scopes, limits and usage rows are **Lapisan**'s (`haziqfaris/antarax-api`, `api.antarax.ai`).
- **Data a business hands over** (files in, clean tables out) goes to **Cebis Loom** (`haziqfaris/antarax-cebis-loom`).
- **Which framework governs what:** **RESAM**'s repository map (`haziqfaris/RESAM`).
- **A client's own system** comes through AwanGan only with the client's written agreement; otherwise it keeps its own keys under Heuristiks, or runs BumiNyata on its own servers.

## On hold

- **ISO Generator** (`haziqfaris/iso-generator`): do not change it in any way for this work (owner, 15 Oct 2026).

## How changes land

`main` is this repository's main branch. Work on a branch and open a pull request into `main`; every change to the standards goes through review.

## When working in this repository

- **The spec and the mock move together.** A change to one changes the other in the same commit. A changed shell mock also gets its PNGs re-rendered and its `.values.md` corrected in that commit (`node tools/render-mocks.mjs app/mock`, then `--stamp-values`); CI fails otherwise.
- **One kit version.** Every change to a standard bumps `VERSION` and adds to `CHANGELOG.md` (major, minor or patch as the CHANGELOG defines), and the release is tagged on `main` after the merge.
- **Decisions need the owner.** Change the standard only for a decision the owner has made. Record it with its date in the brand kit's `guide/10-decisions-log.md` in the same piece of work. Put anything unresolved in `axle/SPEC.md` §20.
- **The canvas holds only the final design.** Comparisons and explorations go in `axle/mock/explorations/`, never on the canvas.
- **Mock data is fictional.** Staff use `@reka.example` addresses. Organisations are invented, and no real client's data appears. Names and roles stay consistent across pages: check `mock/Staff.dc.html`.
- **Colours and sizes come from the brand kit.** `axle/tokens.css` and `app/tokens.css` are generated from the brand kit's `tokens/tokens.json` (`axle` and `shell` sections) by `python3 tools/sync-brand-kit.py`, which also pins the brand kit version in `brand/`. Never edit either tokens file or `brand/` by hand. A new value goes into the brand kit first (with an owner decision), then sync here.
- **Run `python3 tools/sync-brand-kit.py --check` before committing.** It fails on a hand-edited token file, a mock colour that is not a brand token, or a brand kit that has moved on. CI runs it on every push and weekly.
- Write in plain British English, sentence case, no em dashes.
