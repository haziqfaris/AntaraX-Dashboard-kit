# Building an AXLE from the template

Every product's AXLE, REKA's staff console, is built from this folder. That applies to a new product, a new AXLE page, or a change to an existing one (owner, 15 Oct 2026).

| File | What it is | Use it for |
|---|---|---|
| [SPEC.md](SPEC.md) | The standard, v1.4 | What AXLE must have, how it is organised and how it behaves |
| [mock/](mock/README.md) | The final design of every standard page, for AXLE · Janka | What each page looks like; copy the closest page |
| [tokens.css](tokens.css) | Every AXLE colour, font and size, generated from the brand kit | The only values an AXLE screen may use. Copy it into the product; never edit it |
| [reference/](reference/) | The REKA AXLE Admin Console Standard, v0.1 and v0.2 | Where the "std" citations in the spec come from |

The live mock is a private claude.ai canvas (https://claude.ai/artifact/NbWWVFkowB1rKddfSS5hmr), shared by the owner. The files in `mock/` are the same pages.

## Steps

1. **Work out what this product gets** ([SPEC §2](SPEC.md#2-tiers)). Always items; Orgs if it has several customer organisations; AI if it uses AI; Billing if it bills inside itself. **R8 Base** is in every product. **R8 Full** applies if the product runs machinery of its own (§7.5 lists each product).
2. **The shell** ([§6](SPEC.md#6-shell-std-l1-l5)). Use the AntaraX top bar in its dark variant with the orange `AXLE` tag, the 240px sidebar ([`mock/Sidebar.dc.html`](mock/Sidebar.dc.html)) and a light page. Values come from `tokens.css`.
3. **The menu** ([§7](SPEC.md#7-navigation)). Follow these rules:
   - **Order:** the standard groups, with the same names and order as every other product. Then the product's own pages in a dashed "‹Product› only" box at the end.
   - **Groups:** each group is a folding card, with an icon tile and the title in the group's colour.
   - **Current page:** an orange tint, orange text and the intan, never a side stripe.
   - **Modes:** the Dashboard · R8 switch.
4. **Each page.** Start from the closest page in `mock/`.
   - Every page has a title in the top bar, one line saying what it is for, and a state line.
   - Lists follow §9, and states and figures follow §13.
   - Actions ask for a reason and are audited (§14). R8 actions carry their safety level (§14.1).
5. **Before release,** pass every check in [§19](SPEC.md#19-how-to-prove-it).

## When the template doesn't cover it

- **A page only this product needs:** put it in the product box, built the same way as the standard pages.
- **A new colour or size:** add it to the brand kit's `tokens/tokens.json` (`axle` section) and `tokens.css`, then run `python3 tools/sync-brand-kit.py` here. The mocks may only use brand kit colours; the check enforces it.
- **A new kind of page, pattern, group, colour or behaviour:** mock it first beside the standard pages, and get the owner's decision. Then update `SPEC.md` and `mock/` together in this repo, and record the decision in the brand kit's `guide/10-decisions-log.md`. Do not invent it inside a product.
- **Something that turns out useful to a second product:** promote it into the standard, with a tier, and take it out of the product box.

## Never

- Rename, reorder or regroup a standard menu item.
- Give the current page or a selected row a side stripe.
- Use orange for anything except "needs a person" and "you are here".
- Use a status colour without a real signal, or a group colour as a status.
- Show a secret's value, or a `0` where the true figure is hidden or unknown.
- Draw an action as link text, or end a label or a busy word with "…" (§14.2): a working button says "Running check" with AntaraX's Assemble.
