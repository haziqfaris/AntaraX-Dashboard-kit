# Building a customer app inside the AntaraX shell

Every AntaraX customer app is the product's own: its identity, colours, shape, navigation and UI. The only exception is the **AntaraX shell**, a few things that stay the same in every product so customers always find them in the same place (owner, 15 Oct 2026).

| File | What it is |
|---|---|
| [SPEC.md](SPEC.md) | The shell, v1.1: what is shared, the standards beneath the look, what never to do, and that everything else is the product's own |
| [mock/](mock/README.md) | The shell drawn in six products' own colours: the top bar and its menus, getting in, shared moments, settings |

The live mock is a private claude.ai canvas (https://claude.ai/artifact/BnCgM4zvLZpKiJGDaqqBix), shared by the owner.

## The shell in one screen

- **Top bar** (§2):
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

## Everything else is the product's

Navigation (whether there is a sidebar at all, and its shape, groups and names), layouts, dashboards, components, colours, density, motion, illustration, dark mode, first-run setup and tours. A product never needs permission to customise something the spec does not name.

## When the shell doesn't cover it

If something feels like it should be shared, it is added to `SPEC.md` first, with the owner's decision recorded in the brand kit's `guide/10-decisions-log.md`. Never invent a shared rule inside one product.
