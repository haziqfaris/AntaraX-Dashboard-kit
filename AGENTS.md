# Agent rules for the AntaraX Dashboard kit

This repository holds the **standard design for every AntaraX product's dashboards and AXLE console**. It sits beside the [AntaraX brand kit](https://github.com/haziqfaris/AntaraX-brand-kit), which stays the source of truth for names, colour, type and brand decisions.

## When working in another repository on AXLE

Any work on a product's AXLE uses the template in `axle/`; that includes a new product, a new page, or a change. This was decided by the owner on 15 Oct 2026.

- Follow `axle/README.md` step by step.
- `axle/SPEC.md` decides what to build. `axle/mock/` shows what it looks like. `axle/tokens.css` is the only source of values.
- If the template does not cover what you need, stop and raise it with the owner. Do not invent a menu group, colour, active-item style or page pattern in the product.

## When working in this repository

- **The spec and the mock move together.** A change to one changes the other in the same commit.
- **Decisions need the owner.** Change the standard only for a decision the owner has made. Record it with its date in the brand kit's `guide/10-decisions-log.md` in the same piece of work. Put anything unresolved in `axle/SPEC.md` §20.
- **The canvas holds only the final design.** Comparisons and explorations go in `axle/mock/explorations/`, never on the canvas.
- **Mock data is fictional.** Staff use `@reka.example` addresses. Organisations are invented, and no real client's data appears. Names and roles stay consistent across pages: check `mock/Staff.dc.html`.
- **Keep `axle/tokens.css` in step with the spec.** A new value goes in both.
- Write in plain British English, sentence case, no em dashes.
