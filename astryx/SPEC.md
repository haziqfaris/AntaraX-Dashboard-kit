# Building with Astryx

**Version 1.0, the standard (owner, 11 Nov 2026; Dashboard kit 1.11.0).** Every AntaraX customer app and every AXLE builds its interface from [Astryx](https://github.com/meta/astryx), Meta's open-source design system (MIT; React 19). Until now each product built its own dialogs, toasts and forms; the checks of 18 Oct 2026 found that is where most failures were (actions/SPEC.md §10).

**Who decides what.**
- **The kit's standards** decide what is on a screen, where it sits, what it says and how it behaves: app/SPEC.md, axle/SPEC.md, getting-in/SPEC.md and actions/SPEC.md.
- **Astryx** is what it is built with.
- **The product's theme**, generated from the brand kit, decides how it looks.

Where Astryx's defaults and the kit disagree, the kit wins (§5).

ISO Generator is on hold: nothing here applies to it.

---

## 1 What it covers

| | |
|---|---|
| **Products** | Every AntaraX customer app and every AXLE |
| **What moves to Astryx** | A new product; a new screen; a screen being reworked or fixed for a kit standard |
| **What does not move yet** | Existing screens nobody is touching. No product is rewritten just to adopt Astryx |
| **Client projects** | Not covered. They keep shadcn/ui on Radix ([project/SPEC.md](../project/SPEC.md) §5) |
| **First** | YaraOne, starting with its fixes from actions/SPEC.md §11. What it learns comes back here before the next product starts |

## 2 Version

Astryx is in beta, with breaking changes between minor versions, so every product pins it exactly and updates on purpose.

- **The tested version is `0.7.13`**, for `@astryxdesign/core`, `@astryxdesign/cli` and `@astryxdesign/theme-neutral`. Write it without `^` or `~`. The kit moves this line only after a theme build and the example (§8) pass on the new version.
- **Record it** in the product's `antarax-kit.lock` as `"astryx": "0.7.13"`.
- **To update:**
  - one pull request that does nothing else;
  - run `npx astryx upgrade` for its codemods;
  - read the changelog of every package;
  - rebuild the theme;
  - run the checks in §8;
  - smoke-test the screens that use Astryx.
- **Never** a `canary`, `bootstrap` or `vanilla-poc` build, and never `@astryxdesign/lab`, `@astryxdesign/charts` or `@astryxdesign/vega`, which are not released as stable.

## 3 Setting it up

1. **Install** `@astryxdesign/core`, `@astryxdesign/theme-neutral` and `@stylexjs/stylex` at the pinned version, and `@astryxdesign/cli` as a dev dependency. Add the script `"astryx": "node node_modules/@astryxdesign/cli/clients/cli/bin/astryx.mjs"`.
2. **Use the pre-built CSS:** no StyleX build plugin. In the global stylesheet, in this order:
   - `@astryxdesign/core/reset.css`
   - `@astryxdesign/core/astryx.css`
   - the product's built theme CSS (§4)

   With Tailwind, put Astryx's `@layer` line **above** `@import "tailwindcss"`, as `npx astryx docs styling-libraries/tailwind` shows. Below it, the cascade silently inverts.
3. **Wrap the app** in `<Theme theme={…}>` with the product's built theme, and in `<LinkProvider component={Link}>` with the framework's link (Next.js `Link`).
4. **Load the fonts the theme names**, Poppins and JetBrains Mono, through the framework's font loader (`next/font` self-hosts them). Astryx sets `font-family` only.
5. **Agents:** `npx astryx component <Name>` and `npx astryx docs <topic>` are the reference for a component's props, ahead of memory. `npx astryx init` may add Astryx's agent prompt. Where it disagrees with the product's own rules or this kit, the product and the kit win.

## 4 The product's theme

Each product's theme is **generated from the brand kit**, never written by hand:

- `astryx/themes/<key>/<key>Theme.ts` holds one per product: Yara, YaraOne, AX Frame, Janka, PLExyz Grid, PLExyz Crowd, Angka, Tinara, Cebis Loom, Motion and Tiko (Tiko's colours are provisional until its branding is settled).
- `astryx/themes/axle/axleTheme.ts` holds the one for AXLE.
- Each extends Astryx's Neutral theme and sets only what the brand kit decides.

**To use it:**
1. Copy the product's file into `src/themes/<key>/`.
2. Run `npx astryx theme build src/themes/<key>/<key>Theme.ts`.
3. Commit the source and what the build writes: `.css`, `.js` and `.d.ts`.

**When the brand kit changes:** the kit syncs (`tools/sync-brand-kit.py`), then `node tools/build-astryx-themes.mjs` regenerates every theme, and each product copies and rebuilds. A colour is never edited in a product.

| Astryx token | From the brand kit (light, then dark) |
|---|---|
| `--color-accent`, `--color-icon-accent` | the product's `action`; its dark `action` / `accent` |
| `--color-accent-muted` | `subtle`; dark `accent` at 24% |
| `--color-text-accent` | `accent-text`; dark `accent` |
| `--color-on-accent` | `text.on-action`; dark `on-action` |
| `--color-text-primary`, `-secondary`, `-disabled` (and icons) | `text.strong`, `text.muted`, `text.disabled`; dark `strong`, `muted` |
| `--color-background-body`, `-surface`, `-card`, `-popover`, `-muted` | `surface.sunken`, `ground`, `raised`, `raised`, `hover`; dark `ground`, `raised`, `sunken` |
| `--color-border`, `-emphasized` | `border.default`, `border.strong`; dark `border` |
| `--color-success`, `-warning`, `-error`, `-info` (with `-muted`, `text-`, `icon-`, `on-…-muted`) | `status.ok`, `warn`, `fault`, `info`: the text colour as the fill, the tint as muted |
| `--focus-outline-color` | AntaraX blue `#0459F7` (dark `#4D84FE`), the focus ring everywhere |
| `--radius-element`, `-container`, `-page` | the product's control, card and page radius. Page · card · control: the default 24 · 20 · 12; AX Frame 16 · 20 · 12 (its bar 16, cards 20, buttons 12); Janka 20 · 20 · 12; Angka 28 · 20 · 14; Tinara 0 · 0 · 4 (square) |
| Typography | Poppins for body and headings (600), JetBrains Mono for code |
| `--size-element-md`, `-lg` on a touch screen | 44px; dense rows stay compact with a mouse |
| `button` `variant:destructive` | solid in `--color-error` with white text |
| the quiet destructive button (app SPEC §11b) | a `variant="secondary"` Button given the theme file's `quietDestructive` style: the fault colour for text and border on no fill. For Remove and Delete in a dense row; Astryx has no variant of its own for it |

**AXLE's theme** paints the page inside AXLE: the light page, REKA orange `#FB9800` as the main action with navy text, and AntaraX blue links and focus. The dark sidebar and top bar stay as `axle/tokens.css` and the AXLE template draw them.

Astryx's own themes (Butter, Chocolate, Matcha, Stone, Gothic, Y2K) are never used in a product.

## 5 Where the kit wins over Astryx's defaults

| Astryx default | The kit's rule |
|---|---|
| `Spinner`, and the spinner in `Button isLoading` and `AlertDialog isActionLoading` | Every wait uses the product's own loader (app SPEC §12; AX Frame never spins). Don't use Astryx's spinners. A busy button is disabled, with its busy words beside the product's inline loader (actions §3) |
| `AlertDialog` takes a plain-text description and holds a spinner while it works | Use it directly for a Level 2 action that finishes in under 400ms. For anything slower, or with a list of what goes, build the product's `ConfirmDialog` on Astryx `Dialog` + `Button`, with the same contract: Cancel focused first, open until the action settles, the error inside it |
| No typed confirmation | Level 3 (actions §2) is `Dialog` + `TextInput` for the name + `TextInput type="password"` (or the code), with the button disabled until both are right. See `example/` |
| `Toast` hides after 5 seconds | 6 seconds; 8 seconds when it offers Undo (`endContent`); an error stays until it is dismissed (Astryx's default for `type="error"`) |
| Default button and link styles | App SPEC §11b: an action is a `Button` (`primary`, `secondary`, `ghost` or `destructive`), and a `Link` only goes somewhere. No label ends in "…" |
| Words in examples ("OK", "Confirm") | The kit's words: actions §7, getting-in §10, the brand kit's voice |
| `AppShell`, `TopNav`, `MobileNav` | The top bar, Help, the account menu and the standard pages are the kit's (app SPEC §2, `app/tokens.css`). Use Astryx primitives inside them only where `check-shell.mjs` still passes |
| AXLE layout | The sidebar, groups, bars and page patterns are the AXLE template's (axle/SPEC.md). Astryx builds what is on the page |
| Charts | The brand kit's chart sets; Astryx's chart packages are not stable |
| Numbers | Every figure in JetBrains Mono with tabular numbers (brand kit 13), whatever the component |

## 6 Which Astryx piece for which kit rule

| Kit rule | Astryx |
|---|---|
| Level 2 confirm (actions §2) | `AlertDialog` (under 400ms), or the product's `ConfirmDialog` on `Dialog` |
| Level 3 confirm | `Dialog` + `TextInput` (name) + `TextInput type="password"` |
| Progress dialog (actions §3) | `Dialog purpose="required"` + `ProgressBar` (count with `formatValueLabel`, e.g. "312 of 1,240"), Cancel and Run in background as `Button`s |
| Result toast, Undo, error that stays (actions §4) | `Toast` with `endContent` for Undo or Retry |
| Field errors (actions §4) | `Field` / `FieldStatus` with the input, linked for screen readers |
| Discard changes? (actions §6) | `AlertDialog`, action "Discard", cancel "Keep editing" |
| Password with Show (getting-in) | `TextInput type="password"` plus the strength meter and Caps Lock rules from getting-in §4. Compare with `app/reference/PasswordField.jsx` |
| Long lists (app SPEC §11a) | `Table`, `Pagination`, `PowerSearch`, `DropdownMenu`, inside the kit's list toolbar |
| Empty states (app SPEC §11) | `EmptyState`, with the kit's words |
| Menus, popovers, tooltips | `DropdownMenu`, `Popover`, `Tooltip`, `InfoTip` |

`app/reference/` stays as the kit's statement of behaviour. A product built on Astryx doesn't copy those files; it meets the same contract with Astryx.

## 7 Never

- Two libraries for the same job on one screen: an Astryx dialog beside a Radix or hand-built one.
- An edited generated theme, or an Astryx theme other than the product's own.
- `npx astryx swizzle` (ejecting a component's source) without an entry in `antarax-kit.lock` saying why. A swizzled component stops receiving Astryx's fixes.
- A version range, a canary, or an unreleased package (§2).
- Astryx's spinners (§5).

## 8 How to prove it

- **In the kit:** `node tools/build-astryx-themes.mjs --check` fails when a theme is out of step with the brand kit snapshot. CI runs it on every push.
- **The worked example:** `example/ActionsExample.tsx` draws a Level 2 confirm, a Level 3 confirm and a progress dialog with YaraOne's theme on Astryx 0.7.13. `example/yaraone-actions.png` shows it rendered, with no console errors (11 Nov 2026).
- **In a product:**
  - its Astryx packages are pinned exactly and match `antarax-kit.lock`;
  - its theme source matches the kit's file;
  - `npx astryx doctor` passes;
  - the kit's `check-actions.mjs`, `check-signin.mjs` and `check-shell.mjs` pass as before.

## 9 Today

On 11 Nov 2026 no product uses Astryx. Every React front end runs React 19, so each can adopt it; the server-rendered ones below (Cebis Loom, AwanGan) and BumiNyata have nothing for it to replace yet. YaraOne goes first.

| Product | Front end |
|---|---|
| Yara | Next.js 15, Tailwind 3. Astryx's Tailwind guide is written for Tailwind 4: check the layer order before mixing |
| YaraOne | Next.js 16, Tailwind 4, Radix dialogs |
| AX Frame | Next.js 16, Tailwind 4 |
| Angka | Next.js 16, Tailwind 4, Radix |
| Janka | Vite 8, no Tailwind |
| PLExyz Grid | Vite 6, Tailwind 4 |
| PLExyz Crowd | Next.js 16, Tailwind 4 |
| Tinara | Vite 6, Tailwind 4 |
| Lapisan Console | Next.js 16 |
| Tiko (private pilot) | Next.js 16, React 19, Tailwind 4 |
| Cebis Loom | Python, server-rendered pages (`app.py`, `online.py`, `axle.py`); no React, so Astryx does not apply. Its pages follow the kit's rules and tokens by hand |
| AwanGan | TypeScript server-rendered pages (its test app `src/try/`, its AXLE `src/axle/`); no React, so Astryx does not apply until a page moves to React |
| BumiNyata | An API service with no customer screens of its own yet |
