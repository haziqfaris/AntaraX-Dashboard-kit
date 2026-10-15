# AntaraX Dashboard kit

The standard dashboard and AXLE console design for every AntaraX product. It sits beside the [AntaraX brand kit](https://github.com/haziqfaris/AntaraX-brand-kit), which stays the source of truth for names, colour, type and the AntaraX layer.

## Where it stands

| Step | What | State |
|---|---|---|
| 1 | Inventory of every product's navigation and dashboards, with screenshots | Done: [inventory/](inventory/README.md), browsable in [inventory/gallery.html](inventory/gallery.html) |
| 2 | Standard customer shell and dashboard | Next |
| 3 | Standard AXLE console and AXLE Central | **The standard, v1.0 (15 Oct 2026).** Build every AXLE from [axle/README.md](axle/README.md): the spec, the final mock of every page, and the tokens |

**Building or changing any product's AXLE? Start with [BRIEF.md](BRIEF.md)**, then [axle/README.md](axle/README.md). Agents: see [AGENTS.md](AGENTS.md).

## Connected to the brand kit

The [AntaraX brand kit](https://github.com/haziqfaris/AntaraX-brand-kit) owns every colour and size; this kit consumes them.

- **The snapshot:** `brand/tokens.json` is a pinned copy of the brand kit's tokens, and `brand/brand-kit.lock` records the version and commit it came from.
- **Generated, never edited:** `axle/tokens.css` is generated from the snapshot's `axle` section.
- **Sync:** `python3 tools/sync-brand-kit.py` refreshes both from a brand kit checkout beside this repo (or `--brand-kit PATH`).
- **The check:** `python3 tools/sync-brand-kit.py --check` fails on drift. That means a hand-edited token file, a mock colour that is not a brand token, or a brand kit that has changed since the snapshot. GitHub Actions runs it on every push and every Monday (`.github/workflows/brand-kit-sync.yml`). If the brand kit is private, add a read-only token as the `BRAND_KIT_TOKEN` secret so the check can compare against it; without one it checks the snapshot only.
- **Decisions are recorded in the brand kit** (`guide/10-decisions-log.md`), in the same piece of work as the change here.

For the background, start with [inventory/README.md](inventory/README.md). It has the cross-product matrices, what has already converged, and the suggested next steps.
