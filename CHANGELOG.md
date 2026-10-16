# Changelog

The Dashboard kit has one version for all its standards (owner, 16 Oct 2026). Products pin it in `antarax-kit.lock` ([app/README.md](app/README.md#pin-the-kit)). Each release is tagged `v<version>` on `main`.

- **Major:** a product built to the previous version no longer conforms (a place, an order or a size changes).
- **Minor:** something new to adopt, or a rule tightened with a recorded way out.
- **Patch:** wording, mocks and tools only.

Every change needs an owner decision, recorded in the brand kit's `guide/10-decisions-log.md`.

## 1.2.0 · 16 Oct 2026

Customer apps are checked against the kit, not read from it. A product built to `app/SPEC.md` v1.1 still did not look like the family; these close the gaps.

- **app/SPEC.md v1.2:**
  - §2.2: the floating bar is the default, with every value in a table. A product that differs records the value in the brand kit and the reason in its `antarax-kit.lock`. Tinara's flat bar is confirmed. PLExyz Grid floats (the mock had drawn it flat).
  - §2.5: the current navigation item is the product's subtle tint with on-tint text, never the same as hover. Navigation's shape stays the product's own.
  - §11a: a baseline for every long list, a customer version of AXLE §9.
  - §17: new checks: the bar measured, where you are, lists, pinned.
- **`app/tokens.css`**, generated from the brand kit's `shell` section (tokens 1.11.0) by `tools/sync-brand-kit.py`. It covers sizes, every product's colour slots, the recorded exceptions and dark mode, and is checked on every push.
- **`app/reference/`**: AppBar, BrandPill, RoundControl, HelpMenu, AccountMenu and ListToolbar in plain React and CSS variables, with a demo.
- **`tools/render-mocks.mjs`**: every shell mock rendered to PNG in `app/mock/renders/`, including the top bar in six products, wide and phone, light and dark. A values table sits beside each mock, and `--check` in CI fails when either is older than its mock.
- **`tools/check-shell.mjs`**: it measures a running product's bar against the tokens and saves its screenshot beside the reference PNG. `app/README.md` has a before-you-ship list.
- **AGENTS.md:** a gap table against the closest product's mock and the spec comes before any customer-app plan.
- **Mocks:**
  - the AppBar mock gained dark mode and a floating PLExyz Grid;
  - the current item follows §2.5 on every board;
  - a new Lists board.

## 1.1.0 · 16 Oct 2026

Merged as pull requests #1 to #9.

- AXLE: support sessions in every product, with the organisation's consent (§11).
- AXLE: R8 → AI flow, drawn from each product's AI manifest (§10.6.1).
- AXLE: R8 → Capacity and `capacity/`, every limit from any infrastructure (§10.13).
- **YaraOne embeds** (`yaraone/EMBEDS.md` v1.0): tickets and feedback live in YaraOne. The front office sits in each customer app and the back office in each AXLE.
- **The REKA project template** (`project/`, v1.1): the third dashboard, for client projects, with the client branding SOP.
- "Powered by" names a separate tool; never "Powered by AntaraX".

## 1.0.0 · 15 Oct 2026

- **AXLE v1.0** (`axle/`): the standard and template for every product's staff console. Its tokens are generated from the brand kit.
- **The AntaraX shell v1.1** (`app/`), for every customer app:
  - the top bar, the account and Help;
  - the standard pages, getting in and the shared moments;
  - animated waits, the customer admin area, Built right and Never.
