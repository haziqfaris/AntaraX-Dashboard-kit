# AntaraX Dashboard kit

The standard dashboards for everything REKA builds: AntaraX products, REKA's client projects, and the AXLE console both share. It sits beside the [AntaraX brand kit](https://github.com/haziqfaris/AntaraX-brand-kit), which stays the source of truth for names, colour, type and the AntaraX layer.

**Version 1.2.0** ([CHANGELOG](CHANGELOG.md)). Products pin the version they built against in `antarax-kit.lock` ([how](app/README.md#pin-the-kit)).

## Where it stands

| Step | What | State |
|---|---|---|
| 1 | Inventory of every product's navigation and dashboards, with screenshots | Done: [inventory/](inventory/README.md), browsable in [inventory/gallery.html](inventory/gallery.html) |
| 2 | The AntaraX shell for customer apps | **The standard, v1.2 (16 Oct 2026).** Start with [app/README.md](app/README.md); spec [app/SPEC.md](app/SPEC.md), tokens [app/tokens.css](app/tokens.css), mock and PNG renders [app/mock/](app/mock/README.md), reference components [app/reference/](app/reference/README.md), conformance check `tools/check-shell.mjs`. Each product's app is its own; only the shell is shared: names, the top bar (account at the far right, Help its own button), the account menu, standard pages, getting in, banners, notifications, Assist, feedback, dialogs and errors |
| 2a | REKA client projects | **The standard, v1.0 (16 Oct 2026).** Start with [project/README.md](project/README.md); spec [project/SPEC.md](project/SPEC.md), mock [project/mock/](project/mock/README.md). The client's brand on a neutral base, never AntaraX's look; the shell's places; "Built by REKA" in the footer; one stack (Next.js, shadcn/ui, Supabase) |
| 2b | Tickets and feedback | In YaraOne, for products and projects alike: [yaraone/EMBEDS.md](yaraone/EMBEDS.md). Embed contract v1.0, settled with YaraOne (its docs/19); YaraOne is building it |
| 2c | Capacity | Every product and project lists what it runs on, every limit and how it is measured in `capacity.json`; AXLE → R8 → Capacity shows how close each is and when it runs out. Any provider, any kind of infrastructure: [capacity/README.md](capacity/README.md), check with `python3 capacity/check.py` |
| 3 | Standard AXLE console and AXLE Central | **The standard, v1.0 (15 Oct 2026).** Build every AXLE from [axle/README.md](axle/README.md): the spec, the final mock of every page, and the tokens |

**Building or changing any product's AXLE? Start with [BRIEF.md](BRIEF.md)**, then [axle/README.md](axle/README.md). Agents: see [AGENTS.md](AGENTS.md).

## Connected to the brand kit

The [AntaraX brand kit](https://github.com/haziqfaris/AntaraX-brand-kit) owns every colour and size; this kit consumes them.

- **The snapshot:** `brand/tokens.json` and `brand/product-palettes.json` are pinned copies of the brand kit's tokens and each product's own palette, and `brand/brand-kit.lock` records the version and commit they came from. A mock may use a product's palette only where it shows that product's own side.
- **Generated, never edited:** `axle/tokens.css` is generated from the snapshot's `axle` section.
- **Sync:** `python3 tools/sync-brand-kit.py` refreshes both from a brand kit checkout beside this repo (or `--brand-kit PATH`).
- **The check:** `python3 tools/sync-brand-kit.py --check` fails on drift. That means a hand-edited token file, a mock colour that is not a brand token, or a brand kit that has changed since the snapshot. GitHub Actions runs it on every push and every Monday (`.github/workflows/brand-kit-sync.yml`). If the brand kit is private, add a read-only token as the `BRAND_KIT_TOKEN` secret so the check can compare against it; without one it checks the snapshot only.
- **Client projects:** `python3 tools/sync-brand-kit.py --project PATH` fails if any AntaraX colour appears in a client project's code; `--check` applies the same rule to `project/mock/`.
- **Decisions are recorded in the brand kit** (`guide/10-decisions-log.md`), in the same piece of work as the change here.

For the background, start with [inventory/README.md](inventory/README.md). It has the cross-product matrices, what has already converged, and the suggested next steps.
