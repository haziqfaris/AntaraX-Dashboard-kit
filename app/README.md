# Building a customer app inside the AntaraX shell

Every AntaraX customer app is the product's own: its identity, colours, shape, navigation and UI. The only exception is the **AntaraX shell**, a few things that stay the same in every product so customers always find them in the same place (owner, 15 Oct 2026).

| File | What it is |
|---|---|
| [SPEC.md](SPEC.md) | The shell, v1.2: what is shared, its exact sizes, the standards beneath the look, what never to do, and that everything else is the product's own |
| [tokens.css](tokens.css) | Every size and colour slot of the bar, for every product, light and dark. Generated from the brand kit: never edit, never retype |
| [mock/](mock/README.md) | The shell drawn in six products' own colours, as a canvas and as PNG renders (`mock/renders/`), with a values table beside each mock |
| [reference/](reference/README.md) | The bar, its menus and the list toolbar in plain React and CSS variables |
| [`tools/check-shell.mjs`](../tools/check-shell.mjs) | Measures a running product's bar against the tokens and puts its screenshot beside the reference PNG |

The live mock is a private claude.ai canvas (https://claude.ai/artifact/BnCgM4zvLZpKiJGDaqqBix), shared by the owner.

## The shell in one screen

- **Top bar** (§2):
  - floats as a card by default, 64px tall (58 on phones), every value in `tokens.css`;
  - always in this order: the brand pill (the AntaraX A and the product chip), the page title, the product's own slot, then search and notifications where the product has them, then **Help**, then **the account at the far right**;
  - colours from the product's own palette.
- **Account menu** (§3): you, your organisation, Your account, Settings, Plan and billing (Owners), Appearance and Language where offered, Sign out, then "‹Product› · by AntaraX", Privacy and Terms. Sign-in and the splash say "‹Product› by AntaraX, from REKA."; legal pages and invoices carry "AntaraX, a product line of REKA Inisiatif Sdn Bhd."
- **Help menu**: User guide, Help centre, What's new (optional), Send feedback, Contact support, Your requests. The last three open **YaraOne's front office**, embedded: no product builds its own ticketing or feedback ([yaraone/EMBEDS.md](../yaraone/EMBEDS.md)).
- **Standard pages** (§4):
  - `/account`, `/settings` (Organisation, Members, Plan and billing, the product's own, API, Your data), `/guide`, `/help`, `/legal/privacy`, `/legal/terms`;
  - every setting lives under `/settings`.
- **Words and roles**: the brand kit's words. Owner, Admin, Member and Viewer mean the same in every product.
- **Every wait is animated** in the product's own style (§12): never "Loading…" alone, a static placeholder or a spinner.
- **The organisation's admin area** under `/settings` (§13): Members, Roles, Security, Activity log, Usage, Plan and billing, API, Support access, Your data.
- **Built right** (§15): sign-in and passwords (Show password, password managers, 12+ characters, no composition rules), forms, PDPA data handling, speed and caching, reliability, security, time and language, devices. Not cosmetic, so the same everywhere.
- **Never** (§16): the things no product does, whatever its design.
- **Shared moments**, where the words and behaviour are shared and the look is the product's own:
  - getting in (§6);
  - banners in a fixed order (§7);
  - notifications (§8);
  - Assist (§9);
  - feedback and support requests, through YaraOne (§10);
  - dialogs, toasts, errors and empty states (§11);
  - the footer on public share pages (§14).

## Before you plan

Open the closest product's render (`mock/renders/AppBar-<product>-wide.png` and `-phone.png`, and the board for the page you are building) and its `.values.md`. Write a gap table: every difference between what the product has, the render, and the spec. Where the spec leaves a choice to the product, say what the product chose and why (AGENTS.md).

## Before you ship

- [ ] `app/tokens.css` is imported and used: no bar size or shell colour is typed by hand.
- [ ] `node tools/check-shell.mjs URL --product KEY --lock antarax-kit.lock` passes on three signed-in pages (use `--storage` for the sign-in).
- [ ] Its screenshots in `compare.html` look like the reference PNGs, apart from the differences in your lock.
- [ ] Help's six items and the account menu are in §2.1's and §3's order; Sign out asks first.
- [ ] The current navigation item is on the subtle tint with on-tint text, and hover looks different (§2.5).
- [ ] The longest list has search, filters, sort, honest empty and no-match states, CSV if tabular, and survives a reload (§11a).
- [ ] At 390px, Help and the account are one tap away on every page, and nothing in the bar overlaps.
- [ ] No uppercase labels, and none of brand kit 13 §1's banned words.
- [ ] `antarax-kit.lock` names this kit's version and commit, and every exception has a reason.
- [ ] The rest of §17.

## Pin the kit

Every product keeps `antarax-kit.lock` at its root (owner, 16 Oct 2026; see [antarax-kit.lock.example](../antarax-kit.lock.example)):

- `version` and `commit`: the kit release it was built against ([CHANGELOG](../CHANGELOG.md)).
- `follows`: which standards apply (`app`, `axle`, `project`, `embeds`, `capacity`).
- `exceptions`: every recorded difference from the spec, with `what` (as `check-shell` names it, such as "Bar radius"), `value`, `why` and who decided. `check-shell --lock` passes a recorded difference and reports it.

When the kit moves on, read the CHANGELOG from your version to the new one, adopt it, and bump the lock in the same piece of work.

## Everything else is the product's

Navigation (whether there is a sidebar at all, and its shape, groups and names; only the current item and hover are shared, §2.5), layouts, dashboards, components, colours, density, motion, illustration, dark mode, first-run setup and tours. A product never needs permission to customise something the spec does not name.

## When the shell doesn't cover it

If something feels like it should be shared, it is added to `SPEC.md` first, with the owner's decision recorded in the brand kit's `guide/10-decisions-log.md`. Never invent a shared rule inside one product.
